import { useState } from 'react';
import type { QuestRegion } from '../types/guide';

// setState during render (not in an effect) is the React-recommended pattern for
// resetting or deriving state when props change without triggering cascading renders.
export function useOpenSection(region: QuestRegion, progress: Record<string, boolean>) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    region.phases[0]?.id ?? null
  );
  const [prevRegionId, setPrevRegionId] = useState(region.id);
  const [prevProgress, setPrevProgress] = useState(progress);

  if (prevRegionId !== region.id) {
    setPrevRegionId(region.id);
    setPrevProgress(progress);
    setOpenSectionId(region.phases[0]?.id ?? null);
  } else if (prevProgress !== progress) {
    setPrevProgress(progress);
    if (openSectionId) {
      const index = region.phases.findIndex(p => p.id === openSectionId);
      if (index !== -1 && region.phases[index].steps.every(s => progress[s.id])) {
        setOpenSectionId(region.phases[index + 1]?.id ?? null);
      }
    }
  }

  return { openSectionId, setOpenSectionId };
}
