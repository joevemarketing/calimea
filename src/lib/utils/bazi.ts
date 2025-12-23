/**
 * Real BaZi (Four Pillars) Calculator
 * Calculates the Day Master (日主) from birth date and time
 */

// Heavenly Stems (天干)
const HEAVENLY_STEMS = [
    { id: 'jia', name: 'Yang Wood', chinese: '甲木', element: 'Wood', polarity: 'Yang' },
    { id: 'yi', name: 'Yin Wood', chinese: '乙木', element: 'Wood', polarity: 'Yin' },
    { id: 'bing', name: 'Yang Fire', chinese: '丙火', element: 'Fire', polarity: 'Yang' },
    { id: 'ding', name: 'Yin Fire', chinese: '丁火', element: 'Fire', polarity: 'Yin' },
    { id: 'wu', name: 'Yang Earth', chinese: '戊土', element: 'Earth', polarity: 'Yang' },
    { id: 'ji', name: 'Yin Earth', chinese: '己土', element: 'Earth', polarity: 'Yin' },
    { id: 'geng', name: 'Yang Metal', chinese: '庚金', element: 'Metal', polarity: 'Yang' },
    { id: 'xin', name: 'Yin Metal', chinese: '辛金', element: 'Metal', polarity: 'Yin' },
    { id: 'ren', name: 'Yang Water', chinese: '壬水', element: 'Water', polarity: 'Yang' },
    { id: 'gui', name: 'Yin Water', chinese: '癸水', element: 'Water', polarity: 'Yin' }
];

// Earthly Branches (地支)
const EARTHLY_BRANCHES = [
    { id: 'zi', name: 'Rat', chinese: '子', element: 'Water' },
    { id: 'chou', name: 'Ox', chinese: '丑', element: 'Earth' },
    { id: 'yin', name: 'Tiger', chinese: '寅', element: 'Wood' },
    { id: 'mao', name: 'Rabbit', chinese: '卯', element: 'Wood' },
    { id: 'chen', name: 'Dragon', chinese: '辰', element: 'Earth' },
    { id: 'si', name: 'Snake', chinese: '巳', element: 'Fire' },
    { id: 'wu', name: 'Horse', chinese: '午', element: 'Fire' },
    { id: 'wei', name: 'Goat', chinese: '未', element: 'Earth' },
    { id: 'shen', name: 'Monkey', chinese: '申', element: 'Metal' },
    { id: 'you', name: 'Rooster', chinese: '酉', element: 'Metal' },
    { id: 'xu', name: 'Dog', chinese: '戌', element: 'Earth' },
    { id: 'hai', name: 'Pig', chinese: '亥', element: 'Water' }
];

// Archetype labels based on Day Master
const ARCHETYPE_LABELS: Record<string, string> = {
    'jia': 'The Pioneer',
    'yi': 'The Diplomat',
    'bing': 'The Illuminator',
    'ding': 'The Refiner',
    'wu': 'The Mountain',
    'ji': 'The Nurturer',
    'geng': 'The Warrior',
    'xin': 'The Jewel',
    'ren': 'The Ocean',
    'gui': 'The Flowing Bridge'
};

interface BaZiPillar {
    stem: typeof HEAVENLY_STEMS[number];
    branch: typeof EARTHLY_BRANCHES[number];
}

interface FourPillars {
    year: BaZiPillar;
    month: BaZiPillar;
    day: BaZiPillar;
    hour: BaZiPillar;
}

/**
 * Calculate the Day Stem (Day Master) from a Gregorian date
 * Uses the Hsia Calendar algorithm
 */
export function calculateDayMaster(birthDate: string, birthTime: string): typeof HEAVENLY_STEMS[number] {
    const date = new Date(birthDate);
    const [hours, minutes] = birthTime.split(':').map(Number);

    // Set the time
    date.setHours(hours, minutes, 0, 0);

    // Calculate days since epoch (Jan 1, 1900 = Day 0)
    const epoch = new Date('1900-01-01');
    const daysSinceEpoch = Math.floor((date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));

    // Day stem cycles every 10 days, starting from 甲 (Jia) on Jan 1, 1900
    // Jan 1, 1900 was a 戊戌 (Wu-Xu) day, which is stem index 4
    const stemIndex = (daysSinceEpoch + 4) % 10;

    return HEAVENLY_STEMS[stemIndex];
}

/**
 * Calculate the complete Four Pillars
 */
export function calculateFourPillars(birthDate: string, birthTime: string): FourPillars {
    const date = new Date(birthDate);
    const [hours] = birthTime.split(':').map(Number);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();

    // Year Pillar (simplified - uses Gregorian year)
    const yearStemIndex = (year - 4) % 10; // 1984 = 甲子 year
    const yearBranchIndex = (year - 4) % 12;

    // Month Pillar (simplified - based on solar calendar)
    const monthStemIndex = ((year - 4) * 12 + month - 1) % 10;
    const monthBranchIndex = (month + 1) % 12; // Adjusted for Chinese calendar

    // Day Pillar (accurate calculation)
    const epoch = new Date('1900-01-01');
    const daysSinceEpoch = Math.floor((date.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (daysSinceEpoch + 4) % 10;
    const dayBranchIndex = (daysSinceEpoch + 10) % 12;

    // Hour Pillar (based on 2-hour periods)
    const hourBranchIndex = Math.floor((hours + 1) / 2) % 12;
    const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;

    return {
        year: {
            stem: HEAVENLY_STEMS[yearStemIndex],
            branch: EARTHLY_BRANCHES[yearBranchIndex]
        },
        month: {
            stem: HEAVENLY_STEMS[monthStemIndex],
            branch: EARTHLY_BRANCHES[monthBranchIndex]
        },
        day: {
            stem: HEAVENLY_STEMS[dayStemIndex],
            branch: EARTHLY_BRANCHES[dayBranchIndex]
        },
        hour: {
            stem: HEAVENLY_STEMS[hourStemIndex],
            branch: EARTHLY_BRANCHES[hourBranchIndex]
        }
    };
}

/**
 * Calculate element strength and frequency
 */
export function calculateElementFrequency(fourPillars: FourPillars): number {
    const dayMaster = fourPillars.day.stem;

    // Count supporting elements in the chart
    let supportCount = 0;
    const allStems = [
        fourPillars.year.stem,
        fourPillars.month.stem,
        fourPillars.day.stem,
        fourPillars.hour.stem
    ];

    const allBranches = [
        fourPillars.year.branch,
        fourPillars.month.branch,
        fourPillars.day.branch,
        fourPillars.hour.branch
    ];

    // Same element support
    allStems.forEach(stem => {
        if (stem.element === dayMaster.element) supportCount += 2;
    });

    allBranches.forEach(branch => {
        if (branch.element === dayMaster.element) supportCount += 1;
    });

    // Producing element support (based on Five Elements cycle)
    const producingElement = getProducingElement(dayMaster.element);
    allStems.forEach(stem => {
        if (stem.element === producingElement) supportCount += 1.5;
    });

    allBranches.forEach(branch => {
        if (branch.element === producingElement) supportCount += 0.5;
    });

    // Normalize to 0.5 - 1.0 range
    const frequency = Math.min(1.0, Math.max(0.5, supportCount / 16));

    return Math.round(frequency * 100) / 100;
}

/**
 * Get the element that produces the given element (Five Elements cycle)
 */
function getProducingElement(element: string): string {
    const cycle: Record<string, string> = {
        'Wood': 'Water',
        'Fire': 'Wood',
        'Earth': 'Fire',
        'Metal': 'Earth',
        'Water': 'Metal'
    };
    return cycle[element] || 'Water';
}

/**
 * Get archetype label for a Day Master
 */
export function getArchetypeLabel(dayMaster: typeof HEAVENLY_STEMS[number]): string {
    return ARCHETYPE_LABELS[dayMaster.id] || 'The Seeker';
}

/**
 * Main function to get Day Master info from birth data
 */
export function getDayMasterInfo(birthDate: string, birthTime: string) {
    const fourPillars = calculateFourPillars(birthDate, birthTime);
    const dayMaster = fourPillars.day.stem;
    const frequency = calculateElementFrequency(fourPillars);
    const label = getArchetypeLabel(dayMaster);

    return {
        dayMaster,
        label,
        frequency,
        fourPillars,
        fullName: `${dayMaster.name} (${dayMaster.chinese})`
    };
}
