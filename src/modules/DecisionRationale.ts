import { Rationale } from './SelfAudit'

/**  
 * Finite set of behavior-state tags for your state machine.  
 */
export type StateTag = 
  | 'friendly'
  | 'neutral'
  | 'guarded'
  | 'hesitant'
  | 'tense'
  | 'hostile'
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
   * Map flagged channels into a suggested behavior state.
   * Returns 'none' if no special state applies.
   */
  static suggestState(r: Rationale): StateTag {
    const c = r.flaggedChannels

    if (c.includes('anger') && c.includes('suspicion')) {
      return 'hostile'
    }
    if (c.includes('anger') || c.includes('suspicion')) {
      return 'tense'
    }
    if (c.includes('fear') && c.includes('surprise')) {
      return 'hesitant'
    }
    if (c.includes('joy') && !c.includes('fear')) {
      return 'friendly'
    }
    if (c.length === 0) {
      return 'neutral'
    }

    return 'none'
  }
}