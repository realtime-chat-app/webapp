import { NbChatMessageFile } from "@nebular/theme";
import { User } from "./user";

export class Message {
  id?: string;
  chatId?: string;
  senderId?: string;
  type: 'text' | 'file' | 'map' | 'quote';
  text: string;
  reply: boolean;
  user: User;
  createdAt?: Date;
  files: NbChatMessageFile[];
  quote: string;
  latitude?: number;
  longitude?: number;

  constructor(props: Message) {
    this.id = props.id;
    this.type = props.type;
    this.text = props.text;
    this.reply = props.reply;
    this.user = props.user;
    this.createdAt = props.createdAt;
    this.files = props.files;
    this.quote = props.quote;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.senderId = props.user.id;
    this.chatId = props.chatId;
  }
};