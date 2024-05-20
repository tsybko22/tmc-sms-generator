import { type FormFields } from '@/hooks/useMessageForm';
import { type FormOption, type Message } from '@/types';

export const INITIAL_STATE: Message = {
  name: 'Шаблон',
  text: {
    cyrillic: 'Оберіть шаблон повідомлення.',
    latin: 'Oberit shablon povidomlennia.',
  },
};

export const INITIAL_FORM_STATE: FormFields = {
  storeName: 'termincin.com',
  orderNumber: '',
  needToRefund: false,
  paymentLink: '',
  productList: '',
  altList: [''],
};

export const SELECT_OPTIONS: FormOption[] = [
  { value: 'termincin.com', label: 'termincin.com' },
  { value: 'Kasta', label: 'Каста' },
  { value: 'Prom.ua', label: 'Пром' },
  { value: 'Rozetka', label: 'Розетка' },
  { value: 'Lawa', label: 'Lawa' },
  { value: 'Gorra', label: 'Gorra' },
  { value: 'F.ua', label: 'F.ua' },
  { value: 'Allo', label: 'Алло' },
  { value: 'Epicentr', label: 'Епіцентр' },
  { value: 'Leboutique', label: 'Leboutique' },
  { value: 'Intertop', label: 'Intertop' },
];
