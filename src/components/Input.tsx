import type { ComponentProps } from 'react';

export function Input({ className = '', ...props }: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={`h-7 w-full rounded border-0 bg-white px-2 text-base ${className}`}
    />
  );
}
