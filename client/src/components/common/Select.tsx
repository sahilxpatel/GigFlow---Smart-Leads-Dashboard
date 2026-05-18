import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | undefined;
  options: Array<{ label: string; value: string }>;
}

export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replaceAll(' ', '-');

  return (
    <label className="flex w-full flex-col gap-2 text-sm text-slate-900 dark:text-slate-200" htmlFor={selectId}>
      {label ? <span className="font-medium text-slate-900 dark:text-slate-100">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          'h-11 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
          error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-rose-400">{error}</span> : null}
    </label>
  );
}
