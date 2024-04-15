import { type ComponentPropsWithoutRef } from 'react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PaymentLinkFieldProps
  extends Pick<ComponentPropsWithoutRef<'textarea'>, 'value' | 'onChange'> {}

const PaymentLinkField = ({ value, onChange }: PaymentLinkFieldProps) => (
  <div className='grid w-full gap-1.5'>
    <Label htmlFor='payment-link'>Посилання на оплату</Label>
    <Textarea
      id='payment-link'
      className='resize-none'
      placeholder='https://secure.wayforpay.com/invoice/i2109deb029d8'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default PaymentLinkField;
