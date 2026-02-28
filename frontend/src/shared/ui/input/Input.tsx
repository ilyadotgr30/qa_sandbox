import { cn } from '@/shared/lib/cn';
import { inputVariantClasses, type InputProps } from '@/shared/ui/input/model';

export function Input({ className, variant = 'default', ...props }: InputProps) {
  return (
    <input
      className={cn(
        'p-3 rounded-lg outline-none text-sm transition-all w-full',
        inputVariantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
