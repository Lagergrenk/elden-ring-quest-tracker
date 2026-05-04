import type { FC } from 'react';
import { ExternalLink } from '../ui/ExternalLink';

interface MenuOverlayProps {
  onClose: () => void;
  onReset: () => void;
}

export const MenuOverlay: FC<MenuOverlayProps> = ({ onClose, onReset }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-70 h-full bg-void border-l border-[rgba(184,150,58,0.18)] py-8 px-6 flex flex-col"
      >
        <div className="font-cinzel text-[14px] text-gold tracking-widest mb-6">
          MENU
        </div>

        <ExternalLink href="https://www.youtube.com/@ItsShatter" size="text-[15px]">
          Its Shatter on YouTube ↗
        </ExternalLink>

        <button
          onClick={() => { onClose(); onReset(); }}
          className="bg-transparent font-garamond text-[15px] text-rust py-3 text-left cursor-pointer border-b border-[rgba(184,150,58,0.1)] border-x-0 border-t-0"
        >
          Reset All Progress
        </button>

        <div className="mt-auto">
          <p className="font-garamond text-[13px] text-umber-dark leading-[1.7]">
            A companion guide for the "All Quests in Order + Missable Content" video series by Its Shatter.
          </p>
        </div>
      </div>
    </div>
  );
};
