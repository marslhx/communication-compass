import { areas, coreChinesePersonIds, coreForeignPersonIds, nodes } from './data'
import type { Claim, Node } from './types'

export const nodeById = new Map(nodes.map(n => [n.id, n]))
export const nodeBySlug = new Map(nodes.map(n => [n.slug, n]))
export const areaById = new Map(areas.map(a => [a.id, a]))
export const allClaims = (node: Node): Claim[] => ['key_points','limits_or_debates','positions','propositions','limitations','internal_differences'].flatMap(k => (node[k as keyof Node] as Claim[] | undefined) ?? [])
export const hasPending = (node: Node) => allClaims(node).some(c => c.evidence_status === 'pending')
export const statusLabel = (node: Node) => {
  if (node.record_level === 'candidate') return '资料整理中'
  if (hasPending(node)) return '部分内容待核'
  if (node.review_status === 'reviewed' || node.review_status === 'published') return node.reviewed_at ? '已完成基础校核' : '开放校订'
  return '开放校订'
}
export const primaryArea = (node: Node) => node.area_memberships.find(m => m.is_primary)?.area_id
export const isCorePerson = (node: Node) => node.type === 'person' && (coreForeignPersonIds.has(node.id) || coreChinesePersonIds.has(node.id))
export const personTierLabel = (node: Node) => isCorePerson(node) ? '核心人物' : '专题扩展'
export const nodeTypeOrder = ['tradition','theory_model','concept','person','research_topic','method','application'] as const
export const sortNodesByType = (items:Node[]) => [...items].sort((a,b) => {
  const ai=nodeTypeOrder.indexOf(a.type as typeof nodeTypeOrder[number])
  const bi=nodeTypeOrder.indexOf(b.type as typeof nodeTypeOrder[number])
  const typeOrder=(ai<0?nodeTypeOrder.length:ai)-(bi<0?nodeTypeOrder.length:bi)
  const personOrder=a.type==='person'&&b.type==='person'?Number(!isCorePerson(a))-Number(!isCorePerson(b)):0
  return typeOrder || personOrder || a.name_zh.localeCompare(b.name_zh,'zh-CN')
})
export const nodesInArea = (areaId:string, scope:'primary'|'cross'|'all'='primary') => sortNodesByType(nodes.filter(n => n.area_memberships.some(m => {
  if (m.area_id !== areaId) return false
  if (scope === 'primary') return m.is_primary
  if (scope === 'cross') return !m.is_primary
  return true
})))
export const learningLinks = (node:Node) => (node.learning_links ?? []).map(l => ({...l, target:nodeById.get(l.target_id)})).filter((l):l is typeof l & {target:Node} => Boolean(l.target))
export const normalize = (value:string) => value.normalize('NFKC').toLowerCase().replace(/\s+/g,'')
export function searchNodes(query:string, filters:{area?:string;type?:string;level?:string}={}) {
  const q=normalize(query); return nodes.filter(n => (!filters.area || n.area_memberships.some(m=>m.area_id===filters.area)) && (!filters.type || n.type===filters.type) && (!filters.level || n.record_level===filters.level)).map((n,index)=>{
    const fields=[n.name_zh,...n.aliases.map(a=>a.name),n.name_original??'',n.type,...n.area_memberships.map(m=>areaById.get(m.area_id)?.title??'')]
    const rank=!q?4:normalize(n.name_zh)===q?0:fields.slice(1,1+n.aliases.length).some(x=>normalize(x).includes(q))?1:normalize(n.name_original??'').includes(q)?2:fields.some(x=>normalize(x).includes(q))?3:9
    return {n,index,rank}
  }).filter(x=>x.rank<9).sort((a,b)=>a.rank-b.rank||(a.n.type==='person'&&b.n.type==='person'?Number(!isCorePerson(a.n))-Number(!isCorePerson(b.n)):0)||a.index-b.index).map(x=>x.n)
}
