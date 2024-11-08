import { useMessageForm } from '@/hooks/useMessageForm';
import { type Message } from '@/types';

import AltListField from '@/components/alt-list-field';
import CallbackField from '@/components/callback-field';
import OrderNumberField from '@/components/order-number-field';
import PaymentLinkField from '@/components/payment-link-field';
import ProductListField from '@/components/product-list-field';
import RefundField from '@/components/refund-field';
import StoreNameField from '@/components/store-name-field';

import settingsIcon from '@icons/settings.png';
import stepTwoIcon from '@icons/step2.png';

interface EditorFormProps {
  message: Message;
}

const EditorForm = ({ message }: EditorFormProps) => {
  const { text } = message;
  const [formData, setFormData] = useMessageForm(message);
  const hasAdditionalFields = Object.entries(text)
    .filter(([key]) => key !== 'haveStoreName') //exclude haveStoreName property
    .some(([, value]) => value === true);

  return (
    <form
      className='my-5 space-y-5'
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      {text.haveStoreName && (
        <fieldset className='space-y-5'>
          <legend className='flex items-center gap-2 text-base leading-7 lg:text-lg'>
            <img className='h-7 w-7' src={stepTwoIcon} alt='Зображення цифри 2' />
            Оберіть назву магазину під виглядом якого треба відправити повідомлення:
          </legend>
          <StoreNameField
            value={formData.storeName}
            onValueChange={(value) => {
              setFormData({ ...formData, storeName: value });
            }}
          />
        </fieldset>
      )}
      {hasAdditionalFields ? (
        <fieldset className='space-y-5'>
          <legend className='flex items-center gap-2 text-base leading-7 lg:text-lg'>
            <img
              className='h-7 w-7'
              src={settingsIcon}
              alt='Зображення ключа та молота'
            />
            Додаткові налаштування:
          </legend>
          <div className='relative'>
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
            {text.requestToCallback && (
              <CallbackField
                checked={formData.requestToCallback}
                onCheckedChange={() => {
                  setFormData({
                    ...formData,
                    requestToCallback: !formData.requestToCallback,
                  });
                }}
              />
            )}
          </div>

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
              onChange={(productList) => {
                setFormData({ ...formData, productList });
              }}
            />
          )}
          {text.haveAltList && (
            <AltListField
              onChange={(altList) => {
                setFormData({ ...formData, altList });
              }}
            />
          )}
        </fieldset>
      ) : null}
    </form>
  );
};

export default EditorForm;
