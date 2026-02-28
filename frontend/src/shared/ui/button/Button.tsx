import { cn } from '@/shared/lib/cn';
import {
  buttonSizeClasses,
  buttonToneClasses,
  buttonVariantClasses,
  type ButtonProps,
} from '@/shared/ui/button/model';

export function Button({
  className,
  variant = 'outline',
  tone = 'blue',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  const toneClass = variant === 'outline' || variant === 'icon' ? buttonToneClasses[tone] : '';

  return (
    <button
      type={type}
      className={cn(
        'rounded-lg transition-all font-mono disabled:opacity-60 disabled:cursor-not-allowed',
        buttonVariantClasses[variant],
        toneClass,
        buttonSizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
