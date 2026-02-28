import type { InputHTMLAttributes } from 'react';

export const inputVariantClasses = {
  default: 'bg-black/60 border border-white/10 text-white focus:border-cyber-blue',
  subtle: 'bg-white/5 border border-white/10 text-white focus:border-cyber-blue',
} as const;

export type InputVariant = keyof typeof inputVariantClasses;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}
