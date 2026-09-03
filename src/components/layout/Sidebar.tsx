import type { ReactNode } from 'react';
import type { NavTab } from '../../types/agap';
import { StatusIndicator } from '../ui';

import { GridIcon, CheckIcon, GearIcon, InfoIcon, PauseIcon, PlayIcon } from '../icons';

export function NavItem({
  item, active, onNav,
}: {
  item: { key: NavTab; label: string; icon: ReactNode };
  active: boolean;
  onNav: (tab: NavTab) => void;
}) {
  return (
    <button
      onClick={() => onNav(item.key)}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs mb-0.5 transition-colors text-left ${
        active
          ? 'bg-[#F3F4F6] text-[#1F2937] font-medium'
          : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#1F2937]'
      }`}
    >
      <span className="w-4 flex-shrink-0 flex items-center justify-center opacity-60">{item.icon}</span>
      {item.label}
    </button>
  );
}

// Minimal inline icons
export function Sidebar({
  activeTab, onNav, monitoring, onShowTray, onToggleMonitor,
}: {
  activeTab: NavTab;
  onNav: (tab: NavTab) => void;
  monitoring: boolean;
  onShowTray: () => void;
  onToggleMonitor: () => void;
}) {
  const mainItems: { key: NavTab; label: string; icon: ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <GridIcon /> },
    { key: 'checkin', label: 'Check-in', icon: <CheckIcon /> },
  ];
  const bottomItems: { key: NavTab; label: string; icon: ReactNode }[] = [
    { key: 'settings', label: 'Settings', icon: <GearIcon /> },
    { key: 'about', label: 'About', icon: <InfoIcon /> },
  ];

  return (
    <div className="w-[220px] h-full bg-white border-r border-[#E5E7EB] flex flex-col flex-shrink-0">
      <div className="px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/agap-logo.png"
            alt="AGAP logo"
            className="w-7 h-7 object-contain flex-shrink-0"
          />

          <div className="text-sm font-semibold text-[#1F2937] tracking-tight">
            AGAP
          </div>
        </div>

        <div className="text-[10px] text-[#B0B7C3] mt-1">
          Behavioral wellness
        </div>
      </div>

      <nav className="flex-1 px-2 pt-3 overflow-y-auto">
        {mainItems.map(item => (
          <NavItem key={item.key} item={item} active={activeTab === item.key} onNav={onNav} />
        ))}

        <div className="border-t border-[#E5E7EB] my-3 mx-1" />

        {bottomItems.map(item => (
          <NavItem key={item.key} item={item} active={activeTab === item.key} onNav={onNav} />
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <button onClick={onShowTray} className="flex items-center gap-1.5 group">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${monitoring ? 'bg-[#10B981]' : 'bg-[#9CA3AF]'}`} />
          <span className="text-xs text-[#9CA3AF] group-hover:text-[#6B7280] transition-colors">
            {monitoring ? 'Monitoring' : 'Paused'}
          </span>
        </button>

        <button
          onClick={onToggleMonitor}
          title={monitoring ? 'Pause monitoring' : 'Resume monitoring'}
          className="w-6 h-6 flex items-center justify-center rounded-md text-[#9CA3AF] hover:text-[#1F2937] hover:bg-[#F3F4F6] transition-colors flex-shrink-0"
        >
          {monitoring ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </div>
  );
}

