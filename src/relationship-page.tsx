import { Link, useParams, useSearchParams } from 'react-router-dom'
import { nodes } from './data'
import { accessLabel, publicRelations, sourceById } from './evidence-selectors'
import { nodeBySlug } from './selectors'
import type { Node, Relation } from './types'
import { ChoiceBar, NotFound, Page, relationLabel, typeNames } from './ui'

type LearningReason={direction:'outbound'|'inbound';label:string;reason:string}
type DisplayRelation=Relation&{learning_reasons?:LearningReason[];learning_label?:string}
type RelationView='learning'|'evidence'|'comparison'

export function learningRelationsFor(node:Node):DisplayRelation[]{
  const grouped=new globalThis.Map<string,LearningReason[]>()
  for(const source of nodes){for(const link of source.learning_links??[]){
    const outbound=source.id===node.id
    const inbound=link.target_id===node.id
    if(!outbound&&!inbound)continue
    const otherId=outbound?link.target_id:source.id
    if(otherId===node.id||!nodes.some(candidate=>candidate.id===otherId))continue
    const label=link.sequence_hint==='before'?'建议先读':link.sequence_hint==='compare'?'建议对照':'建议接着读'
    const reasons=grouped.get(otherId)??[]
    reasons.push({direction:outbound?'outbound':'inbound',label,reason:link.reason})
    grouped.set(otherId,reasons)
  }}
  return [...grouped.entries()].map(([target_id,reasons])=>{
    const bothWays=reasons.some(reason=>reason.direction==='outbound')&&reasons.some(reason=>reason.direction==='inbound')
    const statement_zh=reasons.map(reason=>`${reason.direction==='outbound'?'从当前知识点出发':'从对方知识点回读'}：${reason.reason}`).join('；')
    return {id:`learning-${node.id}-${target_id}`,source_id:node.id,target_id,relation_type:'learning_path',statement_zh,evidence_status:'interpretive',evidence:[],review_status:'editorial_path',reviewed_at:null,learning_reasons:reasons,learning_label:bothWays?'双向推荐':reasons[0].label}
  })
}

function graphPositions(count:number):[number,number][]{return Array.from({length:Math.min(count,10)},(_,i)=>{const radius=i%2===0?39:31;const angle=(-90+i*(360/Math.min(count,10)))*Math.PI/180;return [50+Math.cos(angle)*radius,50+Math.sin(angle)*radius]})}
function displayRelationLabel(relation:DisplayRelation,outgoing:boolean){return relation.learning_label??relationLabel(relation.relation_type,outgoing)}

export function relationsForView(node:Node,view:RelationView):DisplayRelation[]{
  if(view==='learning')return learningRelationsFor(node)
  const layer=view==='comparison'?'comparison':'academic'
  return publicRelations(layer).filter(relation=>relation.source_id===node.id||relation.target_id===node.id)
}

function SourceDetail({evidence}:{evidence:{source_id:string;locator:string;support_note:string;support_role:string}}){
  const source=sourceById.get(evidence.source_id)
  return <div className="source-detail"><strong>{source?.authors_or_organization.join('、')}（{source?.year??'年份未载'}）《{source?.title??evidence.source_id}》</strong><span>{accessLabel[source?.access_status??'unavailable']} · 访问：{source?.accessed_at??'尚未记录'} · {evidence.locator}</span><p>{evidence.support_note}</p><small>这里只说明这份资料支持页面中的哪句话，不把它扩大为更多结论。</small>{source?.url&&<a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a>}</div>
}

function RelationGraph({node,relations}:{node:Node;relations:DisplayRelation[]}){
  const visible=relations.slice(0,10),positions=graphPositions(visible.length)
  const learning=Boolean(relations[0]?.learning_reasons?.length)
  const mode=learning?'learning':relations[0]?.evidence_status==='interpretive'?'comparison':'evidence'
  const canvasHeight=visible.length<=1?300:visible.length<=3?380:visible.length<=5?455:560
  return <div className={`relation-orbit ${mode} count-${visible.length}`} style={{'--relation-height':`${canvasHeight}px`} as React.CSSProperties}>
    <svg className="relation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="relation-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>{positions.map(([x,y],i)=>{const relation=visible[i];const outgoing=relation?.source_id===node.id;const symmetric=['contrasts_with','associated_with'].includes(relation?.relation_type??'');return <line key={relation?.id??i} x1={outgoing?50:x} y1={outgoing?50:y} x2={outgoing?x:50} y2={outgoing?y:50} markerEnd={symmetric?undefined:'url(#relation-arrow)'}/>})}</svg>
    <div className="relation-core"><span>{typeNames[node.type]}</span>{node.name_zh}</div>
    {visible.map((relation,i)=>{const outgoing=relation.source_id===node.id;const target=nodes.find(candidate=>candidate.id===(outgoing?relation.target_id:relation.source_id));const [x,y]=positions[i]??[50,50];return target?<Link aria-label={`${displayRelationLabel(relation,outgoing)}：${target.name_zh}，打开知识点`} title={`打开“${target.name_zh}”知识点`} className={`orbit-relation type-${target.type}`} style={{left:`${x}%`,top:`${y}%`}} key={relation.id} to={`/nodes/${target.slug}`}><i aria-hidden="true"/><b>{target.name_zh}</b><span>{displayRelationLabel(relation,outgoing)} · 打开知识点</span></Link>:null})}
  </div>
}

export function Relations(){
  const {slug}=useParams()
  const [params,setParams]=useSearchParams()
  const node=slug?nodeBySlug.get(slug):undefined
  if(!node)return <NotFound/>
  const layer=params.get('layer')
  const view:RelationView=layer==='comparison'?'comparison':layer==='evidence'||layer==='academic'?'evidence':'learning'
  const relations=relationsForView(node,view)
  const requested=params.get('relation')
  const invalid=Boolean(requested&&!relations.some(relation=>relation.id===requested))
  const selected=relations.find(relation=>relation.id===requested)??relations[0]
  const meta={
    learning:{label:'推荐阅读',hint:'点击圆点进入相应知识点；右侧查看推荐理由'},
    evidence:{label:'有出处的关联',hint:'点击圆点进入相应知识点；右侧查看文献定位'},
    comparison:{label:'本站整理的比较',hint:'点击圆点进入相应知识点；右侧查看整理依据'},
  }[view]
  function choose(id:string){const next=new URLSearchParams(params);next.set('relation',id);setParams(next)}
  function switchView(next:RelationView){setParams(next==='learning'?{}:{layer:next})}
  return <Page title={`${node.name_zh} · 关系网络`}>
    <details className="relation-explainer"><summary>三种连接怎样区分？ <span>阅读顺序、文献关联与本站比较不会混在一起</span></summary><div className="relation-explainer-grid"><div><b>推荐阅读</b><p>安排学习顺序，不声称学术因果。</p></div><div><b>有出处的关联</b><p>只列文献明确说明的关系，并附原文定位。</p></div><div className="comparison-explainer"><b>本站整理的比较</b><p>用于教学对照，不是文献直接命名的关系。</p></div></div></details>
    <div className="relation-toolbar"><Link className="back-reading" to={`/nodes/${node.slug}`}>← 返回知识点</Link><ChoiceBar label="查看" value={view} options={[{value:'learning',label:'推荐阅读'},{value:'evidence',label:'有出处的关联'},{value:'comparison',label:'本站整理的比较'}]} onChange={value=>switchView(value as RelationView)}/><span>{meta.hint}</span></div>
    <section className="relations-layout"><RelationGraph node={node} relations={relations}/><aside className="relation-empty"><p className="eyebrow">{meta.label}</p>{invalid&&<p className="invalid">指定关系不属于当前视图，已回到有效内容。</p>}{!relations.length?<><h2>{view==='comparison'?'暂未整理出本站比较':view==='evidence'?'暂未整理出有出处的关联':'暂无推荐阅读'}</h2><p>{view==='comparison'?'这不表示知识点无法比较，只表示这部分教学归纳尚未完成。':view==='evidence'?'这不表示知识点没有联系，只表示这部分关系尚未完成出处核对。':'该知识点的阅读顺序尚未编排。'}</p>{view!=='learning'&&<button type="button" className="switch-view" onClick={()=>switchView('learning')}>先看推荐阅读 →</button>}</>:<><h2>{relations.length} 个相连知识点</h2>{relations.length>10&&<p>图中显示前 10 个知识点，右侧列表保留全部。</p>}<div className="relation-list">{relations.map(relation=>{const outgoing=relation.source_id===node.id;const target=nodes.find(candidate=>candidate.id===(outgoing?relation.target_id:relation.source_id));return target?<button type="button" key={relation.id} className={selected?.id===relation.id?'active':''} onClick={()=>choose(relation.id)}><span>{displayRelationLabel(relation,outgoing)}</span>{target.name_zh}</button>:null})}</div>{selected&&<article className="relation-detail"><h3>{selected.statement_zh}</h3>{selected.scope_note&&<p><b>范围：</b>{selected.scope_note}</p>}{selected.learning_reasons?.length?<><p className="evidence-label">为什么推荐这样读</p><ul className="learning-reasons">{selected.learning_reasons.map((reason,index)=><li key={`${reason.direction}-${index}`}><b>{reason.direction==='outbound'?'从当前知识点出发':'从对方知识点回读'} · {reason.label}</b><span>{reason.reason}</span></li>)}</ul><p className="learning-boundary">这条连接只用于安排学习顺序，不声称两个知识点之间存在历史影响或因果关系。</p></>:view==='comparison'?<><h4 className="relation-evidence-heading">用于整理的依据</h4><p className="comparison-boundary">这是本站依据下列资料作出的教学归纳，不是文献直接命名的关系。</p>{selected.evidence.map((evidence,index)=><SourceDetail evidence={evidence} key={index}/>)}</>:<><p className="evidence-label">来源中明确写到</p>{selected.evidence.map((evidence,index)=><SourceDetail evidence={evidence} key={index}/>)}</>}</article>}</>}</aside></section>
  </Page>
}

export default Relations
