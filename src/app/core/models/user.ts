export class User {
  id: any;
  name: string;
  token?: string;
  ssn?: string | number;
  email: string;
  password?: string;

  constructor(props: User) {
    this.id = props.id;
    this.name = props.name;
    this.token = props.token;
    this.ssn = props.ssn;
    this.email = props.email;
    this.password = props.password;
  }
}