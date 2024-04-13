import { useMessageStore } from '@/hooks/useMessageStore';
import { type Message } from '@/types';
import { editMessage } from '@/utils';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import stepTwoIcon from '@icons/step2.png';
import stepThreeIcon from '@icons/step3.png';
import { Info } from 'lucide-react';

interface EditorFormProps {
  message: Message;
}

interface FormFields {
  storeName: string;
  orderNumber: string;
  needToRefund: boolean;
  paymentLink: string;
  productList: string;
}

const EditorForm = ({ message }: EditorFormProps) => {
  const { text } = message;
  const [formData, setFormData] = useState<FormFields>({
    storeName: 'termincin.com',
    orderNumber: '',
    needToRefund: false,
    paymentLink: '',
    productList: '',
  });
  const { setMessage } = useMessageStore();
  const textHasBooleanValue = Object.values(text).includes(true);

  const handleFormChange = (formData: FormFields) => {
    let editedCyrillic = text.cyrillic;
    let editedLatin = text.latin;

    if (formData.storeName) {
      editedCyrillic = editMessage(editedCyrillic, '{STORE_NAME}', formData.storeName);
      editedLatin = editMessage(editedLatin, '{STORE_NAME}', formData.storeName);
    }
    if (formData.orderNumber) {
      editedCyrillic = editMessage(
        editedCyrillic,
        '{ORDER_NUMBER}',
        formData.orderNumber
      );
      editedLatin = editMessage(editedLatin, '{ORDER_NUMBER}', formData.orderNumber);
    }
    if (formData.needToRefund) {
      editedCyrillic = editMessage(
        editedCyrillic,
        '{REFUND_TEXT}',
        'Кошти повернуться на Вашу картку протягом доби. '
      );
      editedLatin = editMessage(
        editedLatin,
        '{REFUND_TEXT}',
        'Koshty povernutsia na Vashu kartku protiahom doby. '
      );
    }
    if (formData.paymentLink) {
      editedCyrillic = editMessage(
        editedCyrillic,
        '{PAYMENT_LINK}',
        formData.paymentLink
      );
      editedLatin = editMessage(editedLatin, '{PAYMENT_LINK}', formData.paymentLink);
    }
    if (formData.productList) {
      editedCyrillic = editMessage(
        editedCyrillic,
        '{PRODUCT_LIST}',
        formData.productList.replace(/\n/g, ', ')
      );
      editedLatin = editMessage(
        editedLatin,
        '{PRODUCT_LIST}',
        formData.productList.replace(/\n/g, ', ')
      );
    }

    const editedMessage = {
      ...message,
      text: {
        cyrillic: editedCyrillic,
        latin: editedLatin,
      },
    };

    setMessage(editedMessage);
  };

  console.log('🚀 => EditorForm => formData\n', formData);

  useEffect(() => {
    setFormData({
      storeName: 'termincin.com',
      orderNumber: '',
      needToRefund: false,
      paymentLink: '',
      productList: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    handleFormChange(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <form
      className='my-5 space-y-5'
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      <fieldset className='space-y-5'>
        <legend className='flex items-center gap-2 text-base leading-7 lg:text-lg'>
          <img className='h-7 w-7' src={stepTwoIcon} alt='Зображення цифри 2' />
          Оберіть назву магазину під виглядом якого треба відправити повідомлення:
        </legend>
        <Select
          value={formData.storeName}
          onValueChange={(value) => {
            setFormData({ ...formData, storeName: value });
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Назва магазину' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='termincin.com'>termincin.com</SelectItem>
            <SelectItem value='Kasta'>Каста</SelectItem>
            <SelectItem value='Prom.ua'>Пром</SelectItem>
            <SelectItem value='Rozetka'>Розетка</SelectItem>
            <SelectItem value='Lawa'>Lawa</SelectItem>
            <SelectItem value='Gorra'>Gorra</SelectItem>
            <SelectItem value='F.ua'>F.ua</SelectItem>
            <SelectItem value='Allo'>Алло</SelectItem>
            <SelectItem value='Epicentr'>Епіцентр</SelectItem>
            <SelectItem value='Leboutique'>Leboutique</SelectItem>
          </SelectContent>
        </Select>
      </fieldset>
      {textHasBooleanValue ? (
        <fieldset className='space-y-5'>
          <legend className='flex items-center gap-2 text-base leading-7 lg:text-lg'>
            <img className='h-7 w-7' src={stepThreeIcon} alt='Зображення цифри 3' />
            Додаткові налаштування:
          </legend>
          {(text.haveOrderNumber || text.possibleRefund) && (
            <div className='flex gap-10'>
              {text.haveOrderNumber && (
                <div className='grid w-full max-w-[150px] items-center gap-1.5'>
                  <Label htmlFor='order-number'>Номер замовлення</Label>
                  <Input
                    type='text'
                    id='order-number'
                    placeholder='443445'
                    value={formData.orderNumber}
                    onChange={(evt) => {
                      setFormData({ ...formData, orderNumber: evt.target.value });
                    }}
                  />
                </div>
              )}
              {text.possibleRefund && (
                <div className='relative bottom-[12px] flex items-center space-x-2 self-end'>
                  <Checkbox
                    id='refund'
                    checked={formData.needToRefund}
                    onCheckedChange={() => {
                      setFormData({
                        ...formData,
                        needToRefund: !formData.needToRefund,
                      });
                    }}
                  />
                  <label
                    htmlFor='refund'
                    className='leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Треба повернути кошти?
                  </label>
                </div>
              )}
            </div>
          )}
          {text.needToPay && (
            <div className='grid w-full gap-1.5'>
              <Label htmlFor='payment-link'>Посилання на оплату</Label>
              <Textarea
                id='payment-link'
                className='resize-none'
                placeholder='https://secure.wayforpay.com/invoice/i2109deb029d8'
                value={formData.paymentLink}
                onChange={(evt) => {
                  setFormData({ ...formData, paymentLink: evt.target.value });
                }}
              />
            </div>
          )}
          {text.haveProductList && (
            <div className='grid w-full gap-1.5'>
              <div className='flex items-center gap-1.5'>
                <Label htmlFor='product-list'>
                  Список товарів, які прибираємо з замовлення
                </Label>
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
                value={formData.productList}
                onChange={(evt) => {
                  setFormData({ ...formData, productList: evt.target.value });
                }}
              />
            </div>
          )}
        </fieldset>
      ) : null}
    </form>
  );
};

export default EditorForm;
