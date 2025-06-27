import type { WaveNode } from '../types/WaveNode'
import type { ToneVector } from '../types/ToneVector'

/**
 * Optional: Map token → tone overrides for stronger emotional effect.
 */
const tonePresets: Record<string, Partial<ToneVector>> = {
  lie:     { anger: 0.7, suspicion: 0.6, trust: 0.1 },
  stole:   { anger: 0.8, disgust: 0.6, trust: 0.0 },
  mirror:  { surprise: 0.3 },
  amulet:  { sadness: 0.5, anticipation: 0.4 },
  love:    { joy: 0.7, trust: 0.5, pos: 0.6 }
}

/**
 * Emotion-pattern analyzer for a stream of tokens,
 * returning an array of WaveNodes based on prior context.
 */
export const PUTMANWaveAnalyzer = {
  /**
   * Analyze a new sequence of input tokens.
   *
   * @param tokens - sequence of input tokens (e.g. words, events)
   * @param prior  - prior WaveNode[] history
   * @returns new WaveNode[] representing symbolic/emotional tone
   */
  analyze(tokens: string[], prior: WaveNode[]): WaveNode[] {
    return tokens.map((token, i) => {
      const preset = tonePresets[token.toLowerCase()] || {}

      const toneVector: ToneVector = {
        pos: 'pos' in preset ? preset.pos! : 0.2,
        neg: 'neg' in preset ? preset.neg! : 0.1,
        neutral: 'neutral' in preset ? preset.neutral! : 0.7,
        joy: preset.joy ?? 0.1,
        sadness: preset.sadness ?? 0.1,
        anger: preset.anger ?? 0.1,
        fear: preset.fear ?? 0.1,
        surprise: preset.surprise ?? 0.1,
        disgust: preset.disgust ?? 0.1,
        trust: preset.trust ?? 0.1,
        suspicion: preset.suspicion ?? 0.1,
        anticipation: preset.anticipation ?? 0.1
      }

      return {
        token,
        timestamp: Date.now() + i,
        symbolicScore: Math.random(),
        toneVector,
        recursionDepth: 0
      }
    })
  }
}