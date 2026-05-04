import type { QuestRegion } from '../types/guide';

export function getRegionStats(region: QuestRegion, progress: Record<string, boolean>) {
  let total = 0, done = 0;
  region.phases.forEach(p => p.steps.forEach(step => {
    total++;
    if (progress[step.id]) done++;
  }));
  return { total, done };
}
