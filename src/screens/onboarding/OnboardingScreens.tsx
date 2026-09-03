import { useState } from 'react';
import type { ReactNode } from 'react';
import { PrimaryBtn, SecondaryBtn, Card, ProgressBar, Toggle } from '../../components/ui';
import { getDays, getWorkStyleOptions, type WorkStyle } from '../../services/settingsService';

export function OnboardingShell({ children, step, total }: {
  children: ReactNode; step?: number; total?: number;
}) {
  return (
    <div className="w-screen h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-8 overflow-y-auto">
      <div className="w-full max-w-[480px]">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/agap-logo.png"
            alt="AGAP logo"
            className="w-14 h-14 object-contain mb-2"
          />

          <div className="text-center">
            <div className="text-lg font-semibold text-[#1F2937]">
              AGAP
            </div>

            <div className="text-[10px] font-medium text-[#9CA3AF] tracking-widest uppercase mt-0.5">
              A Context-Aware Burnout Prevention System
            </div>
          </div>
        </div>

        {step !== undefined && total !== undefined && (
          <div className="flex justify-end mb-3">
            <span className="text-[10px] text-[#B0B7C3]">
              {step} of {total}
            </span>
          </div>
        )}

        {children}
        <p className="text-center text-[10px] text-[#C4C8CF] mt-5">
          Behavioral patterns, not content.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 1 — WELCOME
// ─────────────────────────────────────────────────────────────

export function WelcomeScreen({ onNext }: { onNext: () => void }) {
  const [agreed, setAgreed] = useState(false);
  return (
    <OnboardingShell step={1} total={5}>
      <Card className="p-8">
        <h1 className="text-2xl font-semibold text-[#1F2937] leading-tight mb-2">
          Understand your work patterns
        </h1>
        <p className="text-[#9CA3AF] text-sm mb-6">without giving up your privacy.</p>

        <p className="text-[#4B5563] text-sm leading-relaxed mb-3">
          AGAP looks at behavioral patterns such as typing activity, mouse activity, idle time, and application switching.
        </p>
        <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
          It does not record what you type, screenshots, file contents, or application content.
        </p>

        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 mb-6">
          <div className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-3">
            Privacy-first by design
          </div>
          <div className="space-y-2">
            {[
              'Keystroke content is not recorded',
              'Screen content is not captured',
              'Application content is not recorded',
              'Mouse coordinates are not stored',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-xs text-[#4B5563]">
                <span className="text-[#10B981] flex-shrink-0">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 accent-[#185FA5] flex-shrink-0"
          />
          <span className="text-xs text-[#4B5563] leading-relaxed">
            I understand that AGAP observes behavioral patterns, not content, and I agree to proceed.
          </span>
        </label>

        <PrimaryBtn onClick={onNext} disabled={!agreed} className="w-full text-center flex justify-center">
          Get Started
        </PrimaryBtn>
      </Card>
    </OnboardingShell>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 — PROFILE
// ─────────────────────────────────────────────────────────────

export function ProfileScreen({ onNext, onBack }: { onNext: (name: string) => void; onBack: () => void }) {
  const [name, setName] = useState('Alex');
  return (
    <OnboardingShell step={2} total={5}>
      <Card className="p-8">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-1">Set up your profile</h2>
        <p className="text-[#9CA3AF] text-xs mb-6">You can use a display name or leave this blank.</p>

        <div className="mb-6">
          <label className="block text-xs font-medium text-[#374151] mb-2">Display name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Optional"
            className="w-full px-3 py-2.5 text-sm border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-[#185FA5] focus:ring-1 focus:ring-[#185FA5]/20 transition-colors"
          />
          <p className="text-[10px] text-[#9CA3AF] mt-2">
            This name is used only to personalize your AGAP experience.
          </p>
        </div>

        <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] -mx-8 px-8 pt-4 pb-2 rounded-b-xl">
          <p className="text-[10px] text-[#9CA3AF] mb-4">
            AGAP does not ask for your email, employer, or location. It is a local wellness tool.
          </p>
          <div className="flex justify-between">
            <SecondaryBtn onClick={onBack}>Back</SecondaryBtn>
            <PrimaryBtn onClick={() => onNext(name.trim() || 'there')}>Continue</PrimaryBtn>
          </div>
        </div>
      </Card>
    </OnboardingShell>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 3 — WORK SCHEDULE
// ─────────────────────────────────────────────────────────────

export function WorkScheduleScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const DAYS = getDays();
  const [enabled, setEnabled] = useState([true, true, true, true, true, false, false]);

  return (
    <OnboardingShell step={3} total={5}>
      <Card className="p-8">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-1">Your work schedule</h2>
        <p className="text-[#9CA3AF] text-xs mb-6">
          AGAP uses your schedule to distinguish work periods from time away from work.
        </p>

        <div className="space-y-3 mb-6">
          {DAYS.map((day, i) => (
            <div key={day} className="flex items-center gap-3">
              <span className="text-xs text-[#4B5563] w-24 flex-shrink-0">{day}</span>
              {enabled[i] ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    defaultValue="09:00"
                    className="px-2 py-1 text-xs border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#185FA5] transition-colors"
                  />
                  <span className="text-[#C4C8CF] text-xs">—</span>
                  <input
                    type="time"
                    defaultValue="18:00"
                    className="px-2 py-1 text-xs border border-[#D1D5DB] rounded-md focus:outline-none focus:border-[#185FA5] transition-colors"
                  />
                </div>
              ) : (
                <span className="text-[#C4C8CF] text-xs flex-1">— off</span>
              )}
              <Toggle on={enabled[i]} onChange={v => setEnabled(prev => prev.map((x, j) => j === i ? v : x))} />
            </div>
          ))}
        </div>

        <p className="text-[10px] text-[#9CA3AF] mb-5">You can change this later in Settings.</p>

        <div className="flex justify-between">
          <SecondaryBtn onClick={onBack}>Back</SecondaryBtn>
          <PrimaryBtn onClick={onNext}>Continue</PrimaryBtn>
        </div>
      </Card>
    </OnboardingShell>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 4 — WORK STYLE
// ─────────────────────────────────────────────────────────────

export function WorkStyleScreen({ onNext, onBack }: { onNext: (style: WorkStyle) => void; onBack: () => void }) {
  const options = getWorkStyleOptions();
  const [selected, setSelected] = useState<WorkStyle>('balanced');

  return (
    <OnboardingShell step={4} total={5}>
      <Card className="p-8">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-1">How would you describe your work style?</h2>
        <p className="text-[#9CA3AF] text-xs mb-6">
          This helps AGAP recognize idle time in a way that fits how you actually work.
        </p>

        <div className="space-y-3 mb-6">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelected(option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selected === option.value
                  ? 'border-[#185FA5] bg-[#F0F6FB]'
                  : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="text-sm font-medium text-[#1F2937] mb-0.5">
                {option.label}
              </div>
              <div className="text-xs text-[#6B7280] leading-relaxed">
                {option.description}
              </div>
            </button>
          ))}
        </div>

        <p className="text-[10px] text-[#9CA3AF] mb-5">You can change this later in Settings.</p>

        <div className="flex justify-between">
          <SecondaryBtn onClick={onBack}>Back</SecondaryBtn>
          <PrimaryBtn onClick={() => onNext(selected)}>Continue</PrimaryBtn>
        </div>
      </Card>
    </OnboardingShell>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 5 — CALIBRATION
// ─────────────────────────────────────────────────────────────

export function CalibrationScreen({ onNext }: { onNext: () => void }) {
  const day = 14;
  const total = 14;
  const isComplete = day >= total;

  return (
    <OnboardingShell step={5} total={5}>
      <Card className="p-8">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-1">Build your personal baseline</h2>
        <p className="text-[#9CA3AF] text-xs mb-6">
          AGAP is learning what a typical workday looks like for you.
        </p>

        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-medium text-[#1F2937]">Day {day} of {total}</span>
            <span className="text-xs text-[#9CA3AF]">{Math.round((day / total) * 100)}%</span>
          </div>
          <ProgressBar value={day} max={total} />
        </div>

        {isComplete ? (
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg mb-6">
            <span className="text-[#10B981] mt-0.5 flex-shrink-0">✓</span>
            <div>
              <div className="text-xs font-semibold text-emerald-800 mb-0.5">Baseline complete</div>
              <div className="text-[10px] text-emerald-700 leading-relaxed">
                Your future risk indicators will be based on changes from your own usual patterns.
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 text-xs text-[#6B7280] space-y-1">
            <div>{day} days collected</div>
            <div>{total - day} days remaining</div>
          </div>
        )}

        <PrimaryBtn onClick={onNext} className="w-full flex justify-center">
          Continue to Dashboard
        </PrimaryBtn>
      </Card>
    </OnboardingShell>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 6 — DASHBOARD
// ─────────────────────────────────────────────────────────────

