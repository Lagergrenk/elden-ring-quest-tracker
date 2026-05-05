import { useAppStore } from './store/useAppStore';
import { DLC_QUEST_DATA, QUEST_DATA } from './data/questData';
import { LandingPage } from './components/pages/LandingPage';
import { RegionPage } from './components/pages/RegionPage';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const { progress, currentRegion, toggleStep, resetProgress, selectRegion, goBack } = useAppStore();

  const allRegions = [...QUEST_DATA.regions, ...DLC_QUEST_DATA.regions];

  const totalSteps = allRegions.flatMap((r) =>
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
        />
      ) : (
        <LandingPage
          regions={QUEST_DATA.regions}
          dlcRegions={DLC_QUEST_DATA.regions}
          progress={progress}
          overallDone={completedSteps}
          overallTotal={totalSteps}
          onSelectRegion={selectRegion}
          onReset={resetProgress}
        />
      )}
    </>
  );
}
