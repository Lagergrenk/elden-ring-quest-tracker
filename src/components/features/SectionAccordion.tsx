import type { FC } from 'react';
import type { QuestPhase } from '../../types/guide';
import { StepItem } from './StepItem';
import { ChevronDown } from 'lucide-react';
import { ProgressPill } from '../ui/ProgressPill';
import { CheckboxIcon } from '../ui/CheckboxIcon';

const CHECKBOX_ICON_SIZE = 15;

interface SectionAccordionProps {
  section: QuestPhase;
  progress: Record<string, boolean>;
  onToggleStep: (stepId: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SectionAccordion: FC<SectionAccordionProps> = ({
  section,
  progress,
  onToggleStep,
  open,
  onOpenChange,
}) => {
  const doneSteps = section.steps.filter(s => progress[s.id]).length;
  const totalSteps = section.steps.length;
  const allDone = doneSteps === totalSteps;

  const handleToggleAll = () => {
    (allDone ? section.steps : section.steps.filter(s => !progress[s.id]))
      .forEach(s => onToggleStep(s.id));
  };

  return (
    <div
      className={`border border-[rgba(184,150,58,0.13)] rounded overflow-hidden mb-2.5 transition-colors duration-300 ${
        allDone ? "bg-[rgba(80,160,112,0.05)]" : "bg-[rgba(20,16,8,0.7)]"
      }`}
    >
      {/* Header */}
      <div
        onClick={() => onOpenChange(!open)}
        className="px-4 py-3.25 cursor-pointer flex items-center gap-3 select-none"
      >
        <ChevronDown
          className="shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />

        <div className="flex-1">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span
              className={`font-cinzel text-[13px] tracking-[0.04em] ${
                allDone
                  ? "text-moss line-through decoration-[rgba(112,168,80,0.5)]"
                  : "text-gold"
              }`}
            >
              {section.title}
            </span>
          </div>
        </div>
        <CheckboxIcon
          checked={allDone}
          onToggle={handleToggleAll}
          size={CHECKBOX_ICON_SIZE}
        />
        <ProgressPill
          done={doneSteps}
          total={totalSteps}
          barClassName="flex-1 h-0.75 w-20"
          label={`${doneSteps} / ${totalSteps}`}
          labelClassName="text-[11px]"
          gradient
        />
      </div>

      {/* Steps */}
      {open && (
        <div className="pr-4 pb-1.5 pl-11 border-t border-[rgba(184,150,58,0.08)]">
          {section.steps.map((step) => (
            <StepItem
              key={step.id}
              step={step}
              checked={!!progress[step.id]}
              onToggle={() => onToggleStep(step.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
