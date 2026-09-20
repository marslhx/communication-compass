import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { areaById, nodeBySlug, personTierLabel, primaryArea, statusLabel } from './selectors'
import type { Node } from './types'

export const typeNames:Record<string,string> = {
  tradition:'思想传统',
  person:'人物',
  theory_model:'理论／模型',
  concept:'核心概念',
  research_topic:'研究主题',
  method:'研究方法',
  application:'应用领域',
}

const relationNames:Record<string,[string,string]> = {
  proposed:['提出','由其提出'],
  developed:['发展','由其发展'],
  addresses:['用于分析','被用于分析'],
  used_in:['应用于','使用该方法'],
  associated_with:['相互关联','相互关联'],
  contrasts_with:['形成对照','形成对照'],
  has_concept:['包含概念','属于该传统'],
}

export function relationLabel(relationType:string,isOutgoing:boolean){
  const labels=relationNames[relationType]??[relationType,relationType]
  return labels[isOutgoing?0:1]
}

export function useTitle(title:string){
  useEffect(()=>{document.title=`${title} · COMMPASS｜传播学指南针 Beta`},[title])
}

type Crumb={label:string;to?:string}

function Breadcrumbs({items}:{items:Crumb[]}){
  return <nav className="breadcrumbs" aria-label="面包屑路径"><ol>{items.map((item,index)=><li key={`${item.label}-${index}`}>{item.to?<Link to={item.to}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>
}

function useAutoBreadcrumbs(title:string):Crumb[]{
  const {pathname}=useLocation()
  const parts=pathname.split('/').filter(Boolean)
  if(!parts.length)return[]
  if(parts[0]==='areas'){
    const area=areaById.get(parts[1])
    return[{label:'首页',to:'/'},{label:'主题导览',to:'/guides'},{label:area?.title??title}]
  }
  if(parts[0]==='guides'&&parts[1])return[{label:'首页',to:'/'},{label:'主题导览',to:'/guides'},{label:title}]
  if(parts[0]==='nodes'){
    const node=nodeBySlug.get(parts[1])
    const area=node?areaById.get(primaryArea(node)??''):undefined
    return[
      {label:'首页',to:'/'},
      {label:'主题导览',to:'/guides'},
      ...(area?[{label:area.title,to:`/areas/${area.id}`}]:[]),
      ...(parts[2]?[{label:node?.name_zh??'知识点',to:`/nodes/${parts[1]}`},{label:'关系探索'}]:[{label:node?.name_zh??title}]),
    ]
  }
  const labels:Record<string,string>={map:'学科图谱',guides:'主题导览',paths:'推荐阅读',search:'知识搜索',about:'关于本站',feedback:'反馈与纠错'}
  return[{label:'首页',to:'/'},{label:labels[parts[0]]??title}]
}

export function Page({title,children,breadcrumbs=[],visuallyHiddenTitle=false}:{title:string;children:ReactNode;breadcrumbs?:Crumb[];visuallyHiddenTitle?:boolean}){
  useTitle(title)
  useEffect(()=>document.getElementById('page-title')?.focus(),[title])
  const automatic=useAutoBreadcrumbs(title)
  const trail=breadcrumbs.length?breadcrumbs:automatic
  return <main id="main" className={`page ${visuallyHiddenTitle?'page-compact':''}`}><div className="page-ornament" aria-hidden="true">⌁</div>{trail.length>0&&<Breadcrumbs items={trail}/>}<div className="eyebrow">COMMPASS / 传播学指南针 · BETA</div><h1 id="page-title" className={visuallyHiddenTitle?'sr-only':title.length>12?'long-title':''} tabIndex={-1}>{title}</h1>{children}</main>
}

export function RouteEffects(){
  const {pathname,hash}=useLocation()
  useEffect(()=>{
    if(!hash)return
    requestAnimationFrame(()=>{
      const target=document.getElementById(decodeURIComponent(hash.slice(1)))
      if(!target)return
      let current:HTMLElement|null=target
      while(current){if(current instanceof HTMLDetailsElement)current.open=true;current=current.parentElement}
      target.scrollIntoView({block:'start'})
    })
  },[pathname,hash])
  return null
}

export function TabAccessibility(){
  const {pathname,search}=useLocation()
  useEffect(()=>{
    const tabs=Array.from(document.querySelectorAll<HTMLButtonElement>('.node-tabs [role="tab"]'))
    const panel=document.querySelector<HTMLElement>('.node-tab-panel[role="tabpanel"]')
    if(!tabs.length||!panel)return
    const base=`${pathname.replace(/[^a-z0-9]+/gi,'-')}-node-tab`
    const activeIndex=Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'))
    panel.id=`${base}-panel`
    panel.setAttribute('aria-labelledby',`${base}-${activeIndex}`)
    tabs.forEach((tab,index)=>{
      tab.id=`${base}-${index}`
      tab.setAttribute('aria-controls',panel.id)
      tab.tabIndex=index===activeIndex?0:-1
    })
    const handleKeydown=(event:KeyboardEvent)=>{
      const current=tabs.indexOf(event.currentTarget as HTMLButtonElement)
      if(current<0)return
      let next=current
      if(event.key==='ArrowRight')next=(current+1)%tabs.length
      else if(event.key==='ArrowLeft')next=(current-1+tabs.length)%tabs.length
      else if(event.key==='Home')next=0
      else if(event.key==='End')next=tabs.length-1
      else return
      event.preventDefault()
      tabs[next].click()
      tabs[next].focus()
    }
    tabs.forEach(tab=>tab.addEventListener('keydown',handleKeydown))
    return()=>tabs.forEach(tab=>tab.removeEventListener('keydown',handleKeydown))
  },[pathname,search])
  return null
}

type Theme='dark'|'light'

export function Header(){
  const navigate=useNavigate()
  const [query,setQuery]=useState('')
  const [theme,setTheme]=useState<Theme>(()=>{
    try{const stored=localStorage.getItem('commpass-theme');if(stored==='dark'||stored==='light')return stored}catch{/* storage may be unavailable */}
    return typeof matchMedia==='function'&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'
  })
  useEffect(()=>{
    document.documentElement.dataset.theme=theme
    document.documentElement.style.colorScheme=theme
    try{localStorage.setItem('commpass-theme',theme)}catch{/* storage may be unavailable */}
  },[theme])
  useEffect(()=>{
    const focusSearch=(event:KeyboardEvent)=>{
      if(event.key==='/'&&!(event.target instanceof HTMLInputElement||event.target instanceof HTMLTextAreaElement)){
        event.preventDefault()
        document.getElementById('site-search')?.focus()
      }
    }
    addEventListener('keydown',focusSearch)
    return()=>removeEventListener('keydown',focusSearch)
  },[])
  return <><header className="site-header"><Link className="brand" to="/"><span className="brand-mark">✧</span><span>COMMPASS</span><i>｜</i><b>传播学指南针</b><em className="beta-badge">BETA</em></Link><p className="brand-line">理解传播 · 连接世界 · 指向未来</p><form className="global-search" role="search" onSubmit={event=>{event.preventDefault();navigate(`/search?q=${encodeURIComponent(query)}`)}}><label className="sr-only" htmlFor="site-search">搜索理论、人物、概念或问题</label><input id="site-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="搜索理论、人物、概念或问题"/><button aria-label="提交搜索">⌕</button></form><button className="theme-toggle" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={`切换到${theme==='dark'?'浅色':'深色'}背景`} title={`切换到${theme==='dark'?'浅色':'深色'}背景`}><span aria-hidden="true">{theme==='dark'?'☼':'◐'}</span><b>{theme==='dark'?'浅色':'深色'}</b></button></header><nav className="mobile-nav" aria-label="移动端主导航"><NavLink to="/map">学科图谱</NavLink><NavLink to="/guides">主题导览</NavLink><NavLink to="/about">关于本站</NavLink></nav></>
}

export function DesktopRail(){
  return <aside className="desktop-rail"><nav aria-label="主导航"><NavLink to="/map"><span aria-hidden="true">✧</span><b>学科全景</b><small>MAP</small></NavLink><NavLink to="/guides"><span aria-hidden="true">◇</span><b>主题导览</b><small>GUIDES</small></NavLink><NavLink to="/search"><span aria-hidden="true">⌕</span><b>知识搜索</b><small>SEARCH</small></NavLink><NavLink to="/about"><span aria-hidden="true">○</span><b>关于本站</b><small>ABOUT</small></NavLink></nav><p>以知识为坐标<br/>看见更大的传播世界</p></aside>
}

export function Footer(){
  return <footer><span>八个问题是本站的教学导航，不是僵硬分类。内容状态与来源范围始终随条目可见。</span><nav aria-label="页尾导航"><Link to="/about#evidence-status">证据状态</Link><Link to="/feedback">反馈与纠错</Link></nav></footer>
}

export function Status({node}:{node:Node}){
  const reviewed=node.reviewed_at&&['reviewed','published'].includes(node.review_status)
  return <span className={`status ${node.record_level}`}>{statusLabel(node)}{reviewed&&` · ${node.reviewed_at}`}</span>
}

export function AreaTag({id}:{id:string}){
  const area=areaById.get(id)
  return area?<span className="area-tag" style={{'--a':area.color} as CSSProperties}><i aria-hidden="true"/>{area.short_title}</span>:null
}

export function ThemeChips({node}:{node:Node}){
  return <div className="theme-chips" aria-label="涉及主题">{node.area_memberships.map(membership=><AreaTag key={membership.area_id} id={membership.area_id}/>)}</div>
}

export function NodeCard({node,preview=false}:{node:Node;preview?:boolean}){
  const qualifiedAliases=node.aliases.filter(alias=>alias.note)
  return <Link className={`node-card type-${node.type}`} to={`/nodes/${node.slug}`}><div className="card-meta"><span className="type-chip">{typeNames[node.type]}</span>{node.type==='person'&&<span className={`person-tier ${personTierLabel(node)==='核心人物'?'core':'extended'}`}>{personTierLabel(node)}</span>}</div><h3>{node.name_zh}</h3>{node.name_original&&<p className="original">{node.name_original}</p>}{qualifiedAliases.map(alias=><p className="alias-note" key={alias.name}><b>别名“{alias.name}”：</b>{alias.note}</p>)}{preview&&node.summary&&<p>{node.summary}</p>}<span className="card-arrow" aria-hidden="true">↗</span></Link>
}

export function ChoiceBar({label,value,options,onChange}:{label:string;value:string;options:{value:string;label:string}[];onChange:(value:string)=>void}){
  return <div className="choice-group"><span>{label}</span><div role="group" aria-label={label}>{options.map(option=><button type="button" key={option.value} className={value===option.value?'active':''} aria-pressed={value===option.value} onClick={()=>onChange(option.value)}>{option.label}</button>)}</div></div>
}

export function RouteLoading(){
  return <main id="main" className="page route-loading" aria-busy="true"><div className="eyebrow">COMMPASS / LOADING</div><p>正在展开这片知识区域……</p></main>
}

export function Empty({text,action,onClick}:{text:string;action:string;onClick:()=>void}){
  return <div className="empty"><span>⌁</span><p>{text}</p><button type="button" onClick={onClick}>{action}</button><Link to="/">回到八区</Link></div>
}

export function NotFound(){
  return <Page title="未找到这个位置"><div className="empty"><span>⌁</span><p>这个区域、知识点或导览不存在，或者链接已失效。</p><Link to="/search">去搜索</Link><Link to="/">回到八区入口</Link></div></Page>
}
