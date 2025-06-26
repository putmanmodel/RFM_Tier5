import { SelfAudit }         from '../modules/SelfAudit'
import { DecisionRationale } from '../modules/DecisionRationale'
import { WaveNode }          from '../types/WaveNode'
import { EmotionalProfile }  from '../types/EmotionalProfile'
import { npc }               from './npc-fixture'

// example stubs
const { waves, profile, currentState } = npc
const stateTag = 'INITIAL'

const rationale = SelfAudit.review(waves, profile)
npc.currentState = stateTag
