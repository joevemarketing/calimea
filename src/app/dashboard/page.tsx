'use client';

import React, { useEffect, useState } from 'react';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { MixingConsole } from '@/components/dashboard/MixingConsole';
import { REBIRTHWorkflow } from '@/components/dashboard/REBIRTHWorkflow';
import { SettingsModal } from '@/components/dashboard/SettingsModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Info, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const { isInitialized, hasHydrated, userProfile, reset, preferences } = useCalimeaStore();
    const { t } = useLanguage();
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
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsUserPanelOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[59] backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300 }}
                            className="fixed right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-black/95 border-l border-slate-900 z-[60] backdrop-blur-xl p-6 md:p-8 overflow-y-auto"
                        >
                            <div className="space-y-6 md:space-y-8 pt-8 md:pt-12">
                                <div className="space-y-2">
                                    <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-[#FFD700]">Profile Calibration</h3>
                                    <p className="text-xl md:text-2xl font-black uppercase text-white">{userProfile?.archetype.dayMaster}</p>
                                    <p className="text-sm text-slate-300 italic">{userProfile?.archetype.label}</p>
                                </div>

                                <div className="space-y-4 pt-6 md:pt-8 border-t border-slate-900">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <MapPin size={14} />
                                        <span className="text-xs uppercase tracking-widest">{userProfile?.coordinates.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <ExternalLink size={14} />
                                        <span className="text-xs uppercase tracking-widest">Resonance: {(userProfile?.archetype?.frequency ?? 0) * 100}%</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsUserPanelOpen(false)}
                                    className="w-full text-[10px] uppercase tracking-widest text-[#FFD700] border border-[#FFD700]/20 py-3 mt-6 md:mt-8 hover:bg-[#FFD700]/5 transition-colors rounded-lg"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* High-Fidelity Header */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6 border-b border-slate-900 bg-black/40 backdrop-blur-md sticky top-0 z-50"
            >
                <div className="flex items-center gap-3 md:gap-6">
                    <motion.img
                        animate={{
                            filter: ["drop-shadow(0 0 2px rgba(255,215,0,0.1))", "drop-shadow(0 0 8px rgba(255,215,0,0.3))", "drop-shadow(0 0 2px rgba(255,215,0,0.1))"]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        src="/logo.png"
                        alt="CALIMÉA Logo"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-base md:text-xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-[#FFD700] leading-none">{t('header.title')}</h1>
                        <p className="text-[8px] md:text-[10px] text-slate-300 uppercase tracking-[0.15em] md:tracking-[0.2em] mt-1">{t('header.subtitle')}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-8 text-slate-500">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-xs uppercase tracking-widest font-bold text-slate-300">
                            {userProfile?.archetype.label}
                        </span>
                        <span className="text-[10px] uppercase tracking-tighter italic">
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
            </motion.nav>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.2
                        }
                    }
                }}
                className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 md:space-y-12"
            >
                {/* Universal Mixer Section */}
                <section className="space-y-8">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="text-lg md:text-2xl font-light uppercase tracking-tighter">{t('header.mixer')}</h2>
                            <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">Acoustic & Metabolic Resonance Modulation</p>
                        </div>
                        <Info size={14} className="text-slate-800 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        <div className="lg:col-span-2">
                            <MixingConsole />
                        </div>

                        {/* System Status Panel */}
                        <div className="bg-slate-900/20 border border-slate-800 p-4 md:p-8 rounded-3xl space-y-6 md:space-y-8">
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
                <motion.div variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }} className="pt-12 border-t border-slate-900">
                    <div className="text-center space-y-2 mb-12">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">{t('header.rebirth')}</h2>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Daily Physiological Optimization Loop</p>
                    </div>
                    <REBIRTHWorkflow />
                </motion.div>
            </motion.div>

            {!preferences.lowEntropyMode && (
                <footer className="py-12 px-8 border-t border-slate-900 bg-black flex justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold">
                    <div>© 2025 CALIMÉA BIO-RHYTHMIC SYSTEMS</div>
                    <div className="flex gap-8">
                        <Link href="https://github.com/your-org/calimea#readme" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 cursor-pointer transition-colors">{t('footer.documentation')}</Link>
                        <Link href="https://status.calimea.app" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 cursor-pointer transition-colors">{t('footer.networkStatus')}</Link>
                        <Link href="/privacy" className="hover:text-teal-400 cursor-pointer transition-colors">{t('footer.privacy')}</Link>
                    </div>
                </footer>
            )}
        </main>
    );
}
