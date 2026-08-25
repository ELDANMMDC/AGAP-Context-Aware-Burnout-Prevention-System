import type { MockState, RiskLevel } from '../types/agap';

const LOW_STATE: MockState = {
  riskScore: 32,
  riskLevel: 'Low',
  activeTime: '5h 10m',
  sessionCount: 4,
  idleRatio: '11%',
  signals: {
    typingSpeed: { value: '58 WPM', change: '+3%', direction: 'up' },
    errorRate: { value: '3.1%', change: '-4%', direction: 'down' },
    mouseIdleTime: { value: '8m 20s', change: '-5%', direction: 'down' },
    appSwitching: { value: '11.1/hr', change: '-2%', direction: 'down' },
  },
  trend: [
    { day: 'Mon', score: 36 }, { day: 'Tue', score: 34 }, { day: 'Wed', score: 33 },
    { day: 'Thu', score: 35 }, { day: 'Fri', score: 32 }, { day: 'Sat', score: 30 }, { day: 'Sun', score: 32 },
  ],
  message: 'Your recent work patterns look close to your usual baseline.',
  recommendation: "You're maintaining a steady rhythm. Your patterns are within your normal range.",
};

const ELEVATED_STATE: MockState = {
  riskScore: 64,
  riskLevel: 'Elevated',
  activeTime: '6h 42m',
  sessionCount: 5,
  idleRatio: '18%',
  signals: {
    typingSpeed: { value: '42 WPM', change: '-12%', direction: 'down' },
    errorRate: { value: '8.2%', change: '+8%', direction: 'up' },
    mouseIdleTime: { value: '20m 40s', change: '+21%', direction: 'up' },
    appSwitching: { value: '14.2/hr', change: '+9%', direction: 'up' },
  },
  trend: [
    { day: 'Mon', score: 41 }, { day: 'Tue', score: 45 }, { day: 'Wed', score: 48 },
    { day: 'Thu', score: 52 }, { day: 'Fri', score: 49 }, { day: 'Sat', score: 57 }, { day: 'Sun', score: 64 },
  ],
  message: 'Your recent work patterns are somewhat different from your usual baseline.',
  recommendation: "You've had a sustained period of work activity. Consider stepping away for a few minutes before continuing.",
};

const HIGH_STATE: MockState = {
  riskScore: 82,
  riskLevel: 'High',
  activeTime: '8h 14m',
  sessionCount: 7,
  idleRatio: '25%',
  signals: {
    typingSpeed: { value: '31 WPM', change: '-22%', direction: 'down' },
    errorRate: { value: '13.9%', change: '+17%', direction: 'up' },
    mouseIdleTime: { value: '38m 10s', change: '+36%', direction: 'up' },
    appSwitching: { value: '17.8/hr', change: '+18%', direction: 'up' },
  },
  trend: [
    { day: 'Mon', score: 52 }, { day: 'Tue', score: 58 }, { day: 'Wed', score: 63 },
    { day: 'Thu', score: 70 }, { day: 'Fri', score: 75 }, { day: 'Sat', score: 79 }, { day: 'Sun', score: 82 },
  ],
  message: 'Your recent work patterns show a sustained change. Consider stepping away and returning when you feel ready.',
  recommendation: 'Your patterns suggest you may benefit from a meaningful break. Even 15 minutes away from the screen can help.',
};

export const MOCK_STATES: Record<RiskLevel, MockState> = {
  Low: LOW_STATE,
  Elevated: ELEVATED_STATE,
  High: HIGH_STATE,
};

export const CHECK_IN_QUESTIONS = [
  'I feel emotionally drained by my work.',
  'I feel used up at the end of the workday.',
  'I feel tired when I get up in the morning and have to face another day on the job.',
  'I feel I\'m working too hard on my job.',
  'I feel frustrated by my job.',
  'Working with people puts too much stress on me.',
  'I feel burned out from my work.',
  'I feel like I\'m at the end of my rope.',
  'I feel I deal effectively with the problems of my work.',
  'I feel I can positively influence people\'s lives through my work.',
  'I have accomplished many worthwhile things in this job.',
  'I feel calm when I think about my work.',
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// ─────────────────────────────────────────────────────────────
// SIGNAL HELPERS
// ─────────────────────────────────────────────────────────────

