import type { WeatherInfo } from '@/types/weather';

/**
 * Simple weather fetch using the public wttr.in service.
 * It returns the current temperature (°C) and a short condition description.
 * No API key is required – the service is free for low‑volume use.
 */
export async function fetchWeather(location: string): Promise<WeatherInfo> {
    try {
        const response = await fetch(`https://wttr.in/${encodeURIComponent(location)}?format=j1`);
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        // wttr.in returns an array of weather reports; we take the first hour of today.
        const current = data.current_condition?.[0];
        const tempC = current?.temp_C ? Number(current.temp_C) : null;
        const condition = current?.weatherDesc?.[0]?.value ?? '';
        return { temperature: tempC, condition };
    } catch (e) {
        console.error('Failed to fetch weather:', e);
        return { temperature: null, condition: '' };
    }
}
