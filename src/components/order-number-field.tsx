import { type ComponentPropsWithoutRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OrderNumberFieldProps
  extends Pick<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {}

const OrderNumberField = ({ value, onChange }: OrderNumberFieldProps) => (
  <div className='grid w-full max-w-[150px] items-center gap-1.5'>
    <Label htmlFor='order-number'>Номер замовлення</Label>
    <Input
      type='text'
      id='order-number'
      placeholder='443445'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default OrderNumberField;
