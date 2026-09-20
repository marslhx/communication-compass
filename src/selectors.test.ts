import { describe, expect, it } from 'vitest'
import { nodes } from './data'
import { relations } from './evidence-data'
import { publicRelations } from './evidence-selectors'
import { allClaims, hasPending, isCorePerson, learningLinks, nodeById, nodeBySlug, nodesInArea, nodeTypeOrder, personTierLabel, searchNodes, statusLabel } from './selectors'

describe('content selectors', () => {
  it('keeps the assembled dataset internally consistent', () => {
    expect(nodes).toHaveLength(135)
    expect(new Set(nodes.map(n => n.id)).size).toBe(135)
    expect(new Set(nodes.map(n => n.slug)).size).toBe(135)
    expect(nodes.filter(n => n.record_level === 'complete')).toHaveLength(135)
    expect(nodes.filter(n => n.record_level === 'candidate')).toHaveLength(0)
    expect(nodes.filter(n => n.review_status === 'reviewed')).toHaveLength(15)
    expect(nodes.filter(n => hasPending(n))).toHaveLength(0)
    expect(nodeById.get('r4-agenda-setting')?.slug).toBe('agenda-setting')
    expect(nodeBySlug.get('agenda-setting')?.id).toBe('r4-agenda-setting')
  })
  it('keeps the core-person layer distinct from topic extensions', () => {
    expect(nodes.filter(n => n.type === 'person' && isCorePerson(n))).toHaveLength(41)
    expect(personTierLabel(nodeById.get('p-harold-innis')!)).toBe('核心人物')
    expect(personTierLabel(nodeById.get('p-theodor-adorno')!)).toBe('核心人物')
    expect(personTierLabel(nodeById.get('p-charles-berger')!)).toBe('专题扩展')
    expect(personTierLabel(nodeById.get('p-sandra-ball-rokeach')!)).toBe('专题扩展')
  })
  it('collects pending claims across every governed collection', () => {
    const process = nodeById.get('r1-process')!
    expect(allClaims(process).filter(x => x.evidence_status === 'pending')).toHaveLength(0)
    expect(hasPending(process)).toBe(false)
    expect(statusLabel(process)).toBe('开放校订')
    expect(statusLabel(nodeById.get('r4-audience')!)).toBe('开放校订')
  })
  it('does not expose unreviewed relations in either public layer', () => {
    expect(relations).toHaveLength(54)
    expect(relations.some(r => r.evidence_status === 'pending')).toBe(false)
    expect(publicRelations('academic')).toHaveLength(44)
    expect(publicRelations('comparison')).toHaveLength(10)
  })
  it('keeps learning links separate from relation filtering and target status', () => {
    const links = learningLinks(nodeById.get('r2-encoding-decoding')!)
    expect(links.some(l => l.target.id === 'r4-audience' && l.target.record_level === 'complete')).toBe(true)
  })
  it('matches aliases but does not index pending claim wording', () => {
    expect(searchNodes('议题设置').map(n => n.id)).toContain('r4-agenda-setting')
    expect(searchNodes('文化研究').map(n => n.id)).toContain('r6-cultural-studies')
    expect(searchNodes('拉斯韦尔').map(n => n.id)).not.toContain('r1-process')
  })
  it('keeps the same knowledge types contiguous inside each topic', () => {
    const list=nodesInArea('effects','all')
    const indexes=list.map(n=>nodeTypeOrder.indexOf(n.type as typeof nodeTypeOrder[number]))
    expect(indexes).toEqual([...indexes].sort((a,b)=>a-b))
  })
  it('returns cross-domain points without repeating the primary points', () => {
    const primary=nodesInArea('effects','primary')
    const cross=nodesInArea('effects','cross')
    expect(primary).toHaveLength(27)
    expect(cross).toHaveLength(21)
    expect(primary.some(node=>cross.some(other=>other.id===node.id))).toBe(false)
    expect(cross.every(node=>node.area_memberships.some(membership=>membership.area_id==='effects'&&!membership.is_primary))).toBe(true)
  })
})
