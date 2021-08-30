export class LastSeen {
  id?: string;
  chatId: string;
  userId: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;

  constructor(props: LastSeen) {
    this.id = props.id;
    this.chatId = props.chatId;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}