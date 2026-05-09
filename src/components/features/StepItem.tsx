import { useState, type FC } from 'react';
import type { QuestStep } from '../../types/guide';
import { TagBadge } from './TagBadge';
import { ChevronDown } from 'lucide-react';
import { CheckboxIcon } from '../ui/CheckboxIcon';
import { ExternalLink } from '../ui/ExternalLink';
import { MAP_GENIE_BASE_URL } from '../../constants/mapGenie';

const CHECKED_OPACITY = 0.52;
const ICON_SIZE = 18;

interface StepItemProps {
  step: QuestStep;
  checked: boolean;
  onToggle: () => void;
  youtubeUrl: string;
}

export const StepItem: FC<StepItemProps> = ({ step, checked, onToggle, youtubeUrl }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-[rgba(184,150,58,0.08)] transition-opacity duration-300"
      style={{ opacity: checked ? CHECKED_OPACITY : 1 }}
    >
      {/* Main row */}
      <div
        className="flex items-start gap-3 py-2.75 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        {/* Checkbox */}
        <CheckboxIcon checked={checked} onToggle={onToggle} size={ICON_SIZE} className="mt-0.5" />

        {/* Title + tag */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`font-garamond text-[15px] leading-[1.4] ${
                checked
                  ? "text-[#7a7060] line-through decoration-[rgba(112,168,80,0.5)]"
                  : "text-parchment-dim"
              }`}
            >
              {step.title}
            </span>
            {step.tag.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
        </div>

        <ChevronDown
          className="shrink-0 mt-1 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          size={ICON_SIZE}
        />
      </div>

      {/* Detail panel */}
      {open && (
        <div className="ml-7.5 mb-3 p-3 px-3.5 bg-[rgba(10,8,4,0.6)] border-l-2 border-[rgba(184,150,58,0.3)] rounded-[0_3px_3px_0]">
          <p className="font-garamond text-[14.5px] text-parchment-muted leading-[1.75] m-0">
            {step.description}
          </p>
          <div className="flex items-center gap-4 mt-2.5">
            {step.timestamp && (
              <ExternalLink
                href={`${youtubeUrl}${step.timestamp}s`}
                stopPropagation
              >
                ▶ WATCH TIMESTAMP
              </ExternalLink>
            )}
            {step.mapGenieId && step.mapGenieId.map((id, i, arr) => (
              <ExternalLink key={id} href={`${MAP_GENIE_BASE_URL}${id}`} stopPropagation>
                ⊕ MAPGENIE{arr.length > 1 ? ` ${i + 1}` : ''}
              </ExternalLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
