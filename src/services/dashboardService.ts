import type { DashboardData, RiskLevel } from '../types/agap';
import { MOCK_STATES } from '../data/mockData';

export function getDashboardData(
  riskLevel: RiskLevel,
): DashboardData {
  return MOCK_STATES[riskLevel];
}