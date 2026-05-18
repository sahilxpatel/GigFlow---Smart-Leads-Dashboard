import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | undefined;
  leftIcon?: ReactNode | undefined;
  rightIcon?: ReactNode | undefined;
}

export function Input({ label, error, className, id, leftIcon, rightIcon, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replaceAll(' ', '-');

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-slate-900 dark:text-slate-200" htmlFor={inputId}>
      {label ? <span className="font-medium text-slate-900 dark:text-slate-100">{label}</span> : null}
      <div className="relative">
        {leftIcon ? <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500 dark:text-slate-500">{leftIcon}</span> : null}
        <input
          id={inputId}
          className={cn(
            'h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
            leftIcon ? 'pl-11' : undefined,
            rightIcon ? 'pr-11' : undefined,
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
        {rightIcon ? <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-500 dark:text-slate-500">{rightIcon}</span> : null}
      </div>
      {error ? <span className="text-xs text-rose-400">{error}</span> : null}
    </label>
  );
}
