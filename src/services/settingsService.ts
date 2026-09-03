import { DAYS } from '../data/mockData';

export type ScheduleDay = {
  enabled: boolean;
  start: string;
  end: string;
};

const DEFAULT_SCHEDULE: ScheduleDay[] = [
  { enabled: true, start: '09:00', end: '18:00' },
  { enabled: true, start: '09:00', end: '18:00' },
  { enabled: true, start: '09:00', end: '18:00' },
  { enabled: true, start: '09:00', end: '18:00' },
  { enabled: true, start: '09:00', end: '18:00' },
  { enabled: false, start: '09:00', end: '18:00' },
  { enabled: false, start: '09:00', end: '18:00' },
];

export function getDays(): string[] {
  return DAYS;
}

export function getDefaultSchedule(): ScheduleDay[] {
  return DEFAULT_SCHEDULE.map(day => ({ ...day }));
}

// ─────────────────────────────────────────────────────────────
// WORK STYLE → IDLE THRESHOLD
// ─────────────────────────────────────────────────────────────
// Users never see or set the raw idle threshold directly during
// onboarding. Instead they pick a plain-language work style, which
// maps to a predefined threshold value (in seconds, matching the
// IDLE_PRESETS values used in SettingsScreen).

export type WorkStyle = 'focused' | 'balanced' | 'flexible';

export type WorkStyleOption = {
  value: WorkStyle;
  label: string;
  description: string;
  idleThreshold: string;
};

export const WORK_STYLE_OPTIONS: WorkStyleOption[] = [
  {
    value: 'focused',
    label: 'Deep, uninterrupted focus',
    description: 'I stay on one task for long stretches with few breaks.',
    idleThreshold: '120',
  },
  {
    value: 'balanced',
    label: 'Steady with regular breaks',
    description: 'I take short breaks throughout the day at a fairly regular pace.',
    idleThreshold: '300',
  },
  {
    value: 'flexible',
    label: 'Frequent context switching',
    description: 'My day is broken up often by meetings, messages, or other tasks.',
    idleThreshold: '600',
  },
];

export function getWorkStyleOptions(): WorkStyleOption[] {
  return WORK_STYLE_OPTIONS;
}

export function getIdleThresholdForWorkStyle(style: WorkStyle): string {
  return (
    WORK_STYLE_OPTIONS.find(option => option.value === style)?.idleThreshold ??
    WORK_STYLE_OPTIONS[1].idleThreshold
  );
}