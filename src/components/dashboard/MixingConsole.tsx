'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { FrequencyBand } from '@/types/calimea';

const SLIDER_CONFIG = [
    { band: FrequencyBand.BASS, label: 'Bass', sub: 'Stability', color: 'bg-[#8B4513]', glow: 'shadow-[#8B4513]/40' },
    { band: FrequencyBand.MID, label: 'Mid', sub: 'Flow', color: 'bg-[#B8860B]', glow: 'shadow-[#B8860B]/40' },
    { band: FrequencyBand.TREBLE, label: 'Treble', sub: 'Clarity', color: 'bg-[#FFD700]', glow: 'shadow-[#FFD700]/40' },
];

export const MixingConsole = () => {
    const { mixerState, updateMixer, vitalityScore, userProfile } = useCalimeaStore();
    const isHighEntropy = vitalityScore < 40;

    return (
        <div className="bg-black/60 border border-slate-800 p-8 rounded-3xl backdrop-blur-3xl relative overflow-hidden">
            {/* Noise Overlay for High Entropy */}
            {isHighEntropy && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.05, 0.1, 0.05] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"
                />
            )}

            <div className="flex justify-around items-end h-[400px] gap-4">
                {SLIDER_CONFIG.map((cfg) => {
                    const mapping = userProfile?.archetype?.mappings?.[cfg.band];
                    return (
                        <div key={cfg.band} className="flex flex-col items-center gap-4 h-full">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-[11px] uppercase tracking-[0.2em] text-[#FFD700] font-black">{cfg.sub}</span>
                                <span className="text-sm uppercase tracking-widest text-white font-bold">{cfg.label}</span>

                                {/* Elemental Badge */}
                                <div className="mt-2 space-y-1 px-4">
                                    <div className="text-[10px] uppercase tracking-tighter text-slate-300 font-medium">
                                        {mapping?.chinese} • {mapping?.ayurvedic} • {mapping?.western}
                                    </div>
                                    <div className="text-[9px] uppercase tracking-widest text-[#FFD700]/40 leading-tight">
                                        {mapping?.function}
                                    </div>
                                </div>
                            </div>

                            {/* DAW Slider Track */}
                            <div className="relative w-12 h-full bg-slate-900/80 rounded-full border border-slate-800 flex items-end p-1 shadow-inner group">
                                <motion.div
                                    className={`w-full rounded-full ${cfg.color} relative shadow-[0_0_20px] ${cfg.glow}`}
                                    animate={{ height: `${mixerState[cfg.band]}%` }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    {/* Visual Glow for the handle area */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-white/40 blur-[1px]" />

                                    {/* Reactive Glow Aura */}
                                    <motion.div
                                        animate={{
                                            opacity: (mixerState[cfg.band] / 100) * 0.8,
                                            scale: 1 + (mixerState[cfg.band] / 200)
                                        }}
                                        className={`absolute inset-0 blur-2xl rounded-full ${cfg.color.replace('bg-', 'bg-')}`}
                                    />

                                    {/* Haptic Handle */}
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-lg shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/20 z-10"
                                    >
                                        <div className="w-4 h-[2px] bg-black/40 rounded-full" />
                                    </motion.div>
                                </motion.div>

                                {/* Invisible range input for interaction */}
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={mixerState[cfg.band]}
                                    onChange={(e) => updateMixer(cfg.band, parseInt(e.target.value))}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    style={{ appearance: 'none', writingMode: 'bt-lr' as any }}
                                />
                            </div>

                            <div className="font-mono text-xs text-slate-300 bg-black/40 px-2 py-1 rounded border border-slate-800">
                                {mixerState[cfg.band].toString().padStart(3, '0')}%
                            </div>
                        </div>
                    );
                })}
            </div>

            {isHighEntropy && (
                <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mt-8 text-center text-red-500 text-[10px] uppercase tracking-[0.5em] font-black"
                >
                    Signal Distortion Detected
                </motion.div>
            )}
        </div>
    );
};
