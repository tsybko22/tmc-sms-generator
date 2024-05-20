import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/utils';

interface TextBoxProps extends ComponentPropsWithoutRef<'p'> {
  children?: ReactNode;
}

const TextBox = ({ className, children }: TextBoxProps) => {
  return (
    <pre
      className={cn(
        'min-h-[80px] w-full cursor-text whitespace-pre-wrap break-words rounded-md border border-neutral-300 bg-background px-3 py-2 font-inter text-sm dark:border-neutral-700/70 lg:text-lg',
        className
      )}
    >
      {children}
    </pre>
  );
};

export default TextBox;
