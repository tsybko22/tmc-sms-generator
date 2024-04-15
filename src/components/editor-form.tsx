import { useMessageStore } from '@/hooks/useMessageStore';
import { type FormFields, type Message } from '@/types';
import { editMessage } from '@/utils';
import { useEffect, useState } from 'react';

import OrderNumberField from '@/components/order-number-field';
import PaymentLinkField from '@/components/payment-link-field';
import ProductListField from '@/components/product-list-field';
import RefundField from '@/components/refund-field';
import StoreNameField from '@/components/store-name-field';

import { INITIAL_FORM_STATE } from '@/data/constants';
import stepTwoIcon from '@icons/step2.png';
import stepThreeIcon from '@icons/step3.png';

interface EditorFormProps {
  message: Message;
}

const EditorForm = ({ message }: EditorFormProps) => {
  const { text } = message;
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const { setMessage } = useMessageStore();
  const textHasBooleanValue = Object.values(text).includes(true);

  const handleFormChange = () => {
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
    handleFormChange();
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
          Оберіть назву магазина під виглядом якого треба відправити повідомлення:
        </legend>
        <StoreNameField
          value={formData.storeName}
          onValueChange={(value) => {
            setFormData({ ...formData, storeName: value });
          }}
        />
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
                <OrderNumberField
                  value={formData.orderNumber}
                  onChange={(evt) => {
                    setFormData({ ...formData, orderNumber: evt.target.value });
                  }}
                />
              )}
              {text.possibleRefund && (
                <RefundField
                  checked={formData.needToRefund}
                  onCheckedChange={() => {
                    setFormData({
                      ...formData,
                      needToRefund: !formData.needToRefund,
                    });
                  }}
                />
              )}
            </div>
          )}
          {text.needToPay && (
            <PaymentLinkField
              value={formData.paymentLink}
              onChange={(evt) => {
                setFormData({ ...formData, paymentLink: evt.target.value });
              }}
            />
          )}
          {text.haveProductList && (
            <ProductListField
              value={formData.productList}
              onChange={(evt) => {
                setFormData({ ...formData, productList: evt.target.value });
              }}
            />
          )}
        </fieldset>
      ) : null}
    </form>
  );
};

export default EditorForm;
