import { WaveNode } from '../types/WaveNode'
import { FieldVector } from '../types/FieldVector'
import { EmotionalProfile } from '../types/EmotionalProfile'
import { PUTMANWaveAnalyzer } from '../modules/PUTMANWaveAnalyzer'
import { ResonanceEngine } from './ResonanceEngine'
import { WaveformNormalizer, DetectedEvent } from '../modules/WaveformNormalizer'
import { SelfAudit, Rationale } from '../modules/SelfAudit'
import { DecisionRationale, StateTag } from '../modules/DecisionRationale'

/**
 * High-level NPC class that tracks symbolic tone over time,
 * runs self-audits, and outputs behavior signals.
 */
export class NPC {
  id: string
  waves: WaveNode[] = []
  profile: EmotionalProfile
  currentState: StateTag = 'neutral'
  lastEvents: DetectedEvent[] = []
  lastRationale?: Rationale

  constructor(id: string, profile: EmotionalProfile) {
    this.id = id
    this.profile = profile
  }

  /**
   * Accept new tokens (utterances, inputs) and expand emotional stream.
   */
  perceive(inputTokens: string[], otherAgentWaves: WaveNode[] = []) {
    const newWaves = PUTMANWaveAnalyzer.analyze(inputTokens, this.waves)
    this.waves.push(...newWaves)

    if (otherAgentWaves.length) {
      const field = ResonanceEngine.compare(this.waves, otherAgentWaves)
      this.applyFieldConstraints(field)
    }

    const { events, rationale } = WaveformNormalizer.detectEventsAndAudit(
      this.waves,
      this.profile,
      { threshold: 0.3 }
    )

    this.lastEvents = events
    this.lastRationale = rationale

    if (rationale) {
      const newState = DecisionRationale.suggestState(rationale)
      if (newState !== 'none') {
        this.currentState = newState
      }
    }
  }

  /**
   * Simulate off-screen emotional decay (baseline return).
   */
  normalizeEmotions() {
    this.waves = WaveformNormalizer.normalize(this.waves, this.profile)
  }

  /**
   * Dampen or clamp emotional intensity using FieldVector comparison.
   */
  private applyFieldConstraints(field: FieldVector) {
    if (field.tension > 0.8) {
      this.waves = this.waves.map(node => {
        const t = { ...node.toneVector }
        for (const key in t) {
          t[key as keyof typeof t] *= 0.9
        }
        return { ...node, toneVector: t }
      })
    }
  }

  /**
   * Summarize internal reasoning for debug, log, or narration.
   */
  getRationaleMessage(): string {
    return this.lastRationale
      ? DecisionRationale.explain(this.lastRationale)
      : 'No rationale triggered.'
  }

  /**
   * Expose current high-level state for external systems.
   */
  getBehaviorSignal(): { state: StateTag; rationale?: string } {
    return {
      state: this.currentState,
      rationale: this.lastRationale
        ? DecisionRationale.explain(this.lastRationale)
        : undefined
    }
  }
}