import {Message} from "./message.model";

export interface Dialog {
  between: string [];
  messages: Message[];
  id: string;
}
