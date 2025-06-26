import { ToneVector } from './ToneVector'

/**
 * Profile parameters controlling emotional dynamics for an agent.
 */
export interface EmotionalProfile {
  /** Unique agent ID */
  id: string

  /**
   * Resting baseline for each affect channel.
   * Must satisfy: 0 ≤ baseline ≤ cap ≤ 1
   */
  baselineTone: ToneVector

  /**
   * Soft upper bounds per channel. Crossing a cap triggers SelfAudit.
   */
  caps: ToneVector

  /**
   * Per-tick decay rate: fraction of channel lost each tick (0–1).
   */
  decayRates: ToneVector

  /**
   * Number of update ticks between automatic introspections.
   */
  auditFrequency: number

  /**
   * Optional global cooldown multiplier or recovery curve modifier
   */
  cooldownRate?: number
}