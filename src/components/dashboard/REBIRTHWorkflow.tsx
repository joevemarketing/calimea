'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { CoherenceBreath } from './CoherenceBreath';
import { getDynamicForecast } from '@/lib/utils/forecast';
import { fetchWeather } from '@/lib/utils/weather';
import type { WeatherInfo } from '@/types/weather';
import { useLanguage } from '@/contexts/LanguageContext';
import { getVitalityGuidance } from '@/lib/utils/guidance';
import {
    Scan,
    Activity,
    Wind,
    Zap,
    ShieldAlert,
    Network,
    Globe,
    Clock,
    Info,
    CheckCircle2,
    XCircle
} from 'lucide-react';


interface Tab {
    id: string;
    letter: string;
    wordKey: string;
    icon: any;
}

const TABS: Tab[] = [
    { id: 'recognize', letter: 'R', wordKey: 'rebirth.recognize', icon: Activity },
    { id: 'ease', letter: 'E', wordKey: 'rebirth.ease', icon: Wind },
    { id: 'balance', letter: 'B', wordKey: 'rebirth.balance', icon: Zap },
    { id: 'intention', letter: 'I', wordKey: 'rebirth.intention', icon: Wind },
    { id: 'rebuild', letter: 'R', wordKey: 'rebirth.rebuild', icon: Scan },
    { id: 'transform', letter: 'T', wordKey: 'rebirth.transform', icon: Activity },
    { id: 'hold', letter: 'H', wordKey: 'rebirth.hold', icon: Network },
];

const PROTOCOL_DATA: Record<string, { instruction: string; action: string; duration: number }> = {
    'Energy Cloud': {
        instruction: 'Mist the Refreshing Energy Spray 30cm from face.',
        action: 'Close eyes and inhale the citrus-gold notes.',
        duration: 3000
    },
    'Stabilization Serum': {
        instruction: 'Apply Calm Essence to your wrist pulse points.',
        action: 'Press wrists together and breathe into the heart center.',
        duration: 4000
    },
    'Deep Reset': {
        instruction: 'Initialize full-system Detox & Luck-Cleansing.',
        action: 'Focus on releasing stagnant energy from the day.',
        duration: 5000
    },
    'Pre-Boardroom Focus': {
        instruction: 'Shift to Executive Presence frequency.',
        action: 'Inhale deeply. Picture your outcome as already realized.',
        duration: 4000
    },
    'Leadership Offsites': {
        instruction: 'Synchronizing collective field frequency.',
        action: 'Expand your awareness to the entire room.',
        duration: 6000
    },
    'Team Energy Activation': {
        instruction: 'Deploying Team Coherence Signal.',
        action: 'Center yourself to act as the energetic anchor.',
        duration: 4000
    },
    'VIP Gifting Suites': {
        instruction: 'Presenting the High-Fidelity Gift Experience.',
        action: 'Share the CALIM\u00c9A story of systemic recovery.',
        duration: 3000
    }
};

export const REBIRTHWorkflow = () => {
    const [activeTab, setActiveTab] = useState('recognize');
    const [activeProtocol, setActiveProtocol] = useState<string | null>(null);
    const { vitalityScore, preferences, userProfile } = useCalimeaStore();
    const { t } = useLanguage();
    const [weather, setWeather] = useState<WeatherInfo | null>(null);
    // Fetch current weather based on user location (fallback to London)
    useEffect(() => {
        const loc = userProfile?.coordinates?.location || 'London';
        fetchWeather(loc).then(setWeather);
    }, [userProfile?.coordinates?.location]);

    const activateProtocol = (name: string) => {
        setActiveProtocol(name);
        if (preferences.hapticFeedback && window.navigator.vibrate) {
            window.navigator.vibrate([10, 50, 10]);
        }
        const data = PROTOCOL_DATA[name];
        setTimeout(() => setActiveProtocol(null), data?.duration || 4000);
    };

    const currentProtocol = activeProtocol ? PROTOCOL_DATA[activeProtocol] : null;
    const forecast = userProfile ? getDynamicForecast(vitalityScore, userProfile.archetype, weather) : {
        hourly: [],
        daily: [],
        weekly: 'Awaiting Calibration'
    };


    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 relative">
            {/* Executive Protocol Directive Overlay */}
            <AnimatePresence>
                {activeProtocol && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            className="relative max-w-xl w-full text-center space-y-12"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="mx-auto w-24 h-24 border-2 border-[#FFD700] rounded-full flex items-center justify-center text-[#FFD700]"
                                >
                                    <Zap size={40} />
                                </motion.div>
                                <div className="space-y-2">
                                    <h4 className="text-xs uppercase tracking-[0.5em] text-[#FFD700]/60">System Protocol Active</h4>
                                    <h2 className="text-5xl font-black uppercase tracking-tighter text-white">{activeProtocol}</h2>
                                </div>
                            </div>

                            <div className="space-y-8 bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-md">
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-widest text-[#FFD700] font-bold">Instruction</p>
                                    <p className="text-2xl text-white font-light">{currentProtocol?.instruction}</p>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Action Directive</p>
                                    <p className="text-xl text-slate-300 italic">"{currentProtocol?.action}"</p>
                                </div>

                                <div className="pt-4">
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden w-48 mx-auto">
                                        <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: currentProtocol?.duration ? currentProtocol.duration / 1000 : 4, ease: "linear" }}
                                            className="h-full bg-[#FFD700]"
                                        />
                                    </div>
                                    <p className="text-[8px] uppercase tracking-[0.3em] text-slate-600 mt-4 italic font-bold">Deterministic Optimization in Progress...</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* 7-Stage Tab Navigation */}
            <div className="overflow-x-auto overflow-y-hidden border-b border-slate-800/50 bg-gradient-to-b from-black/20 to-transparent scrollbar-hide">
                <div className="flex min-w-max md:grid md:grid-cols-7">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`group relative flex flex-col items-center gap-2 md:gap-3 py-6 md:py-10 px-4 md:px-2 min-w-[85px] md:min-w-0 border-b-3 transition-all duration-500 ${isActive
                                    ? 'border-[#FFD700] bg-gradient-to-b from-[#FFD700]/5 to-transparent'
                                    : 'border-transparent hover:border-[#FFD700]/40 hover:bg-gradient-to-b hover:from-[#FFD700]/3 hover:to-transparent'
                                    }`}
                            >
                                {/* Icon with elegant glow effect */}
                                <div className={`transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                                    <Icon
                                        size={28}
                                        className={`md:w-9 md:h-9 transition-all duration-500 ${isActive
                                            ? 'text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]'
                                            : 'text-[#FFD700]/70 group-hover:text-[#FFD700] group-hover:drop-shadow-[0_0_6px_rgba(255,215,0,0.3)]'
                                            }`}
                                    />
                                </div>

                                {/* Letter & Word with refined typography */}
                                <div className="text-center space-y-0.5">
                                    <div className={`text-2xl md:text-3xl font-black tracking-tight transition-all duration-500 ${isActive
                                        ? 'text-[#FFD700] drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                                        : 'text-[#FFD700]/80 group-hover:text-[#FFD700]'
                                        }`}>
                                        {tab.letter}
                                    </div>
                                    <div className={`text-[9px] md:text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-500 ${isActive
                                        ? 'text-[#FFD700]/90'
                                        : 'text-[#FFD700]/60 group-hover:text-[#FFD700]/80'
                                        }`}>
                                        {t(tab.wordKey)}
                                    </div>
                                </div>

                                {/* LayoutId Indicator (Sliding underline) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                                    />
                                )}

                                {isActive && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[450px] bg-slate-900/30 rounded-3xl p-8 border border-slate-800 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                    {activeTab === 'recognize' && (
                        <motion.div key="recognize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="space-y-1 md:space-y-2">
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light uppercase tracking-tighter text-white">Stage 1: Systemic Recognition</h3>
                                    <p className="text-[10px] md:text-xs lg:text-sm text-slate-300 uppercase tracking-widest">Cross-philosophical Resonance Analysis (BaZi, Ayurvedic, Western)</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <div className={`text-3xl md:text-4xl lg:text-5xl font-mono ${vitalityScore < 40 ? 'text-red-500' : 'text-[#FFD700]'}`}>{vitalityScore}%</div>
                                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mt-1">Real-time Vitality Score</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                {/* Hourly Insight */}
                                <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-[#FFD700]">Hourly Pulse</span>
                                        <span className="relative group">
                                            <Info size={16} className="text-[#FFD700]" />
                                            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black/80 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Predicted energy scores for the next few hours based on your current V‑Score and archetype frequency.
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-1 h-24 md:h-32 pt-2">
                                        {forecast.hourly.map((h: { time: string; score: number }, i: number) => (
                                            <div key={i} className="flex-1 h-full flex flex-col items-center gap-2">
                                                <div className="relative w-full flex-1 group/bar transition-all duration-300 flex flex-col justify-end">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${h.score}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className="w-full bg-gradient-to-t from-[#B8860B]/60 to-[#FFD700] rounded-t-sm relative shadow-[0_0_10px_rgba(255,215,0,0.2)] group-hover/bar:shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                                                    />
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-mono tracking-tighter">{h.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed italic">Peak operational capacity identified at 12:00. Preparing for late‑day consolidation.</p>
                                </div>

                                {/* Daily Forecast */}
                                <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-teal-400">Daily Forecast</span>
                                        <span className="relative group">
                                            <Info size={16} className="text-teal-400" />
                                            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black/80 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Forecasted V‑Score for each day of the week, helping you schedule high‑impact activities.
                                            </div>
                                        </span>
                                        <Clock size={16} className="text-teal-400" />
                                    </div>
                                    <div className="flex items-end gap-1 h-24 md:h-32 pt-2">
                                        {forecast.daily.map((d: { day: string; score: number }, i: number) => (
                                            <div key={i} className="flex-1 h-full flex flex-col items-center gap-2">
                                                <div className="relative w-full flex-1 group/bar transition-all duration-300 flex flex-col justify-end">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${d.score}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className="w-full bg-gradient-to-t from-teal-600/60 to-teal-400 rounded-t-sm relative shadow-[0_0_10px_rgba(45,212,191,0.2)] group-hover/bar:shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                                                    />
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-mono tracking-tighter">{d.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed italic">Tomorrow: Predicted 15% increase in Fire elements. Optimal for leadership activity.</p>
                                </div>

                                {/* System Directives */}
                                <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase tracking-widest text-[#FFD700]">{t('forecast.systemDirectives')}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700]">
                                                {t(`forecast.${getVitalityGuidance(vitalityScore).level === 'High' ? 'peakPerformance' : getVitalityGuidance(vitalityScore).level === 'Medium' ? 'sustainableFlow' : 'structuralPreservation'}`)}
                                            </span>
                                            <Zap size={16} className="text-[#FFD700]" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="text-[10px] uppercase tracking-wider text-teal-400 font-bold flex items-center gap-2">
                                                <CheckCircle2 size={12} /> {t('forecast.strategicBoost')}
                                            </div>
                                            <div className="space-y-1">
                                                {getVitalityGuidance(vitalityScore).dos.map((doItem, idx) => (
                                                    <div key={idx} className="text-xs text-slate-300 leading-tight">
                                                        • {doItem}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-[10px] uppercase tracking-wider text-red-400 font-bold flex items-center gap-2">
                                                <XCircle size={12} /> {t('forecast.systemRisks')}
                                            </div>
                                            <div className="space-y-1">
                                                {getVitalityGuidance(vitalityScore).donts.map((dontItem, idx) => (
                                                    <div key={idx} className="text-xs text-slate-300 leading-tight opacity-80">
                                                        • {dontItem}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {vitalityScore < 40 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex gap-4 items-center"
                                >
                                    <ShieldAlert className="text-red-500 shrink-0" size={24} />
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-red-500">Resource Conservation Required</p>
                                        <p className="text-slate-400 text-xs mt-1">Current system entropy exceeds operational threshold. Immediate renewal protocol required before tomorrow's peak.</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'ease' && (
                        <motion.div key="ease" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-3xl font-light uppercase tracking-tighter text-white">Stage 2: Ease & Destress</h3>
                            <div className="bg-teal-500/5 border border-teal-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400">
                                        <Wind size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-lg">Refreshing Energy Spray</h4>
                                        <p className="text-teal-500/60 text-xs uppercase font-black">Layer 1 - Instant Clarity</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-base italic leading-relaxed">Recommended for: Pre-Meeting Focus, Morning Travel, or overcoming Afternoon Slumps.</p>
                                <button
                                    onClick={() => activateProtocol('Energy Cloud')}
                                    className="text-xs text-teal-400 uppercase tracking-widest font-bold border-b border-teal-500/30 pb-1 hover:border-teal-500 transition-all outline-none"
                                >
                                    Activate Energy Cloud ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'balance' && (
                        <motion.div key="balance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-3xl font-light uppercase tracking-tighter text-white">Stage 3: Harmonize & Balance</h3>
                            <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                                        <Zap size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-lg">Calm Essence for Acupressure</h4>
                                        <p className="text-orange-500/60 text-xs uppercase font-black">Layer 2 - Daily Stability</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-base italic leading-relaxed">Recommended for: Evening Transition, Emotional Support, and maintaining Daily Balance.</p>
                                <button
                                    onClick={() => activateProtocol('Stabilization Serum')}
                                    className="text-xs text-orange-400 uppercase tracking-widest font-bold border-b border-orange-500/30 pb-1 hover:border-orange-500 transition-all outline-none"
                                >
                                    Apply Stabilization Serum ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'intention' && (
                        <motion.div key="intention" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                            <h3 className="text-3xl font-light uppercase tracking-tighter text-white mb-4">Stage 4: Focal Intention</h3>
                            <p className="text-slate-500 text-sm uppercase tracking-widest mb-8">Set clear goals and focus energy</p>
                            <CoherenceBreath />
                        </motion.div>
                    )}

                    {activeTab === 'rebuild' && (
                        <motion.div key="rebuild" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-3xl font-light uppercase tracking-tighter text-white">Stage 5: Deep Renewal</h3>
                            <div className="bg-slate-500/5 border border-slate-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center text-slate-400">
                                        <Scan size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-lg">Detox & Luck-Cleansing Wash</h4>
                                        <p className="text-slate-500/60 text-xs uppercase font-black">Layer 3 - Deep Reset</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-base italic leading-relaxed">Recommended for: Weekly Renewal, recovery from "Bad Days", and Periodic Energy Cleansing.</p>
                                <button
                                    onClick={() => activateProtocol('Deep Reset')}
                                    className="text-xs text-slate-400 uppercase tracking-widest font-bold border-b border-slate-500/30 pb-1 hover:border-slate-300 transition-all outline-none"
                                >
                                    Initialize Deep Reset ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'transform' && (
                        <motion.div key="transform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-3xl font-light uppercase tracking-tighter text-white">Stage 6: Transformation</h3>
                                <p className="text-xs text-slate-300 uppercase tracking-widest">Mindset & Corporate Evolution</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Pre-Boardroom Focus', icon: Zap },
                                    { label: 'Leadership Offsites', icon: Globe },
                                    { label: 'Team Energy Activation', icon: Activity },
                                    { label: 'VIP Gifting Suites', icon: ShieldAlert },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => activateProtocol(item.label)}
                                        className="bg-black/40 border border-slate-800 p-6 rounded-2xl hover:border-[#FFD700]/40 transition-colors group cursor-pointer"
                                    >
                                        <div className="text-[#FFD700] mb-3 group-hover:scale-110 transition-transform"><item.icon size={28} /></div>
                                        <div className="text-xs font-black uppercase tracking-widest text-slate-300">{item.label}</div>
                                        <div className="text-[10px] text-slate-400 uppercase mt-2">Initialize Protocol ➔</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'hold' && (
                        <motion.div key="hold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-3xl font-light uppercase tracking-tighter text-white">Stage 7: Maintenance (Hold)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-8 border border-slate-800 rounded-2xl bg-black/20">
                                    <p className="text-xs uppercase tracking-widest text-slate-300 mb-3">Boundary Protection</p>
                                    <div className="text-3xl text-teal-400 font-mono italic">ACTIVE</div>
                                </div>
                                <div className="p-8 border border-slate-800 rounded-2xl bg-black/20">
                                    <p className="text-xs uppercase tracking-widest text-slate-300 mb-3">Long-term Vitality</p>
                                    <div className="text-3xl text-teal-400 font-mono italic">SECURED</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
