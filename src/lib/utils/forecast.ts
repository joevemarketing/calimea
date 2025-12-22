import type { WeatherInfo } from '@/types/weather';
import type { ConstitutionalArchetype } from '@/types/calimea';
import type { EnergyForecast } from '@/lib/utils/vitality';

/**
 * Generates a time‑aware forecast that also reacts to the current weather.
 * The weather temperature (°C) slightly nudges the hourly scores – warmer
 * temperatures give a small boost, cooler temperatures reduce the score.
 */
export function getDynamicForecast(
    currentScore: number,
    archetype: ConstitutionalArchetype,
    weather: WeatherInfo | null
): EnergyForecast {
    // Current date‑time
    const now = new Date();
    const hour = now.getHours();
    const dayIndex = now.getDay();

    const hours = ['06:00', '12:00', '18:00', '00:00'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const freq = archetype.frequency;

    // Temperature influence – treat null as 0°C
    const temp = weather?.temperature ?? 0;
    // Scale temperature impact to a modest +/-5 range
    const tempImpact = (temp / 10); // e.g., 20°C => +2, -5°C => -0.5

    const hourWeight = (i: number) => {
        const slotHour = parseInt(hours[i].split(':')[0]);
        const distance = Math.abs(slotHour - hour);
        return Math.max(0, 15 - distance * 2) + Math.sin((i + freq) * Math.PI / 4) * 5 + tempImpact;
    };

    const dayWeight = (i: number) => {
        const distance = Math.min(Math.abs(i - dayIndex), 7 - Math.abs(i - dayIndex));
        return Math.max(0, 20 - distance * 3) + Math.cos((i + freq) * Math.PI / 3) * 6;
    };

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
}
