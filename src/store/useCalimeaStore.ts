import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { MixerState, UserProfile, FrequencyBand } from '../types/calimea'
import { calculateVitality } from '../lib/utils/vitality'

interface CalimeaStore {
    userProfile: UserProfile | null;
    mixerState: MixerState;
    vitalityScore: number;
    isInitialized: boolean;
    hasHydrated: boolean;
    preferences: {
        hapticFeedback: boolean;
        soundEnabled: boolean;
        lowEntropyMode: boolean;
    };

    setUserProfile: (profile: UserProfile) => void;
    updateMixer: (band: FrequencyBand, value: number) => void;
    setVitalityScore: (score: number) => void;
    initialize: () => void;
    setHasHydrated: (state: boolean) => void;
    updatePreferences: (prefs: Partial<CalimeaStore['preferences']>) => void;
    reset: () => void;
}

export const useCalimeaStore = create<CalimeaStore>()(
    persist(
        (set, get) => ({
            userProfile: null,
            mixerState: {
                [FrequencyBand.BASS]: 70,
                [FrequencyBand.MID]: 60,
                [FrequencyBand.TREBLE]: 80,
            },
            vitalityScore: 69,
            isInitialized: false,
            hasHydrated: false,
            preferences: {
                hapticFeedback: true,
                soundEnabled: true,
                lowEntropyMode: false,
            },

            setUserProfile: (profile) => set({ userProfile: profile }),

            updateMixer: (band, value) => {
                const newState = {
                    ...get().mixerState,
                    [band]: value
                };
                const newScore = calculateVitality(
                    newState[FrequencyBand.BASS],
                    newState[FrequencyBand.MID],
                    newState[FrequencyBand.TREBLE]
                );
                set({ mixerState: newState, vitalityScore: newScore });
            },

            setVitalityScore: (score) => set({ vitalityScore: score }),

            initialize: () => set({ isInitialized: true }),
            setHasHydrated: (state) => set({ hasHydrated: state }),

            updatePreferences: (prefs) => set((state) => ({
                preferences: { ...state.preferences, ...prefs }
            })),

            reset: () => set({
                userProfile: null,
                isInitialized: false,
                mixerState: {
                    [FrequencyBand.BASS]: 50,
                    [FrequencyBand.MID]: 50,
                    [FrequencyBand.TREBLE]: 50,
                },
                vitalityScore: 0
            }),
        }),
        {
            name: 'calimea-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            }
        }
    )
)
