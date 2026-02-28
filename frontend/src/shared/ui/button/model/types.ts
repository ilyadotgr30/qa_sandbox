import type { ButtonHTMLAttributes } from 'react';

export const buttonVariantClasses = {
  gradient:
    'bg-gradient-to-r from-cyber-blue to-cyber-pink text-black hover:shadow-[0_15px_45px_rgba(0,243,255,0.25)]',
  danger:
    'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
  outline: 'border',
  icon: 'border',
  buy:
    'bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:from-cyber-pink hover:via-cyber-blue hover:to-cyber-pink border border-white/10 hover:text-black hover:shadow-[0_0_25px_rgba(255,0,128,0.35)]',
} as const;

export const buttonToneClasses = {
  pink: 'border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black',
  blue: 'border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-black',
  light:
    'border-white/65 bg-white/10 text-white hover:bg-white/20 hover:border-white hover:text-white hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]',
  danger: 'border-red-500/40 text-red-400 bg-red-900/30 hover:bg-red-600 hover:text-white',
} as const;

export const buttonSizeClasses = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-3 text-sm',
  lg: 'px-6 py-4 text-sm',
  icon: 'p-2 text-xs',
} as const;

export type ButtonVariant = keyof typeof buttonVariantClasses;
export type ButtonTone = keyof typeof buttonToneClasses;
export type ButtonSize = keyof typeof buttonSizeClasses;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
}
