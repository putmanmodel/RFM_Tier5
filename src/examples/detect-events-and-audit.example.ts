import { WaveformNormalizer } from '../modules/WaveformNormalizer'
import { npc } from './npc-fixture'  // has .waves & .profile

const { events, rationale } = WaveformNormalizer.detectEventsAndAudit(
  npc.waves, 
  npc.profile,
  { threshold: 0.3, minEventsToAudit: 1 }
)

console.log('Detected Events:', events)
if (rationale) console.log('SelfAudit Rationale:', rationale)
