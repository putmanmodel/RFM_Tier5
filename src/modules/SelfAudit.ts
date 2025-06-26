import { WaveNode } from '../types/WaveNode'
import { EmotionalProfile } from '../types/EmotionalProfile'
import { ToneVector } from '../types/ToneVector'

/**
 * Explanation of why SelfAudit fired (or didn’t).
 */
export interface Rationale {
  /** List of tone channels that went over their cap */
  flaggedChannels: (keyof ToneVector)[]
  /** High‐level trigger code */
  triggerReason: 'NoData' | 'WithinBounds' | 'ThresholdExceeded'
  /** Milliseconds since epoch when audit ran */
  timestamp: number
  /** Human‐readable summary of the event */
  summary: string
}

export class SelfAudit {
  /**
   * Check the latest wave node against the profile’s caps  
   * and produce a Rationale.
   *
   * @param waves   full history of WaveNodes (we inspect only the last)
   * @param profile emotional caps & settings for this agent
   */
  static review(
    waves: WaveNode[],
    profile: EmotionalProfile
  ): Rationale {
    const now = Date.now()
    const latest = waves[waves.length - 1]

    if (!latest) {
      return {
        flaggedChannels: [],
        triggerReason: 'NoData',
        timestamp: now,
        summary: 'No wave data available.'
      }
    }

    const overLimit = (Object.keys(latest.toneVector) as (keyof ToneVector)[])
      .filter(channel => latest.toneVector[channel] > profile.caps[channel])

    const triggerReason = overLimit.length > 0
      ? 'ThresholdExceeded'
      : 'WithinBounds'

    const summary = overLimit.length > 0
      ? `Tone channels exceeded cap: ${overLimit.join(', ')}.`
      : 'All channels within defined caps.'

    return {
      flaggedChannels: overLimit,
      triggerReason,
      timestamp: now,
      summary
    }
  }
}
