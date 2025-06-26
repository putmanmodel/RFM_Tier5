import { Rationale } from './SelfAudit'

/**  
 * Finite set of behaviour-state tags for your state machine.  
 */
export type StateTag = 
  | 'guarded'
  | 'friendly'
  | 'hesitant'
  | 'neutral'
  | 'snarky'
  | 'none'   

/**
 * Maps internal audit state into human-friendly behavior reasons.
 */
export class DecisionRationale {
  /** Templates for each trigger reason */
  private static explanations: Record<Rationale['triggerReason'], string> = {
    NoData:        'No emotional data available.',
    WithinBounds:  'Agent remained emotionally stable.',
    ThresholdExceeded:
      'Behavior shift due to elevated emotional fields: {tones}. {summary}'
  }

  /**
   * Format raw audit rationale into a displayable message.
   */
  static explain(r: Rationale): string {
    const template = this.explanations[r.triggerReason] 
      ?? 'Unknown emotional state.'

    if (r.triggerReason !== 'ThresholdExceeded') {
      return template
    }

    // interpolate tones + summary
    const tones = r.flaggedChannels.join(', ')
    return template
      .replace('{tones}', tones)
      .replace('{summary}', r.summary)
  }

  /**
   * Map flagged channels into a suggested behaviour state.
   * Returns 'none' if no special state applies.
   */
  static suggestState(r: Rationale): StateTag {
    const { flaggedChannels } = r

    if (flaggedChannels.includes('suspicion') ||
        flaggedChannels.includes('anger')) {
      return 'guarded'
    }
    if (flaggedChannels.includes('joy') && 
        !flaggedChannels.includes('fear')) {
      return 'friendly'
    }
    if (flaggedChannels.includes('fear') && 
        flaggedChannels.includes('surprise')) {
      return 'hesitant'
    }
    // add more rules here as you expand your emotion DSL…

    return 'none'
  }
}
