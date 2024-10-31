export interface Message {
  name: string;
  text: Text;
}

export interface Text {
  cyrillic: string;
  latin: string;
  possibleRefund?: boolean;
  requestToCallback?: boolean;
  haveOrderNumber?: boolean;
  needToPay?: boolean;
  haveProductList?: boolean;
  haveAltList?: boolean;
  haveStoreName?: boolean;
}

export interface FormOption {
  value: string;
  label: string;
}

export interface IsGdResponse {
  shorturl?: string;
  errorcode?: number;
  errormessage?: string;
}
