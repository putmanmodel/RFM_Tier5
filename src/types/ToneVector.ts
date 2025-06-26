/**
 * A discrete set of affective channels, each from 0 (none) to 1 (max).
 */
export interface ToneVector {
  joy: number
  sadness: number
  anger: number
  fear: number
  trust: number
  suspicion: number    // can co-exist with trust in complex agents
  disgust: number
  surprise: number
  anticipation: number
}