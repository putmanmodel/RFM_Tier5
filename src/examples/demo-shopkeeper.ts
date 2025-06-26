import { NPC } from '../engine/NPC'
import { EmotionalProfile } from '../types/EmotionalProfile'

// Example profile: cautious but warm
const profile: EmotionalProfile = {
  id: "shopkeeper-001",
  baselineTone: {
    joy: 0.3,
    sadness: 0.1,
    anger: 0.1,
    fear: 0.2,
    trust: 0.4,
    suspicion: 0.2,
    disgust: 0.1,
    surprise: 0.2,
    anticipation: 0.3
  },
  caps: {
    joy: 0.9,
    sadness: 0.7,
    anger: 0.6,
    fear: 0.6,
    trust: 0.95,
    suspicion: 0.75,
    disgust: 0.5,
    surprise: 0.8,
    anticipation: 0.7
  },
  decayRates: {
    joy: 0.1,
    sadness: 0.1,
    anger: 0.08,
    fear: 0.1,
    trust: 0.05,
    suspicion: 0.04,
    disgust: 0.1,
    surprise: 0.15,
    anticipation: 0.1
  },
  auditFrequency: 3,
  cooldownRate: 0.2
}

// Instantiate and test
const npc = new NPC("Elmer the Shopkeeper", profile)

// Simulated player interaction
npc.perceive([
  "why", "did", "you", "lie", "about", "the", "mirror"
])

const output = npc.getBehaviorSignal()
console.log(`[NPC State]: ${output.state}`)
if (output.rationale) {
  console.log(`[Rationale]: ${output.rationale}`)
}
