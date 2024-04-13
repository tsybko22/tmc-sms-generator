export interface Message {
  name: string;
  text: Text;
}

export interface Text {
  cyrillic: string;
  latin: string;
  possibleRefund?: boolean;
  haveOrderNumber?: boolean;
  needToPay?: boolean;
}
