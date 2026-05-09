import { useAppStore } from './store/useAppStore';
import { DLC_QUEST_DATA, QUEST_DATA, ROUTES_ITEM_DATA } from './data/questData';
import { LandingPage } from './components/pages/LandingPage';
import { RegionPage } from './components/pages/RegionPage';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { RegionGroup } from './types/guide';

const REGION_GROUPS: RegionGroup[] = [
  { label: 'REGIONS BASE GAME',      regions: QUEST_DATA.regions },
  { label: 'REGIONS DLC ERDTREE',    regions: DLC_QUEST_DATA.regions },
  { label: 'OPTIMIZED STARTING STRAT', regions: ROUTES_ITEM_DATA.regions },
];

const ALL_TRACKED_REGIONS = [...QUEST_DATA.regions, ...DLC_QUEST_DATA.regions];

export default function App() {
  const { progress, currentRegion, toggleStep, resetProgress, resetRegionProgress, selectRegion, goBack } = useAppStore();

  const totalSteps = ALL_TRACKED_REGIONS.flatMap((r) =>
    r.phases.flatMap((p) => p.steps),
  ).length;
  const completedSteps = Object.keys(progress).length;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {currentRegion ? (
        <RegionPage
          region={currentRegion}
          progress={progress}
          onToggleStep={toggleStep}
          onBack={goBack}
          onResetRegion={() => resetRegionProgress(currentRegion)}
        />
      ) : (
        <LandingPage
          groups={REGION_GROUPS}
          progress={progress}
          overallDone={completedSteps}
          overallTotal={totalSteps}
          onSelectRegion={selectRegion}
          onReset={resetProgress}
          onResetRegion={resetRegionProgress}
        />
      )}
    </>
  );
}
