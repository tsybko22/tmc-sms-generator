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
              Працює автоматична транслітерація <strong>тільки</strong> з української!
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Textarea
      id='product-list'
      className='min-h-[120px] resize-none'
      placeholder='Парасолька чоловіча 840 (2000903605997A),&#10;Кросівки чоловічі Gipanis VS-991 41 Чорний (2000990521002D),&#10;М&#39;яч волейбольний MEIDA M500-14 Рожевий (2002011531427)'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ProductListField;
