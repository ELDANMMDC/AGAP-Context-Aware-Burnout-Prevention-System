import type { ReactNode } from 'react';
import type { NavTab, RiskLevel } from '../types/agap';
import { StatusIndicator, TextBtn } from './ui';

export function TrayMenu({
  monitoring, onToggleMonitor, onNav, onClose,
}: {
  monitoring: boolean; onToggleMonitor: () => void; onNav: (tab: NavTab) => void; onClose: () => void;
}) {
  const navAndClose = (tab: NavTab) => { onNav(tab); onClose(); };

  return (
    <div className="fixed bottom-14 left-3 z-50">
      <div className="bg-white border border-[#D1D5DB] rounded-xl shadow-xl w-52 py-1.5 text-xs overflow-hidden">
        <div className="px-4 py-2.5 border-b border-[#E5E7EB]">
          <div className="text-xs font-semibold text-[#1F2937]">AGAP</div>
        </div>
        <div className="px-4 py-2.5 border-b border-[#E5E7EB]">
          <StatusIndicator active={monitoring} />
        </div>
        <div className="py-1">
          <TrayItem onClick={() => navAndClose('dashboard')}>Open Dashboard</TrayItem>
          <TrayItem onClick={() => { onToggleMonitor(); onClose(); }}>
            {monitoring ? 'Pause monitoring' : 'Resume monitoring'}
          </TrayItem>
        </div>
        <div className="border-t border-[#E5E7EB] py-1">
          <TrayItem onClick={() => navAndClose('settings')}>Settings</TrayItem>
          <TrayItem onClick={() => navAndClose('about')}>About</TrayItem>
        </div>
        <div className="border-t border-[#E5E7EB] py-1">
          <TrayItem onClick={onClose} muted>Close</TrayItem>
        </div>
      </div>
    </div>
  );
}

export function TrayItem({ children, onClick, muted = false }: {
  children: ReactNode; onClick: () => void; muted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 hover:bg-[#F3F4F6] transition-colors ${muted ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// NOTIFICATION TOAST
// ─────────────────────────────────────────────────────────────

export function NotificationToast({
  riskLevel, onDismiss, onViewDashboard,
}: {
  riskLevel: RiskLevel; onDismiss: () => void; onViewDashboard: () => void;
}) {
  const configs = {
    Elevated: {
      accent: '#F59E0B',
      title: 'Your recent work patterns have changed.',
      body: "You've had a sustained period of activity. Consider taking a short break.",
    },
    High: {
      accent: '#EF4444',
      title: 'Your patterns suggest rest may help.',
      body: 'Your recent activity shows a sustained change from your baseline.',
    },
    Low: null,
  };

  const config = configs[riskLevel];
  if (!config) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-72 pointer-events-auto">
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: config.accent }} />
            <span className="text-xs font-semibold text-[#1F2937]">AGAP</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-[#9CA3AF] hover:text-[#6B7280] text-base leading-none w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        </div>
        <p className="text-xs font-medium text-[#1F2937] mb-1">{config.title}</p>
        <p className="text-[10px] text-[#6B7280] mb-3 leading-relaxed">{config.body}</p>
        <TextBtn onClick={onViewDashboard}>View Dashboard →</TextBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROTOTYPE STATE SWITCHER
// ─────────────────────────────────────────────────────────────

export function PrototypeSwitcher({ current, onChange }: { current: RiskLevel; onChange: (l: RiskLevel) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm px-3 py-2 flex items-center gap-2">
        <span className="text-[9px] text-[#C4C8CF] font-medium uppercase tracking-widest">Prototype</span>
        <div className="w-px h-3 bg-[#E5E7EB]" />
        {(['Low', 'Elevated', 'High'] as RiskLevel[]).map(l => {
          const active = current === l;
          const activeClass = l === 'Low'
            ? 'bg-emerald-100 text-emerald-800'
            : l === 'Elevated'
              ? 'bg-amber-100 text-amber-800'
              : 'bg-red-100 text-red-800';
          return (
            <button
              key={l}
              onClick={() => onChange(l)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${active ? activeClass : 'text-[#9CA3AF] hover:text-[#6B7280]'}`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────

