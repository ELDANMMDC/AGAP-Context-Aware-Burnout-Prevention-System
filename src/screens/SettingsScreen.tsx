import { useState } from 'react';
import type { ReactNode } from 'react';
import {
  Card,
  PrimaryBtn,
  SecondaryBtn,
  DangerBtn,
  Toggle,
  SectionLabel,
  Modal,
  TextBtn,
} from '../components/ui';
import {
  getDays,
  getDefaultSchedule,
  type ScheduleDay,
} from '../services/settingsService';

const DAYS = getDays();
const INITIAL_SCHEDULE = getDefaultSchedule();

const IDLE_PRESETS = [
  { value: '60', label: '1 minute' },
  { value: '120', label: '2 minutes' },
  { value: '300', label: '5 minutes' },
  { value: '600', label: '10 minutes' },
  { value: '900', label: '15 minutes' },
  { value: '1200', label: '20 minutes' },
  { value: '1800', label: '30 minutes' },
];

export function SettingsScreen({
  userName,
  monitoring,
  onToggleMonitor,
}: {
  userName: string;
  monitoring: boolean;
  onToggleMonitor: () => void;
}) {
  const [prefs, setPrefs] = useState({
    wellnessNotif: true,
    checkinReminder: true,
    breakReminder: true,
    autoStart: true,
    cloudBackup: true,
    idleThreshold: '60',
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '07:00',
  });

  const [schedule, setSchedule] = useState<ScheduleDay[]>(INITIAL_SCHEDULE);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleDay[]>(INITIAL_SCHEDULE);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [exportConfirmed, setExportConfirmed] = useState(false);
  const [resetConfirmed, setResetConfirmed] = useState(false);

  const togglePref = (
    key:
      | 'wellnessNotif'
      | 'checkinReminder'
      | 'breakReminder'
      | 'autoStart'
      | 'cloudBackup'
      | 'quietHours',
  ) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openScheduleEditor = () => {
    setEditingSchedule(schedule.map(day => ({ ...day })));
    setShowScheduleModal(true);
  };

  const updateScheduleDay = (
    index: number,
    changes: Partial<ScheduleDay>,
  ) => {
    setEditingSchedule(prev =>
      prev.map((day, i) => (i === index ? { ...day, ...changes } : day)),
    );
  };

  const saveSchedule = () => {
    setSchedule(editingSchedule.map(day => ({ ...day })));
    setShowScheduleModal(false);
  };

  const scheduleSummary = (() => {
    const enabledDays = schedule
      .map((day, index) => (day.enabled ? DAYS[index] : null))
      .filter(Boolean) as string[];

    if (enabledDays.length === 0) {
      return 'No work days configured';
    }

    const weekdayPattern =
      enabledDays.length === 5 &&
      DAYS.slice(0, 5).every(day => enabledDays.includes(day));

    const firstEnabled = schedule.find(day => day.enabled);

    if (weekdayPattern && firstEnabled) {
      const sameHours = schedule
        .slice(0, 5)
        .every(
          day =>
            day.enabled &&
            day.start === firstEnabled.start &&
            day.end === firstEnabled.end,
        );

      if (sameHours) {
        return `Monday–Friday, ${formatTime(firstEnabled.start)} – ${formatTime(firstEnabled.end)}`;
      }
    }

    return `${enabledDays.length} work day${enabledDays.length === 1 ? '' : 's'} configured`;
  })();

  const isCustomIdleThresholdSelected =
    !IDLE_PRESETS.some(
      option => option.value === prefs.idleThreshold,
    );

  const handleIdleThresholdChange = (value: string) => {
    setPrefs(prev => ({
      ...prev,
      idleThreshold: value,
    }));
  };

  const handleExport = () => {
    setShowExportModal(false);
    setExportConfirmed(true);
  };

  const handleResetCalibration = () => {
    setShowResetModal(false);
    setResetConfirmed(true);
  };

  return (
    <div className="p-7 max-w-[720px] mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#1F2937] mb-6">
        Settings
      </h1>

      {/* Profile */}
      <Card className="p-5 mb-4">
        <SectionLabel>Profile</SectionLabel>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#6B7280] mb-1.5">
              Display name
            </label>

            <input
              type="text"
              defaultValue={userName}
              className="px-3 py-2 text-sm border border-[#D1D5DB] rounded-lg w-56 focus:outline-none focus:border-[#185FA5] transition-colors"
            />
          </div>

          <div>
            <div className="text-xs text-[#6B7280] mb-0.5">
              Work schedule
            </div>

            <div className="text-sm text-[#1F2937]">
              {scheduleSummary}
            </div>

            <TextBtn className="mt-1.5" onClick={openScheduleEditor}>
              Edit schedule
            </TextBtn>
          </div>
        </div>
      </Card>

      {/* Monitoring */}
      <Card className="p-5 mb-4">
        <SectionLabel>Monitoring</SectionLabel>

        {!monitoring && (
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 mb-4">
            <div className="text-xs font-medium text-[#4B5563]">
              Monitoring paused
            </div>

            <div className="text-[10px] text-[#9CA3AF] mt-0.5">
              AGAP is currently not collecting behavioral activity.
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Behavior Capture removed.
              Monitoring itself remains controlled by the existing
              Pause/Resume Monitoring action below. */}

          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.autoStart
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <SettingRow
              label="Start monitoring automatically"
              desc="Begin when your work schedule starts"
            >
              <Toggle
                on={prefs.autoStart}
                onChange={() => togglePref('autoStart')}
              />
            </SettingRow>
          </div>

          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.cloudBackup
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <SettingRow
              label="Cloud backup"
              desc="Automatically back up your monitoring data to the cloud"
            >
              <Toggle
                on={prefs.cloudBackup}
                onChange={() => togglePref('cloudBackup')}
              />
            </SettingRow>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[#1F2937]">
                Idle threshold
              </div>

              <div className="text-[10px] text-[#9CA3AF]">
                Mark session idle after this duration
              </div>
            </div>

            <select
              value={prefs.idleThreshold}
              onChange={e => handleIdleThresholdChange(e.target.value)}
              className="text-xs border border-[#D1D5DB] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#185FA5] transition-colors bg-white"
            >
              {IDLE_PRESETS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-[#E5E7EB]">
            {monitoring ? (
              <SecondaryBtn onClick={onToggleMonitor}>
                Pause monitoring
              </SecondaryBtn>
            ) : (
              <PrimaryBtn onClick={onToggleMonitor}>
                Resume monitoring
              </PrimaryBtn>
            )}
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-5 mb-4">
        <SectionLabel>Notifications</SectionLabel>

        <div className="space-y-4">
          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.wellnessNotif
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <SettingRow
              label="Wellness notifications"
              desc="Risk-level alerts and summaries"
            >
              <Toggle
                on={prefs.wellnessNotif}
                onChange={() => togglePref('wellnessNotif')}
              />
            </SettingRow>
          </div>

          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.checkinReminder
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <SettingRow
              label="Check-in reminders"
              desc="Weekly prompt to complete your check-in"
            >
              <Toggle
                on={prefs.checkinReminder}
                onChange={() => togglePref('checkinReminder')}
              />
            </SettingRow>
          </div>
          
          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.breakReminder
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <SettingRow
              label="Break reminders"
              desc="Alert after extended active sessions"
            >
              <Toggle
                on={prefs.breakReminder}
                onChange={() => togglePref('breakReminder')}
              />
            </SettingRow>
          </div>

          <div
            className={`rounded-lg transition-all duration-200 ${
              prefs.quietHours
                ? ''
                : 'bg-[#F3F4F6] opacity-60 px-3 py-2 -mx-3'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-[#1F2937]">
                  Quiet hours
                </div>

                <div className="text-[10px] text-[#9CA3AF]">
                  No notifications during these hours
                </div>
              </div>

              <Toggle
                on={prefs.quietHours}
                onChange={() => togglePref('quietHours')}
              />
            </div>
          </div>

          {prefs.quietHours && (
            <div className="flex items-center justify-end gap-2 pl-4">
              <label className="text-[10px] text-[#9CA3AF]">
                Start
              </label>

              <input
                type="time"
                value={prefs.quietStart}
                onChange={e =>
                  setPrefs(prev => ({
                    ...prev,
                    quietStart: e.target.value,
                  }))
                }
                className="text-xs border border-[#D1D5DB] rounded-md px-2 py-1 focus:outline-none focus:border-[#185FA5] transition-colors"
              />

              <span className="text-[#C4C8CF] text-xs">—</span>

              <label className="text-[10px] text-[#9CA3AF]">
                End
              </label>

              <input
                type="time"
                value={prefs.quietEnd}
                onChange={e =>
                  setPrefs(prev => ({
                    ...prev,
                    quietEnd: e.target.value,
                  }))
                }
                className="text-xs border border-[#D1D5DB] rounded-md px-2 py-1 focus:outline-none focus:border-[#185FA5] transition-colors"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="p-5">
        <SectionLabel>Privacy & Data</SectionLabel>

        <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">
          AGAP is designed to process behavioral patterns without
          recording content.
        </p>

        <div className="space-y-2 mb-5">
          {[
            'Keystroke content is not recorded',
            'Screen content is not captured',
            'Application content is not recorded',
            'Mouse coordinates are not stored',
          ].map(item => (
            <div
              key={item}
              className="flex items-center gap-2.5 text-xs text-[#4B5563]"
            >
              <span className="text-[#10B981] flex-shrink-0">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <SecondaryBtn onClick={() => setShowExportModal(true)}>
            Export my data
          </SecondaryBtn>

          <SecondaryBtn onClick={() => setShowResetModal(true)}>
            Reset calibration
          </SecondaryBtn>

          <DangerBtn onClick={() => setShowDeleteModal(true)}>
            Delete all data
          </DangerBtn>
        </div>

        {exportConfirmed && (
          <div className="mt-4 text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
            Mock export confirmed. No file was created because data
            export is still simulated.
          </div>
        )}

        {resetConfirmed && (
          <div className="mt-4 text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
            Mock calibration reset confirmed. The real calibration
            system will be connected later.
          </div>
        )}

        {deleteConfirmed && (
          <div className="mt-4 text-xs text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
            All cloud and local data has been removed.
          </div>
        )}
      </Card>

      {/* Export confirmation */}
      {showExportModal && (
        <Modal
          title="Export your data?"
          onClose={() => setShowExportModal(false)}
        >
          <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
            This will prepare your locally stored AGAP data for
            export. Your data will not be sent to an external service.
          </p>

          <div className="flex justify-between">
            <SecondaryBtn onClick={() => setShowExportModal(false)}>
              Cancel
            </SecondaryBtn>

            <PrimaryBtn onClick={handleExport}>
              Confirm export
            </PrimaryBtn>
          </div>
        </Modal>
      )}

      {/* Reset calibration confirmation */}
      {showResetModal && (
        <Modal
          title="Reset calibration?"
          onClose={() => setShowResetModal(false)}
        >
          <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
            This will reset your current baseline calibration. Future
            risk indicators would need to use a new baseline.
          </p>

          <div className="flex justify-between">
            <SecondaryBtn onClick={() => setShowResetModal(false)}>
              Cancel
            </SecondaryBtn>

            <DangerBtn onClick={handleResetCalibration}>
              Reset calibration
            </DangerBtn>
          </div>
        </Modal>
      )}

      {/* Schedule editor */}
      {showScheduleModal && (
        <Modal
          title="Edit work schedule"
          onClose={() => setShowScheduleModal(false)}
        >
          <p className="text-xs text-[#6B7280] mb-5 leading-relaxed">
            Choose the days and hours when AGAP should consider
            your work schedule active.
          </p>

          <div className="space-y-3 mb-6">
            {DAYS.map((day, index) => {
              const scheduleDay = editingSchedule[index];

              return (
                <div
                  key={day}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs text-[#4B5563] w-20 flex-shrink-0">
                    {day.slice(0, 3)}
                  </span>

                  {scheduleDay.enabled ? (
                    <>
                      <input
                        type="time"
                        value={scheduleDay.start}
                        onChange={e =>
                          updateScheduleDay(index, {
                            start: e.target.value,
                          })
                        }
                        className="px-2 py-1 text-xs border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#185FA5] transition-colors"
                      />

                      <span className="text-[#C4C8CF] text-xs">
                        —
                      </span>

                      <input
                        type="time"
                        value={scheduleDay.end}
                        onChange={e =>
                          updateScheduleDay(index, {
                            end: e.target.value,
                          })
                        }
                        className="px-2 py-1 text-xs border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#185FA5] transition-colors"
                      />
                    </>
                  ) : (
                    <span className="text-[#C4C8CF] text-xs flex-1">
                      Off
                    </span>
                  )}

                  <Toggle
                    on={scheduleDay.enabled}
                    onChange={value =>
                      updateScheduleDay(index, {
                        enabled: value,
                      })
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between">
            <SecondaryBtn onClick={() => setShowScheduleModal(false)}>
              Cancel
            </SecondaryBtn>

            <PrimaryBtn onClick={saveSchedule}>
              Save schedule
            </PrimaryBtn>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      {showDeleteModal && (
        <Modal
          title="Delete all data?"
          onClose={() => setShowDeleteModal(false)}
        >
          <p className="text-xs text-[#6B7280] mb-3 leading-relaxed">
            This will permanently remove both your cloud and local AGAP data,
            including:
          </p>

          <ul className="text-xs text-[#4B5563] space-y-1.5 mb-4 ml-1">
            {[
              'Behavioral history',
              'Baseline',
              'Risk history',
              'Check-in responses',
              'Strain ratings',
            ].map(item => (
              <li
                key={item}
                className="flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#D1D5DB] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-xs text-[#9CA3AF] mb-5">
            This action cannot be undone.
          </p>

          <div className="flex justify-between">
            <SecondaryBtn onClick={() => setShowDeleteModal(false)}>
              Cancel
            </SecondaryBtn>

            <DangerBtn
              onClick={() => {
                setDeleteConfirmed(true);
                setShowDeleteModal(false);
              }}
            >
              Delete all data
            </DangerBtn>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function SettingRow({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-[#1F2937]">
          {label}
        </div>

        <div className="text-[10px] text-[#9CA3AF]">
          {desc}
        </div>
      </div>

      {children}
    </div>
  );
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(':').map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return value;
  }

  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}