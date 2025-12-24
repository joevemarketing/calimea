export interface VitalityGuidance {
    level: 'High' | 'Medium' | 'Low';
    label: string;
    dos: string[];
    donts: string[];
    color: string;
}

export function getVitalityGuidance(score: number): VitalityGuidance {
    if (score > 75) {
        return {
            level: 'High',
            label: 'Peak Performance',
            color: '#FFD700', // Gold
            dos: [
                'Finalize high-stakes strategic decisions',
                'Lead major transformation or vision sessions',
                'Engage in intensive creative brainstorming'
            ],
            donts: [
                'Wasting peak energy on routine admin',
                'Neglecting to document high-level insights',
                'Ignoring the need for scheduled cool-downs'
            ]
        };
    } else if (score >= 40) {
        return {
            level: 'Medium',
            label: 'Sustainable Flow',
            color: '#2DD4BF', // Teal
            dos: [
                'Execute operational tasks & management',
                'Maintain team alignment & communication',
                'Focus on project milestones & stability'
            ],
            donts: [
                'Over-extending into speculative risks',
                'Ignoring subtle signs of mental fatigue',
                'Skipping mid-day synchronization breaks'
            ]
        };
    } else {
        return {
            level: 'Low',
            label: 'Structural Preservation',
            color: '#F87171', // Red/Coral
            dos: [
                'Prioritize deep systemic recovery',
                'Delegate non-essential operational duties',
                'Focus on low-bandwidth coordination'
            ],
            donts: [
                'Engaging in high-conflict negotiations',
                'Making long-term capital commitments',
                'Pushing through physical exhaustion'
            ]
        };
    }
}
