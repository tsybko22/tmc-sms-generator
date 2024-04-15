import { useState, type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/utils';

import { Check, ChevronsUpDown } from 'lucide-react';

export type ComboBoxOption = {
  value: string;
  label: string;
};
interface ComboBoxProps {
  options: ComboBoxOption[];
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>>;
}

const ComboBox = ({ options, value, setValue }: ComboBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full max-w-[400px] justify-between'
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Оберіть шаблон'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full max-w-[400px] p-0'>
        <Command>
          <CommandInput placeholder='Пошук шаблону...' />
          <CommandEmpty>Шаблон не знайдено</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
