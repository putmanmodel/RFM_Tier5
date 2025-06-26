import { ToneVector } from './ToneVector'

/**
 * A snapshot in time of one token’s emotional & symbolic charge.
 */
export interface WaveNode {
  timestamp: number            // ms since epoch or game tick
  token: string                // raw token text
  toneVector: ToneVector      // fully-populated, normalized per token
  symbolicScore: number       // metaphoric/symbolic weight (0–1)
}