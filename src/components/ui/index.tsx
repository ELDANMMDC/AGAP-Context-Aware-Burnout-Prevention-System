import type { ReactNode } from 'react';
import type { RiskLevel } from '../../types/agap';

export function PrimaryBtn({
  children, onClick, disabled = false, className = '',
}: {
  children: ReactNode; onClick?: () => void; disabled?: boolean; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 bg-[#185FA5] text-white text-xs font-medium rounded-lg
        hover:bg-[#14518a] active:bg-[#0f3d6e] disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryBtn({
  children, onClick, className = '',
}: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 bg-white border border-[#D1D5DB] text-[#1F2937] text-xs font-medium rounded-lg
        hover:bg-[#F9FAFB] active:bg-[#F3F4F6] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function DangerBtn({
  children, onClick, className = '',
}: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 bg-[#EF4444] text-white text-xs font-medium rounded-lg
        hover:bg-red-600 active:bg-red-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function TextBtn({
  children, onClick, className = '',
}: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs text-[#185FA5] hover:underline transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const cfg = {
    Low: { bg: 'bg-emerald-50', text: 'text-emerald-800', dot: 'bg-[#10B981]' },
    Elevated: { bg: 'bg-amber-50', text: 'text-amber-800', dot: 'bg-[#F59E0B]' },
    High: { bg: 'bg-red-50', text: 'text-red-800', dot: 'bg-[#EF4444]' },
  }[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {level}
    </span>
  );
}

export function StatusIndicator({ active }: { active: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#6B7280]">
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'}`} />
      {active ? 'Monitoring active' : 'Monitoring paused'}
    </span>
  );
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-[#185FA5]' : 'bg-[#D1D5DB]'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${on ? 'translate-x-4' : ''}`}
      />
    </button>
  );
}

export function ProgressBar({ value, max, className = '' }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className={`h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-[#185FA5] rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-3">
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TREND CHART
// ─────────────────────────────────────────────────────────────

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-[#1F2937]">{title}</h3>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] hover:bg-[#F3F4F6] rounded transition-colors text-base"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────

