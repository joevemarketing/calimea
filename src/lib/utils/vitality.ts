import { TemporalCoordinates, ConstitutionalArchetype, FrequencyBand } from '@/types/calimea';

export const getArchetypeMock = (coords: TemporalCoordinates): ConstitutionalArchetype => {
    const seed = coords.birthDate.length + coords.location.length;

    const archetypes: ConstitutionalArchetype[] = [
        {
            id: 'yang_fire',
            label: 'The Illuminator',
            dayMaster: 'Yang Fire',
            frequency: 0.88,
            mappings: {
                [FrequencyBand.BASS]: {
                    chinese: 'Earth', ayurvedic: 'Prithvi', western: 'Earth',
                    function: 'Stability & Grounding for Family/Career'
                },
                [FrequencyBand.MID]: {
                    chinese: 'Water/Fire', ayurvedic: 'Jal/Agni', western: 'Water/Fire',
                    function: 'Flow & Transformation of Wealth Abundance'
                },
                [FrequencyBand.TREBLE]: {
                    chinese: 'Wood/Metal', ayurvedic: 'Vayu/Akasha', western: 'Air/Spirit',
                    function: 'Subtle Container for Mindset & Executive Focus'
                }
            }
        },
        {
            id: 'yin_water',
            label: 'The Flowing Bridge',
            dayMaster: 'Yin Water',
            frequency: 0.72,
            mappings: {
                [FrequencyBand.BASS]: {
                    chinese: 'Earth', ayurvedic: 'Prithvi', western: 'Earth',
                    function: 'Core Stability & Foundation'
                },
                [FrequencyBand.MID]: {
                    chinese: 'Water', ayurvedic: 'Jal', western: 'Water',
                    function: 'Wealth Flow & Metabolic Rhythm'
                },
                [FrequencyBand.TREBLE]: {
                    chinese: 'Metal', ayurvedic: 'Akasha', western: 'Spirit',
                    function: 'Mindset Container & Professional Performance'
                }
            }
        }
    ];

    return archetypes[seed % archetypes.length];
};

export const calculateVitality = (bass: number, mid: number, treble: number): number => {
    return Math.round((bass * 0.5) + (mid * 0.3) + (treble * 0.2));
};

export interface EnergyForecast {
    hourly: { time: string; score: number }[];
    daily: { day: string; score: number }[];
    weekly: string;
}

export const getEnergyForecast = (currentScore: number, archetype: ConstitutionalArchetype): EnergyForecast => {
    const hours = ['06:00', '12:00', '18:00', '00:00'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Weight factors based on archetype frequency (higher frequency -> stronger peaks)
    const freq = archetype.frequency;
    const hourWeight = (i: number) => Math.sin((i + freq) * Math.PI / 4) * 10 + 5; // 5-15 range
    const dayWeight = (i: number) => Math.cos((i + freq) * Math.PI / 3) * 12 + 8; //  -4 to 20

    const hourly = hours.map((h, i) => ({
        time: h,
        score: Math.min(100, Math.max(0, Math.round(currentScore + hourWeight(i))))
    }));

    const daily = days.map((d, i) => ({
        day: d,
        score: Math.min(100, Math.max(0, Math.round(currentScore + dayWeight(i))))
    }));

    const weeklyTrend = freq > 0.75 ? 'Expansion Cycle – Momentum builds' : 'Consolidation Cycle – Stabilizing';

    return { hourly, daily, weekly: weeklyTrend };
};
