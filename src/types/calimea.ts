/**
 * CALIMEA "Universal Mixer" - Core Type Definitions
 */

export enum FrequencyBand {
    BASS = 'BASS',    // Earth / Stability / DM Strength
    MID = 'MID',     // Water-Fire / Flow / IC Hex
    TREBLE = 'TREBLE' // Air-Wood / Clarity / User Input
}

export interface TemporalCoordinates {
    birthDate: string;
    birthTime: string;
    location: string;
}

export interface ElementMapping {
    chinese: string;
    ayurvedic: string;
    western: string;
    function: string;
}

export interface ConstitutionalArchetype {
    id: string;
    label: string;
    dayMaster: string;
    frequency: number;
    mappings: {
        [key in FrequencyBand]: ElementMapping;
    };
}

export interface MixerState {
    [FrequencyBand.BASS]: number;
    [FrequencyBand.MID]: number;
    [FrequencyBand.TREBLE]: number;
}

export interface UserProfile {
    coordinates: TemporalCoordinates;
    archetype: ConstitutionalArchetype;
}
