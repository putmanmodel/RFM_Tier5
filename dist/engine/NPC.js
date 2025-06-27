"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPC = void 0;
const PUTMANWaveAnalyzer_1 = require("../modules/PUTMANWaveAnalyzer");
const ResonanceEngine_1 = require("./ResonanceEngine");
const WaveformNormalizer_1 = require("../modules/WaveformNormalizer");
const DecisionRationale_1 = require("../modules/DecisionRationale");
/**
 * High-level NPC class that tracks symbolic tone over time,
 * runs self-audits, and outputs behavior signals.
 */
class NPC {
    constructor(id, profile) {
        this.waves = [];
        this.currentState = 'neutral';
        this.lastEvents = [];
        this.id = id;
        this.profile = profile;
    }
    /**
     * Accept new tokens (utterances, inputs) and expand emotional stream.
     */
    perceive(inputTokens, otherAgentWaves = []) {
        const newWaves = PUTMANWaveAnalyzer_1.PUTMANWaveAnalyzer.analyze(inputTokens, this.waves);
        this.waves.push(...newWaves);
        if (otherAgentWaves.length) {
            const field = ResonanceEngine_1.ResonanceEngine.compare(this.waves, otherAgentWaves);
            this.applyFieldConstraints(field);
        }
        const { events, rationale } = WaveformNormalizer_1.WaveformNormalizer.detectEventsAndAudit(this.waves, this.profile, { threshold: 0.3 });
        this.lastEvents = events;
        this.lastRationale = rationale;
        if (rationale) {
            const newState = DecisionRationale_1.DecisionRationale.suggestState(rationale);
            if (newState !== 'none') {
                this.currentState = newState;
            }
        }
    }
    /**
     * Simulate off-screen emotional decay (baseline return).
     */
    normalizeEmotions() {
        this.waves = WaveformNormalizer_1.WaveformNormalizer.normalize(this.waves, this.profile);
    }
    /**
     * Dampen or clamp emotional intensity using FieldVector comparison.
     */
    applyFieldConstraints(field) {
        if (field.tension > 0.8) {
            this.waves = this.waves.map(node => {
                const t = { ...node.toneVector };
                for (const key in t) {
                    t[key] *= 0.9;
                }
                return { ...node, toneVector: t };
            });
        }
    }
    /**
     * Summarize internal reasoning for debug, log, or narration.
     */
    getRationaleMessage() {
        return this.lastRationale
            ? DecisionRationale_1.DecisionRationale.explain(this.lastRationale)
            : 'No rationale triggered.';
    }
    /**
     * Expose current high-level state for external systems.
     */
    getBehaviorSignal() {
        return {
            state: this.currentState,
            rationale: this.lastRationale
                ? DecisionRationale_1.DecisionRationale.explain(this.lastRationale)
                : undefined
        };
    }
}
exports.NPC = NPC;
