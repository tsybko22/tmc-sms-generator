import { create } from 'zustand';

import { INITIAL_STATE } from '@/data/constants';
import { type Message } from '@/types';

interface MessageStore {
  message: Message;
  setMessage: (message: Message) => void;
  resetMessage: () => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  message: INITIAL_STATE,
  setMessage: (message) => {
    set({ message });
  },
  resetMessage: () => {
    set({ message: INITIAL_STATE });
  },
}));
