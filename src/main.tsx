import { StrictMode, Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { areas, nodes } from './data'
import { assetUrl } from './assets'
import { allClaims, areaById, learningLinks, nodeBySlug, nodesInArea, personTierLabel, primaryArea, searchNodes, sortNodesByType, statusLabel } from './selectors'
import type { Claim, Node, Relation, Source } from './types'
import { RouteLoading } from './ui'
import './style.css'
import './relations.css'
import './experience-fixes.css'
import './refinement.css'

const LazyNodePage=lazy(()=>import('./node-page'))
const LazyRelations=lazy(()=>import('./relationship-page'))
const LazyAbout=lazy(()=>import('./info-pages').then(module=>({default:module.About})))
const LazyFeedback=lazy(()=>import('./info-pages').then(module=>({default:module.Feedback})))

// Compatibility placeholders for the retired inline detail pages below. Active
// evidence views are lazy-loaded and use evidence-selectors directly.
const sourceById=new globalThis.Map<string,Source>()
const publicRelations=(layer:'academic'|'comparison'):Relation[]=>{void layer;return []}
const accessLabel:Record<string,string>={}

const typeNames:Record<string,string>={tradition:'思想传统',person:'人物',theory_model:'理论／模型',concept:'核心概念',research_topic:'研究主题',method:'研究方法',application:'应用领域'}
const relationNames:Record<string,[string,string]>={
  proposed:['提出','由其提出'],developed:['发展','由其发展'],addresses:['用于分析','被用于分析'],used_in:['应用于','使用该方法'],associated_with:['相互关联','相互关联'],contrasts_with:['形成对照','形成对照'],has_concept:['包含概念','属于该传统']
}
function relationLabel(relationType:string,isOutgoing:boolean){const labels=relationNames[relationType]??[relationType,relationType];return labels[isOutgoing?0:1]}
const starter:Record<string,string>={communication:'r1-process',meaning:'r2-encoding-decoding',media_society:'r3-medium-theory',effects:'r4-agenda-setting',institutions:'r5-gatekeeping',power_culture:'r6-decolonial',digital_ai:'r7-platform-governance',research_application:'r8-content-analysis'}
const guideDefs={
  'process-to-reception':{name:'从传播过程到受众研究',intro:'沿着“过程—意义—受众”的教学顺序，辨认同一传播事件可以怎样被拆开理解。',steps:['r1-process','r2-encoding-decoding','r4-audience']},
  'journalism-history':{name:'从新闻观进入新闻史',intro:'以新闻观为入口，读到中国新闻传播史与人物研究的不同问题。',steps:['r5-marxist-journalism','r5-china-history','p-fang']}
}
function useTitle(title:string){useEffect(()=>{document.title=`${title} · COMMPASS｜传播学指南针 Beta`},[title])}
type Crumb={label:string;to?:string}
function Breadcrumbs({items}:{items:Crumb[]}){return <nav className="breadcrumbs" aria-label="面包屑路径"><ol>{items.map((item,i)=><li key={`${item.label}-${i}`}>{item.to?<Link to={item.to}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>}
function useAutoBreadcrumbs(title:string):Crumb[]{const {pathname}=useLocation();const parts=pathname.split('/').filter(Boolean);if(!parts.length)return[];if(parts[0]==='areas'){const a=areaById.get(parts[1]);return[{label:'首页',to:'/'},{label:'主题导览',to:'/guides'},{label:a?.title??title}]}if(parts[0]==='guides'&&parts[1])return[{label:'首页',to:'/'},{label:'主题导览',to:'/guides'},{label:title}];if(parts[0]==='nodes'){const n=nodeBySlug.get(parts[1]);const a=n?areaById.get(primaryArea(n)??''):undefined;return[{label:'首页',to:'/'},{label:'主题导览',to:'/guides'},...(a?[{label:a.title,to:`/areas/${a.id}`}]:[]),...(parts[2]?[{label:n?.name_zh??'知识条目',to:`/nodes/${parts[1]}`},{label:'关系探索'}]:[{label:n?.name_zh??title}])]}const labels:Record<string,string>={map:'学科图谱',guides:'主题导览',paths:'推荐阅读',search:'知识搜索',about:'关于本站'};return[{label:'首页',to:'/'},{label:labels[parts[0]]??title}]}
function Page({title,children,breadcrumbs=[]}:{title:string;children:React.ReactNode;breadcrumbs?:Crumb[]}){useTitle(title); useEffect(()=>document.getElementById('page-title')?.focus(),[title]);const automatic=useAutoBreadcrumbs(title);const trail=breadcrumbs.length?breadcrumbs:automatic;return <main id="main" className="page"><div className="page-ornament" aria-hidden="true">⌁</div>{trail.length>0&&<Breadcrumbs items={trail}/>}<div className="eyebrow">COMMPASS / 传播学指南针 · BETA</div><h1 id="page-title" className={title.length>12?'long-title':''} tabIndex={-1}>{title}</h1>{children}</main>}
function RouteEffects(){const {pathname,hash}=useLocation();useEffect(()=>{if(!hash)return;requestAnimationFrame(()=>{const target=document.getElementById(decodeURIComponent(hash.slice(1)));if(!target)return;let current:HTMLElement|null=target;while(current){if(current instanceof HTMLDetailsElement)current.open=true;current=current.parentElement}target.scrollIntoView({block:'start'})})},[pathname,hash]);return null}
function TabAccessibility(){const {pathname,search}=useLocation();useEffect(()=>{const tabs=Array.from(document.querySelectorAll<HTMLButtonElement>('.node-tabs [role="tab"]'));const panel=document.querySelector<HTMLElement>('.node-tab-panel[role="tabpanel"]');if(!tabs.length||!panel)return;const base=`${pathname.replace(/[^a-z0-9]+/gi,'-')}-node-tab`;const activeIndex=Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'));panel.id=`${base}-panel`;panel.setAttribute('aria-labelledby',`${base}-${activeIndex}`);tabs.forEach((tab,index)=>{tab.id=`${base}-${index}`;tab.setAttribute('aria-controls',panel.id);tab.tabIndex=index===activeIndex?0:-1});const handleKeydown=(event:KeyboardEvent)=>{const current=tabs.indexOf(event.currentTarget as HTMLButtonElement);if(current<0)return;let next=current;if(event.key==='ArrowRight')next=(current+1)%tabs.length;else if(event.key==='ArrowLeft')next=(current-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].click();tabs[next].focus()};tabs.forEach(tab=>tab.addEventListener('keydown',handleKeydown));return()=>tabs.forEach(tab=>tab.removeEventListener('keydown',handleKeydown))},[pathname,search]);return null}
function App(){return <><a className="skip" href="#main">跳到正文</a><Header/><DesktopRail/><RouteEffects/><TabAccessibility/><Suspense fallback={<RouteLoading/>}><Routes><Route path="/" element={<Home/>}/><Route path="/map" element={<Map/>}/><Route path="/guides" element={<Guides/>}/><Route path="/guides/:guideId" element={<Guide/>}/><Route path="/paths" element={<PathAtlas/>}/><Route path="/areas/:areaId" element={<AreaPage/>}/><Route path="/nodes/:slug" element={<LazyNodePage/>}/><Route path="/nodes/:slug/relations" element={<LazyRelations/>}/><Route path="/search" element={<Search/>}/><Route path="/about" element={<LazyAbout/>}/><Route path="/feedback" element={<LazyFeedback/>}/><Route path="*" element={<NotFound/>}/></Routes></Suspense><Footer/></>}
type Theme='dark'|'light'
function Header(){const nav=useNavigate(), [q,setQ]=useState('');const [theme,setTheme]=useState<Theme>(()=>{try{const stored=localStorage.getItem('commpass-theme');if(stored==='dark'||stored==='light')return stored}catch{/* storage may be unavailable */}return typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'});useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;try{localStorage.setItem('commpass-theme',theme)}catch{/* storage may be unavailable */}},[theme]); useEffect(()=>{const f=(e:KeyboardEvent)=>{if(e.key==='/'&&!(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)){e.preventDefault();document.getElementById('site-search')?.focus()}};addEventListener('keydown',f);return()=>removeEventListener('keydown',f)},[]); return <><header className="site-header"><Link className="brand" to="/"><span className="brand-mark">✧</span><span>COMMPASS</span><i>｜</i><b>传播学指南针</b><em className="beta-badge">BETA</em></Link><p className="brand-line">理解传播 · 连接世界 · 指向未来</p><form className="global-search" onSubmit={e=>{e.preventDefault();nav(`/search?q=${encodeURIComponent(q)}`)}}><label className="sr-only" htmlFor="site-search">搜索理论、人物、概念或问题</label><input id="site-search" value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索理论、人物、概念或问题"/><button aria-label="提交搜索">⌕</button></form><button className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={`切换到${theme==='dark'?'浅色':'深色'}背景`} title={`切换到${theme==='dark'?'浅色':'深色'}背景`}><span aria-hidden="true">{theme==='dark'?'☼':'◐'}</span><b>{theme==='dark'?'浅色':'深色'}</b></button></header><nav className="mobile-nav" aria-label="移动端主导航"><NavLink to="/map">学科图谱</NavLink><NavLink to="/guides">主题导览</NavLink><NavLink to="/about">关于本站</NavLink></nav></>}
function DesktopRail(){return <aside className="desktop-rail"><nav aria-label="主导航"><NavLink to="/map"><span aria-hidden="true">✧</span><b>学科全景</b><small>MAP</small></NavLink><NavLink to="/guides"><span aria-hidden="true">◇</span><b>主题导览</b><small>GUIDES</small></NavLink><NavLink to="/search"><span aria-hidden="true">⌕</span><b>知识搜索</b><small>SEARCH</small></NavLink><NavLink to="/about"><span aria-hidden="true">○</span><b>关于本站</b><small>ABOUT</small></NavLink></nav><p>以知识为坐标<br/>看见更大的传播世界</p></aside>}
function Footer(){return <footer>八个问题是本站的教学导航，不是僵硬分类。内容状态与来源范围始终随知识点可见。<Link to="/about#evidence-status">查看证据状态</Link><Link to="/feedback">反馈与纠错</Link></footer>}
function Status({node}:{node:Node}){const reviewed=node.reviewed_at&&['reviewed','published'].includes(node.review_status);return <span className={`status ${node.record_level}`}>{statusLabel(node)}{reviewed&&` · ${node.reviewed_at}`}</span>}
function AreaTag({id}:{id:string}){const a=areaById.get(id);return a?<span className="area-tag" style={{'--a':a.color} as React.CSSProperties}><i aria-hidden="true"/>{a.short_title}</span>:null}
function ThemeChips({node}:{node:Node}){return <div className="theme-chips" aria-label="涉及主题">{node.area_memberships.map(m=><AreaTag key={m.area_id} id={m.area_id}/>)}</div>}
function NodeCard({node,preview=false}:{node:Node;preview?:boolean}){const qualifiedAliases=node.aliases.filter(a=>a.note);return <Link className={`node-card type-${node.type}`} to={`/nodes/${node.slug}`}><div className="card-meta"><span className="type-chip">{typeNames[node.type]}</span>{node.type==='person'&&<span className={`person-tier ${personTierLabel(node)==='核心人物'?'core':'extended'}`}>{personTierLabel(node)}</span>}</div><h3>{node.name_zh}</h3>{node.name_original&&<p className="original">{node.name_original}</p>}{qualifiedAliases.map(a=><p className="alias-note" key={a.name}><b>别名“{a.name}”：</b>{a.note}</p>)}{preview&&node.summary&&<p>{node.summary}</p>}<span className="card-arrow" aria-hidden="true">↗</span></Link>}
function ChoiceBar({label,value,options,onChange}:{label:string;value:string;options:{value:string;label:string}[];onChange:(value:string)=>void}){return <div className="choice-group"><span>{label}</span><div role="group" aria-label={label}>{options.map(option=><button key={option.value} className={value===option.value?'active':''} aria-pressed={value===option.value} onClick={()=>onChange(option.value)}>{option.label}</button>)}</div></div>}
function Home(){useTitle('首页');useEffect(()=>document.getElementById('home-title')?.focus(),[]);const [params]=useSearchParams(), requested=params.get('area'), [selected,setSelected]=useState(requested&&areaById.has(requested)?requested:areas[0].id); const a=areaById.get(selected); const s=a?nodes.find(n=>n.id===starter[a.id]):undefined; return <main id="main" className="home"><section className="hero"><div className="hero-copy"><p className="kicker">一张可探索的学科地图</p><h1 id="home-title" tabIndex={-1}>从一个问题，<em>找到传播学的位置</em></h1><p>不是巨型百科图。先认出问题，再进入理论、人物、方法与正在演变的议题。</p><div className="entry-links"><Link to="/map">进入学科图谱 <b>→</b></Link><Link to="/guides">按学习顺序开始 <b>→</b></Link></div></div><Compass selected={selected} setSelected={setSelected}/>{a&&<aside className="focus-panel" aria-live="polite"><span className="focus-number">{a.number}</span><p className="color-label" style={{color:a.color}}>{a.short_title}</p><h2>{a.question}</h2><p>{a.intro}</p><p className="count">此处有 {nodesInArea(a.id).length} 个主要入口</p>{s&&<div className="start"><small>建议从这里读起 · {typeNames[s.type]}</small><strong>{s.name_zh}</strong><Link to={`/nodes/${s.slug}`}>阅读这个起点 →</Link></div>}<div className="focus-actions"><Link to={`/areas/${a.id}`}>浏览本区目录</Link><Link to={`/map?area=${a.id}`}>在图谱中展开</Link></div></aside>}</section><section className="text-directory"><div><p className="eyebrow">八个问题，八个入口</p><h2>不必先学会读指南针</h2></div><div className="directory-grid">{areas.map(a=><Link key={a.id} to={`/areas/${a.id}`}><span style={{color:a.color}}>{a.number}</span><strong>{a.title}</strong><small>{a.question}</small></Link>)}</div></section></main>}
function polarPoint(radius:number,angle:number){const radians=(angle-90)*Math.PI/180;return [200+radius*Math.cos(radians),200+radius*Math.sin(radians)]}
function annularSector(index:number){const start=index*45-21.5,end=index*45+21.5;const [a,b]=polarPoint(190,start),[c,d]=polarPoint(190,end),[e,f]=polarPoint(82,end),[g,h]=polarPoint(82,start);return `M ${a} ${b} A 190 190 0 0 1 ${c} ${d} L ${e} ${f} A 82 82 0 0 0 ${g} ${h} Z`}
function Compass({selected,setSelected}:{selected:string;setSelected:(id:string)=>void}){
  return <div className="compass-wrap"><p className="compass-caption">选择一个问题，打开所在区域</p><div className="compass"><svg viewBox="0 0 400 400" role="group" aria-label="八个传播学问题区域"><circle className="compass-rim" cx="200" cy="200" r="198"/><circle className="compass-ticks" cx="200" cy="200" r="194"/>{areas.map((a,i)=>{const [tx,ty]=polarPoint(137,i*45);const constellation=[-12,0,13].map((offset,j)=>polarPoint(112+j*20,i*45+offset));return <g key={a.id} className={`compass-sector ${selected===a.id?'selected':''}`} style={{'--sector':a.color} as React.CSSProperties} role="button" tabIndex={0} aria-pressed={selected===a.id} aria-label={`${a.number} ${a.question}`} onClick={()=>setSelected(a.id)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelected(a.id)}}}><path d={annularSector(i)}/><polyline points={constellation.map(p=>p.join(',')).join(' ')}/>{constellation.map(([x,y],j)=><circle key={j} cx={x} cy={y} r={j===1?4.5:2.8}/>)}<text x={tx} y={ty-5} textAnchor="middle"><tspan>{a.number}</tspan><tspan x={tx} dy="17">{a.short_title}</tspan></text></g>})}<g className="compass-rose" aria-hidden="true"><circle cx="200" cy="200" r="72"/><circle cx="200" cy="200" r="49"/><path d="M200 126 211 189 274 200 211 211 200 274 189 211 126 200 189 189Z"/><path d="M200 153 207 193 247 200 207 207 200 247 193 207 153 200 193 193Z"/><circle cx="200" cy="200" r="8"/><text x="200" y="111">N</text><text x="200" y="299">S</text><text x="101" y="204">W</text><text x="299" y="204">E</text></g></svg><div className="compass-center-copy" aria-hidden="true"><b>传播学</b><span>问题指南针</span></div></div><p className="compass-note">方位与距离用于导航，不表示学术重要性或理论接近。</p><div className="compass-legend" aria-label="移动端问题区域快捷选择">{areas.map(a=><button key={a.id} className={selected===a.id?'selected':''} style={{'--sector':a.color} as React.CSSProperties} onClick={()=>setSelected(a.id)} aria-pressed={selected===a.id}><span>{a.number}</span>{a.short_title}</button>)}</div></div>
}
function atlasPoint(index:number,count:number){
  if(count<=10){const angle=(-90+index*(360/count))*Math.PI/180;return [50+Math.cos(angle)*38,50+Math.sin(angle)*38]}
  const first=Math.ceil(count*(count<=18?.45:.24))
  const second=count<=18?count-first:Math.ceil(count*.33)
  const ringSizes=count<=18?[first,second]:[first,second,count-first-second]
  let ring=0,slot=index
  while(slot>=ringSizes[ring]){slot-=ringSizes[ring];ring+=1}
  const radii=ringSizes.length===2?[29,43]:[22,34,46]
  const angle=(-90+slot*(360/ringSizes[ring])+ring*11)*Math.PI/180
  const radius=radii[ring]
  return [50+Math.cos(angle)*radius,50+Math.sin(angle)*radius]
}
function Map(){
  const [params,setParams]=useSearchParams()
  useEffect(()=>{if(!params.has('density'))return;const next=new URLSearchParams(params);next.delete('density');setParams(next,{replace:true})},[params,setParams])
  const valid=areas.some(a=>a.id===params.get('area'))
  const areaId=valid?params.get('area')!:areas[0].id
  const scope=params.get('scope')==='cross'||params.get('scope')==='all'?'cross':'primary'
  const list=sortNodesByType(nodesInArea(areaId,scope))
  const focus=list.find(n=>n.id===params.get('focus'))
  const a=areaById.get(areaId)!
  function change(k:string,v:string){const x=new URLSearchParams(params);x.set(k,v);if(k==='area'||k==='scope')x.delete('focus');setParams(x)}
  const visible=list
  return <Page title="学科图谱"><div className="map-intro"><div><p className="eyebrow">DISCIPLINE ATLAS / 学科坐标</p><p className="lede">先选一片问题域，再聚焦其中一个知识点。位置用于教学导航，不代表学术地位。</p><p className="scope-help">“问题域主要知识点”显示以本问题域为主的内容；“相关跨域知识点”只显示以其他问题域为主、但也与本区相关的内容。</p></div><div className="map-mode"><ChoiceBar label="范围" value={scope} options={[{value:'primary',label:'问题域主要知识点'},{value:'cross',label:'相关跨域知识点'}]} onChange={v=>change('scope',v)}/></div></div><div className="atlas-layout"><nav className="atlas-areas" aria-label="八个问题区域">{areas.map(x=><button key={x.id} className={areaId===x.id?'active':''} style={{'--area':x.color} as React.CSSProperties} onClick={()=>change('area',x.id)} aria-pressed={areaId===x.id}><span>{x.number}</span><b>{x.short_title}</b><small>{nodesInArea(x.id).length}</small></button>)}</nav><section className="atlas-stage" style={{'--map-color':a.color} as React.CSSProperties}><header><span>{a.number}</span><div><p>{a.short_title}</p><h2>{a.question}</h2></div><small>{list.length} 个知识点</small></header><div className="atlas-orbit density-all"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{visible.map((n,i)=>{const [x,y]=atlasPoint(i,visible.length);return <line key={n.id} x1="50" y1="50" x2={x} y2={y}/>})}</svg><div className="atlas-core"><i>✦</i><b>{a.short_title}</b><span>选择知识点</span></div>{visible.map((n,i)=>{const [x,y]=atlasPoint(i,visible.length);return <button key={n.id} className={`atlas-node type-${n.type} ${focus?.id===n.id?'selected':''}`} style={{left:`${x}%`,top:`${y}%`}} aria-pressed={focus?.id===n.id} onClick={()=>change('focus',n.id)}><i aria-hidden="true"/><span>{typeNames[n.type]}</span><b>{n.name_zh}</b></button>})}</div><footer className="atlas-caption"><span>01</span> 选择问题域 <i/> <span>02</span> 选择知识范围 <i/> <span>03</span> 聚焦并阅读</footer></section><aside className="atlas-focus">{focus?<><div className="focus-index">FOCUS / {String(visible.findIndex(n=>n.id===focus.id)+1).padStart(2,'0')}</div><span className={`focus-type type-${focus.type}`}>{typeNames[focus.type]}</span><h2 className={focus.name_zh.length>10?'long-title':''}>{focus.name_zh}</h2>{focus.name_original&&<p className="original">{focus.name_original}</p>}<ThemeChips node={focus}/><p className="focus-summary">{focus.record_level==='complete'?focus.summary:'该知识点的资料仍在整理中。'}</p><Link className="primary-action" to={`/nodes/${focus.slug}`}>打开知识点 <span>→</span></Link><div className="focus-relations"><Link className="quiet-action" to={`/nodes/${focus.slug}/relations`}>看推荐阅读</Link><Link className="quiet-action" to={`/nodes/${focus.slug}/relations?layer=evidence`}>看有出处的关联</Link></div></>:<><div className="focus-index">当前问题域</div><span className="focus-compass">✦</span><h2>{a.short_title}</h2><p>{scope==='primary'?'本问题域的主要知识点':'与本问题域相关、但以其他问题域为主的跨域知识点'}共 {list.length} 个，图中已全部显示。</p><Link className="quiet-action" to={`/areas/${areaId}?scope=${scope}`}>在目录中查看这 {list.length} 个知识点</Link></>}</aside></div><section className="mobile-list" aria-label="当前范围知识点列表"><h2>{a.short_title} · 当前范围全部知识点</h2>{list.map(n=><NodeCard key={n.id} node={n}/>)}</section></Page>
}
function Guides(){const [params,setParams]=useSearchParams();const selected=params.get('area')??''; const shown=selected?areas.filter(a=>a.id===selected):areas; const pathCount=nodes.reduce((sum,n)=>sum+(n.learning_links?.length??0),0); return <Page title="主题导览"><section className="guide-hero"><p className="eyebrow">EIGHT QUESTIONS / 八个方向</p><h2>先找到你关心的问题，<br/><em>再进入知识。</em></h2><p>短名称与首页指南针保持一致；每张卡片本身就是入口。</p></section><ChoiceBar label="快速定位" value={selected} options={[{value:'',label:'全部'},...areas.map(a=>({value:a.id,label:a.short_title}))]} onChange={v=>setParams(v?{area:v}:{})}/><div className="guide-area-grid">{shown.map(a=><Link key={a.id} to={`/areas/${a.id}`} style={{'--area':a.color} as React.CSSProperties}><span>{a.number}</span><h2>{a.short_title}</h2><i aria-hidden="true">↗</i></Link>)}</div><section className="learning-paths"><header><p className="eyebrow">CURATED ROUTES / 推荐阅读</p><h2>如果你不知道从哪里开始</h2><Link className="all-paths-link" to="/paths">查看全部 {pathCount} 条阅读建议 →</Link></header>{Object.entries(guideDefs).map(([id,g],index)=><Link key={id} to={`/guides/${id}`}><span>PATH / 0{index+1}</span><h3>{g.name}</h3><div>{g.steps.map((x,i)=><b key={x}>{nodes.find(n=>n.id===x)?.name_zh}{i<g.steps.length-1&&<i>→</i>}</b>)}</div><em>开始导览 ↗</em></Link>)}</section></Page>}

function PathAtlas(){const [params,setParams]=useSearchParams();const requested=params.get('area');const areaId=requested&&areaById.has(requested)?requested:areas[0].id;const area=areaById.get(areaId)!;const starts=nodesInArea(areaId).map(source=>({source,links:learningLinks(source)})).filter(group=>group.links.length);const count=starts.reduce((sum,group)=>sum+group.links.length,0);return <Page title="推荐阅读"><section className="path-atlas-intro" style={{'--area':area.color} as React.CSSProperties}><div><p className="eyebrow">REASONED LINKS / 带理由的导航</p><h2>每条推荐都能回答“为什么接着读”。</h2><p>这些是本站编排的阅读建议，不自动等于历史影响、因果关系或学术共识。</p></div><strong>{count}<small>本区可点击建议</small></strong></section><ChoiceBar label="问题域" value={areaId} options={areas.map(a=>({value:a.id,label:a.short_title}))} onChange={value=>setParams({area:value})}/><div className="path-groups">{starts.map(({source,links})=><section key={source.id}><header><Link to={`/nodes/${source.slug}`}><span>{typeNames[source.type]}</span><h2>{source.name_zh}</h2><i>打开起点 ↗</i></Link></header><div>{links.map(({target,reason,sequence_hint})=><Link key={`${source.id}-${target.id}-${sequence_hint}`} to={`/nodes/${target.slug}`}><span>{sequence_hint==='before'?'建议先读':sequence_hint==='compare'?'建议对照':'建议接着读'}</span><b>{target.name_zh}</b><p>{reason}</p><i aria-hidden="true">→</i></Link>)}</div></section>)}</div></Page>}
function AreaPage(){const {areaId}=useParams(); const [params,setParams]=useSearchParams(); const area=areaId?areaById.get(areaId):undefined; if(!area)return <NotFound/>; const scope=params.get('scope')==='cross'||params.get('scope')==='all'?'cross':'primary';const type=params.get('type')??''; const result=nodesInArea(area.id,scope).filter(n=>!type||n.type===type); function set(k:string,v:string){const p=new URLSearchParams(params);v?p.set(k,v):p.delete(k);setParams(p)} const groups=Object.entries(typeNames).map(([id,label])=>({id,label,items:result.filter(n=>n.type===id)})).filter(g=>g.items.length); return <Page title={area.short_title}><section className="area-intro" style={{'--area':area.color} as React.CSSProperties}><span>{area.number}</span><div><p>主题问题</p><h2>{area.question}</h2><small>{area.intro}</small></div></section><div className="directory-controls"><ChoiceBar label="范围" value={scope} options={[{value:'primary',label:'问题域主要知识点'},{value:'cross',label:'相关跨域知识点'}]} onChange={v=>set('scope',v)}/><ChoiceBar label="类型" value={type} options={[{value:'',label:'全部'},...Object.entries(typeNames).map(([value,label])=>({value,label}))]} onChange={v=>set('type',v)}/><span className="result-count" aria-live="polite">{result.length} 个知识点</span></div>{!result.length?<Empty text="当前筛选没有知识点。" action="清除筛选" onClick={()=>setParams({scope})}/>:<div className="node-groups">{groups.map(group=><section className={`node-group type-${group.id}`} key={group.id}><header><span>{String(Object.keys(typeNames).indexOf(group.id)+1).padStart(2,'0')}</span><h2>{group.label}</h2><small>{group.items.length}</small></header><div className="node-list">{group.items.map(n=><NodeCard key={n.id} node={n}/>)}</div></section>)}</div>}</Page>}
function Evidence({claim}:{claim:Claim}){const label=claim.evidence_status==='direct'?'文献中明确写到':claim.evidence_status==='interpretive'?'本站据此整理':'尚待核对';return <article id={`claim-${claim.id}`} className={`claim ${claim.evidence_status}`}><div><span className="evidence-label">{label}</span><p>{claim.statement}</p></div>{claim.evidence_status!=='pending'&&<details open={claim.evidence_status==='interpretive'}><summary>{claim.evidence_status==='interpretive'?'查看整理依据（可收起）':'查看出处'}</summary>{claim.evidence.map((e,i)=><SourceDetail key={i} evidence={e}/>)}</details>}</article>}
function SourceDetail({evidence}:{evidence:{source_id:string;locator:string;support_note:string;support_role:string}}){const s=sourceById.get(evidence.source_id);return <div className="source-detail"><strong>{s?.authors_or_organization.join('、')}（{s?.year??'年份未载'}）《{s?.title??evidence.source_id}》</strong><span>{accessLabel[s?.access_status??'unavailable']} · 访问：{s?.accessed_at??'尚未记录'} · {evidence.locator}</span><p>{evidence.support_note}</p><small>这里只说明这份资料支持页面中的哪句话，不把它扩大为更多结论。</small>{s?.url&&<a href={s.url} target="_blank" rel="noreferrer">打开来源 ↗</a>}</div>}
function ListField({title,items}:{title:string;items?:string[]}){return items?.length?<section className="type-field"><h3>{title}</h3><ul>{items.map(x=><li key={x}>{x}</li>)}</ul></section>:null}
const personTermZh:Record<string,string>={
  'Agenda-setting researcher':'议程设置研究者','Bell Labs researcher':'贝尔实验室研究员','Communication discipline builder':'传播学科建设者','Communication research pioneer':'传播研究先驱','Cultivation researcher':'涵化研究者','Dean of the Annenberg School for Communication':'安纳伯格传播学院院长','Director of the Centre for Culture and Technology':'文化与技术中心主任','Electrical engineer':'电气工程师','Former journalist':'曾任记者','Information theory founder':'信息论奠基者','Journalism historian':'新闻史学者','Journalism professor':'新闻学教授','Literary scholar':'文学学者','Mathematician':'数学家','Media theorist':'媒介理论家','Philosopher':'哲学家','Policy sciences scholar':'政策科学学者','Political scientist':'政治学者','Professor at UNC-Chapel Hill':'北卡罗来纳大学教堂山分校教授','Public intellectual':'公共知识分子','Social theorist':'社会理论家',
  'Tulane University':'杜兰大学','Stanford University':'斯坦福大学','University of Southern California':'南加州大学','University of Bonn':'波恩大学','Mass communication':'大众传播','Undergraduate study':'本科阶段','Communications and Education':'传播与教育','Philosophy':'哲学','Sociology':'社会学'
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
      return <section className="type-module"><h2>这个人物怎样进入传播学</h2><ListField title="角色" items={node.roles?.map(zhTerm)}/>{node.communication_relevance&&<p>{node.communication_relevance}</p>}{node.education_records?.length?<section className="type-field"><h3>已核教育经历</h3>{node.education_records.map((e,i)=><p key={i}>{zhTerm(e.institution)} · {zhTerm(e.program)} {e.degree??''} {e.period??''}</p>)}</section>:null}</section>
    case'method':
      return <section className="type-module"><h2>这个方法怎样使用</h2><p className="method-notice">资料要求与步骤为编辑性练习安排；具体方法细则仍需结合待核边界阅读。</p><ListField title="适合回答的问题" items={node.suitable_questions}/><ListField title="资料要求" items={node.data_requirements}/><ListField title="典型步骤" items={node.typical_procedure}/>{claimField('方法限制',node.limitations)}</section>
    case'research_topic':
      if(!node.core_questions?.length&&!node.current_evidence_state)return null
      return <section className="type-module"><h2>这个研究主题怎样理解</h2><ListField title="核心问题" items={node.core_questions}/>{node.current_evidence_state&&<p className="boundary"><b>当前证据状态：</b>{node.current_evidence_state}</p>}</section>
    default:return null
  }
}
type NodeTab='overview'|'origins'|'key'|'debate'|'learn'
function originTabLabel(node:Node){if(node.type==='person')return '生平与贡献';if(node.type==='method')return '源流与代表';return '起源与人物'}
function tabsFor(node:Node):[NodeTab,string][]{return [['overview','概览'],['origins',originTabLabel(node)],['key',node.type==='person'?'核心贡献':'核心命题'],['debate','争议与边界'],['learn','延伸学习']]}
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
  'r1-social-presence':{title:'媒介线索与交互实践共同产生“他人在场”',steps:['媒介与社会线索','双方交互与预期','他人／关系的显著感']}
}
function TheoryDiagram({node}:{node:Node}){const diagram=modelDiagrams[node.id];if(node.type!=='theory_model'||!diagram)return null;return <section className="theory-diagram" aria-label={`${node.name_zh}模型示意`}><header><span>模型示意</span><h2>{diagram.title}</h2></header><div className="diagram-flow">{diagram.steps.map((step,index)=><div key={step}><b>{String(index+1).padStart(2,'0')}</b><span>{step}</span>{index<diagram.steps.length-1&&<i aria-hidden="true">→</i>}</div>)}</div>{diagram.branches&&<div className="diagram-branches">{diagram.branches.map(x=><span key={x}>{x}</span>)}</div>}<p>这是教学导航示意，不代替原始文献中的完整理论表述。</p></section>}
function Portrait({node}:{node:Node}){if(!node.portrait)return <div className="portrait-fallback" aria-label="尚无可明确授权的代表照片"><span>{node.name_zh.slice(0,1)}</span><small>待补充授权可确认的照片</small></div>;return <figure className="person-portrait"><img src={assetUrl(node.portrait.url)} alt={node.portrait.alt}/><figcaption>{node.portrait.credit} · {node.portrait.license} · <a href={node.portrait.source_url} target="_blank" rel="noreferrer">来源</a></figcaption></figure>}
function SourceAuthorCards({node}:{node:Node}){const entries=(node.learning_resources??[]).map(resource=>{const source=sourceById.get(resource.source_id);return source?{resource,source}:null}).filter((entry):entry is NonNullable<typeof entry>=>Boolean(entry));if(!entries.length)return <div className="quiet-empty"><span>⌁</span><p>本条目尚未整理出可追溯的代表作者与来源。</p></div>;return <><div className="source-people-note">如果尚未确认人物与这一知识点之间的具体关系，这里只列本条目实际使用的作者或机构。它们是查阅线索，不自动等于“理论提出者”。</div><div className="source-people-grid">{entries.map(({resource,source})=><a key={`${resource.source_id}-${resource.title}`} href={source.url} target="_blank" rel="noreferrer"><span>作者／机构</span><b>{source.authors_or_organization.join('、')}</b><small>《{source.title}》</small><em>{resource.purpose}</em><i>↗</i></a>)}</div></>}
function OriginPeople({node}:{node:Node}){const relations=[...publicRelations('academic'),...publicRelations('comparison')].filter(r=>r.source_id===node.id||r.target_id===node.id);const related=relations.map(r=>{const outgoing=r.source_id===node.id;const target=nodes.find(n=>n.id===(outgoing?r.target_id:r.source_id));return target?{target,relation:r,outgoing}:null}).filter((x):x is NonNullable<typeof x>=>Boolean(x));const people=related.filter(x=>x.target.type==='person');const label=originTabLabel(node);return <section className="origin-panel"><div className="section-kicker">{label}</div><h2>{label}</h2>{node.type==='person'?<div className="person-origin"><Portrait node={node}/><div><TypeModule node={node}/>{related.length>0&&<div className="people-grid related-work">{related.map(({target,relation,outgoing})=><Link to={`/nodes/${target.slug}`} key={relation.id}><span>{relationLabel(relation.relation_type,outgoing)}</span><b>{target.name_zh}</b><small>{relation.evidence_status==='direct'?'文献中明确写到':'本站据此整理'}</small><i>↗</i></Link>)}</div>}</div></div>:<>{people.length>0&&<><h3 className="origin-subtitle">有出处的人物关系</h3><div className="people-grid">{people.map(({target,relation,outgoing})=><Link to={`/nodes/${target.slug}`} key={relation.id}><span>{relationLabel(relation.relation_type,outgoing)}</span><b>{target.name_zh}</b><small>{relation.evidence_status==='direct'?'文献中明确写到':'本站据此整理'}</small><i>↗</i></Link>)}</div></>}<h3 className="origin-subtitle">代表作者与来源</h3><SourceAuthorCards node={node}/></>}</section>}
// Kept temporarily as a migration reference while the lazy route lives in node-page.tsx.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NodePage(){
  const {slug}=useParams()
  const [params,setParams]=useSearchParams()
  const node=slug?nodeBySlug.get(slug):undefined
  if(!node)return <NotFound/>
  const tabs=tabsFor(node)
  const requested=params.get('section')
  const active:NodeTab=tabs.some(([id])=>id===requested)?requested as NodeTab:'overview'
  const claims=allClaims(node)
  const pending=claims.filter(claim=>claim.evidence_status==='pending')
  const visible=claims.filter(claim=>claim.evidence_status!=='pending')
  const debates=[...(node.limits_or_debates??[]),...(node.positions??[])].filter(claim=>claim.evidence_status!=='pending')
  function switchTab(tab:NodeTab){const next=new URLSearchParams(params);next.set('section',tab);setParams(next,{replace:true})}
  return <Page title={node.name_zh}>
    <article className={`node-shell type-${node.type}`}>
      <header className="node-identity">
        <div className="node-seal" aria-hidden="true"><span>{node.name_zh.slice(0,1)}</span></div>
        <div>
          <div className="card-meta"><span className="type-chip">{typeNames[node.type]}</span>{node.type==='person'&&<span className={`person-tier ${personTierLabel(node)==='核心人物'?'core':'extended'}`}>{personTierLabel(node)}</span>}<Status node={node}/></div>
          <h2 className={node.name_zh.length>11?'long-title':''}>{node.name_zh}</h2>
          {node.name_original&&<p className="original">{node.name_original}</p>}
          <ThemeChips node={node}/>
        </div>
        <Link className="relation-shortcut" to={`/nodes/${node.slug}/relations`}>关系网络 <span>↗</span></Link>
      </header>
      {node.naming_boundary&&<p className="boundary"><b>命名边界：</b>{node.naming_boundary}</p>}
      {node.temporal_profile==='evolving'&&<Dates node={node}/>} 
      <nav className="node-tabs" aria-label="知识点章节" role="tablist">{tabs.map(([id,label],index)=><button key={id} role="tab" aria-selected={active===id} className={active===id?'active':''} onClick={()=>switchTab(id)}><span>0{index+1}</span>{label}</button>)}</nav>
      <div className="node-tab-panel" role="tabpanel">
        {active==='overview'&&(node.record_level==='candidate'?<CandidateBody node={node}/>:<div className="overview-grid"><section className="lead-statement"><span>一句话理解</span><h2>{node.summary}</h2></section><section><div className="section-kicker">学习价值</div><h2>为什么值得学</h2><p>{node.why_it_matters}</p></section></div>)}
        {active==='origins'&&<OriginPeople node={node}/>} 
        {active==='key'&&(node.record_level==='candidate'?<div className="quiet-empty"><span>⌁</span><p>核心命题仍待逐项核对，暂不把尚未确认的描述展示成结论。</p></div>:<><section className="key-intro"><div className="section-kicker">{node.type==='person'?'主要贡献':'理论要点'}</div><h2>{node.type==='person'?'核心贡献':'核心命题'}</h2></section><TheoryDiagram node={node}/><div className="claims-grid">{visible.filter(claim=>node.key_points?.some(point=>point.id===claim.id)).map((claim,index)=><div className="numbered-claim" key={claim.id}><span>{String(index+1).padStart(2,'0')}</span><Evidence claim={claim}/></div>)}</div>{node.type!=='person'&&<TypeModule node={node}/>}</>)}
        {active==='debate'&&<><section className="key-intro"><div className="section-kicker">限制条件</div><h2>争议与边界</h2></section>{node.record_level==='candidate'?<p>该条目的争议边界仍待整理。</p>:<>{debates.map(claim=><Evidence claim={claim} key={claim.id}/>)}{!debates.length&&<p>{pending.length?'相关内容仍在待核区，尚未作为结论公开。':'尚未整理。'}</p>}{pending.length>0&&<details id="pending" className="pending"><summary>尚待核对的内容（{pending.length}）</summary>{pending.map(claim=><Evidence claim={claim} key={claim.id}/>)}</details>}</>}</>}
        {active==='learn'&&<div className="learn-grid">{node.record_level==='candidate'?<section><h2>来源线索</h2>{node.source_leads?.length?<SourceList ids={node.source_leads} anchor/>:<p>尚未整理。</p>}</section>:<Resources node={node}/>}<section className="relation-callout"><span>关系网络</span><h2>把它放回学科坐标</h2><p>先看推荐阅读，再查看文献中明确说明的关联与具体出处。</p><Link to={`/nodes/${node.slug}/relations`}>打开关系网络 →</Link></section>{node.record_level==='complete'&&<Learning node={node}/>}</div>}
      </div>
    </article>
  </Page>
}
function Dates({node}:{node:Node}){const overdue=node.next_review_due&&new Date(node.next_review_due)<new Date();const candidate=node.record_level==='candidate';return <section className="temporal-status" aria-label="动态议题证据范围"><div className="dates"><span>{candidate?'资料范围截至':'内容截至'}：{node.as_of??'尚未记录'}</span><span>{candidate?'来源线索检查':'出处核对'}：{node.last_evidence_check??'尚未记录'}</span><span>{candidate?'下次线索复查':'下次核对'}：{node.next_review_due??'尚未记录'} {overdue&&<b>需要重查</b>}</span></div>{node.current_evidence_state&&<p className="current-evidence-state"><b>当前证据边界</b><span>{node.current_evidence_state}</span></p>}</section>}
function CandidateBody({node}:{node:Node}){return <><section className="candidate-body"><p className="eyebrow">该入口目前只提供范围与学习线索</p><h2>资料正在整理</h2><p>{node.candidate_note}</p>{node.candidate_evidence_status==='pending'&&<p className="pending-inline">相关证据尚待核对，暂不作为已确认结论展示。</p>}</section><section><h2>来源线索</h2>{node.source_leads?.length?<SourceList ids={node.source_leads} anchor/>:<p>尚未整理。</p>}</section></>}
function SourceList({ids,anchor=false}:{ids:string[];anchor?:boolean}){return <div className="source-list">{[...new Set(ids)].map(id=>{const s=sourceById.get(id);return s?<details key={id} id={anchor?`source-${id}`:undefined}><summary>{s.authors_or_organization.join('、')}（{s.year??'年份未载'}）《{s.title}》</summary><p>{s.publisher_or_venue} · {accessLabel[s.access_status]} · 访问：{s.accessed_at}</p><p className="source-caveat">可读范围不代表主张已获支持。</p><a href={s.url} target="_blank" rel="noreferrer">打开来源 ↗</a></details>:null})}</div>}
function Resources({node}:{node:Node}){const ids=[...(node.learning_resources??[]).map(r=>r.source_id),...allClaims(node).flatMap(c=>c.evidence.map(e=>e.source_id))];return <section id="resources"><h2>学习材料与来源</h2>{node.learning_resources?.length?<div className="resource-list">{node.learning_resources.map((r,i)=><article key={i}><span>{r.level==='introductory'?'入门':r.level==='intermediate'?'进阶':'深入'}</span><h3>{r.title}</h3><p>{r.purpose}</p>{r.locator&&<small>{r.locator}</small>}<SourceList ids={[r.source_id]}/></article>)}</div>:<p>尚未整理学习材料。</p>}<details className="all-sources"><summary>全部引用来源（{new Set(ids).size}）</summary><SourceList ids={ids} anchor/></details></section>}
function Learning({node}:{node:Node}){const links=learningLinks(node);return <section id="learning"><h2>下一步学习</h2>{links.length?<div className="learning-links">{['before','after','compare'].map(k=>{const xs=links.filter(x=>(x.sequence_hint??'after')===k);return xs.length?<div key={k}><h3>{k==='before'?'先读':k==='after'?'接着看':'对照阅读'}</h3>{xs.map(l=><Link key={l.target.id} to={`/nodes/${l.target.slug}`}><span><b>{l.target.name_zh}</b></span><small>{l.reason}</small>→</Link>)}</div>:null})}</div>:<p>尚未整理下一步学习材料。<Link to={`/areas/${primaryArea(node)}`}>回到区域目录</Link></p>}</section>}
type LearningReason={direction:'outbound'|'inbound';label:string;reason:string}
type DisplayRelation=Relation&{learning_reasons?:LearningReason[];learning_label?:string}
type RelationView='learning'|'evidence'|'comparison'
function learningRelationsFor(node:Node):DisplayRelation[]{
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
    const statement_zh=reasons.map(reason=>`${reason.direction==='outbound'?'从当前条目出发':'从对方条目回读'}：${reason.reason}`).join('；')
    return {id:`learning-${node.id}-${target_id}`,source_id:node.id,target_id,relation_type:'learning_path',statement_zh,evidence_status:'interpretive',evidence:[],review_status:'editorial_path',reviewed_at:null,learning_reasons:reasons,learning_label:bothWays?'双向推荐':reasons[0].label}
  })
}
function graphPositions(count:number):[number,number][]{return Array.from({length:Math.min(count,10)},(_,i)=>{const radius=i%2===0?39:31;const angle=(-90+i*(360/Math.min(count,10)))*Math.PI/180;return [50+Math.cos(angle)*radius,50+Math.sin(angle)*radius]})}
function displayRelationLabel(relation:DisplayRelation,outgoing:boolean){return relation.learning_label??relationLabel(relation.relation_type,outgoing)}
function relationsForView(node:Node,view:RelationView):DisplayRelation[]{
  if(view==='learning')return learningRelationsFor(node)
  const layer=view==='comparison'?'comparison':'academic'
  return publicRelations(layer).filter(relation=>relation.source_id===node.id||relation.target_id===node.id)
}
function RelationGraph({node,relations}:{node:Node;relations:DisplayRelation[]}){
  const visible=relations.slice(0,10),positions=graphPositions(visible.length)
  const learning=Boolean(relations[0]?.learning_reasons?.length)
  const mode=learning?'learning':relations[0]?.evidence_status==='interpretive'?'comparison':'evidence'
  const canvasHeight=visible.length<=1?300:visible.length<=3?380:visible.length<=5?455:560
  return <div className={`relation-orbit ${mode} count-${visible.length}`} style={{'--relation-height':`${canvasHeight}px`} as React.CSSProperties}>
    <div className="orbit-rings" aria-hidden="true"></div>
    <svg className="relation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="relation-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>{positions.map(([x,y],i)=>{const relation=visible[i];const outgoing=relation?.source_id===node.id;const symmetric=['contrasts_with','associated_with'].includes(relation?.relation_type??'');return <line key={relation?.id??i} x1={outgoing?50:x} y1={outgoing?50:y} x2={outgoing?x:50} y2={outgoing?y:50} markerEnd={symmetric?undefined:'url(#relation-arrow)'}/>})}</svg>
    <div className="relation-core"><span>{typeNames[node.type]}</span>{node.name_zh}</div>
    {visible.map((r,i)=>{const outgoing=r.source_id===node.id;const target=nodes.find(n=>n.id===(outgoing?r.target_id:r.source_id));const [x,y]=positions[i]??[50,50];return target?<Link aria-label={`${displayRelationLabel(r,outgoing)}：${target.name_zh}，打开知识点`} title={`打开“${target.name_zh}”知识点`} className={`orbit-relation type-${target.type}`} style={{left:`${x}%`,top:`${y}%`}} key={r.id} to={`/nodes/${target.slug}`}><i aria-hidden="true"/><b>{target.name_zh}</b><span>{displayRelationLabel(r,outgoing)} · 打开知识点</span></Link>:null})}
  </div>
}
// Kept temporarily as a migration reference while the lazy route lives in relationship-page.tsx.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Relations(){
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
    comparison:{label:'本站整理的比较',hint:'点击圆点进入相应知识点；右侧查看用于整理的依据'},
  }[view]
  function choose(id:string){const next=new URLSearchParams(params);next.set('relation',id);setParams(next)}
  function switchView(next:RelationView){setParams(next==='learning'?{}:{layer:next})}
  return <Page title={`${node.name_zh} · 关系网络`}>
    <section className="relation-explainer">
      <div><b>推荐阅读</b><p>告诉你可以先读什么、接着看什么、与什么对照。它安排学习顺序，不声称学术因果。</p></div>
      <div><b>有出处的关联</b><p>只列文献明确说明的“提出、发展、应用”等关系，并附原文定位。</p></div>
      <div className="comparison-explainer"><b>本站整理的比较</b><p>根据资料作出的教学归纳，帮助辨认差异与可对照之处；不是文献直接命名的关系。</p></div>
    </section>
    <div className="relation-toolbar"><Link className="back-reading" to={`/nodes/${node.slug}`}>← 返回知识点</Link><ChoiceBar label="查看" value={view} options={[{value:'learning',label:'推荐阅读'},{value:'evidence',label:'有出处的关联'},{value:'comparison',label:'本站整理的比较'}]} onChange={value=>switchView(value as RelationView)}/><span>{meta.hint}</span></div>
    <section className="relations-layout"><RelationGraph node={node} relations={relations}/><aside className="relation-empty"><p className="eyebrow">{meta.label}</p>{invalid&&<p className="invalid">指定关系不属于当前视图，已回到有效内容。</p>}{!relations.length?<><h2>{view==='comparison'?'暂未整理出本站比较':view==='evidence'?'暂未整理出有出处的关联':'暂无推荐阅读'}</h2><p>{view==='comparison'?'这不表示条目无法比较，只表示这部分教学归纳尚未完成。':view==='evidence'?'这不表示知识点没有联系，只表示这部分关系尚未完成出处核对。':'该知识点的阅读顺序尚未编排。'}</p>{view!=='learning'&&<button className="switch-view" onClick={()=>switchView('learning')}>先看推荐阅读 →</button>}</>:<><h2>{relations.length} 个相连知识点</h2>{relations.length>10&&<p>图中显示前 10 个知识点，右侧列表保留全部。</p>}<div className="relation-list">{relations.map(relation=>{const outgoing=relation.source_id===node.id;const target=nodes.find(candidate=>candidate.id===(outgoing?relation.target_id:relation.source_id));return target?<button key={relation.id} className={selected?.id===relation.id?'active':''} onClick={()=>choose(relation.id)}><span>{displayRelationLabel(relation,outgoing)}</span>{target.name_zh}</button>:null})}</div>{selected&&<article className="relation-detail"><h3>{selected.statement_zh}</h3>{selected.scope_note&&<p><b>范围：</b>{selected.scope_note}</p>}{selected.learning_reasons?.length?<><p className="evidence-label">为什么推荐这样读</p><ul className="learning-reasons">{selected.learning_reasons.map((reason,index)=><li key={`${reason.direction}-${index}`}><b>{reason.direction==='outbound'?'从当前条目出发':'从对方条目回读'} · {reason.label}</b><span>{reason.reason}</span></li>)}</ul><p className="learning-boundary">这条连接只用于安排学习顺序，不声称两个知识点之间存在历史影响或因果关系。</p></>:view==='comparison'?<><h4 className="relation-evidence-heading">用于整理的依据</h4><p className="comparison-boundary">这是本站依据下列资料作出的教学归纳，不是文献直接命名的关系。</p>{selected.evidence.map((evidence,index)=><SourceDetail evidence={evidence} key={index}/>)}</>:<><p className="evidence-label">来源中明确写到</p>{selected.evidence.map((evidence,index)=><SourceDetail evidence={evidence} key={index}/>)}</>}</article>}</>}</aside></section>
  </Page>
}
function Guide(){const {guideId}=useParams();const guide=guideId?guideDefs[guideId as keyof typeof guideDefs]:undefined;const [params,setParams]=useSearchParams();if(!guide)return <NotFound/>;const requested=params.get('step');const invalid=Boolean(requested&&!guide.steps.includes(requested));const selected=!invalid&&requested?requested:guide.steps[0];const current=nodes.find(n=>n.id===selected)!;return <Page title={guide.name}><p className="lede">{guide.intro}</p>{invalid&&<p className="invalid">指定步骤不属于这条导览，已回到第一站。</p>}<ol className="path-steps">{guide.steps.map((id,i)=>{const n=nodes.find(x=>x.id===id)!;const next=i<guide.steps.length-1?learningLinks(n).find(x=>x.target.id===guide.steps[i+1]):undefined;return <li key={id} className={id===current.id?'active':''}><button onClick={()=>setParams({step:id})}><span>0{i+1}</span><b>{n.name_zh}</b></button>{next&&<p>为什么接着看：{next.reason}</p>}</li>})}</ol><article className="guide-current"><NodeCard node={current} preview/><Link to={`/nodes/${current.slug}`}>阅读这一站 →</Link>{current.id===guide.steps.at(-1)&&<p>已到这条导览的最后一站。可继续查看该条目的学习推荐。</p>}</article></Page>}
function Search(){
  const [params,setParams]=useSearchParams()
  const q=params.get('q')??''
  const [input,setInput]=useState(q)
  useEffect(()=>setInput(q),[q])
  const area=areas.some(a=>a.id===params.get('area'))?params.get('area')??'':''
  const type=Object.hasOwn(typeNames,params.get('type')??'')?params.get('type')??'':''
  const filters={area,type}
  const result=useMemo(()=>searchNodes(q,filters),[q,area,type])
  const hasFilters=Boolean(area||type)
  function set(k:string,v:string){const p=new URLSearchParams(params);v?p.set(k,v):p.delete(k);setParams(p)}
  function clearFilters(){const p=new URLSearchParams();if(q)p.set('q',q);setParams(p)}
  const readyToSearch=Boolean(q||hasFilters)
  return <Page title="搜索">
    <form className="search-page" onSubmit={event=>{event.preventDefault();set('q',input)}}>
      <label htmlFor="search-page-input">搜索理论、人物、概念或问题</label>
      <input id="search-page-input" autoFocus value={input} onChange={event=>setInput(event.target.value)} placeholder="如：议题设置、文化研究、平台治理"/>
      <button>搜索</button>
    </form>
    <div className="search-filters">
      <ChoiceBar label="主题" value={filters.area} options={[{value:'',label:'全部'},...areas.map(a=>({value:a.id,label:a.short_title}))]} onChange={value=>set('area',value)}/>
      <ChoiceBar label="类型" value={filters.type} options={[{value:'',label:'全部'},...Object.entries(typeNames).map(([value,label])=>({value,label}))]} onChange={value=>set('type',value)}/>
    </div>
    {!readyToSearch ? <SearchGuidance/> : <>
      <p aria-live="polite" className="result-count">{q?`“${q}”的搜索结果：${result.length}`:`当前筛选结果：${result.length}`}</p>
      {result.length ? <div className="node-list">{result.map(node=><NodeCard node={node} key={node.id}/>)}</div> : <Empty text={q?`没有找到“${q}”与当前筛选相符的条目。`:'当前筛选没有相符条目。'} action={hasFilters?'清除筛选':'清除查询'} onClick={hasFilters?clearFilters:()=>{setInput('');setParams({})}}/>}
    </>}
  </Page>
}
function SearchGuidance(){const suggestions=['r1-process','r4-agenda-setting','r8-content-analysis'].map(id=>nodes.find(node=>node.id===id)).filter((node):node is Node=>Boolean(node));return <section className="search-guidance"><div><p className="eyebrow">从一个准确术语开始</p><h2>先搜索你已经遇到的概念</h2><p>可以输入中文名、英文名或常用别名；也可以先用上方“主题”“类型”缩小范围。结果会在你输入或筛选后出现。</p></div><aside><span>例如</span><p>议题设置<br/>文化研究<br/>平台治理</p></aside><div className="search-suggestions"><h3>还不确定从哪里开始？</h3>{suggestions.map(node=><Link key={node.id} to={`/nodes/${node.slug}`}><span>{typeNames[node.type]}</span><b>{node.name_zh}</b><i aria-hidden="true">↗</i></Link>)}</div></section>}
function About(){const paths=nodes.reduce((sum,n)=>sum+(n.learning_links?.length??0),0);return <Page title="关于本站"><div className="about"><section className="about-lead"><p className="eyebrow">ABOUT / COMMPASS</p><h2>一张面向传播学学生的学科导航图</h2><p>传播指南针希望帮助学习者先看见传播学的整体问题版图，再逐层进入理论、人物、概念、方法与前沿。它不是百科全书，也不把视觉上的邻近冒充学术关系。</p></section><div className="about-grid"><section><h2>作者与联系</h2><dl><dt>作者／项目负责人</dt><dd><strong>待正式补充</strong>（首版不臆造公开身份）</dd><dt>联系与反馈</dt><dd><strong>待正式补充</strong>（正式发布时提供专用反馈与纠错入口）</dd></dl><p>在正式发布前，请用真实作者信息与长期可用的反馈渠道替换以上字段。</p></section><section><h2>版权与引用</h2><p>本站原创文字、视觉与程序代码的具体许可将在正式发布前声明。第三方理论、人物资料及引用内容的版权归原作者或出版机构；本站仅作教学导航，不替代原始文献。</p><p>在许可尚未确定前，不默认授予转载、改编或再发布权。</p></section></div><section id="evidence-status"><h2>这些小标签是什么意思</h2><dl><dt>核心人物</dt><dd>进入本站受控的学科全景名单，代表学科建制、核心范式、跨课程理论或不可缺少的思想传统；它是教学导航选择，不是影响力排名。</dd><dt>专题扩展</dt><dd>学术地位和贡献明确，但当前主要帮助理解某个专题理论或研究方向；这一标签不表示“不重要”或“待审核”。</dd><dt>开放校订</dt><dd>条目的基本栏目和来源已经整理，可以作为学习导航，同时继续接受读者纠错与补充。</dd><dt>部分内容待核</dt><dd>页面中可见的结论已有依据；仍未核实的说法会单独标出，不混入默认结论。</dd><dt>已完成基础校核</dt><dd>本站编辑已检查结构、来源、具体出处、术语与适用范围，并清理了公开关键结论中的待核项。这不等于同行评审或学科专家背书。</dd><dt>文献中明确写到</dt><dd>所列文献直接支持这句话，页面会给出具体出处和支持范围。</dd><dt>本站据此整理</dt><dd>这是本站根据所列资料作出的概括或学习提示，读者可以展开查看依据。</dd></dl><p className="review-boundary"><b>读者纠错如何处理？</b>正式发布时将提供专门反馈入口；反馈不会自动改动正文，而是在查证来源、记录修改理由后进入新版本。争议性或高风险条目仍可另请传播学教师或研究者复核。</p></section><section className="limitations"><h2>当前版本的不足</h2><p>本站目前提供 {nodes.length} 个可进入的知识点。条目覆盖已扩展，但深度与关系密度仍不均衡；制作进度不会再作为搜索类别打扰普通读者。</p><ul><li>经典理论的条目深度仍不均衡，中文与国际课程体系还需持续互校。</li><li>人物照片只在授权和来源可说明时展示，因此覆盖会逐步扩展。</li><li>有出处的关联需要逐条核对，暂不会为了视觉密度批量填充。</li><li>移动端、键盘导航和不同屏幕尺寸仍需真实学生测试。</li></ul></section><section className="feedback-call"><span aria-hidden="true">↗</span><div><h2>欢迎指出遗漏、错误与不清楚之处</h2><p>如果某个条目过度简化、关系依据不足、中文译名不妥，或页面交互让你迷路，请不吝反馈。所有建议都应附上可核验来源或具体使用情境，以便进入修订记录。</p></div></section><section><h2>两种关系怎样看</h2><p><Link to="/paths">{paths} 条可点击的推荐阅读</Link>告诉你可以先读、接着读或对照读什么，并说明推荐理由；另有 {publicRelations('academic').length} 条“有出处的关联”，只展示文献明确支持且本站已核对过出处的关系。两者不会混在一起。</p></section></div></Page>}
function Empty({text,action,onClick}:{text:string;action:string;onClick:()=>void}){return <div className="empty"><span>⌁</span><p>{text}</p><button onClick={onClick}>{action}</button><Link to="/">回到八区</Link></div>}
function NotFound(){return <Page title="未找到这个位置"><div className="empty"><span>⌁</span><p>这个区域、条目或导览不存在，或者链接已失效。</p><Link to="/search">去搜索</Link><Link to="/">回到八区入口</Link></div></Page>}

export function mountApp(root: HTMLElement, basename = assetUrl('/')) {
  void About
  const reactRoot = createRoot(root)
  reactRoot.render(<StrictMode><BrowserRouter basename={basename}><App/></BrowserRouter></StrictMode>)
  return reactRoot
}

const rootElement = document.getElementById('root')
if (rootElement) {
  const runtime=globalThis as typeof globalThis&{__commpassRoot?:ReturnType<typeof createRoot>}
  const reactRoot=runtime.__commpassRoot??createRoot(rootElement)
  reactRoot.render(<StrictMode><BrowserRouter basename={assetUrl('/')}><App/></BrowserRouter></StrictMode>)
  runtime.__commpassRoot=reactRoot
}
