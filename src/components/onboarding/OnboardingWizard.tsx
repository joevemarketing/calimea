'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { getArchetypeMock, calculateVitality, calculateInitialMixerValues } from '@/lib/utils/vitality';
import { getDayMasterInfo } from '@/lib/utils/bazi';
import { TemporalCoordinates, FrequencyBand } from '@/types/calimea';
import { Power, Globe, Clock, Calendar } from 'lucide-react';

export const OnboardingWizard = () => {
    const [step, setStep] = useState(1);
    const [coords, setCoords] = useState<TemporalCoordinates>({
        birthDate: '',
        birthTime: '',
        location: '',
    });
    const [masterCode, setMasterCode] = useState('');
    const [isCalibrating, setIsCalibrating] = useState(false);

    const { setUserProfile, initialize, setVitalityScore, updateMixer, userProfile } = useCalimeaStore();

    const handleNext = () => setStep(step + 1);

    const startCalibration = async () => {
        setIsCalibrating(true);
        // Simulate high-performance calibration
        await new Promise(resolve => setTimeout(resolve, 3000));

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
                        <div className="text-center space-y-4 flex flex-col items-center">
                            <img src="/logo.png" alt="CALIMÉA Logo" className="w-24 h-24 object-contain mb-2" />
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-[0.2em] text-[#FFD700]">CALIMÉA</h1>
                                <p className="text-[10px] uppercase tracking-[0.5em] text-[#FFD700]/60">珂 谧 雅</p>
                            </div>
                            <p className="text-slate-400 text-sm italic">Calibrating baseline chronotype for Executive Excellence...</p>
                        </div>

                        <div className="space-y-4 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-xl">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2">
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
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2">
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
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                    <Globe size={12} /> Geographic Resonance (Location)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. London, UK"
                                    className="w-full bg-black/40 border border-slate-700 rounded-lg p-3 text-sm focus:border-teal-500 outline-none transition-colors placeholder:text-slate-700"
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
                        </div>
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
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    <img src="/logo.png" alt="CALIMÉA" className="w-24 h-24 object-contain" />
                                </motion.div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-slate-500 uppercase text-[10px] tracking-widest">Day Master Identified</p>
                                <p className="text-2xl font-black text-[#FFD700] uppercase">{userProfile?.archetype.dayMaster}</p>
                                <p className="text-[10px] italic text-slate-400">{userProfile?.archetype.label}</p>
                            </div>

                            {/* Master Key Input Section */}
                            <div className="space-y-4 max-w-xs mx-auto">
                                <div className="space-y-2">
                                    <p className="text-slate-500 uppercase text-[10px] tracking-widest">Identify Master Key</p>
                                    <p className="text-[8px] text-slate-600 italic leading-relaxed">
                                        "What is the highest vibrational frequency in the universe?"
                                    </p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Enter the universal frequency..."
                                    className="w-full bg-black/40 border border-[#FFD700]/20 rounded-lg p-3 text-sm focus:border-[#FFD700] outline-none transition-colors text-center uppercase tracking-widest placeholder:text-slate-800"
                                    value={masterCode}
                                    onChange={(e) => setMasterCode(e.target.value)}
                                />

                                {/* Progressive Hints */}
                                {masterCode.length > 0 && masterCode.toUpperCase() !== 'LOVE & GRATITUDE' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-2"
                                    >
                                        {masterCode.length >= 3 && !masterCode.toUpperCase().includes('LOVE') && (
                                            <p className="text-[8px] text-teal-400 italic">
                                                💡 Hint: Dr. Emoto's water crystals form the most beautiful patterns with this emotion...
                                            </p>
                                        )}
                                        {masterCode.toUpperCase().includes('LOVE') && !masterCode.toUpperCase().includes('GRATITUDE') && (
                                            <p className="text-[8px] text-teal-400 italic">
                                                ✨ Almost there! Combine it with appreciation and thankfulness...
                                            </p>
                                        )}
                                    </motion.div>
                                )}

                                {/* Success Message */}
                                {masterCode.toUpperCase() === 'LOVE & GRATITUDE' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-2"
                                    >
                                        <p className="text-[#FFD700] text-[10px] uppercase tracking-widest font-bold">
                                            ✓ Supportive Generating Cycle Confirmed
                                        </p>
                                        <p className="text-[8px] text-slate-500 italic">
                                            "The most beautiful water crystals are formed by Love & Gratitude" - Dr. Masaru Emoto
                                        </p>
                                    </motion.div>
                                )}

                                {/* Alternative Accepted Answers */}
                                {(masterCode.toUpperCase() === 'LOVE' || masterCode.toUpperCase() === 'GRATITUDE') && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-teal-400 text-[10px] uppercase tracking-widest font-bold"
                                    >
                                        ✓ Partial Resonance Detected
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                initialize();
                                window.location.href = '/dashboard';
                            }}
                            disabled={masterCode.toUpperCase() !== 'LOVE' && masterCode.toUpperCase() !== 'GRATITUDE' && masterCode.toUpperCase() !== 'LOVE & GRATITUDE'}
                            className="px-12 py-5 bg-gradient-to-r from-[#B8860B] to-[#FFD700] text-black font-black uppercase tracking-[0.4em] text-xs hover:brightness-110 transition-all rounded-none shadow-[0_0_30px_rgba(255,215,0,0.2)] disabled:opacity-20 disabled:grayscale"
                        >
                            Activate Coherence Key
                        </button>
                        <p className="text-[8px] text-slate-500 uppercase tracking-[0.6em] mt-4">Your Daily Dose of Positive Energy</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
