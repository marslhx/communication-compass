import { Link, useParams, useSearchParams } from 'react-router-dom'
import { assetUrl } from './assets'
import { nodes } from './data'
import { accessLabel, publicRelations, sourceById } from './evidence-selectors'
import { allClaims, learningLinks, personTierLabel } from './selectors'
import type { Claim, Node } from './types'
import { NotFound, Page, Status, ThemeChips, relationLabel, typeNames } from './ui'

function SourceDetail({evidence}:{evidence:{source_id:string;locator:string;support_note:string;support_role:string}}){
  const source=sourceById.get(evidence.source_id)
  return <div className="source-detail"><strong>{source?.authors_or_organization.join('、')}（{source?.year??'年份未载'}）《{source?.title??evidence.source_id}》</strong><span>{accessLabel[source?.access_status??'unavailable']} · 访问：{source?.accessed_at??'尚未记录'} · {evidence.locator}</span><p>{evidence.support_note}</p><small>这里只说明这份资料支持页面中的哪句话，不把它扩大为更多结论。</small>{source?.url&&<a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a>}</div>
}

function Evidence({claim}:{claim:Claim}){
  const label=claim.evidence_status==='direct'?'文献中明确写到':claim.evidence_status==='interpretive'?'本站据此整理':'尚待核对'
  return <article id={`claim-${claim.id}`} className={`claim ${claim.evidence_status}`}><div><span className="evidence-label">{label}</span><p>{claim.statement}</p></div>{claim.evidence_status!=='pending'&&<details open={claim.evidence_status==='interpretive'}><summary>{claim.evidence_status==='interpretive'?'查看整理依据（可收起）':'查看出处'}</summary>{claim.evidence.map((evidence,index)=><SourceDetail key={index} evidence={evidence}/>)}</details>}</article>
}

function ListField({title,items}:{title:string;items?:string[]}){
  return items?.length?<section className="type-field"><h3>{title}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul></section>:null
}

const personTermZh:Record<string,string>={
  'Agenda-setting researcher':'议程设置研究者','Bell Labs researcher':'贝尔实验室研究员','Communication discipline builder':'传播学科建设者','Communication research pioneer':'传播研究先驱','Cultivation researcher':'涵化研究者','Dean of the Annenberg School for Communication':'安纳伯格传播学院院长','Director of the Centre for Culture and Technology':'文化与技术中心主任','Electrical engineer':'电气工程师','Former journalist':'曾任记者','Information theory founder':'信息论奠基者','Journalism historian':'新闻史学者','Journalism professor':'新闻学教授','Literary scholar':'文学学者','Mathematician':'数学家','Media theorist':'媒介理论家','Philosopher':'哲学家','Policy sciences scholar':'政策科学学者','Political scientist':'政治学者','Professor at UNC-Chapel Hill':'北卡罗来纳大学教堂山分校教授','Public intellectual':'公共知识分子','Social theorist':'社会理论家',
  'Tulane University':'杜兰大学','Stanford University':'斯坦福大学','University of Southern California':'南加州大学','University of Bonn':'波恩大学','Mass communication':'大众传播','Undergraduate study':'本科阶段','Communications and Education':'传播与教育','Philosophy':'哲学','Sociology':'社会学',
}

function zhTerm(value:string){return personTermZh[value]??value}

function TypeModule({node}:{node:Node}){
  if(node.record_level==='candidate')return null
  const visibleClaims=(claims?:Claim[])=>claims?.filter(claim=>claim.evidence_status!=='pending')??[]
  const claimField=(title:string,claims?:Claim[])=>{
    const visible=visibleClaims(claims)
    return visible.length?<section className="type-field"><h3>{title}</h3>{visible.map(claim=><Evidence key={claim.id} claim={claim}/>)}</section>:null
  }
  switch(node.type){
    case'theory_model':
      if(!node.questions_explained?.length&&!visibleClaims(node.propositions).length&&!node.conditions?.length)return null
      return <section className="type-module"><h2>这一理论／模型怎样理解</h2><ListField title="它试图解释的问题" items={node.questions_explained}/>{claimField('核心命题',node.propositions)}<ListField title="适用条件与边界" items={node.conditions}/></section>
    case'tradition':
      if(!node.central_questions?.length&&!node.naming_boundary&&!visibleClaims(node.internal_differences).length)return null
      return <section className="type-module"><h2>这一思想传统怎样理解</h2><ListField title="中心问题" items={node.central_questions}/>{node.naming_boundary&&<p className="boundary"><b>命名边界：</b>{node.naming_boundary}</p>}{claimField('内部差异',node.internal_differences)}</section>
    case'person':
      if(!node.roles?.length&&!node.communication_relevance&&!node.education_records?.length)return null
      return <section className="type-module"><h2>这个人物怎样进入传播学</h2><ListField title="角色" items={node.roles?.map(zhTerm)}/>{node.communication_relevance&&<p>{node.communication_relevance}</p>}{node.education_records?.length?<section className="type-field"><h3>已核教育经历</h3>{node.education_records.map((record,index)=><p key={index}>{zhTerm(record.institution)} · {zhTerm(record.program)} {record.degree??''} {record.period??''}</p>)}</section>:null}</section>
    case'method':
      return <section className="type-module"><h2>这个方法怎样使用</h2><p className="method-notice">资料要求与步骤为编辑性练习安排；具体方法细则仍需结合待核边界阅读。</p><ListField title="适合回答的问题" items={node.suitable_questions}/><ListField title="资料要求" items={node.data_requirements}/><ListField title="典型步骤" items={node.typical_procedure}/>{claimField('方法限制',node.limitations)}</section>
    case'research_topic':
      if(!node.core_questions?.length&&!node.current_evidence_state)return null
      return <section className="type-module"><h2>这个研究主题怎样理解</h2><ListField title="核心问题" items={node.core_questions}/>{node.current_evidence_state&&<p className="boundary"><b>当前证据状态：</b>{node.current_evidence_state}</p>}</section>
    default:return null
  }
}

const modelDiagrams:Record<string,{title:string;steps:string[];branches?:string[]}>= {
  'r2-encoding-decoding':{title:'意义不会被原样搬运',steps:['生产者编码','文本／话语','受众解码'],branches:['主导式','协商式','对抗式']},
  'r2-framing':{title:'选择与突出改变理解路径',steps:['选择现实切面','组织显著性','定义／归因／评价']},
  'r3-mediatization':{title:'媒介与制度在长期中相互塑造',steps:['媒介变化','实践调整','制度与文化变迁']},
  'r4-agenda-setting':{title:'显著性从媒介议程进入公众议程',steps:['媒介选择与强调','议题可见度','公众重要性判断']},
  'r4-two-step':{title:'媒介影响常经由人际网络中介',steps:['媒介信息','意见领袖','人际扩散与解释']},
  'r4-uses-gratifications':{title:'从受众的需求与选择出发',steps:['需求／期待','主动媒介选择','获得满足与后果']},
  'r4-cultivation':{title:'长期、重复的象征环境参与现实判断',steps:['持续媒介暴露','重复的象征世界','社会现实认知']},
  'r5-gatekeeping':{title:'信息在多道门槛中被选择与改写',steps:['事件／材料','个人与组织门槛','公共可见内容']},
  'r5-public-sphere':{title:'公共沟通连接意见形成与政治正当性',steps:['私人与社会经验','公开讨论与理由','公共意见／制度回应']},
  'r4-diffusion-innovations':{title:'创新经由时间、渠道与社会系统扩散',steps:['知晓与理解','评估与试用','采用／拒绝／再发明']},
  'r4-spiral-silence':{title:'可见表达与意见气候形成反馈循环',steps:['感知意见气候','判断孤立风险','表达或沉默'],branches:['可见声音增强','沉默声音更难被看见']},
  'r4-elaboration-likelihood':{title:'动机与能力改变信息加工方式',steps:['接触说服信息','判断动机与能力','形成或调整态度'],branches:['深入审视论据','依赖来源／情境线索']},
  'r4-third-person-effect':{title:'对他人受影响的判断也会带来后果',steps:['接触媒介信息','比较自我与他人影响','支持行动／治理反应']},
  'r4-knowledge-gap':{title:'信息增长可能带来不同速度的知识增长',steps:['公共信息输入','群体资源／使用差异','知识差距变化']},
  'r4-social-cognitive':{title:'符号榜样经由个人能动性与社会网络进入行动',steps:['观察榜样／后果','学习与自我效能','采用／调整行为'],branches:['直接传播路径','社会网络中介路径']},
  'r1-uncertainty-reduction':{title:'初次交往中的信息搜寻提高可预测性',steps:['感知不确定','观察／询问／互动','更新对彼此的预期']},
  'r4-media-dependency':{title:'效果取决于受众、媒介与社会的依赖关系',steps:['实现信息目标','依赖媒介资源','认知／情感／行为后果']},
  'r1-social-presence':{title:'媒介线索与交互实践共同产生“他人在场”',steps:['媒介与社会线索','双方交互与预期','他人／关系的显著感']},
}

function TheoryDiagram({node}:{node:Node}){
  const diagram=modelDiagrams[node.id]
  if(node.type!=='theory_model'||!diagram)return null
  return <section className="theory-diagram" aria-label={`${node.name_zh}模型示意`}><header><span>模型示意</span><h2>{diagram.title}</h2></header><div className="diagram-flow">{diagram.steps.map((step,index)=><div key={step}><b>{String(index+1).padStart(2,'0')}</b><span>{step}</span>{index<diagram.steps.length-1&&<i aria-hidden="true">→</i>}</div>)}</div>{diagram.branches&&<div className="diagram-branches">{diagram.branches.map(branch=><span key={branch}>{branch}</span>)}</div>}<p>这是教学导航示意，不代替原始文献中的完整理论表述。</p></section>
}

function Portrait({node}:{node:Node}){
  if(!node.portrait)return <div className="portrait-fallback" aria-label="尚无可明确授权的代表照片"><span>{node.name_zh.slice(0,1)}</span><small>待补充授权可确认的照片</small></div>
  return <figure className="person-portrait"><img src={assetUrl(node.portrait.url)} alt={node.portrait.alt} width="640" height="800" loading="lazy" decoding="async"/><figcaption>{node.portrait.credit} · {node.portrait.license} · <a href={node.portrait.source_url} target="_blank" rel="noreferrer">来源</a></figcaption></figure>
}

function SourceAuthorCards({node}:{node:Node}){
  const entries=(node.learning_resources??[]).map(resource=>{
    const source=sourceById.get(resource.source_id)
    return source?{resource,source}:null
  }).filter((entry):entry is NonNullable<typeof entry>=>Boolean(entry))
  if(!entries.length)return <div className="quiet-empty"><span>⌁</span><p>本知识点尚未整理出可追溯的代表作者与来源。</p></div>
  return <><div className="source-people-note">如果尚未确认人物与这一知识点之间的具体关系，这里只列本知识点实际使用的作者或机构。它们是查阅线索，不自动等于“理论提出者”。</div><div className="source-people-grid">{entries.map(({resource,source})=><a key={`${resource.source_id}-${resource.title}`} href={source.url} target="_blank" rel="noreferrer"><span>作者／机构</span><b>{source.authors_or_organization.join('、')}</b><small>《{source.title}》</small><em>{resource.purpose}</em><i>↗</i></a>)}</div></>
}

function originTabLabel(node:Node){
  if(node.type==='person')return '生平与贡献'
  if(node.type==='method')return '源流与代表'
  return '起源与人物'
}

function OriginPeople({node}:{node:Node}){
  const relations=[...publicRelations('academic'),...publicRelations('comparison')].filter(relation=>relation.source_id===node.id||relation.target_id===node.id)
  const related=relations.map(relation=>{
    const outgoing=relation.source_id===node.id
    const target=nodes.find(candidate=>candidate.id===(outgoing?relation.target_id:relation.source_id))
    return target?{target,relation,outgoing}:null
  }).filter((entry):entry is NonNullable<typeof entry>=>Boolean(entry))
  const people=related.filter(entry=>entry.target.type==='person')
  const label=originTabLabel(node)
  return <section className="origin-panel"><div className="section-kicker">{label}</div><h2>{label}</h2>{node.type==='person'?<div className="person-origin"><Portrait node={node}/><div><TypeModule node={node}/>{related.length>0&&<div className="people-grid related-work">{related.map(({target,relation,outgoing})=><Link to={`/nodes/${target.slug}`} key={relation.id}><span>{relationLabel(relation.relation_type,outgoing)}</span><b>{target.name_zh}</b><small>{relation.evidence_status==='direct'?'文献中明确写到':'本站据此整理'}</small><i>↗</i></Link>)}</div>}</div></div>:<>{people.length>0&&<><h3 className="origin-subtitle">有出处的人物关系</h3><div className="people-grid">{people.map(({target,relation,outgoing})=><Link to={`/nodes/${target.slug}`} key={relation.id}><span>{relationLabel(relation.relation_type,outgoing)}</span><b>{target.name_zh}</b><small>{relation.evidence_status==='direct'?'文献中明确写到':'本站据此整理'}</small><i>↗</i></Link>)}</div></>}<h3 className="origin-subtitle">代表作者与来源</h3><SourceAuthorCards node={node}/></>}</section>
}

function Dates({node}:{node:Node}){
  const overdue=node.next_review_due&&new Date(node.next_review_due)<new Date()
  const candidate=node.record_level==='candidate'
  return <section className="temporal-status" aria-label="动态议题证据范围"><div className="dates"><span>{candidate?'资料范围截至':'内容截至'}：{node.as_of??'尚未记录'}</span><span>{candidate?'来源线索检查':'出处核对'}：{node.last_evidence_check??'尚未记录'}</span><span>{candidate?'下次线索复查':'下次核对'}：{node.next_review_due??'尚未记录'} {overdue&&<b>需要重查</b>}</span></div>{node.current_evidence_state&&<p className="current-evidence-state"><b>当前证据边界</b><span>{node.current_evidence_state}</span></p>}</section>
}

function SourceList({ids,anchor=false}:{ids:string[];anchor?:boolean}){
  return <div className="source-list">{[...new Set(ids)].map(id=>{
    const source=sourceById.get(id)
    return source?<details key={id} id={anchor?`source-${id}`:undefined}><summary>{source.authors_or_organization.join('、')}（{source.year??'年份未载'}）《{source.title}》</summary><p>{source.publisher_or_venue} · {accessLabel[source.access_status]} · 访问：{source.accessed_at}</p><p className="source-caveat">可读范围不代表主张已获支持。</p><a href={source.url} target="_blank" rel="noreferrer">打开来源 ↗</a></details>:null
  })}</div>
}

function CandidateBody({node}:{node:Node}){
  return <><section className="candidate-body"><p className="eyebrow">该入口目前只提供范围与学习线索</p><h2>资料正在整理</h2><p>{node.candidate_note}</p>{node.candidate_evidence_status==='pending'&&<p className="pending-inline">相关证据尚待核对，暂不作为已确认结论展示。</p>}</section><section><h2>来源线索</h2>{node.source_leads?.length?<SourceList ids={node.source_leads} anchor/>:<p>尚未整理。</p>}</section></>
}

function Resources({node}:{node:Node}){
  const ids=[...(node.learning_resources??[]).map(resource=>resource.source_id),...allClaims(node).flatMap(claim=>claim.evidence.map(evidence=>evidence.source_id))]
  return <section id="resources"><h2>学习材料与来源</h2>{node.learning_resources?.length?<div className="resource-list">{node.learning_resources.map((resource,index)=><article key={index}><span>{resource.level==='introductory'?'入门':resource.level==='intermediate'?'进阶':'深入'}</span><h3>{resource.title}</h3><p>{resource.purpose}</p>{resource.locator&&<small>{resource.locator}</small>}<SourceList ids={[resource.source_id]}/></article>)}</div>:<p>尚未整理学习材料。</p>}<details className="all-sources"><summary>全部引用来源（{new Set(ids).size}）</summary><SourceList ids={ids} anchor/></details></section>
}

function Learning({node}:{node:Node}){
  const links=learningLinks(node)
  return <section id="learning"><h2>下一步学习</h2>{links.length?<div className="learning-links">{['before','after','compare'].map(key=>{
    const group=links.filter(link=>(link.sequence_hint??'after')===key)
    return group.length?<div key={key}><h3>{key==='before'?'先读':key==='after'?'接着看':'对照阅读'}</h3>{group.map(link=><Link key={link.target.id} to={`/nodes/${link.target.slug}`}><span><b>{link.target.name_zh}</b></span><small>{link.reason}</small>→</Link>)}</div>:null
  })}</div>:<p>尚未整理下一步学习材料。<Link to={`/areas/${node.area_memberships.find(membership=>membership.is_primary)?.area_id}`}>回到区域目录</Link></p>}</section>
}

type NodeTab='overview'|'origins'|'key'|'debate'|'learn'

function tabsFor(node:Node):[NodeTab,string][]{
  return [['overview','概览'],['origins',originTabLabel(node)],['key',node.type==='person'?'核心贡献':'核心命题'],['debate','争议与边界'],['learn','延伸学习']]
}

export function NodePage(){
  const {slug}=useParams()
  const [params,setParams]=useSearchParams()
  const node=slug?nodes.find(candidate=>candidate.slug===slug):undefined
  if(!node)return <NotFound/>
  const tabs=tabsFor(node)
  const requested=params.get('section')
  const active:NodeTab=tabs.some(([id])=>id===requested)?requested as NodeTab:'overview'
  const claims=allClaims(node)
  const pending=claims.filter(claim=>claim.evidence_status==='pending')
  const visible=claims.filter(claim=>claim.evidence_status!=='pending')
  const debates=[...(node.limits_or_debates??[]),...(node.positions??[])].filter(claim=>claim.evidence_status!=='pending')
  const personTier=node.type==='person'?personTierLabel(node):null
  function switchTab(tab:NodeTab){const next=new URLSearchParams(params);next.set('section',tab);setParams(next,{replace:true})}
  return <Page title={node.name_zh} visuallyHiddenTitle>
    <article className={`node-shell type-${node.type}`}>
      <header className="node-identity">
        <div className="node-seal" aria-hidden="true"><span>{node.name_zh.slice(0,1)}</span></div>
        <div><div className="card-meta"><span className="type-chip">{typeNames[node.type]}</span>{personTier&&<span className={`person-tier ${personTier==='核心人物'?'core':'extended'}`}>{personTier}</span>}<Status node={node}/></div><h2 className={`node-main-title ${node.name_zh.length>11?'long-title':''}`}>{node.name_zh}</h2>{node.name_original&&<p className="original">{node.name_original}</p>}<ThemeChips node={node}/></div>
        <div className="node-actions"><Link className="relation-shortcut" to={`/nodes/${node.slug}/relations`}>关系网络 <span>↗</span></Link><Link className="feedback-shortcut" to={`/feedback?from=${encodeURIComponent(`/nodes/${node.slug}`)}&topic=${encodeURIComponent(node.name_zh)}`}>反馈这个知识点 <span>↗</span></Link></div>
      </header>
      {node.naming_boundary&&<p className="boundary"><b>命名边界：</b>{node.naming_boundary}</p>}
      {node.temporal_profile==='evolving'&&<Dates node={node}/>} 
      <nav className="node-tabs" aria-label="知识点章节" role="tablist">{tabs.map(([id,label],index)=><button type="button" key={id} role="tab" aria-selected={active===id} className={active===id?'active':''} onClick={()=>switchTab(id)}><span>0{index+1}</span>{label}</button>)}</nav>
      <div className="node-tab-panel" role="tabpanel">
        {active==='overview'&&(node.record_level==='candidate'?<CandidateBody node={node}/>:<div className="overview-grid"><section className="lead-statement"><span>一句话理解</span><h2>{node.summary}</h2></section><section><div className="section-kicker">学习价值</div><h2>为什么值得学</h2><p>{node.why_it_matters}</p></section></div>)}
        {active==='origins'&&<OriginPeople node={node}/>} 
        {active==='key'&&(node.record_level==='candidate'?<div className="quiet-empty"><span>⌁</span><p>核心命题仍待逐项核对，暂不把尚未确认的描述展示成结论。</p></div>:<><section className="key-intro"><div className="section-kicker">{node.type==='person'?'主要贡献':'理论要点'}</div><h2>{node.type==='person'?'核心贡献':'核心命题'}</h2></section><TheoryDiagram node={node}/><div className="claims-grid">{visible.filter(claim=>node.key_points?.some(point=>point.id===claim.id)).map((claim,index)=><div className="numbered-claim" key={claim.id}><span>{String(index+1).padStart(2,'0')}</span><Evidence claim={claim}/></div>)}</div>{node.type!=='person'&&<TypeModule node={node}/>}</>)}
        {active==='debate'&&<><section className="key-intro"><div className="section-kicker">限制条件</div><h2>争议与边界</h2></section>{node.record_level==='candidate'?<p>该知识点的争议边界仍待整理。</p>:<>{debates.map(claim=><Evidence claim={claim} key={claim.id}/>)}{!debates.length&&<p>{pending.length?'相关内容仍在待核区，尚未作为结论公开。':'尚未整理。'}</p>}{pending.length>0&&<details id="pending" className="pending"><summary>尚待核对的内容（{pending.length}）</summary>{pending.map(claim=><Evidence claim={claim} key={claim.id}/>)}</details>}</>}</>}
        {active==='learn'&&<div className="learn-grid">{node.record_level==='candidate'?<section><h2>来源线索</h2>{node.source_leads?.length?<SourceList ids={node.source_leads} anchor/>:<p>尚未整理。</p>}</section>:<Resources node={node}/>}<section className="relation-callout"><span>关系网络</span><h2>把它放回学科坐标</h2><p>先看推荐阅读，再查看文献中明确说明的关联与具体出处。</p><Link to={`/nodes/${node.slug}/relations`}>打开关系网络 →</Link></section>{node.record_level==='complete'&&<Learning node={node}/>}</div>}
      </div>
    </article>
  </Page>
}

export default NodePage
