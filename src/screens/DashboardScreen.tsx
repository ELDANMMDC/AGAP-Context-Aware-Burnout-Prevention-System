import { useState } from 'react';
import type { DashboardData, NavTab, RiskLevel } from '../types/agap';
import { Card, PrimaryBtn, RiskBadge, SectionLabel, TextBtn, Modal } from '../components/ui';
import { TrendChart } from '../components/charts/TrendChart';
import { signalColor } from '../lib/signal';
import { NotificationPopover } from '../components/notifications/NotificationPopover.tsx';


export function DashboardScreen({
  state, userName, onNav,
}: {
  state: DashboardData; userName: string; onNav: (tab: NavTab) => void;
}) {
  const [showExplainer, setShowExplainer] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const deltaText = {
    Low: '↓ 4 points compared with your recent average',
    Elevated: '↑ 8 points compared with your recent average',
    High: '↑ 14 points compared with your recent average',
  }[state.riskLevel];

  const trendNote = {
    Low: 'Your score has remained stable over the past several days.',
    Elevated: 'Your score has gradually increased over the past several days.',
    High: 'Your score has been elevated for several consecutive days.',
  }[state.riskLevel];

  const recTitle = {
    Low: 'Maintaining a good rhythm',
    Elevated: 'A small reset may help',
    High: 'Consider stepping away',
  }[state.riskLevel];

  return (
    <div className="p-7 max-w-[1100px] mx-auto w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2937]">{greeting}, {userName}.</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            {"Here's how your work patterns have looked today."}
          </p>
        </div>
        <div className="pt-1 flex items-center gap-2">
          <NotificationPopover />
        </div>
      </div>

      {/* Current Risk */}
      <Card className="p-5 mb-3">
        <div className="flex items-start gap-6">
          <div className="flex-1 min-w-0">
            <SectionLabel>Current Risk</SectionLabel>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-semibold text-[#1F2937] tabular-nums leading-none">
                {state.riskScore}
              </span>
              <RiskBadge level={state.riskLevel} />
            </div>
            <p className="text-sm text-[#4B5563] mb-2 leading-relaxed">{state.message}</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#9CA3AF]">{deltaText}</span>
              <TextBtn onClick={() => setShowExplainer(true)}>How is this calculated?</TextBtn>
            </div>
          </div>
          <RiskMeter score={state.riskScore} level={state.riskLevel} />
        </div>
      </Card>

      {/* Summary metrics */}
      <SectionLabel>{"Today's activity"}</SectionLabel>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Active time', value: state.activeTime },
          { label: 'Sessions', value: String(state.sessionCount) },
          { label: 'Idle ratio', value: state.idleRatio },
        ].map(m => (
          <Card key={m.label} className="p-4">
            <div className="text-[10px] text-[#9CA3AF] mb-2">{m.label}</div>
            <div className="text-2xl font-semibold text-[#1F2937] tabular-nums">{m.value}</div>
          </Card>
        ))}
      </div>

      {/* Signals + Trend */}
      <div className="grid grid-cols-[5fr_4fr] gap-3 mb-3">
        <Card className="p-5">
          <h3 className="text-xs font-semibold text-[#1F2937] mb-4">
            {"What contributed to today's result?"}
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Typing speed', ...state.signals.typingSpeed },
              { label: 'Error rate', ...state.signals.errorRate },
              { label: 'Mouse idle time', ...state.signals.mouseIdleTime },
              { label: 'App switching', ...state.signals.appSwitching },
            ].map(s => {
              const color = signalColor(s.label, s.direction);
              const arrow = s.direction === 'up' ? '↑' : '↓';
              return (
                <div key={s.label} className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-[#9CA3AF] mb-0.5">{s.label}</div>
                    <div className="text-sm font-semibold text-[#1F2937]">{s.value}</div>
                  </div>
                  <span className="text-xs font-medium" style={{ color }}>
                    {arrow} {s.change.replace(/[+-]/, '')} from baseline
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xs font-semibold text-[#1F2937] mb-0.5">Your recent pattern</h3>
          <p className="text-[10px] text-[#9CA3AF] mb-4">7-day risk score</p>
          <TrendChart data={state.trend} riskLevel={state.riskLevel} />
          <p className="text-[10px] text-[#6B7280] mt-3 leading-relaxed">{trendNote}</p>
        </Card>
      </div>

      {/* Recommendation */}
      <Card className="p-5 mb-3">
        <h3 className="text-xs font-semibold text-[#1F2937] mb-1">
          {recTitle}
        </h3>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          {state.recommendation}
        </p>
      </Card>

      {/* Check-in nudge */}
      <Card className="p-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-[#1F2937] mb-0.5">No check-in this week</div>
          <div className="text-[10px] text-[#9CA3AF]">
            Your weekly check-in provides additional context for your behavioral patterns.
          </div>
        </div>
        <PrimaryBtn onClick={() => onNav('checkin')} className="flex-shrink-0">
          Start check-in
        </PrimaryBtn>
      </Card>

      {showExplainer && (
        <Modal title="How is this calculated?" onClose={() => setShowExplainer(false)}>
          <div className="space-y-3 text-xs text-[#4B5563] leading-relaxed">
            <p>
              Your risk indicator combines changes in several behavioral patterns with your weekly check-in.
            </p>
            <p>
              AGAP compares your recent activity with your personal baseline rather than comparing you with other people.
            </p>
            <div className="border-t border-[#E5E7EB] pt-3 space-y-2">
              {[
                '1. AGAP learns your normal work pattern.',
                '2. It compares recent patterns with your baseline.',
                '3. Changes are converted into behavioral indicators.',
                '4. A weekly self-report provides additional context.',
                '5. The system produces a fatigue-risk indicator.',
              ].map(s => (
                <div key={s} className="text-[#6B7280]">{s}</div>
              ))}
            </div>
            <div className="bg-[#F9FAFB] rounded-lg p-3 text-[10px] text-[#9CA3AF]">
              This is a research prototype, not a medical diagnostic tool.
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function RiskMeter({ score, level }: { score: number; level: RiskLevel }) {
  const color = level === 'Low' ? '#10B981' : level === 'Elevated' ? '#F59E0B' : '#EF4444';
  const pct = score / 100;
  const r = 28, cx = 36, cy = 36;
  const circumference = Math.PI * r;
  const strokeDash = circumference * pct;

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-1">
      <svg width="72" height="44" viewBox="0 0 72 44">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${strokeDash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
      </svg>
      <span className="text-[10px] text-[#9CA3AF]">out of 100</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 6 — CHECK-IN
// ─────────────────────────────────────────────────────────────

