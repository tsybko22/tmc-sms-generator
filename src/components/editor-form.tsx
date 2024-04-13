import { type Message } from '@/types';

interface EditorFormProps {
  message?: Message;
}

interface formConfig {
  [key: string]: React.FC;
}

const RefundSection = () => {
  return <div>Refund Section</div>;
};

const OrderNumberSection = () => {
  return <div>Order Number Section</div>;
};

const PaymentSection = () => {
  return <div>Payment Section</div>;
};

const formConfig: formConfig = {
  possibleRefund: RefundSection,
  haveOrderNumber: OrderNumberSection,
  needToPay: PaymentSection,
};

const EditorForm = ({ message }: EditorFormProps) => {
  if (!message) return null;

  const { text } = message;

  return (
    <form className='my-6'>
      {Object.entries(text).map(([key]) => {
        const Component = formConfig[key as keyof formConfig];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        return Component ? <Component key={key} /> : null;
      })}
    </form>
  );
};

export default EditorForm;
