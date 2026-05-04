import type { FC, ReactNode, MouseEvent } from 'react';

interface ExternalLinkProps {
  href: string;
  size?: string;
  stopPropagation?: boolean;
  customStyle?: string;
  children: ReactNode;
}

export const ExternalLink: FC<ExternalLinkProps> = ({ href, size = 'text-[10px]', stopPropagation, customStyle, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={stopPropagation ? (e: MouseEvent) => e.stopPropagation() : undefined}
    className={customStyle ? customStyle : `font-mono-dm ${size} text-umber-dark underline hover:text-umber transition-colors duration-200`}
  >
    {children}
  </a>
);
