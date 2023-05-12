import Categoria from "./Categoria";

class Produto {
  id: string;
  name: string;
  descricao: string;
  valor: number;
  menu_id: string;
  image: any;
  emp_id: string


  constructor(id: string, name: string, descricao: string, valor: number,
    menu_id: string, image: any, emp_id: string) {
    this.id = id;
    this.name = name;
    this.descricao = descricao;
    this.valor = valor;
    this.menu_id = menu_id;
    this.image = image;
    this.emp_id = emp_id
  }
}

export default Produto;
