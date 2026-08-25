export function signalColor(label: string, direction: 'up' | 'down'): string {
  if (label === 'Typing speed') return direction === 'down' ? '#EF4444' : '#10B981';
  return direction === 'up' ? '#EF4444' : '#10B981';
}

// ─────────────────────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ─────────────────────────────────────────────────────────────

