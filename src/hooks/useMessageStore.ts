import { create } from 'zustand';

import { type Message } from '@/types';

interface MessageStore {
  message: Message;
  setMessage: (message: Message) => void;
  resetMessage: () => void;
}

const INITIAL_STATE = {
  name: 'Шаблон',
  text: {
    cyrillic: 'Оберіть шаблон повідомлення.',
    latin: 'Oberit shablon povidomlennia.',
  },
};

export const useMessageStore = create<MessageStore>((set) => ({
  message: INITIAL_STATE,
  setMessage: (message) => {
    set({ message });
  },
  resetMessage: () => {
    set({ message: INITIAL_STATE });
  },
}));
