import { useState } from 'react';
import { getCheckInQuestions } from '../services/checkInService';
import { Card, PrimaryBtn, SecondaryBtn, ProgressBar } from '../components/ui';

export function CheckInScreen({ onComplete, onBack }: { onComplete: () => void; onBack: () => void }) {
  const [step, setStep] = useState(0);
  const questions = getCheckInQuestions();

  const [answers, setAnswers] = useState<number[]>(
  Array(questions.length).fill(0)
);

const total = questions.length;
  const isLast = step === total - 1;

  return (
    <div className="p-7 max-w-[640px] mx-auto w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-[#9CA3AF]">Question {step + 1} of {total}</span>
          <span className="text-[10px] text-[#9CA3AF]">{Math.round(((step + 1) / total) * 100)}%</span>
        </div>
        <ProgressBar value={step + 1} max={total} />
      </div>

      <h1 className="text-lg font-semibold text-[#1F2937] mb-1">Weekly check-in</h1>
      <p className="text-xs text-[#9CA3AF] mb-6">
        A few questions about how work has felt lately. This takes about 2–3 minutes.
      </p>

      <Card className="p-6 mb-5">
        <p className="text-sm font-medium text-[#1F2937] mb-8 leading-relaxed">
          {questions[step]}
        </p>
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3, 4, 5].map(v => (
            <label key={v} className="flex flex-col items-center gap-2 cursor-pointer">
              <div
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                  answers[step] === v
                    ? 'border-[#185FA5] bg-[#185FA5]'
                    : 'border-[#D1D5DB] hover:border-[#9CA3AF]'
                }`}
                onClick={() => setAnswers(prev => prev.map((a, i) => i === step ? v : a))}
              >
                <span className={`text-xs font-medium ${answers[step] === v ? 'text-white' : 'text-[#9CA3AF]'}`}>{v}</span>
              </div>
            </label>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[#C4C8CF]">
          <span>Not at all</span>
          <span>Very much</span>
        </div>
      </Card>

      <div className="flex justify-between">
        <SecondaryBtn onClick={step === 0 ? onBack : () => setStep(s => s - 1)}>Back</SecondaryBtn>
        <PrimaryBtn
          onClick={() => { if (isLast) onComplete(); else setStep(s => s + 1); }}
          disabled={answers[step] === 0}
        >
          {isLast ? 'Submit check-in' : 'Next'}
        </PrimaryBtn>
      </div>
    </div>
  );
}

export function CheckInCompleteScreen({ onReturn }: { onReturn: () => void }) {
  return (
    <div className="p-7 max-w-[480px] mx-auto w-full flex flex-col items-center text-center mt-20">
      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
        <span className="text-[#10B981] text-2xl">✓</span>
      </div>
      <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Check-in complete</h2>
      <p className="text-sm text-[#6B7280] mb-2 leading-relaxed">Thank you for checking in.</p>
      <p className="text-xs text-[#9CA3AF] mb-8 leading-relaxed max-w-xs">
        Your responses help provide context for the behavioral patterns AGAP observes.
        Your responses are stored locally on this device.
      </p>
      <PrimaryBtn onClick={onReturn}>Return to Dashboard</PrimaryBtn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 7 — SETTINGS
// ─────────────────────────────────────────────────────────────

