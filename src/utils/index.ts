import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const editMessage = (
  message: string,
  searchValue: string,
  replaceValue: string
): string => message.replace(new RegExp(searchValue, 'g'), replaceValue);
