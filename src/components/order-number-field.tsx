import { type ComponentPropsWithoutRef } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OrderNumberFieldProps
  extends Pick<ComponentPropsWithoutRef<'input'>, 'value' | 'onChange'> {}

const OrderNumberField = ({ value, onChange }: OrderNumberFieldProps) => (
  <div className='grid w-full max-w-[150px] grid-cols-1 gap-1.5'>
    <Label htmlFor='order-number' className='col-span-1'>
      Номер замовлення
    </Label>
    <Input
      className={`col-span-2 ${value === '' ? 'border-red-500' : ''}`}
      type='text'
      id='order-number'
      placeholder='443445'
      value={value}
      onChange={onChange}
    />
    {value === '' && (
      <p className='col-span-2 w-[300px] text-sm font-normal text-red-500'>
        Не забудь додати номер замовлення 🤓
      </p>
    )}
  </div>
);

export default OrderNumberField;
