import type { FC } from "react";
import { TAG_CONFIG } from "../../constants/tagConfig";

interface TagBadgeProps {
  tag: string;
}

export const TagBadge: FC<TagBadgeProps> = ({ tag }) => {
  const cfg = TAG_CONFIG[tag] ?? TAG_CONFIG["quest"];
  return (
    <span
      className="inline-block px-2.25 py-0.5 rounded-[3px] text-[10px] font-mono-dm tracking-[0.04em] whitespace-nowrap shrink-0"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
};
