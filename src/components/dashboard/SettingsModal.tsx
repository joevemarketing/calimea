'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Shield, Speaker, Smartphone, Globe } from 'lucide-react';
import { useCalimeaStore } from '@/store/useCalimeaStore';
import { useLanguage } from '@/contexts/LanguageContext';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { preferences, updatePreferences, reset } = useCalimeaStore();
    const { language, setLanguage, t } = useLanguage();

    const handleReset = () => {
        if (confirm(t('settings.resetWarning'))) {
            reset();
            // Force clear localStorage to ensure reset is persisted
            localStorage.removeItem('calimea-storage');
            // Small delay to ensure state is cleared before redirect
            setTimeout(() => {
                window.location.href = '/';
            }, 100);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] cursor-crosshair"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm bg-[#0a0a0a] border border-slate-800 rounded-3xl p-6 md:p-8 z-[101] shadow-2xl shadow-[#FFD700]/5 max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6 md:mb-10">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#FFD700] uppercase">{t('settings.title')}</h3>
                                <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-widest mt-1">{t('settings.preferences')}</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-900 rounded-full transition-colors text-slate-500 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-4">
                                {/* Language Switcher */}
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-[#FFD700] transition-colors">
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">{t('settings.language')}</p>
                                            <p className="text-[8px] text-slate-500 uppercase">English / 中文</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setLanguage('en')}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${language === 'en'
                                                ? 'bg-[#FFD700] text-black'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                }`}
                                        >
                                            EN
                                        </button>
                                        <button
                                            onClick={() => setLanguage('zh')}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${language === 'zh'
                                                ? 'bg-[#FFD700] text-black'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                }`}
                                        >
                                            中文
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-[#FFD700] transition-colors">
                                            <Smartphone size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">{t('settings.hapticFeedback')}</p>
                                            <p className="text-[8px] text-slate-500 uppercase">Resonant physical responses</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updatePreferences({ hapticFeedback: !preferences.hapticFeedback })}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${preferences.hapticFeedback ? 'bg-[#FFD700]' : 'bg-slate-800'}`}
                                    >
                                        <motion.div
                                            animate={{ x: preferences.hapticFeedback ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-3 h-3 bg-black rounded-full shadow-md"
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-[#FFD700] transition-colors">
                                            <Speaker size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">{t('settings.soundEffects')}</p>
                                            <p className="text-[8px] text-slate-500 uppercase">Sonic energy modulation</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updatePreferences({ soundEnabled: !preferences.soundEnabled })}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${preferences.soundEnabled ? 'bg-[#FFD700]' : 'bg-slate-800'}`}
                                    >
                                        <motion.div
                                            animate={{ x: preferences.soundEnabled ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-3 h-3 bg-black rounded-full shadow-md"
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-[#FFD700] transition-colors">
                                            <Shield size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">Low Entropy Mode</p>
                                            <p className="text-[8px] text-slate-500 uppercase">Visual noise reduction</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updatePreferences({ lowEntropyMode: !preferences.lowEntropyMode })}
                                        className={`w-10 h-5 rounded-full relative transition-colors ${preferences.lowEntropyMode ? 'bg-[#FFD700]' : 'bg-slate-800'}`}
                                    >
                                        <motion.div
                                            animate={{ x: preferences.lowEntropyMode ? 22 : 2 }}
                                            className="absolute top-1 left-0 w-3 h-3 bg-black rounded-full shadow-md"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-900">
                                <button
                                    onClick={handleReset}
                                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-xl transition-all group"
                                >
                                    <LogOut size={16} className="text-red-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 group-hover:tracking-[0.4em] transition-all">{t('settings.resetSystem')}</span>
                                </button>
                                <p className="text-[7px] text-slate-600 uppercase text-center mt-4 tracking-widest">Version 2.0.4-Delta / Build 2025</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
