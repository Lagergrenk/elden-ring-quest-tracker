import { useState, type FC } from 'react';
import type { QuestRegion, RegionGroup } from '../../types/guide';
import { Navbar } from '../layout/Navbar';
import { MenuOverlay } from '../layout/MenuOverlay';
import { ResetDialog } from '../ui/ResetDialog';
import { RegionCard } from '../features/RegionCard';
import { ProgressPill } from '../ui/ProgressPill';
import { ExternalLink } from '../ui/ExternalLink';
import BackToTop from '../ui/BackToTop';
import { HERO_FONT_SIZE } from '../../constants/ui';

interface LandingPageProps {
  groups: RegionGroup[];
  progress: Record<string, boolean>;
  overallDone: number;
  overallTotal: number;
  onSelectRegion: (id: string) => void;
  onReset: () => void;
  onResetRegion: (region: QuestRegion) => void;
}

export const LandingPage: FC<LandingPageProps> = ({
  groups,
  progress,
  overallDone,
  overallTotal,
  onSelectRegion,
  onReset,
  onResetRegion,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const regionsLength = groups.reduce((sum, g) => sum + g.regions.length, 0);
  const overallPct = overallTotal ? Math.round((overallDone / overallTotal) * 100) : 0;

  return (
    <div>
      <Navbar
        overallPercent={overallPct}
        onMenuOpen={() => setMenuOpen(true)}
      />

      <div className="max-w-190 mx-auto px-5 pt-10 pb-7">
        <div className="font-mono-dm text-[10px] text-umber-dark tracking-[0.14em] mb-2.5">
          ALL QUESTS IN ORDER — COMPANION GUIDE
        </div>
        <h1
          className="font-cinzel text-parchment font-normal m-0 mb-3 tracking-[0.04em] leading-[1.2]"
          style={{ fontSize: HERO_FONT_SIZE }}
        >
          Elden Ring
          <br />
          Quest Tracker
        </h1>
        <p className="font-garamond text-[15.5px] text-taupe-dark mb-6 leading-[1.65] max-w-140">
          Follow every questline, NPC interaction, and missable event across all{" "}
          {regionsLength} regions — in the correct order. Based on the video
          series by
          <ExternalLink
            href="https://www.youtube.com/@ItsShatter"
            customStyle="font-garamond text-[15px] text-taupe underline underline-offset-2 hover:text-parchment-muted transition-colors duration-200 ml-1"
          >
            ItsShatter ↗
          </ExternalLink>
        </p>

        <div className="px-5 py-4 bg-[rgba(20,16,8,0.9)] border border-[rgba(184,150,58,0.15)] rounded mb-8">
          <div className="flex justify-between items-baseline mb-2.5">
            <span className="font-cinzel text-[11px] text-taupe tracking-[0.07em]">
              PLAYTHROUGH PROGRESS
            </span>
            <span
              className={`font-mono-dm text-[13px] ${overallPct === 100 ? "text-moss" : "text-bronze"}`}
            >
              {overallDone} / {overallTotal}
            </span>
          </div>
          <ProgressPill
            done={overallDone}
            total={overallTotal}
            barClassName="flex-1 h-1.5"
            gradient
          />
        </div>

        {groups.map((group, i) => (
          <div key={group.label}>
            <div className={`font-cinzel text-[10px] text-umber-dark tracking-[0.12em] mb-3.5 ${i > 0 ? 'mt-5' : ''}`}>
              {group.label}
            </div>
            {group.regions.map((region) => (
              <RegionCard
                key={region.id}
                region={region}
                progress={progress}
                onClick={() => onSelectRegion(region.id)}
                onResetRegion={() => onResetRegion(region)}
              />
            ))}
          </div>
        ))}
      </div>

      {menuOpen && (
        <MenuOverlay
          onClose={() => setMenuOpen(false)}
          onReset={() => setShowReset(true)}
        />
      )}
      {showReset && (
        <ResetDialog
          onConfirm={() => {
            onReset();
            setShowReset(false);
          }}
          onCancel={() => setShowReset(false)}
        />
      )}
      <BackToTop />
    </div>
  );
};
