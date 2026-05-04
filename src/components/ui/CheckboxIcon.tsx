import type { FC } from 'react';
import { Square, SquareCheck } from 'lucide-react';

interface CheckboxIconProps {
  checked: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

export const CheckboxIcon: FC<CheckboxIconProps> = ({ checked, onToggle, size = 18, className = '' }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return checked ? (
    <SquareCheck
      size={size}
      onClick={handleClick}
      className={`shrink-0 cursor-pointer transition-colors duration-200 text-moss ${className}`}
    />
  ) : (
    <Square
      size={size}
      onClick={handleClick}
      className={`shrink-0 cursor-pointer transition-colors duration-200 ${className}`}
      style={{ color: 'rgba(184,150,58,0.4)' }}
    />
  );
};
