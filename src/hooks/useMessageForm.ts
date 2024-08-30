import { useEffect, useState, type Dispatch } from 'react';

import { INITIAL_FORM_STATE } from '@/data/constants';
import { useMessageStore } from '@/hooks/useMessageStore';
import { type Message } from '@/types';

import { editMessage, shortenUrlList, transliterateUkrToEng } from '@/utils';

export interface FormFields {
  storeName: string;
  orderNumber: string;
  needToRefund: boolean;
  requestToCallback: boolean;
  paymentLink: string;
  productList: string;
  altList: string[];
}

type FormState = [
  formData: FormFields,
  setFormData: Dispatch<React.SetStateAction<FormFields>>,
];

export const useMessageForm = (message: Message): FormState => {
  const { text } = message;
  const [formData, setFormData] = useState<FormFields>(INITIAL_FORM_STATE);
  const { setMessage } = useMessageStore();

  const handleFormChange = async () => {
    let { cyrillic, latin } = text;
    const {
      storeName,
      orderNumber,
      needToRefund,
      requestToCallback,
      paymentLink,
      productList,
      altList,
    } = formData;

    const replacementMap: { [key: string]: string } = {
      '{STORE_NAME}': storeName,
      '{ORDER_NUMBER}': orderNumber,
      '{REFUND_TEXT}': needToRefund
        ? 'Кошти повернуться на Вашу картку протягом доби.\n'
        : '',
      '{CALLBACK_TEXT}': requestToCallback
        ? '\n\nПісля прийняття рішення, будь ласка, зателефонуйте для підтвердження на один з цих номерів: +380664818686, +380675156127.\n'
        : '',
      '{PAYMENT_LINK}': paymentLink,
      '{PRODUCT_LIST}': productList,
    };

    for (const placeholder in replacementMap) {
      const value = replacementMap[placeholder];

      if (value) {
        let latinValue: string;

        switch (placeholder) {
          case '{PRODUCT_LIST}':
          case '{REFUND_TEXT}':
          case '{CALLBACK_TEXT}':
            latinValue = transliterateUkrToEng(value);
            break;
          default:
            latinValue = value;
        }

        cyrillic = editMessage(cyrillic, placeholder, value);
        latin = editMessage(latin, placeholder, latinValue);
      }
    }

    if (altList.length !== 0) {
      const shortenedUrls = await shortenUrlList(altList);
      cyrillic = editMessage(cyrillic, '{ALT_LIST}', shortenedUrls);
      latin = editMessage(latin, '{ALT_LIST}', shortenedUrls);
    }

    setMessage({
      ...message,
      text: {
        cyrillic,
        latin,
      },
    });
  };

  const resetFormData = () => {
    setFormData({ ...INITIAL_FORM_STATE });
  };

  useEffect(() => {
    resetFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    void handleFormChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return [formData, setFormData];
};
