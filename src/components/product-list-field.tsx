import { type ComponentPropsWithoutRef } from 'react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Info } from 'lucide-react';

interface ProductListFieldProps
  extends Pick<ComponentPropsWithoutRef<'textarea'>, 'value' | 'onChange'> {}

const ProductListField = ({ value, onChange }: ProductListFieldProps) => (
  <div className='grid w-full gap-1.5'>
    <div className='flex items-center gap-1.5'>
      <Label htmlFor='product-list'>Список товарів, які прибираємо з замовлення</Label>
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger>
            <Info className='h-5 w-5 opacity-40' />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              <strong>Тільки в вигляді транслітерації!</strong>
              <br />
              Ось державний сайт для транслітерації:{' '}
              <a
                className='text-blue-500 underline'
                href='https://czo.gov.ua/translit'
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
    <Textarea
      id='product-list'
      className='min-h-[120px] resize-none'
      placeholder='Parasolka cholovicha 840 (2000903605997A),&#10;Krosivky cholovichi Gipanis VS-991 41 Chornyi (2000990521002D),&#10;Miach voleibolnyi MEIDA M500-14 Rozhevyi (2002011531427)'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ProductListField;
