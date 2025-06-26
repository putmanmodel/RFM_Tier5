import { WaveNode } from '../types/WaveNode'
import { EmotionalProfile } from '../types/EmotionalProfile'
import { Rationale, SelfAudit } from './SelfAudit'

/**
 * An event detected in a waveform: how big the jump was,
 * and when it happened in the sample.
 */
export interface DetectedEvent {
  delta: number
  time: number
}

export class WaveformNormalizer {
  /**
   * (Stub) Normalize the raw WaveNode[] into a uniform scale.
   * Replace this stub with your real logic using w.symbolicScore.
   */
  static normalize(waves: WaveNode[], profile: EmotionalProfile): WaveNode[] {
    return waves
  }

  /**
   * Find where the waveform crosses an audit threshold.
   * Uses the real .symbolicScore and .timestamp fields.
   */
  static detectEvents(waves: WaveNode[], threshold: number): DetectedEvent[] {
    const events: DetectedEvent[] = []
    let last = waves[0]?.symbolicScore ?? 0
    for (const n of waves) {
      const delta = n.symbolicScore - last
      if (Math.abs(delta) >= threshold) {
        events.push({ delta, time: n.timestamp })
      }
      last = n.symbolicScore
    }
    return events
  }

  /**
   * Normalize, detect events, then optionally run a SelfAudit.
   */
  static detectEventsAndAudit(
    waves: WaveNode[],
    profile: EmotionalProfile,
    opts: {
      threshold?: number
      minEventsToAudit?: number
      maxDeltaToAudit?: number
    } = {}
  ): { events: DetectedEvent[]; rationale?: Rationale } {
    const { threshold = 0.4, minEventsToAudit = 2, maxDeltaToAudit = 0.6 } = opts

    const normalized = WaveformNormalizer.normalize(waves, profile)
    const events     = WaveformNormalizer.detectEvents(normalized, threshold)

    let rationale: Rationale | undefined
    if (
      events.length >= minEventsToAudit ||
      events.some(e => Math.abs(e.delta) >= maxDeltaToAudit)
    ) {
      // Pass back the normalized waveform, not the bare events
      rationale = SelfAudit.review(normalized, profile)
    }

    return { events, rationale }
  }
}
