import { type CheckboxProps } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RefundFieldProps extends Pick<CheckboxProps, 'checked' | 'onCheckedChange'> {}

const RefundField = ({ checked, onCheckedChange }: RefundFieldProps) => (
  <div className='relative bottom-[8px] flex items-center space-x-2 self-end'>
    <Checkbox id='refund' checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor='refund' className='text-base font-normal'>
      Треба повернути кошти?
    </Label>
  </div>
);

export default RefundField;
