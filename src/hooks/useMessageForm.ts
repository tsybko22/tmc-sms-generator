import { useEffect, useState, type Dispatch } from 'react';

import { INITIAL_FORM_STATE } from '@/data/constants';
import { useMessageStore } from '@/hooks/useMessageStore';
import { type Message } from '@/types';

import { editMessage } from '@/utils';

export interface FormFields {
  storeName: string;
  orderNumber: string;
  needToRefund: boolean;
  paymentLink: string;
  productList: string;
}

type FormState = [
  formData: FormFields,
  setFormData: Dispatch<React.SetStateAction<FormFields>>,
];

export const useMessageForm = (message: Message): FormState => {
  const { text } = message;
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const { setMessage } = useMessageStore();

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

  return [formData, setFormData];
};
