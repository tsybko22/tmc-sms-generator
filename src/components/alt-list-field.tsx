import { isValidUrl } from '@/utils';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Info, Plus, Trash2 } from 'lucide-react';

interface AltListFieldProps {
  onChange: (value: string[]) => void;
}

const AltListField = ({ onChange }: AltListFieldProps) => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const [nextInputIndex, setNextInputIndex] = useState<number>(1);

  const handleInputChange = (index: number, newValue: string) => {
    const newInputs = [...inputs];

    newInputs[index] = newValue;
    setInputs(newInputs);

    if (isValidUrl(newValue)) {
      onChange(newInputs);
    }
  };

  const handleAddInput = () => {
    setInputs([...inputs, '']);
    setNextInputIndex(nextInputIndex + 1);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
    onChange(newInputs);
    setNextInputIndex(nextInputIndex - 1);

    if (newInputs.length === 0) {
      setInputs(['']);
      setNextInputIndex(1);
    }
  };

  return (
    <div className='grid w-full gap-1.5'>
      <div className='flex items-center gap-1.5'>
        <Label htmlFor='product-list'>Список посилань на альтернативи</Label>
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger>
              <Info className='h-5 w-5 opacity-40' />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Також можна вставляти посилання на фото.
                <br />
                Ось найкращий сервіс для цього:{' '}
                <a
                  className='text-blue-500'
                  href='https://imgur.com/upload'
                  target='_blank'
                  rel='noreferrer'
                >
                  посилання
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='space-y-4 text-center'>
        {inputs.map((inputValue, index) => (
          <div key={index} className='flex gap-3'>
            <Input
              placeholder='Посилання на альтернативу'
              value={inputValue}
              onChange={(evt) => {
                handleInputChange(index, evt.target.value);
              }}
              autoFocus={index === nextInputIndex - 1}
              disabled={isValidUrl(inputs[index])}
            />

            <Button
              size='icon'
              variant='ghost'
              className='w-5 text-red-500 hover:scale-110 hover:bg-transparent hover:text-red-600'
              onClick={() => {
                handleRemoveInput(index);
              }}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
        <Button size='icon' onClick={handleAddInput}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default AltListField;
