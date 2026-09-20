import rawRelations from '../content/data/public-relations.json'
import rawSources from '../content/data/sources.json'
import type { Relation, Source } from './types'

export const relations = rawRelations as Relation[]
export const sources = rawSources as Source[]
