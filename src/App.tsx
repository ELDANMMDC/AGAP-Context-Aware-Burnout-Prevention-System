import { useState } from 'react';
import type { NavTab, OnboardingStep, RiskLevel } from './types/agap';
import { getDashboardData } from './services/dashboardService';
import { Sidebar } from './components/layout/Sidebar';
import { PrimaryBtn } from './components/ui';
import { TrayMenu, NotificationToast, PrototypeSwitcher } from './components/overlays';
import { WelcomeScreen, ProfileScreen, WorkScheduleScreen, WorkStyleScreen, CalibrationScreen } from './screens/onboarding/OnboardingScreens';
import { DashboardScreen } from './screens/DashboardScreen';
import { CheckInScreen, CheckInCompleteScreen } from './screens/CheckInScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutScreen } from './screens/AboutScreen';

function PausedBlock({ onResume }: { onResume: () => void }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-[360px] text-center">
        <div className="text-sm font-medium text-[#1F2937] mb-1.5">
          Monitoring is paused
        </div>
        <p className="text-xs text-[#9CA3AF] mb-6 leading-relaxed">
          This screen is unavailable while monitoring is paused. Resume monitoring to continue using AGAP.
        </p>
        <PrimaryBtn onClick={onResume}>
          Resume monitoring
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default function App() {
  const [onboarding, setOnboarding] = useState<OnboardingStep>('welcome');
  const [userName, setUserName] = useState('Alex');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Elevated');
  const [monitoring, setMonitoring] = useState(true);
  const [showTray, setShowTray] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [checkInPhase, setCheckInPhase] = useState<'default' | 'complete'>('default');

  const state = getDashboardData(riskLevel);

  const navTo = (tab: NavTab) => {
    setActiveTab(tab);
    setCheckInPhase('default');
  };

  // Onboarding flow
  if (onboarding === 'welcome') {
    return <WelcomeScreen onNext={() => setOnboarding('profile')} />;
  }
  if (onboarding === 'profile') {
    return (
      <ProfileScreen
        onNext={name => { setUserName(name); setOnboarding('schedule'); }}
        onBack={() => setOnboarding('welcome')}
      />
    );
  }
  if (onboarding === 'schedule') {
    return (
      <WorkScheduleScreen
        onNext={() => setOnboarding('workStyle')}
        onBack={() => setOnboarding('profile')}
      />
    );
  }
  if (onboarding === 'workStyle') {
    return (
      <WorkStyleScreen
        onNext={style => {
          // TODO(backend): persist getIdleThresholdForWorkStyle(style) as the
          // user's idle threshold once settings are wired to a real store.
          setOnboarding('calibration');
        }}
        onBack={() => setOnboarding('schedule')}
      />
    );
  }
  if (onboarding === 'calibration') {
    return <CalibrationScreen onNext={() => setOnboarding(null)} />;
  }

  // Main app shell
  const renderMain = () => {
    if (!monitoring && activeTab !== 'about') {
      return <PausedBlock onResume={() => setMonitoring(true)} />;
    }
    if (activeTab === 'dashboard') {
      return (
        <DashboardScreen
          state={state}
          userName={userName}
          onNav={navTo}
        />
      );
    }
    if (activeTab === 'checkin') {
      if (checkInPhase === 'complete') {
        return (
          <CheckInCompleteScreen
            onReturn={() => { navTo('dashboard'); }}
          />
        );
      }
      return (
        <CheckInScreen
          onComplete={() => setCheckInPhase('complete')}
          onBack={() => navTo('dashboard')}
        />
      );
    }
    if (activeTab === 'settings') {
      return (
        <SettingsScreen
          userName={userName}
          monitoring={monitoring}
        />
      );
    }
    if (activeTab === 'about') {
      return <AboutScreen />;
    }
    return null;
  };

  return (
    <div className="w-screen h-screen bg-[#F9FAFB] flex overflow-hidden font-sans">
      <Sidebar
        activeTab={activeTab}
        onNav={navTo}
        monitoring={monitoring}
        onShowTray={() => setShowTray(t => !t)}
        onToggleMonitor={() => setMonitoring(m => !m)}
      />

      <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {renderMain()}
      </main>

      {/* Notification demo toggle */}
      <button
        onClick={() => setShowNotif(v => !v)}
        className="fixed top-4 right-4 z-40 text-[10px] text-[#9CA3AF] bg-white border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 hover:text-[#6B7280] transition-colors shadow-sm"
      >
        {showNotif ? 'Hide' : 'Demo'} notification
      </button>

      {showNotif && (
        <NotificationToast
          riskLevel={riskLevel}
          onDismiss={() => setShowNotif(false)}
          onViewDashboard={() => { navTo('dashboard'); setShowNotif(false); }}
        />
      )}

      {showTray && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowTray(false)} />
          <TrayMenu
            monitoring={monitoring}
            onToggleMonitor={() => setMonitoring(m => !m)}
            onNav={navTo}
            onClose={() => setShowTray(false)}
          />
        </>
      )}

      <PrototypeSwitcher current={riskLevel} onChange={setRiskLevel} />
    </div>
  );
}
