export interface Message {
  name: string;
  text: Text;
}

export interface Text {
  cyrillic: string;
  latin: string;
  possibleRefunds: boolean;
  haveOrderNumber: boolean;
  needToPay: boolean;
}
