import { type CheckboxProps } from '@radix-ui/react-checkbox';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CallbackFieldProps extends Pick<CheckboxProps, 'checked' | 'onCheckedChange'> {}

const CallbackField = ({ checked, onCheckedChange }: CallbackFieldProps) => (
  <div className='absolute left-[190px] top-[27px] flex items-center space-x-2 self-end'>
    <Checkbox id='refund' checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor='refund' className='text-base font-normal'>
      Треба щоб клієнт перетелефонував?
    </Label>
  </div>
);

export default CallbackField;
