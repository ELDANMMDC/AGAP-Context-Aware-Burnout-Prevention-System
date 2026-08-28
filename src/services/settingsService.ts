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