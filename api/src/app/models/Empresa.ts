class Empresa {
  id: string;
  name: string;
  description: string;
  address: string;
  image: any;

  constructor(id: string, name: string, description: string, address: string,  image: any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.image = image;
  }
}

export default Empresa;
