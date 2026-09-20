import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { nodes } from './data'
import { publicRelations } from './evidence-selectors'
import { siteConfig } from './site-config'
import { Page } from './ui'

const feedbackTypes={content:'内容纠错',experience:'使用体验',suggestion:'内容建议'} as const
type FeedbackType=keyof typeof feedbackTypes
type Draft={type:FeedbackType;topic:string;from:string;description:string;suggestion:string;source:string;contact:string}
const emptyDraft:Draft={type:'content',topic:'',from:'',description:'',suggestion:'',source:'',contact:''}

function safeDraft():Partial<Draft>{
  try{return JSON.parse(localStorage.getItem('commpass-feedback-draft')??'{}') as Partial<Draft>}catch{return {}}
}

export function About(){
  const paths=nodes.reduce((sum,node)=>sum+(node.learning_links?.length??0),0)
  return <Page title="关于本站"><div className="about">
    <section className="about-lead"><p className="eyebrow">ABOUT / COMMPASS · BETA</p><h2>先看见学科全景，再逐层走进知识。</h2><p>传播学指南针面向传播学学习者，用八个问题域连接理论、人物、概念、方法与前沿。它不是百科全书，也不把视觉上的邻近冒充为学术关系。</p></section>

    <section className="feedback-call"><span aria-hidden="true">↗</span><div><p className="eyebrow">OPEN REVISION / 开放校订</p><h2>发现遗漏、错误，或者在页面里迷路了？</h2><p>内容纠错可提供来源或线索；界面与导航问题只需说明具体页面和使用情境。反馈单可复制或下载，并通过本项目的 GitHub Discussions 提交。</p><Link className="primary-action" to="/feedback">打开反馈与纠错 <span>→</span></Link></div></section>

    <section className="about-process"><p className="eyebrow">HOW IT WORKS / 如何整理</p><h2>从资料到页面，经过三步。</h2><ol><li><span>01</span><b>定位问题</b><p>判断它帮助理解什么，而不是先往分类柜里塞。</p></li><li><span>02</span><b>核对来源</b><p>把文献直接支持的句子与本站的教学整理分开。</p></li><li><span>03</span><b>连回坐标</b><p>说明相关知识点、阅读顺序与关系范围。</p></li></ol></section>

    <section className="relation-guide"><p className="eyebrow">TWO KINDS OF LINKS / 两种连接</p><h2>学习路径不等于学术关系。</h2><div><article><strong>{paths}</strong><h3>可点击的推荐阅读</h3><p>告诉你可以先读、接着读或对照读什么，并附编排理由。</p><Link to="/paths">查看阅读建议 ↗</Link></article><article><strong>{publicRelations('academic').length}</strong><h3>有出处的关联</h3><p>只展示文献明确支持且已核对具体出处的关系。</p><Link to="/map">返回学科图谱 ↗</Link></article></div></section>

    <section id="evidence-status" className="status-explainer"><p className="eyebrow">READING THE LABELS / 读懂标签</p><h2>页面上的状态说明什么？</h2><details><summary>展开查看内容与证据状态</summary><dl><dt>开放校订</dt><dd>基本栏目和来源已整理，可用于学习导航，同时继续接受读者纠错。</dd><dt>部分内容待核</dt><dd>默认可见的结论已有依据；未核实说法会单独标出，不混入正文结论。</dd><dt>已完成基础校核</dt><dd>本站编辑已检查结构、来源、术语与适用范围；不等于同行评审或专家背书。</dd><dt>文献中明确写到</dt><dd>所列文献直接支持该句，页面会给出出处与支持范围。</dd><dt>本站据此整理</dt><dd>这是根据所列资料作出的概括或学习提示，可展开查看依据。</dd></dl></details></section>

    <section className="limitations"><p className="eyebrow">KNOWN LIMITS / 当前不足</p><h2>一张指南针，不会一次把学科说完。</h2><p>当前提供 {nodes.length} 个可进入的知识点，但深度、关系密度与中外视角仍不均衡。</p><ul><li>经典理论的内容深度还需持续补齐。</li><li>人物照片只在授权和来源能说明时展示。</li><li>有出处的关联逐条核对，不为视觉密度批量填充。</li><li>跨设备可用性仍需真实学生测试。</li></ul></section>

    <div className="about-grid"><section><h2>作者与联系</h2><dl><dt>作者／项目负责人</dt><dd><a className="author-link" href={siteConfig.authorUrl} target="_blank" rel="noreferrer"><strong>{siteConfig.author}</strong><span aria-hidden="true">↗</span></a>{siteConfig.affiliation&&` · ${siteConfig.affiliation}`}</dd><dt>联系邮箱</dt><dd><a href={siteConfig.contactUrl}>{siteConfig.contactLabel}</a></dd></dl></section><section><h2>版权、引用与隐私</h2><ul><li>本站原创文字与数据：{siteConfig.contentLicense??'正式发布前声明许可'}。</li><li>程序代码：{siteConfig.codeLicense??'正式发布前声明许可'}。</li><li>第三方引文、肖像与图表按各自来源与授权使用；理论与事实性介绍不替代原始文献。</li><li>引用本站时，请标注页面名称、COMMPASS｜传播学指南针 Beta、访问日期与页面地址。</li></ul><p>当前版本不设账户、不使用站内行为分析；浏览器只在本地保存深浅色偏好和未完成的反馈草稿。提交反馈时将前往 GitHub Discussions，其数据处理适用 GitHub 的相关规则。</p></section></div>
  </div></Page>
}

export function Feedback(){
  const [params]=useSearchParams()
  const [draft,setDraft]=useState<Draft>(()=>({...emptyDraft,...safeDraft(),topic:params.get('topic')??safeDraft().topic??'',from:params.get('from')??safeDraft().from??''}))
  const [notice,setNotice]=useState('')
  useEffect(()=>{try{localStorage.setItem('commpass-feedback-draft',JSON.stringify(draft))}catch{/* local drafts are optional */}},[draft])
  const text=useMemo(()=>`# COMMPASS 反馈\n\n- 类型：${feedbackTypes[draft.type]}\n- 知识点：${draft.topic||'未指定'}\n- 页面：${draft.from||'未指定'}\n\n## 问题描述\n${draft.description||'待填写'}\n\n## 建议修改\n${draft.suggestion||'未填写'}\n\n## 参考来源或线索\n${draft.source||'未填写'}\n\n## 可选联系方式\n${draft.contact||'未填写'}\n`,[draft])
  function update<K extends keyof Draft>(key:K,value:Draft[K]){setDraft(current=>({...current,[key]:value}));setNotice('')}
  async function copy(){try{await navigator.clipboard.writeText(text);setNotice('已复制反馈内容。')}catch{setNotice('浏览器未允许自动复制，可从下方预览手动复制。')}}
  function download(){const url=URL.createObjectURL(new Blob([text],{type:'text/markdown;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download=`commpass-feedback-${new Date().toISOString().slice(0,10)}.md`;anchor.click();URL.revokeObjectURL(url);setNotice('反馈单已下载。')}
  return <Page title="反馈与纠错"><div className="feedback-layout"><section className="feedback-intro"><p className="eyebrow">OPEN REVISION / 开放校订</p><h2>请把问题说清，不必把它说“完”。</h2><p>内容纠错最好带上文献、网页或检索线索；交互问题只需说明设备、页面和卡住的地方。</p><aside><b>提交方式</b><span>输入会保存在当前浏览器。请先复制反馈内容，再前往本项目的 GitHub Discussions 发帖；只有你在 GitHub 确认发布后，内容才会公开提交。</span></aside></section><form className="feedback-form" onSubmit={event=>event.preventDefault()}><fieldset><legend>反馈类型</legend><div className="feedback-types">{Object.entries(feedbackTypes).map(([value,label])=><label key={value} className={draft.type===value?'active':''}><input type="radio" name="feedback-type" value={value} checked={draft.type===value} onChange={()=>update('type',value as FeedbackType)}/><span>{label}</span></label>)}</div></fieldset><div className="form-pair"><label><span>知识点（可选）</span><input value={draft.topic} onChange={event=>update('topic',event.target.value)} placeholder="例如：议题设置"/></label><label><span>所在页面（可选）</span><input value={draft.from} onChange={event=>update('from',event.target.value)} placeholder="例如：/nodes/agenda-setting"/></label></div><label><span>问题描述</span><textarea rows={5} value={draft.description} onChange={event=>update('description',event.target.value)} placeholder="哪里不准确、不清楚，或让你无法继续？"/></label><label><span>建议怎样修改（可选）</span><textarea rows={3} value={draft.suggestion} onChange={event=>update('suggestion',event.target.value)} placeholder="你希望看到什么变化？"/></label><label><span>参考来源或线索{draft.type==='experience'&&'（体验问题无需填写）'}</span><textarea rows={3} value={draft.source} onChange={event=>update('source',event.target.value)} placeholder="书名、论文、网页链接，或者可继续查找的线索"/></label><label><span>联系方式（可选）</span><input value={draft.contact} onChange={event=>update('contact',event.target.value)} placeholder="只会出现在你复制、下载或主动提交的反馈单中"/></label><div className="feedback-actions"><button type="button" className="primary-action" onClick={copy}>复制反馈内容</button><button type="button" className="secondary-action" onClick={download}>下载反馈单</button><a className="discussion-action" href={siteConfig.feedbackUrl} target="_blank" rel="noreferrer">前往 GitHub Discussions 提交 ↗</a></div><p className="feedback-notice" role="status" aria-live="polite">{notice||'建议先复制反馈内容，再打开 Discussions 发布。'}</p><details className="feedback-preview"><summary>预览将要复制或下载的内容</summary><pre>{text}</pre></details></form></div></Page>
}

export default About
