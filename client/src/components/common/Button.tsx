import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60';
  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-500 shadow-soft',
    secondary: 'bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-500',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-600 dark:text-slate-200 dark:hover:bg-slate-800'
  };
  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base'
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
