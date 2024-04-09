import { useReducer } from 'react';

interface State {
  cyrillic: string;
  latin: string;
}

type Action = {
  type:
    | 'CHANGE_MESSAGE_TEXT'
    | 'CHANGE_STORE'
    | 'ADD_REFUND_TO_TEXT'
    | 'ADD_ORDER_NUMBER_TO_TEXT'
    | 'ADD_PAYMENT_LINK_TO_TEXT';
  payload: State;
};

const INITIAL_STATE = {
  cyrillic: 'Оберіть шаблон повідомлення.',
  latin: 'Oberit shablon povidomlennia.',
};

const messageReducer = (state: State, action: Action) => {
  const editMessage = (
    message: string,
    searchValue: string,
    replaceValue: string
  ): string => message.replace(new RegExp(searchValue, 'g'), replaceValue);

  switch (action.type) {
    case 'CHANGE_MESSAGE_TEXT':
      return action.payload;

    // case 'CHANGE_STORE': {
    // }

    case 'ADD_REFUND_TO_TEXT': {
      const cyrillic = editMessage(
        state.cyrillic,
        'Перепрошуємо за незручності, гарного дня!',
        'Кошти повернуться протягом доби. Перепрошуємо за незручності, гарного дня!'
      );
      const latin = editMessage(
        state.latin,
        'Pereproshuiemo za nezruchnosti, harnoho dnia!',
        'Koshty povernutsia na Vashu kartku protiahom doby. Pereproshuiemo za nezruchnosti, harnoho dnia!'
      );

      return {
        cyrillic,
        latin,
      };
    }

    case 'ADD_ORDER_NUMBER_TO_TEXT': {
      const cyrillic = editMessage(state.cyrillic, '№...', action.payload.cyrillic);
      const latin = editMessage(state.latin, '№...', action.payload.latin);

      return {
        cyrillic,
        latin,
      };
    }

    case 'ADD_PAYMENT_LINK_TO_TEXT': {
      const cyrillic = state.cyrillic + action.payload.cyrillic;
      const latin = state.cyrillic + action.payload.latin;

      return {
        cyrillic,
        latin,
      };
    }

    default:
      return state;
  }
};

export const useMessageReducer = () => {
  const [state, dispatch] = useReducer(messageReducer, INITIAL_STATE);

  return { state, dispatch };
};
