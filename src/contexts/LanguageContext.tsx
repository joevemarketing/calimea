'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load language preference from localStorage
        const savedLang = localStorage.getItem('calimea-language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('calimea-language', lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Translation data
const translations = {
    en: {
        // Header & Navigation
        header: {
            title: 'CALIMÉA',
            subtitle: 'Systemic Vitality Intelligence',
            mixer: 'MIXER',
            rebirth: 'R.E.B.I.R.T.H.',
            settings: 'Settings'
        },

        // REBIRTH Tabs
        rebirth: {
            recognize: 'Recognize',
            ease: 'Ease',
            balance: 'Balance',
            intention: 'Intention',
            rebuild: 'Rebuild',
            transform: 'Transform',
            hold: 'Hold'
        },

        // Stage Titles
        stages: {
            stage1: 'Stage 1: Systemic Recognition',
            stage1Sub: 'Cross-philosophical Resonance Analysis (BaZi, Ayurvedic, Western)',
            stage2: 'Stage 2: Ease & Destress',
            stage3: 'Stage 3: Harmonize & Balance',
            stage4: 'Stage 4: Focal Intention',
            stage4Sub: 'Set clear goals and focus energy',
            stage5: 'Stage 5: Deep Renewal',
            stage6: 'Stage 6: Transformation',
            stage6Sub: 'Mindset & Corporate Evolution',
            stage7: 'Stage 7: Maintenance (Hold)'
        },

        // Forecast Widgets
        forecast: {
            hourlyPulse: 'Hourly Pulse',
            hourlyDesc: 'Predicted energy scores for the next few hours based on your current V‑Score and archetype frequency.',
            hourlyInsight: 'Peak operational capacity identified at 12:00. Preparing for late‑day consolidation.',
            dailyForecast: 'Daily Forecast',
            dailyDesc: 'Forecasted V‑Score for each day of the week, helping you schedule high‑impact activities.',
            dailyInsight: 'Tomorrow: Predicted 15% increase in Fire elements. Optimal for leadership activity.',
            weeklyCycle: 'Weekly Cycle',
            weeklyDesc: 'Indicates the macro‑cycle (expansion or consolidation) your system is currently in, guiding long‑term strategy.',
            weeklyInsight: 'System moving into a rebuilding phase. Focus on Stage 5: Rebuild during Sunday reset.',
            vScore: 'Real-time V-Score'
        },

        // Protocols
        protocols: {
            energySpray: 'Refreshing Energy Spray',
            energyLayer: 'Layer 1 - Instant Clarity',
            energyDesc: 'Recommended for: Pre-Meeting Focus, Morning Travel, or overcoming Afternoon Slumps.',
            energyAction: 'Activate Energy Cloud',

            calmEssence: 'Calm Essence for Acupressure',
            calmLayer: 'Layer 2 - Daily Stability',
            calmDesc: 'Recommended for: Evening Transition, Emotional Support, and maintaining Daily Balance.',
            calmAction: 'Apply Stabilization Serum',

            detoxWash: 'Detox & Luck-Cleansing Wash',
            detoxLayer: 'Layer 3 - Deep Reset',
            detoxDesc: 'Recommended for: Weekly Renewal, recovery from "Bad Days", and Periodic Energy Cleansing.',
            detoxAction: 'Initialize Deep Reset',

            preBoardroom: 'Pre-Boardroom Focus',
            leadership: 'Leadership Offsites',
            teamEnergy: 'Team Energy Activation',
            vipGifting: 'VIP Gifting Suites',
            initProtocol: 'Initialize Protocol'
        },

        // Stage 7
        stage7: {
            boundaryProtection: 'Boundary Protection',
            longTermVitality: 'Long-term Vitality',
            active: 'ACTIVE',
            secured: 'SECURED'
        },

        // Alerts
        alerts: {
            lowEnergy: 'Resource Conservation Required',
            lowEnergyDesc: 'Current system entropy exceeds operational threshold. Immediate renewal protocol required before tomorrow\'s peak.'
        },

        // Settings Modal
        settings: {
            title: 'System Settings',
            preferences: 'User Preferences',
            language: 'Language',
            english: 'English',
            chinese: '中文',
            hapticFeedback: 'Haptic Feedback',
            soundEffects: 'Sound Effects',
            notifications: 'Notifications',
            systemControl: 'System Control',
            resetSystem: 'Reset System',
            resetWarning: 'This will clear all user data and reset to factory defaults.',
            close: 'Close'
        },

        // Breathing Exercise
        breathing: {
            inhale: 'Inhale',
            hold: 'Hold',
            exhale: 'Exhale',
            description: 'Follow the rhythm to achieve heart-brain coherence'
        },

        // Footer
        footer: {
            documentation: 'Documentation',
            networkStatus: 'Network Status',
            privacy: 'Privacy Protocol'
        }
    },

    zh: {
        // Header & Navigation
        header: {
            title: 'CALIMÉA',
            subtitle: '系统活力智能',
            mixer: '调配器',
            rebirth: '重生循环',
            settings: '设置'
        },

        // REBIRTH Tabs
        rebirth: {
            recognize: '觉察',
            ease: '安抚',
            balance: '平衡',
            intention: '意图',
            rebuild: '重建',
            transform: '转化',
            hold: '守护'
        },

        // Stage Titles
        stages: {
            stage1: '阶段一：系统觉察',
            stage1Sub: '跨哲学共振分析（八字、阿育吠陀、西方）',
            stage2: '阶段二：放松与减压',
            stage3: '阶段三：和谐与平衡',
            stage4: '阶段四：聚焦意图',
            stage4Sub: '设定清晰目标并集中能量',
            stage5: '阶段五：深度更新',
            stage6: '阶段六：转化',
            stage6Sub: '心态与企业进化',
            stage7: '阶段七：维护（守护）'
        },

        // Forecast Widgets
        forecast: {
            hourlyPulse: '每小时脉动',
            hourlyDesc: '基于您当前的活力分数和原型频率预测未来几小时的能量分数。',
            hourlyInsight: '在12:00识别到峰值运营能力。准备进行日末整合。',
            dailyForecast: '每日预测',
            dailyDesc: '预测一周内每天的活力分数，帮助您安排高影响力活动。',
            dailyInsight: '明天：预计火元素增加15%。最适合领导力活动。',
            weeklyCycle: '每周周期',
            weeklyDesc: '指示您的系统当前所处的宏观周期（扩张或整合），指导长期策略。',
            weeklyInsight: '系统正在进入重建阶段。在周日重置期间专注于阶段五：重建。',
            vScore: '实时活力分数'
        },

        // Protocols
        protocols: {
            energySpray: '清新能量喷雾',
            energyLayer: '第一层 - 即时清晰',
            energyDesc: '推荐用于：会前专注、早晨出行或克服午后低迷。',
            energyAction: '激活能量云',

            calmEssence: '平静精华穴位按摩',
            calmLayer: '第二层 - 日常稳定',
            calmDesc: '推荐用于：晚间过渡、情绪支持和维持日常平衡。',
            calmAction: '应用稳定血清',

            detoxWash: '排毒与运气清洁洗液',
            detoxLayer: '第三层 - 深度重置',
            detoxDesc: '推荐用于：每周更新、从"糟糕日子"中恢复和定期能量清洁。',
            detoxAction: '初始化深度重置',

            preBoardroom: '董事会前专注',
            leadership: '领导力静修',
            teamEnergy: '团队能量激活',
            vipGifting: 'VIP礼品套装',
            initProtocol: '初始化协议'
        },

        // Stage 7
        stage7: {
            boundaryProtection: '边界保护',
            longTermVitality: '长期活力',
            active: '活跃',
            secured: '已保护'
        },

        // Alerts
        alerts: {
            lowEnergy: '需要资源保护',
            lowEnergyDesc: '当前系统熵超过运营阈值。需要在明天的高峰之前立即进行更新协议。'
        },

        // Settings Modal
        settings: {
            title: '系统设置',
            preferences: '用户偏好',
            language: '语言',
            english: 'English',
            chinese: '中文',
            hapticFeedback: '触觉反馈',
            soundEffects: '音效',
            notifications: '通知',
            systemControl: '系统控制',
            resetSystem: '重置系统',
            resetWarning: '这将清除所有用户数据并恢复到出厂默认设置。',
            close: '关闭'
        },

        // Breathing Exercise
        breathing: {
            inhale: '吸气',
            hold: '屏息',
            exhale: '呼气',
            description: '跟随节奏实现心脑一致'
        },

        // Footer
        footer: {
            documentation: '文档',
            networkStatus: '网络状态',
            privacy: '隐私协议'
        }
    }
};
