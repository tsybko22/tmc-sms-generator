import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TextBoxProps extends ComponentPropsWithoutRef<'p'> {
  children?: ReactNode;
}

const TextBox = ({ className, children }: TextBoxProps) => {
  return (
    <p
      className={cn(
        'min-h-[80px] w-full cursor-text break-words rounded-md border border-neutral-300 bg-background px-3 py-2 text-sm lg:text-lg',
        className
      )}
    >
      {children}
    </p>
  );
};

export default TextBox;
