'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { getArchetypeMock, calculateVitality, calculateInitialMixerValues } from '@/lib/utils/vitality';
import { getDayMasterInfo } from '@/lib/utils/bazi';
import { TemporalCoordinates, FrequencyBand } from '@/types/calimea';
import { Power, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const OnboardingWizard = () => {
    const [step, setStep] = useState(1);
    const [coords, setCoords] = useState<TemporalCoordinates>({
        birthDate: '',
        birthTime: '',
        location: '',
    });
    const [isCalibrating, setIsCalibrating] = useState(false);
    const [isHarmonizing, setIsHarmonizing] = useState(false);
    const [harmonized, setHarmonized] = useState(false);

    const { setUserProfile, initialize, setVitalityScore, updateMixer, userProfile } = useCalimeaStore();
    const { language, setLanguage } = useLanguage();

    const handleNext = () => setStep(step + 1);

    const startCalibration = async () => {
        setIsCalibrating(true);
        // Simulate high-performance calibration
        await new Promise(resolve => setTimeout(resolve, 2000));

        const archetype = getArchetypeMock(coords);
        setUserProfile({ coordinates: coords, archetype });

        // Calculate initial mixer values from BaZi chart
        const baziInfo = getDayMasterInfo(coords.birthDate, coords.birthTime);
        const mixerValues = calculateInitialMixerValues(baziInfo.fourPillars);

        // Auto-set mixer values
        updateMixer(FrequencyBand.BASS, mixerValues.BASS);
        updateMixer(FrequencyBand.MID, mixerValues.MID);
        updateMixer(FrequencyBand.TREBLE, mixerValues.TREBLE);

        // Initial vitality calculation with auto-calculated mixer values
        const initialVitality = calculateVitality(mixerValues.BASS, mixerValues.MID, mixerValues.TREBLE);
        setVitalityScore(initialVitality);

        setIsCalibrating(false);
        handleNext();

        // Start harmonization countdown
        setIsHarmonizing(true);
        setTimeout(() => {
            setIsHarmonizing(false);
            setHarmonized(true);
        }, 2500);
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white p-6">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md space-y-8"
                    >
                        {/* Language Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-end gap-2"
                        >
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${language === 'en'
                                        ? 'bg-[#FFD700] text-black'
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('zh')}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${language === 'zh'
                                        ? 'bg-[#FFD700] text-black'
                                        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
                                    }`}
                            >
                                中文
                            </button>
                        </motion.div>

                        <div className="text-center space-y-6 flex flex-col items-center">
                            <motion.img
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                src="/logo.png"
                                alt="CALIMÉA Logo"
                                className="w-48 h-48 object-contain mb-4"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="space-y-2"
                            >
                                <p className="text-slate-300 text-xs tracking-wider font-light max-w-[280px] leading-relaxed mx-auto">
                                    Systemic Vitality Intelligence for Executive Excellence
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="space-y-6 bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800/50 backdrop-blur-2xl shadow-2xl shadow-black/50"
                        >
                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                                    <Calendar size={12} /> Temporal Origin Point (Date)
                                </label>
                                <input
                                    type="date"
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none transition-colors"
                                    value={coords.birthDate}
                                    onChange={(e) => setCoords({ ...coords, birthDate: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                                    <Clock size={12} /> Temporal Origin Point (Time)
                                </label>
                                <input
                                    type="time"
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none transition-colors"
                                    value={coords.birthTime}
                                    onChange={(e) => setCoords({ ...coords, birthTime: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-slate-300 flex items-center gap-2">
                                    <Globe size={12} /> Geographic Resonance (Location)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. London, UK"
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none transition-colors placeholder:text-slate-500"
                                    value={coords.location}
                                    onChange={(e) => setCoords({ ...coords, location: e.target.value })}
                                />
                            </div>

                            <button
                                onClick={startCalibration}
                                disabled={!coords.birthDate || !coords.birthTime || !coords.location || isCalibrating}
                                className="w-full py-4 bg-teal-500/10 border border-teal-500/50 text-teal-400 rounded-lg uppercase tracking-[0.2em] text-xs font-bold hover:bg-teal-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {isCalibrating ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Power size={16} />
                                    </motion.div>
                                ) : "Initialize Calibration"}
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 max-w-lg"
                    >
                        <div className="space-y-4">
                            <h2 className="text-sm uppercase tracking-[0.3em] text-[#FFD700]">The Generating Cycle Initialized</h2>
                            <div className="p-8 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-full inline-block">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.15, 1],
                                        filter: ["drop-shadow(0 0 0px rgba(255,215,0,0))", "drop-shadow(0 0 20px rgba(255,215,0,0.3))", "drop-shadow(0 0 0px rgba(255,215,0,0))"]
                                    }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    <img src="/logo.png" alt="CALIMÉA" className="w-24 h-24 object-contain" />
                                </motion.div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-500 uppercase text-[10px] tracking-widest">Day Master Identified</p>
                                <p className="text-2xl font-black text-[#FFD700] uppercase">{userProfile?.archetype.dayMaster}</p>
                                <p className="text-[10px] italic text-slate-300">{userProfile?.archetype.label}</p>
                            </div>

                            {/* Automated Harmonization Section */}
                            <div className="space-y-6 max-w-xs mx-auto pt-6">
                                <div className="space-y-3">
                                    <p className="text-slate-500 uppercase text-[10px] tracking-widest">
                                        {harmonized ? "System Harmonized" : "Coherence Synchronization"}
                                    </p>

                                    <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden relative">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: harmonized ? "100%" : "60%" }}
                                            transition={{ duration: 2.5, ease: "easeInOut" }}
                                            className="h-full bg-gradient-to-r from-[#B8860B] to-[#FFD700]"
                                        />
                                        {!harmonized && (
                                            <motion.div
                                                animate={{ x: [-20, 300] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                className="absolute top-0 left-0 w-8 h-full bg-white/20 blur-sm"
                                            />
                                        )}
                                    </div>

                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest animate-pulse">
                                        {isHarmonizing ? "Aligning Primary Frequencies..." : harmonized ? "Target Frequency Reached" : "Initializing..."}
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {harmonized && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-2"
                                        >
                                            <p className="text-[#FFD700] text-[10px] uppercase tracking-widest font-bold">
                                                Love & Gratitude Frequency Matched
                                            </p>
                                            <p className="text-[8px] text-slate-500 italic">
                                                "The most beautiful water crystals are formed by Love & Gratitude"
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                initialize();
                                window.location.href = '/dashboard';
                            }}
                            disabled={!harmonized}
                            className={`px-12 py-5 font-black uppercase tracking-[0.4em] text-xs transition-all rounded-none shadow-[0_0_30px_rgba(255,215,0,0.2)] disabled:opacity-20 disabled:grayscale ${harmonized ? 'bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black hover:scale-105' : 'bg-slate-800 text-slate-400'
                                }`}
                        >
                            {harmonized ? "Access Dashboard" : "Syncing Key..."}
                        </button>
                        <p className="text-[8px] text-slate-500 uppercase tracking-[0.6em] mt-4">Your Daily Dose of Positive Energy</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
