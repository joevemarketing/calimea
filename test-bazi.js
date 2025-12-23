// Test BaZi calculations with different dates
import { getDayMasterInfo, calculateInitialMixerValues } from '../src/lib/utils/bazi';

console.log('=== Testing BaZi Calculator ===\n');

const testCases = [
    { date: '1990-01-15', time: '10:00', name: 'Test 1' },
    { date: '1985-06-20', time: '14:30', name: 'Test 2' },
    { date: '2000-12-25', time: '08:00', name: 'Test 3' },
    { date: '1995-03-10', time: '18:45', name: 'Test 4' },
    { date: '1988-09-05', time: '22:00', name: 'Test 5' }
];

testCases.forEach(test => {
    const info = getDayMasterInfo(test.date, test.time);
    const mixer = calculateInitialMixerValues(info.fourPillars);

    console.log(`${test.name} (${test.date} ${test.time}):`);
    console.log(`  Day Master: ${info.fullName}`);
    console.log(`  Label: ${info.label}`);
    console.log(`  Frequency: ${info.frequency}`);
    console.log(`  Mixer: BASS=${mixer.BASS}% MID=${mixer.MID}% TREBLE=${mixer.TREBLE}%`);
    console.log(`  Four Pillars:`);
    console.log(`    Year: ${info.fourPillars.year.stem.chinese}${info.fourPillars.year.branch.chinese}`);
    console.log(`    Month: ${info.fourPillars.month.stem.chinese}${info.fourPillars.month.branch.chinese}`);
    console.log(`    Day: ${info.fourPillars.day.stem.chinese}${info.fourPillars.day.branch.chinese}`);
    console.log(`    Hour: ${info.fourPillars.hour.stem.chinese}${info.fourPillars.hour.branch.chinese}`);
    console.log('');
});
