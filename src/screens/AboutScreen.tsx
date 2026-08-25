import { Card } from '../components/ui';

export function AboutScreen() {
  return (
    <div className="p-7 max-w-[720px] mx-auto w-full">
      <h1 className="text-2xl font-semibold text-[#1F2937] mb-6">
        About AGAP
      </h1>

      {/* What AGAP does */}
      <Card className="p-5 mb-4">
        <h3 className="text-xs font-semibold text-[#1F2937] mb-2">
          What AGAP does
        </h3>

        <p className="text-xs text-[#6B7280] leading-relaxed">
          AGAP is a Context-Aware Burnout Prevention System that looks for changes in
          computer-interaction patterns that may be associated with fatigue
          and burnout risk, specifically for remote workers. It observes behavioral patterns, not content.
        </p>
      </Card>

      {/* What it observes / does not record */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-5">
          <h3 className="text-xs font-semibold text-[#1F2937] mb-3">
            What it observes
          </h3>

          <div className="space-y-2">
            {[
              'Keyboard activity',
              'Mouse activity',
              'Idle periods',
              'Application switching',
              'Active work time',
            ].map(item => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-xs text-[#4B5563]"
              >
                <span
                  className="text-[#10B981] text-xs font-semibold flex-shrink-0 w-3"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-xs font-semibold text-[#1F2937] mb-3">
            What it does not record
          </h3>

          <div className="space-y-2">
            {[
              'Actual keystrokes or typed content',
              'Screenshots',
              'File contents',
              'Application content',
              'Mouse coordinates',
            ].map(item => (
              <div
                key={item}
                className="flex items-center gap-2.5 text-xs text-[#4B5563]"
              >
                <span
                  className="text-[#EF4444] text-xs font-semibold flex-shrink-0 w-3"
                  aria-hidden="true"
                >
                  ×
                </span>

                <span>{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* How the score works */}
      <Card className="p-5 mb-4">
        <h3 className="text-xs font-semibold text-[#1F2937] mb-3">
          How the score works
        </h3>

        <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
          AGAP looks at your weekly check-ins and work patterns to give you a burnout risk score from{' '}
          <strong className="text-[#4B5563]">0–100</strong>.
        </p>

        <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
          The score is an indicator of potential burnout risk. A lower number
          means fewer patterns associated with increased risk, while a higher
          number means more patterns associated with increased risk.
        </p>

        {/* Risk levels */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4 py-2">
            <div>
              <div className="text-xs font-medium text-[#10B981]">
                Low
              </div>
              <div className="text-[10px] text-[#6B7280]">
                Relatively few indicators associated with increased burnout
                risk.
              </div>
            </div>

            <span className="text-[10px] font-medium text-[#10B981] flex-shrink-0">
              0–40
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 py-2">
            <div>
              <div className="text-xs font-medium text-[#F59E0B]">
                Elevated
              </div>
              <div className="text-[10px] text-[#6B7280]">
                Some indicators that may be worth paying attention to.
              </div>
            </div>

            <span className="text-[10px] font-medium text-[#F59E0B] flex-shrink-0">
              41–70
            </span>
          </div>

          <div className="flex items-start justify-between gap-4 py-2">
            <div>
              <div className="text-xs font-medium text-[#EF4444]">
                High
              </div>
              <div className="text-[10px] text-[#6B7280]">
                Stronger indicators that may warrant a closer look at workload
                and recovery.
              </div>
            </div>

            <span className="text-[10px] font-medium text-[#EF4444] flex-shrink-0">
              71–100
            </span>
          </div>
        </div>
      </Card>

      {/* Weekly Check-Ins */}
      <Card className="p-5 mb-4">
        <h3 className="text-xs font-semibold text-[#1F2937] mb-2">
          Weekly Check-Ins
        </h3>

        <p className="text-xs text-[#6B7280] leading-relaxed">
          Weekly Check-Ins
          capture qualitative, multi-factor responses adapted from criteria
          associated with the Maslach Burnout Inventory (MBI). They provide
          additional context about different aspects of the user's experience
          that may relate to burnout.
        </p>

        <p className="text-[10px] text-[#9CA3AF] leading-relaxed mt-2">
          The MBI was developed by Christina Maslach, Susan E. Jackson, 
          Michael P. Leiter, Wilmar B. Schaufeli,  Richard L. Schwab. 
          AGAP does not administer the official MBI,
          and its 0–100 risk score is not an official MBI score.
        </p>
      </Card>

      {/* Important */}
      <Card className="p-5 bg-[#F9FAFB]">
        <h3 className="text-xs font-semibold text-[#1F2937] mb-2">
          Important
        </h3>

        <p className="text-xs text-[#6B7280] leading-relaxed">
          AGAP's risk indicator is intended for self-awareness and wellness support. It is not a
          medical diagnosis.
        </p>

        <div className="mt-4 text-[10px] text-[#B0B7C3] font-mono">
          AGAP 2026
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TRAY MENU
// ─────────────────────────────────────────────────────────────

