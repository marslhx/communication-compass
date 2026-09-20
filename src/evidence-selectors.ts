import { relations, sources } from './evidence-data'
import { nodeById } from './selectors'
import type { Relation } from './types'

export const sourceById = new Map(sources.map(source => [source.id, source]))

export const accessibleRelation = (relation:Relation, layer:'academic'|'comparison') => {
  const isPublishable = ['reviewed','published'].includes(relation.review_status)
    && Boolean(relation.reviewed_at)
    && nodeById.has(relation.source_id)
    && nodeById.has(relation.target_id)
    && relation.evidence.length > 0
  return isPublishable && relation.evidence_status === (layer === 'academic' ? 'direct' : 'interpretive')
}

export const publicRelations = (layer:'academic'|'comparison') => relations.filter(relation => accessibleRelation(relation, layer))

export const accessLabel:Record<string,string> = {
  full_text:'已核全文',
  excerpt:'已核片段',
  abstract:'已核摘要',
  metadata:'仅核书目信息',
  unavailable:'当前不可访问',
}
