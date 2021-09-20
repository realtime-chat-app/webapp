import { ChatDropFileEvent } from "./chat-drop-file-event";

export class SendChatMessageEvent {
  message: string;
  files: File[] | ChatDropFileEvent[];

  constructor(props: SendChatMessageEvent) {
    this.message = props.message;
    this.files = props.files;
  }
}