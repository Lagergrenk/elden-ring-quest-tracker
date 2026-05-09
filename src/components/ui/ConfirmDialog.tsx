import type { FC } from 'react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmLabel = 'CONFIRM',
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-[rgba(5,4,2,0.85)] backdrop-blur-xs z-100 flex items-center justify-center p-5">
      <div className="bg-abyss border border-[rgba(200,72,72,0.3)] rounded-md p-8 max-w-95 w-full text-center">
        <div className="font-cinzel text-[18px] text-parchment mb-3 tracking-[0.04em]">
          {title}
        </div>
        <p className="font-garamond text-[15px] text-taupe leading-[1.65] mb-6">
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-transparent border border-[rgba(184,150,58,0.3)] rounded-[3px] text-parchment-muted font-mono-dm text-[11px] tracking-[0.06em] cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-[rgba(200,72,72,0.15)] border border-[rgba(200,72,72,0.4)] rounded-[3px] text-crimson font-mono-dm text-[11px] tracking-[0.06em] cursor-pointer"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
