import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'invert' | 'ghost';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  status?: 'idle' | 'loading' | 'success';
  onAction?: () => Promise<void> | void;
  successLabel?: string;
  children: React.ReactNode;
}

export default function ActionButton({
  variant = 'primary',
  status: controlledStatus,
  onAction,
  successLabel,
  className,
  children,
  onClick,
  disabled,
  type = 'button',
  ...props
}: ActionButtonProps) {
  const [internalStatus, setInternalStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const status = controlledStatus ?? internalStatus;

  const variantClass: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    invert: 'btn-invert',
    ghost: 'btn-ghost',
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (!onAction || status === 'loading') return;

    setInternalStatus('loading');
    try {
      await onAction();
      setInternalStatus('success');
      window.setTimeout(() => {
        setInternalStatus('idle');
      }, 800);
    } catch {
      setInternalStatus('idle');
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || status === 'loading'}
      aria-busy={status === 'loading'}
      onClick={handleClick}
      className={cn(variantClass[variant], className)}
      {...props}
    >
      {status === 'loading' && (
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" aria-hidden="true" />
      )}
      {status === 'success' && (
        <Check className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      )}
      <span>{status === 'success' && successLabel ? successLabel : children}</span>
    </button>
  );
}
