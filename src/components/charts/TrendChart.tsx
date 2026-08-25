import type { RiskLevel } from '../../types/agap';

export function TrendChart({ data, riskLevel }: { data: { day: string; score: number }[]; riskLevel: RiskLevel }) {
  const W = 380, H = 96, padX = 28, padY = 10;
  const chartW = W - padX * 2;
  const chartH = H - padY * 2;

  const pts = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * chartW,
    y: padY + (1 - d.score / 100) * chartH,
    ...d,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const color = riskLevel === 'Low' ? '#10B981' : riskLevel === 'Elevated' ? '#F59E0B' : '#EF4444';

  return (
    <svg viewBox={`0 0 ${W} ${H + 22}`} className="w-full" aria-label="7-day risk score trend">
      {[25, 50, 75].map(v => {
        const gy = padY + (1 - v / 100) * chartH;
        return (
          <g key={v}>
            <line x1={padX} y1={gy} x2={W - padX} y2={gy} stroke="#E5E7EB" strokeWidth="1" />
            <text x={padX - 5} y={gy + 3.5} textAnchor="end" fontSize="9" fill="#C4C8CF">{v}</text>
          </g>
        );
      })}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y}
          r={i === pts.length - 1 ? 4 : 2.5}
          fill={i === pts.length - 1 ? color : '#fff'}
          stroke={color}
          strokeWidth="1.5"
        />
      ))}
      {pts.map((p, i) => (
        <text key={`lbl-${i}`} x={p.x} y={H + 18} textAnchor="middle" fontSize="10" fill="#9CA3AF">
          {p.day}
        </text>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────

