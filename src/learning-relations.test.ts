// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { nodeById } from './selectors'
import { learningRelationsFor, relationsForView } from './relationship-page'

describe('learning relationship view', () => {
  it('merges reciprocal recommendations for the same target and retains both reasons', () => {
    const process = nodeById.get('r1-process')!
    const relations = learningRelationsFor(process)
    expect(new Set(relations.map(relation => relation.target_id)).size).toBe(relations.length)
    const feedback = relations.find(relation => relation.target_id === 'r1-feedback-noise')!
    expect(feedback.learning_label).toBe('双向推荐')
    expect(feedback.learning_reasons).toHaveLength(2)
    expect(new Set(feedback.learning_reasons?.map(reason => reason.direction))).toEqual(new Set(['outbound','inbound']))
  })

  it('exposes only reviewed interpretive relations in the comparison view', () => {
    const agenda = nodeById.get('r4-agenda-setting')!
    const comparisons = relationsForView(agenda, 'comparison')
    expect(comparisons.length).toBeGreaterThan(0)
    expect(comparisons.every(relation => relation.evidence_status === 'interpretive')).toBe(true)
    expect(comparisons.every(relation => relation.reviewed_at && ['reviewed','published'].includes(relation.review_status))).toBe(true)
    expect(relationsForView(agenda, 'evidence').every(relation => relation.evidence_status === 'direct')).toBe(true)
  })
})
