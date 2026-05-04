import { useAppStore } from './store/useAppStore';
import { QUEST_DATA } from './data/questData';
import { LandingPage } from './components/pages/LandingPage';
import { RegionPage } from './components/pages/RegionPage';
import { Analytics } from "@vercel/analytics/next";

export default function App() {
  const { progress, currentRegion, toggleStep, resetProgress, selectRegion, goBack } = useAppStore();

  const totalSteps = QUEST_DATA.regions.flatMap(r => r.phases.flatMap(p => p.steps)).length;
  const completedSteps = Object.keys(progress).length;

  if (currentRegion) {
    return (
      <>
      <Analytics />
      <RegionPage
        region={currentRegion}
        progress={progress}
        onToggleStep={toggleStep}
        onBack={goBack}
        />
      </>
    );
  }

  return (
    <>
    <Analytics/>
    <LandingPage
      regions={QUEST_DATA.regions}
      progress={progress}
      overallDone={completedSteps}
      overallTotal={totalSteps}
      onSelectRegion={selectRegion}
      onReset={resetProgress}
    />
    </>
  );
}
