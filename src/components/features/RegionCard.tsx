import { useState, type FC } from 'react';
import type { QuestRegion } from '../../types/guide';
import { ChevronRight } from 'lucide-react';
import { ProgressPill } from '../ui/ProgressPill';
import { getRegionStats } from '../../utils/questStats';

const CHEVRON_HOVERED_OPACITY = 0.8;
const CHEVRON_DEFAULT_OPACITY = 0.3;

interface RegionCardProps {
  region: QuestRegion;
  progress: Record<string, boolean>;
  onClick: () => void;
}

export const RegionCard: FC<RegionCardProps> = ({ region, progress, onClick }) => {
  const { total, done } = getRegionStats(region, progress);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const [hovered, setHovered] = useState(false);

  const status: 'not-started' | 'in-progress' | 'complete' =
    done === 0 ? 'not-started' : done === total ? 'complete' : 'in-progress';

  const statusConfig = {
    'not-started': { label: 'Not Started', colorClass: 'text-umber' },
    'in-progress':  { label: 'In Progress', colorClass: 'text-bronze' },
    'complete':     { label: 'Complete',  colorClass: 'text-moss'   },
  } as const;
  const sc = statusConfig[status];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`border rounded px-5 py-4 mb-2 cursor-pointer grid grid-cols-[1fr_auto] gap-3 items-center transition-all duration-200 ${
        hovered
          ? "border-[rgba(184,150,58,0.35)] bg-[rgba(184,150,58,0.06)] shadow-[0_0_20px_rgba(184,150,58,0.08)]"
          : status === "complete"
            ? "border-[rgba(184,150,58,0.13)] bg-[rgba(80,160,112,0.05)]"
            : "border-[rgba(184,150,58,0.13)] bg-[rgba(20,16,8,0.8)]"
      }`}
    >
      <div>
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono-dm text-[10px] text-umber-dark tracking-[0.08em]">
            PART {String(region.part).padStart(2, "0")}
          </span>
          <span
            className={`font-cinzel text-[16px] tracking-[0.03em] font-normal ${
              status === "complete"
                ? "text-moss-light line-through decoration-[rgba(112,168,80,0.4)]"
                : "text-parchment-dim"
            }`}
          >
            {region.area}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <ProgressPill
            done={done}
            total={total}
            barClassName="flex-1 h-1 w-20"
            label={`${pct}%`}
          />
          <span
            className={`font-mono-dm text-[10px] tracking-[0.04em] ${sc.colorClass}`}
          >
            {sc.label.toUpperCase()}
          </span>
        </div>
      </div>
      <ChevronRight style={{ opacity: hovered ? CHEVRON_HOVERED_OPACITY : CHEVRON_DEFAULT_OPACITY }} />
    </div>
  );
};
