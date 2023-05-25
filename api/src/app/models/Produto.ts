import Categoria from "./Categoria";

class Produto {
  id: string;
  name: string;
  descricao: string;
  valor: number;
  image: any;
  cat_id: string;


  constructor(id: string, name: string, descricao: string, valor: number, image: any, cat_id: string) {
    this.id = id;
    this.name = name;
    this.descricao = descricao;
    this.valor = valor;
    this.image = image;
    this.cat_id = cat_id
  }
}

export default Produto;
