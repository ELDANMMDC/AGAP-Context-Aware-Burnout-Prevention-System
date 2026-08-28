export type RiskLevel = 'Low' | 'Elevated' | 'High';
export type NavTab = 'dashboard' | 'checkin' | 'settings' | 'about';
export type OnboardingStep = 'welcome' | 'profile' | 'schedule' | 'calibration' | null;

export interface Signal {
  value: string;
  change: string;
  direction: 'up' | 'down';
}

export interface DashboardData {
  riskScore: number;
  riskLevel: RiskLevel;
  activeTime: string;
  sessionCount: number;
  idleRatio: string;
  signals: {
    typingSpeed: Signal;
    errorRate: Signal;
    mouseIdleTime: Signal;
    appSwitching: Signal;
  };
  trend: { day: string; score: number }[];
  message: string;
  recommendation: string;
}
