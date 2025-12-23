
const { getDayMasterInfo, calculateInitialMixerValues, calculateFourPillars } = require('./src/lib/utils/bazi');
const { calculateVitality } = require('./src/lib/utils/vitality');

const dates = [
    { d: '1990-05-15', t: '14:30' },
    { d: '1982-11-02', t: '09:15' },
    { d: '1975-01-20', t: '22:45' },
    { d: '2005-08-30', t: '12:00' },
    { d: '1968-03-12', t: '04:30' },
    { d: '1999-12-31', t: '23:59' },
    { d: '1950-07-06', t: '18:20' }
];

console.log('--- Vitality Variance Test ---');
dates.forEach(item => {
    const pillars = calculateFourPillars(item.d, item.t);
    const info = getDayMasterInfo(item.d, item.t);
    const mixer = calculateInitialMixerValues(pillars);
    const vScore = calculateVitality(mixer.BASS, mixer.MID, mixer.TREBLE);

    console.log(`Date: ${item.d} | DM: ${info.dayMaster.chinese} | V-Score: ${vScore}% | Mixer: B:${mixer.BASS} M:${mixer.MID} T:${mixer.TREBLE}`);
});
