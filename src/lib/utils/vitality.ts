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
    // 1️⃣ Current date‑time information
    const now = new Date();
    const hour = now.getHours(); // 0‑23
    const dayIndex = now.getDay(); // 0 (Sun)‑6 (Sat)

    // 2️⃣ Static slots for UI layout
    const hours = ['06:00', '12:00', '18:00', '00:00'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // 3️⃣ Weight functions that incorporate real time + archetype frequency
    const freq = archetype.frequency;

    // Hour weight: boost when the slot hour is close to the current hour
    const hourWeight = (i: number) => {
        const slotHour = parseInt(hours[i].split(':')[0]); // 6,12,18,0
        const distance = Math.abs(slotHour - hour);
        // Smaller distance → larger boost, plus a sinusoidal component from frequency
        return Math.max(0, 15 - distance * 2) + Math.sin((i + freq) * Math.PI / 4) * 5;
    };

    // Day weight: boost for the current weekday
    const dayWeight = (i: number) => {
        const distance = Math.min(
            Math.abs(i - dayIndex),
            7 - Math.abs(i - dayIndex) // wrap‑around distance
        );
        return Math.max(0, 20 - distance * 3) + Math.cos((i + freq) * Math.PI / 3) * 6;
    };

    // 4️⃣ Build forecast arrays using the dynamic weights
    const hourly = hours.map((h, i) => ({
        time: h,
        score: Math.min(100, Math.max(0, Math.round(currentScore + hourWeight(i))))
    }));

    const daily = days.map((d, i) => ({
        day: d,
        score: Math.min(100, Math.max(0, Math.round(currentScore + dayWeight(i))))
    }));

    // 5️⃣ Weekly trend – keep the simple frequency‑based rule
    const weeklyTrend = freq > 0.75 ? 'Expansion Cycle – Momentum builds' : 'Consolidation Cycle – Stabilizing';

    return { hourly, daily, weekly: weeklyTrend };
};
