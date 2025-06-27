"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionRationale = void 0;
/**
 * Maps internal audit state into human-friendly behavior reasons.
 */
class DecisionRationale {
    /**
     * Format raw audit rationale into a displayable message.
     */
    static explain(r) {
        const template = this.explanations[r.triggerReason]
            ?? 'Unknown emotional state.';
        if (r.triggerReason !== 'ThresholdExceeded') {
            return template;
        }
        // interpolate tones + summary
        const tones = r.flaggedChannels.join(', ');
        return template
            .replace('{tones}', tones)
            .replace('{summary}', r.summary);
    }
    /**
     * Map flagged channels into a suggested behavior state.
     * Returns 'none' if no special state applies.
     */
    static suggestState(r) {
        const c = r.flaggedChannels;
        if (c.includes('anger') && c.includes('suspicion')) {
            return 'hostile';
        }
        if (c.includes('anger') || c.includes('suspicion')) {
            return 'tense';
        }
        if (c.includes('fear') && c.includes('surprise')) {
            return 'hesitant';
        }
        if (c.includes('joy') && !c.includes('fear')) {
            return 'friendly';
        }
        if (c.length === 0) {
            return 'neutral';
        }
        return 'none';
    }
}
exports.DecisionRationale = DecisionRationale;
/** Templates for each trigger reason */
DecisionRationale.explanations = {
    NoData: 'No emotional data available.',
    WithinBounds: 'Agent remained emotionally stable.',
    ThresholdExceeded: 'Behavior shift due to elevated emotional fields: {tones}. {summary}'
};
