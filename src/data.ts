import rawAreas from '../content/data/areas.json'
import rawNodes from '../content/data/nodes.json'
import rawCoreForeignPeople from '../content/core-foreign-person-selection.json'
import rawCoreChinesePeople from '../content/core-chinese-person-selection.json'
import type { Area, Node } from './types'
export const areas = rawAreas as Area[]
export const nodes = rawNodes as Node[]
export const coreForeignPersonIds = new Set(rawCoreForeignPeople as string[])
export const coreChinesePersonIds = new Set(rawCoreChinesePeople as string[])
