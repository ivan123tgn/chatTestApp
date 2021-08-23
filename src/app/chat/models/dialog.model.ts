import {Message} from "./message.model";

export interface Dialog {
  between: (string|undefined) [];
  messages: Message[];
  id: string;
}
