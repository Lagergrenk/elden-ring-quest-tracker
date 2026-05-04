import type { FC } from 'react';

interface ProgressPillProps {
  done: number;
  total: number;
  barClassName?: string;
  label?: string;
  labelClassName?: string;
  gradient?: boolean;
}

export const ProgressPill: FC<ProgressPillProps> = ({
  done,
  total,
  barClassName = 'w-[60px] h-[3px]',
  label,
  labelClassName = 'text-[10px] min-w-8',
  gradient = false,
}) => {
  const pct = total ? Math.round((done / total) * 100) : 0;
  const complete = done === total && total > 0;
  const fillClass = complete
    ? 'bg-moss'
    : gradient
    ? 'bg-linear-to-r from-bronze to-amber'
    : 'bg-bronze';

  return (
    <div className={`flex items-center gap-2 shrink-0`}>
      <div className={`${barClassName} bg-[rgba(184,150,58,0.15)] rounded-sm overflow-hidden`}>
        <div
          className={`h-full rounded-sm transition-[width] duration-500 ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {label && <span className={`font-mono-dm ${labelClassName} ${complete ? 'text-moss' : 'text-taupe'}`}>
        {label}
      </span>}
    </div>
  );
};
