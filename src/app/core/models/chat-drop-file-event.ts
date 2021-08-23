export class ChatDropFileEvent {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  src: string;
  type: string;
  urlStyle: {
    changingThisBreaksApplicationSecurity: string;
  };
  webkitRelativePath: string;

  constructor(props: ChatDropFileEvent) {
    this.lastModified = props.lastModified;
    this.lastModifiedDate = props.lastModifiedDate;
    this.name = props.name;
    this.size = props.size;
    this.src = props.src;
    this.type = props.type;
    this.urlStyle = props.urlStyle;
    this.webkitRelativePath = props.webkitRelativePath;
  }
}