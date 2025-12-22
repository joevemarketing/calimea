'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { CoherenceBreath } from './CoherenceBreath';
import { getEnergyForecast } from '@/lib/utils/vitality';
import {
    Scan,
    Activity,
    Wind,
    Zap,
    ShieldAlert,
    Network,
    Globe,
    Clock,
    Info
} from 'lucide-react';

interface Tab {
    id: string;
    label: string;
    icon: any;
    sub: string;
}

const TABS: Tab[] = [
    { id: 'recognize', label: 'R - Recognize', icon: Activity, sub: '觉察' },
    { id: 'ease', label: 'E - Ease', icon: Wind, sub: '安抚' },
    { id: 'balance', label: 'B - Balance', icon: Zap, sub: '平衡' },
    { id: 'intention', label: 'I - Intention', icon: Wind, sub: '意图' },
    { id: 'rebuild', label: 'R - Rebuild', icon: Scan, sub: '重建' },
    { id: 'transform', label: 'T - Transform', icon: Activity, sub: '转化' },
    { id: 'hold', label: 'H - Hold', icon: Network, sub: '守护' },
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

    const activateProtocol = (name: string) => {
        setActiveProtocol(name);
        if (preferences.hapticFeedback && window.navigator.vibrate) {
            window.navigator.vibrate([10, 50, 10]);
        }
        const data = PROTOCOL_DATA[name];
        setTimeout(() => setActiveProtocol(null), data?.duration || 4000);
    };

    const currentProtocol = activeProtocol ? PROTOCOL_DATA[activeProtocol] : null;
    const forecast = userProfile ? getEnergyForecast(vitalityScore, userProfile.archetype) : {
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
                                <div className="space-y-1">
                                    <h4 className="text-[10px] uppercase tracking-[0.5em] text-[#FFD700]/60">System Protocol Active</h4>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter text-white">{activeProtocol}</h2>
                                </div>
                            </div>

                            <div className="space-y-8 bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-md">
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-widest text-[#FFD700] font-bold">Instruction</p>
                                    <p className="text-xl text-white font-light">{currentProtocol?.instruction}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Action Directive</p>
                                    <p className="text-lg text-slate-300 italic">"{currentProtocol?.action}"</p>
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
            <div className="grid grid-cols-4 md:grid-cols-7 border-b border-slate-800">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 py-4 px-1 border-b-2 transition-all ${isActive ? 'border-teal-500 text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <Icon size={16} />
                            <span className="text-[9px] uppercase tracking-tighter font-black">{tab.label}</span>
                            <span className="text-[8px] font-light opacity-60">{tab.sub}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[450px] bg-slate-900/30 rounded-3xl p-8 border border-slate-800 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                    {activeTab === 'recognize' && (
                        <motion.div key="recognize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-light uppercase tracking-tighter text-white">Stage 1: Systemic Recognition</h3>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Cross-philosophical Resonance Analysis (BaZi, Ayurvedic, Western)</p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-4xl font-mono ${vitalityScore < 40 ? 'text-red-500' : 'text-[#FFD700]'}`}>{vitalityScore}%</div>
                                    <div className="text-[8px] text-slate-500 uppercase tracking-widest mt-1">Real-time V-Score</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Hourly Insight */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-widest text-[#FFD700]">Hourly Pulse</span>
                                        <span className="relative group">
                                            <Info size={12} className="text-[#FFD700]" />
                                            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black/80 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Predicted energy scores for the next few hours based on your current V‑Score and archetype frequency.
                                            </div>
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-1 h-12">
                                        {forecast.hourly.map((h: { time: string; score: number }, i: number) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                <div
                                                    className="w-full bg-[#FFD700]/20 rounded-t-sm"
                                                    style={{ height: `${h.score}%` }}
                                                />
                                                <span className="text-[6px] text-slate-600 font-mono">{h.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-relaxed italic">Peak operational capacity identified at 12:00. Preparing for late‑day consolidation.</p>
                                </div>

                                {/* Daily Forecast */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-widest text-teal-400">Daily Forecast</span>
                                        <span className="relative group">
                                            <Info size={12} className="text-teal-400" />
                                            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black/80 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Forecasted V‑Score for each day of the week, helping you schedule high‑impact activities.
                                            </div>
                                        </span>
                                        <Clock size={12} className="text-teal-400" />
                                    </div>
                                    <div className="flex items-end gap-1 h-12">
                                        {forecast.daily.map((d: { day: string; score: number }, i: number) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                                <div
                                                    className="w-full bg-teal-400/20 rounded-t-sm"
                                                    style={{ height: `${d.score}%` }}
                                                />
                                                <span className="text-[6px] text-slate-600 font-mono">{d.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-relaxed italic">Tomorrow: Predicted 15% increase in Fire elements. Optimal for leadership activity.</p>
                                </div>

                                {/* Weekly Macro-Cycle */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400">Weekly Cycle</span>
                                        <span className="relative group">
                                            <Info size={12} className="text-slate-400" />
                                            <div className="absolute bottom-full mb-2 w-48 p-2 bg-black/80 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                Indicates the macro‑cycle (expansion or consolidation) your system is currently in, guiding long‑term strategy.
                                            </div>
                                        </span>
                                        <Network size={12} className="text-slate-400" />
                                    </div>
                                    <div className="space-y-2 py-2">
                                        <div className="text-xl font-light text-white uppercase tracking-widest">{forecast.weekly}</div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '75%' }}
                                                className="h-full bg-slate-400"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 leading-relaxed italic">System moving into a rebuilding phase. Focus on Stage 5: Rebuild during Sunday reset.</p>
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
                            <h3 className="text-xl font-light uppercase tracking-tighter text-white">Stage 2: Ease & Destress</h3>
                            <div className="bg-teal-500/5 border border-teal-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400">
                                        <Wind size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">Refreshing Energy Spray</h4>
                                        <p className="text-teal-500/60 text-[10px] uppercase font-black">Layer 1 - Instant Clarity</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm italic leading-relaxed">Recommended for: Pre-Meeting Focus, Morning Travel, or overcoming Afternoon Slumps.</p>
                                <button
                                    onClick={() => activateProtocol('Energy Cloud')}
                                    className="text-[10px] text-teal-400 uppercase tracking-widest font-bold border-b border-teal-500/30 pb-1 hover:border-teal-500 transition-all outline-none"
                                >
                                    Activate Energy Cloud ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'balance' && (
                        <motion.div key="balance" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-xl font-light uppercase tracking-tighter text-white">Stage 3: Harmonize & Balance</h3>
                            <div className="bg-orange-500/5 border border-orange-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400">
                                        <Zap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">Calm Essence for Acupressure</h4>
                                        <p className="text-orange-500/60 text-[10px] uppercase font-black">Layer 2 - Daily Stability</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm italic leading-relaxed">Recommended for: Evening Transition, Emotional Support, and maintaining Daily Balance.</p>
                                <button
                                    onClick={() => activateProtocol('Stabilization Serum')}
                                    className="text-[10px] text-orange-400 uppercase tracking-widest font-bold border-b border-orange-500/30 pb-1 hover:border-orange-500 transition-all outline-none"
                                >
                                    Apply Stabilization Serum ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'intention' && (
                        <motion.div key="intention" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                            <h3 className="text-xl font-light uppercase tracking-tighter text-white mb-4">Stage 4: Focal Intention</h3>
                            <p className="text-slate-500 text-xs uppercase tracking-widest mb-8">Set clear goals and focus energy</p>
                            <CoherenceBreath />
                        </motion.div>
                    )}

                    {activeTab === 'rebuild' && (
                        <motion.div key="rebuild" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-xl font-light uppercase tracking-tighter text-white">Stage 5: Deep Renewal</h3>
                            <div className="bg-slate-500/5 border border-slate-500/20 p-8 rounded-3xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-500/10 rounded-full flex items-center justify-center text-slate-400">
                                        <Scan size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold uppercase tracking-widest text-sm">Detox & Luck-Cleansing Wash</h4>
                                        <p className="text-slate-500/60 text-[10px] uppercase font-black">Layer 3 - Deep Reset</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm italic leading-relaxed">Recommended for: Weekly Renewal, recovery from "Bad Days", and Periodic Energy Cleansing.</p>
                                <button
                                    onClick={() => activateProtocol('Deep Reset')}
                                    className="text-[10px] text-slate-400 uppercase tracking-widest font-bold border-b border-slate-500/30 pb-1 hover:border-slate-300 transition-all outline-none"
                                >
                                    Initialize Deep Reset ➔
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'transform' && (
                        <motion.div key="transform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-light uppercase tracking-tighter text-white">Stage 6: Transformation</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Mindset & Corporate Evolution</p>
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
                                        <div className="text-[#FFD700] mb-3 group-hover:scale-110 transition-transform"><item.icon size={20} /></div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{item.label}</div>
                                        <div className="text-[8px] text-slate-500 uppercase mt-1">Initialize Protocol ➔</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'hold' && (
                        <motion.div key="hold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            <h3 className="text-xl font-light uppercase tracking-tighter text-white">Stage 7: Maintenance (Hold)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 border border-slate-800 rounded-2xl bg-black/20">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Boundary Protection</p>
                                    <div className="text-xl text-teal-400 font-mono italic">ACTIVE</div>
                                </div>
                                <div className="p-6 border border-slate-800 rounded-2xl bg-black/20">
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Long-term Vitality</p>
                                    <div className="text-xl text-teal-400 font-mono italic">SECURED</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
