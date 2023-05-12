class ItemCompra {
  comp_id: string;
  prod_id: string;
  quantity: number;
  discount: number;

  constructor(comp_id: string, prod_id: string, quantity: number, discount: number) {
    this.comp_id = comp_id;
    this.prod_id = prod_id;
    this.quantity = quantity;
    this.discount = discount;
  }
}

export default ItemCompra;
