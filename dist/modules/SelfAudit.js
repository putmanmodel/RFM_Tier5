"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfAudit = void 0;
class SelfAudit {
    /**
     * Check the latest wave node against the profile’s caps
     * and produce a Rationale.
     *
     * @param waves   full history of WaveNodes (we inspect only the last)
     * @param profile emotional caps & settings for this agent
     */
    static review(waves, profile) {
        const now = Date.now();
        const latest = waves[waves.length - 1];
        if (!latest) {
            return {
                flaggedChannels: [],
                triggerReason: 'NoData',
                timestamp: now,
                summary: 'No wave data available.'
            };
        }
        const overLimit = Object.keys(latest.toneVector)
            .filter(channel => latest.toneVector[channel] > profile.caps[channel]);
        const triggerReason = overLimit.length > 0
            ? 'ThresholdExceeded'
            : 'WithinBounds';
        const summary = overLimit.length > 0
            ? `Tone channels exceeded cap: ${overLimit.join(', ')}.`
            : 'All channels within defined caps.';
        return {
            flaggedChannels: overLimit,
            triggerReason,
            timestamp: now,
            summary
        };
    }
}
exports.SelfAudit = SelfAudit;
