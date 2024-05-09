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

interface AltListFieldProps
  extends Pick<ComponentPropsWithoutRef<'textarea'>, 'value' | 'onChange'> {}

const AltListField = ({ value, onChange }: AltListFieldProps) => (
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
              Додавайте посилання <strong>через кому</strong>, <br />
              щоб скорочення посилань відпрацювало коректно!
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Textarea
      id='product-list'
      className='min-h-[120px] resize-none'
      placeholder='https://termincin.com/parasolka-cholovicha-840-2000903605997a/,&#10;https://termincin.com/krosivky-cholovichi-gipanis-vs-991-41-chornyi-2000990521002d/,&#10;https://termincin.com/miach-voleibolnyi-meida-m500-14-rozhevyi-2002011531427/'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default AltListField;
