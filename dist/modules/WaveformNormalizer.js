"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveformNormalizer = void 0;
const SelfAudit_1 = require("./SelfAudit");
class WaveformNormalizer {
    /**
     * (Stub) Normalize the raw WaveNode[] into a uniform scale.
     * Replace this stub with your real logic using w.symbolicScore.
     */
    static normalize(waves, profile) {
        return waves;
    }
    /**
     * Find where the waveform crosses an audit threshold.
     * Uses the real .symbolicScore and .timestamp fields.
     */
    static detectEvents(waves, threshold) {
        const events = [];
        let last = waves[0]?.symbolicScore ?? 0;
        for (const n of waves) {
            const delta = n.symbolicScore - last;
            if (Math.abs(delta) >= threshold) {
                events.push({ delta, time: n.timestamp });
            }
            last = n.symbolicScore;
        }
        return events;
    }
    /**
     * Normalize, detect events, then optionally run a SelfAudit.
     */
    static detectEventsAndAudit(waves, profile, opts = {}) {
        const { threshold = 0.4, minEventsToAudit = 2, maxDeltaToAudit = 0.6 } = opts;
        const normalized = WaveformNormalizer.normalize(waves, profile);
        const events = WaveformNormalizer.detectEvents(normalized, threshold);
        let rationale;
        if (events.length >= minEventsToAudit ||
            events.some(e => Math.abs(e.delta) >= maxDeltaToAudit)) {
            // Pass back the normalized waveform, not the bare events
            rationale = SelfAudit_1.SelfAudit.review(normalized, profile);
        }
        return { events, rationale };
    }
}
exports.WaveformNormalizer = WaveformNormalizer;
