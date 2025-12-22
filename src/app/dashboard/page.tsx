'use client';

import React, { useEffect, useState } from 'react';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { MixingConsole } from '@/components/dashboard/MixingConsole';
import { REBIRTHWorkflow } from '@/components/dashboard/REBIRTHWorkflow';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Info, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { isInitialized, hasHydrated, userProfile, reset, preferences } = useCalimeaStore();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);

    useEffect(() => {
        // Wait for hydration before checking initialization
        if (hasHydrated && !isInitialized) {
            window.location.href = '/';
        }
    }, [hasHydrated, isInitialized]);

    if (!hasHydrated || !isInitialized) return null;

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30">
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

            {/* User Profile Panel Overlay */}
            <AnimatePresence>
                {isUserPanelOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-80 bg-black/90 border-l border-slate-900 z-[60] backdrop-blur-xl p-8"
                    >
                        <div className="space-y-8 pt-12">
                            <div className="space-y-2">
                                <h3 className="text-[10px] uppercase tracking-[0.5em] text-[#FFD700]">Profile Calibration</h3>
                                <p className="text-2xl font-black uppercase text-white">{userProfile?.archetype.dayMaster}</p>
                                <p className="text-xs text-slate-500 italic">{userProfile?.archetype.label}</p>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-900">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <MapPin size={14} />
                                    <span className="text-[10px] uppercase tracking-widest">{userProfile?.coordinates.location}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-400">
                                    <ExternalLink size={14} />
                                    <span className="text-[10px] uppercase tracking-widest">Resonance: {(userProfile?.archetype?.frequency ?? 0) * 100}%</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsUserPanelOpen(false)}
                                className="w-full text-[10px] uppercase tracking-widest text-[#FFD700] border border-[#FFD700]/20 py-3 mt-8 hover:bg-[#FFD700]/5 transition-colors"
                            >
                                Close Profile
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* High-Fidelity Header */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-900 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <img src="/logo.png" alt="CALIMÉA Logo" className="w-12 h-12 object-contain" />
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-[0.3em] text-[#FFD700] leading-none">CALIMÉA</h1>
                        <p className="text-[7px] text-slate-500 uppercase tracking-[0.2em] mt-1">Your Daily Dose of Positive Energy</p>
                        <p className="text-[10px] text-[#FFD700]/60 font-serif mt-0.5">珂 谧 雅</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 text-slate-500">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                            {userProfile?.archetype.label}
                        </span>
                        <span className="text-[8px] uppercase tracking-tighter italic">
                            Constitutional Archetype
                        </span>
                    </div>
                    <User
                        size={18}
                        className={`hover:text-white cursor-pointer transition-colors ${isUserPanelOpen ? 'text-[#FFD700]' : ''}`}
                        onClick={() => setIsUserPanelOpen(!isUserPanelOpen)}
                    />
                    <Settings
                        size={18}
                        className={`hover:text-white cursor-pointer transition-colors ${isSettingsOpen ? 'text-[#FFD700]' : ''}`}
                        onClick={() => setIsSettingsOpen(true)}
                    />
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-8 py-12 space-y-16">
                {/* Universal Mixer Section */}
                <section className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-light uppercase tracking-tighter">Universal Mixer</h2>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Acoustic & Metabolic Resonance Modulation</p>
                        </div>
                        <Info size={14} className="text-slate-800" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2">
                            <MixingConsole />
                        </div>

                        {/* System Status Panel */}
                        <div className="bg-slate-900/20 border border-slate-800 p-8 rounded-3xl space-y-8">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-widest text-slate-500">Coherence Key Status</span>
                                <div className="text-xs font-mono text-[#FFD700] flex items-center gap-2">
                                    <div className="w-1 h-1 bg-[#FFD700] rounded-full animate-ping" />
                                    ENCRYPTED / ACTIVE
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-slate-500">Node Sync</span>
                                    <span className="text-xs font-mono text-white">0.998ms</span>
                                </div>
                                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-[#B8860B] to-[#FFD700]"
                                        animate={{ x: ['-100%', '100%'] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-800">
                                <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter italic">
                                    Note: All frequency modulations are deterministic and calculated based on your unique temporal origin point.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section className="space-y-8 pt-16 border-t border-slate-900">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-light uppercase tracking-tighter">R.E.B.I.R.T.H. Cycle</h2>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Daily Physiological Optimization Loop</p>
                    </div>
                    <REBIRTHWorkflow />
                </section>
            </div>

            {!preferences.lowEntropyMode && (
                <footer className="py-12 px-8 border-t border-slate-900 bg-black flex justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
                    <div>© 2025 CALIMÉA BIO-RHYTHMIC SYSTEMS</div>
                    <div className="flex gap-8">
                        <Link href="https://github.com/your-org/calimea#readme" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 cursor-pointer transition-colors">Documentation</Link>
                        <Link href="https://status.calimea.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 cursor-pointer transition-colors">Network Status</Link>
                        <Link href="/privacy" className="hover:text-teal-400 cursor-pointer transition-colors">Privacy Protocol</Link>
                    </div>
                </footer>
            )}
        </main>
    );
}
