import { Message } from "./message";
import { User } from "./user";

export class Chat {
  createdAt?: string | Date;
  deletedAt?: string | Date;
  description?: string;
  id?: string;
  isGroup: boolean;
  members: Partial<Member>[];
  messages?: Partial<Message>[];
  picture?: string;
  title?: string;
  updatedAt?: string | Date;
  userId: string;

  constructor(props: Chat) {
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
    this.description = props.description;
    this.id = props.id;
    this.isGroup = props.isGroup;
    this.members = props.members;
    this.messages = props.messages;
    this.picture = props.picture;
    this.title = props.title;
    this.updatedAt = props.updatedAt;
    this.userId = props.userId;
  }
}

export class Member {
  id: string;
  userId: string;
  chatId: string;
  user?: Partial<User>;

  constructor(props: Member) {
    this.id = props.id;
    this.userId = props.userId;
    this.chatId = props.chatId;
    this.user = props.user;
  }
}