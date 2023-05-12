class Usuario {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  type: number;

  constructor(id: string, name: string, email: string, password: string, address: string, type: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address
    this.type = type;
  }
}

export default Usuario;
