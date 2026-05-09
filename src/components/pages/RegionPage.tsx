import { useEffect, useState, type FC } from 'react';
import type { QuestRegion } from '../../types/guide';
import { SectionAccordion } from '../features/SectionAccordion';
import { StepItem } from '../features/StepItem';
import { ProgressPill } from '../ui/ProgressPill';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useOpenSection } from '../../hooks/useOpenSection';
import { HERO_FONT_SIZE } from '../../constants/ui';
import { QUEST_DATA } from '../../data/questData';
import BackToTop from '../ui/BackToTop';
import { getRegionStats } from '../../utils/questStats';
import { ConfirmDialog } from '../ui/ConfirmDialog';

interface RegionPageProps {
  region: QuestRegion;
  progress: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
  onToggleSteps: (stepIds: string[]) => void;
  onBack: () => void;
  onResetRegion: () => void;
}



export const RegionPage: FC<RegionPageProps> = ({ region, progress, onToggleStep, onToggleSteps, onBack, onResetRegion }) => {
  const { total, done } = getRegionStats(region, progress);
  const { openSectionId, setOpenSectionId } = useOpenSection(region, progress);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="max-w-190 mx-auto px-5 pb-20">
      {/* Back */}
      <div className="pt-5 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-transparent border-0 text-taupe font-mono-dm text-[11px] tracking-[0.08em] cursor-pointer flex items-center gap-1.5 py-1 px-0 transition-colors duration-200 hover:text-parchment-muted"
        >
          <ChevronLeft className="shrink-0" />
          BACK TO REGIONS
        </button>
        {done > 0 && (
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-transparent border-0 text-umber font-mono-dm text-[11px] tracking-[0.08em] cursor-pointer flex items-center gap-1.5 py-1 px-0 transition-colors duration-200 hover:text-bronze"
          >
            <RotateCcw size={13} />
            RESET REGION
          </button>
        )}
      </div>

      {/* Region header */}
      <div className="pt-6 pb-5">
        <div className="font-mono-dm text-[10px] text-umber tracking-[0.12em] mb-2">
          PART {region.part} OF {QUEST_DATA.regions.length}
        </div>
        <h1
          className="font-cinzel text-parchment font-normal m-0 mb-2 tracking-[0.04em] leading-[1.2]"
          style={{ fontSize: HERO_FONT_SIZE }}
        >
          {region.area}
        </h1>
        <p className="font-garamond text-[15px] text-taupe mb-5 leading-[1.6]">
          {region.description}
        </p>

        {/* Sticky progress bar */}
        <div
          className="sticky top-0 z-10 pb-3 pt-1"
          style={{
            background: "linear-gradient(180deg, #0d0b08 80%, transparent)",
          }}
        >
          <ProgressPill
            done={done}
            total={total}
            barClassName="flex-1 h-1"
            label={`${done} / ${total} steps`}
            labelClassName="text-[11px] min-w-20"
            gradient
          />
        </div>
      </div>

      {/* Sections */}
      {region.phases.map((section) => (
        <SectionAccordion
          key={section.id}
          section={section}
          progress={progress}
          onToggleSteps={onToggleSteps}
          open={openSectionId === section.id}
          onOpenChange={(isOpen) => setOpenSectionId(isOpen ? section.id : null)}
        >
          {section.steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              checked={!!progress[step.id]}
              onToggle={() => onToggleStep(step.id)}
              youtubeUrl={region.youtubeUrl}
            />
          ))}
        </SectionAccordion>
      ))}
      <BackToTop  />

      {showConfirm && (
        <ConfirmDialog
          title="Reset Region Progress?"
          message={`This will clear all completed steps in ${region.area}. This cannot be undone.`}
          confirmLabel="RESET"
          onConfirm={() => { onResetRegion(); setShowConfirm(false); }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};
