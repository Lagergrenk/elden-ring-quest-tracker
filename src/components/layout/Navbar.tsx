import { Menu } from 'lucide-react';
import type { FC } from 'react';

interface NavbarProps {
  overallPercent: number;
  onMenuOpen: () => void;
}

export const Navbar: FC<NavbarProps> = ({ overallPercent, onMenuOpen }) => {
  return (
    <header className="border-b border-[rgba(184,150,58,0.12)] px-5 sticky top-0 z-20 bg-void">
      <div className="max-w-190 mx-auto flex items-center justify-between h-14">
        <div className="font-cinzel text-[15px] text-gold tracking-[0.07em]">
          The Tarnished's Ledger
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono-dm text-[10px] text-umber tracking-[0.06em]">
            {overallPercent}% COMPLETE
          </span>
          <button
            onClick={onMenuOpen}
            className="bg-transparent border-0 cursor-pointer p-1 text-taupe"
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
};
