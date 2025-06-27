import { NPC } from '../engine/NPC'
import { EmotionalProfile } from '../types/EmotionalProfile'

// Example profile: cautious but warm
const profile: EmotionalProfile = {
  id: "shopkeeper-001",
  baselineTone: {
    pos: 0.3, neg: 0.2, neutral: 0.5,
    joy: 0.2, sadness: 0.1, anger: 0.1,
    fear: 0.1, trust: 0.2, suspicion: 0.1,
    disgust: 0.1, surprise: 0.1, anticipation: 0.1
  },
  caps: {
    pos: 1, neg: 1, neutral: 1,
    joy: 1, sadness: 1, anger: 1,
    fear: 1, trust: 1, suspicion: 1,
    disgust: 1, surprise: 1, anticipation: 1
  },
  decayRates: {
    pos: 0.01, neg: 0.01, neutral: 0.01,
    joy: 0.02, sadness: 0.02, anger: 0.03,
    fear: 0.02, trust: 0.01, suspicion: 0.02,
    disgust: 0.02, surprise: 0.02, anticipation: 0.02
  },
  auditFrequency: 3,
  cooldownRate: 0.2
}

// Instantiate and test
const npc = new NPC("Elmer the Shopkeeper", profile)

// First interaction — mild suspicion
npc.perceive(["why", "did", "you", "lie", "about", "the", "mirror"])

// Second, stronger interaction — triggers anger + suspicion
npc.perceive(["you", "lying", "thief", "you", "betrayed", "me"])

// Final output
const output = npc.getBehaviorSignal()
console.log(`\n[NPC Final State]: ${output.state}`)
if (output.rationale) {
  console.log(`[Final Rationale]: ${output.rationale}`)
}