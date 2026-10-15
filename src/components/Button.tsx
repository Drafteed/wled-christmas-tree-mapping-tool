import type {ComponentProps} from 'react';

export function Button({className = '', ...props}: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={`h-7 w-full cursor-pointer rounded bg-purple-700 px-5 text-base whitespace-nowrap text-white transition-colors hover:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 disabled:pointer-events-none disabled:bg-purple-400 ${className}`}
    />
  );
}
