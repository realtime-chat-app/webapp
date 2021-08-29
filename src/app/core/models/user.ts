export class User {
  id: any;
  name: string;
  token?: string;
  email: string;
  password?: string;
  avatar: string;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.token = props.token;
    this.email = props.email;
    this.password = props.password;
    this.avatar = props.avatar;
  }
}