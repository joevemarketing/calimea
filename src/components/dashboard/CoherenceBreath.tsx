'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
    { label: 'Inhale', duration: 4, color: 'text-teal-400' },
    { label: 'Hold', duration: 7, color: 'text-orange-400' },
    { label: 'Exhale', duration: 8, color: 'text-slate-400' },
];

export const CoherenceBreath = () => {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    const nextIndex = (phaseIndex + 1) % PHASES.length;
                    setPhaseIndex(nextIndex);
                    return PHASES[nextIndex].duration;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [phaseIndex]);

    const currentPhase = PHASES[phaseIndex];

    return (
        <div className="flex flex-col items-center justify-center space-y-12 py-12">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 border border-slate-800 rounded-full" />

                {/* Pulsing Mandala */}
                <motion.div
                    animate={{
                        scale: phaseIndex === 0 ? [1, 1.5] : phaseIndex === 2 ? [1.5, 1] : 1.5,
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        scale: { duration: currentPhase.duration, ease: "easeInOut" },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                    className={`w-32 h-32 border-2 ${currentPhase.color.replace('text', 'border')} rounded-lg opacity-40`}
                    style={{ transformOrigin: 'center' }}
                />

                <motion.div
                    animate={{
                        scale: phaseIndex === 0 ? [0.8, 1.2] : phaseIndex === 2 ? [1.2, 0.8] : 1.2,
                        rotate: [360, 270, 180, 90, 0],
                    }}
                    transition={{
                        scale: { duration: currentPhase.duration, ease: "easeInOut" },
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" }
                    }}
                    className={`absolute w-24 h-24 border ${currentPhase.color.replace('text', 'border')} rounded-full opacity-20`}
                />

                <div className="absolute flex flex-col items-center">
                    <img src="/logo.png" alt="CALIMÉA" className="w-16 h-16 object-contain opacity-80" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentPhase.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-lg uppercase tracking-[0.4em] font-black ${currentPhase.color}`}
                    >
                        {currentPhase.label}
                    </motion.span>
                </AnimatePresence>
                <span className="text-5xl font-mono tabular-nums text-white">{timeLeft}s</span>
            </div>

            <p className="text-xs text-slate-500 uppercase tracking-widest text-center max-w-[250px]">
                Physiological Sigh Algorithm <br /> 4 : 7 : 8 Sequence
            </p>
        </div>
    );
};
