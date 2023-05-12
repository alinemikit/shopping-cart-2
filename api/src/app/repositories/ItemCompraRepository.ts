import { execQuery } from '../../database'
import ItemCompra from "../models/ItemCompra";

class ItemCompraRepository {

  async findAll() {
    const sql = 'SELECT * FROM item_compra';

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(comp_id: string, prod_id: string) {
    const sql = `SELECT * FROM item_compra
                WHERE comp_id = ? AND prod_id = ?`;
    const values = [comp_id, prod_id];

    const row = await execQuery(sql, values);
    return row;
  }

  async findByCompra(id: string) {
    const sql = 'SELECT * FROM item_compra WHERE comp_id = ?';
    const values = [id];

    const rows = await execQuery(sql, values);
    return rows;
  }

  async create(itemCompra: ItemCompra) {
    const now = new Date();
    const id = now.valueOf();
    const sql = `INSERT INTO
                item_compra(comp_id , prod_id, ic_quantity, ic_discount)
                VALUES(?, ?, ?, ?)`;
    const values = [itemCompra.comp_id, itemCompra.prod_id, itemCompra.quantity, itemCompra.discount];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  async update(itemCompra: ItemCompra) {
    const now = new Date();
    const sql =`UPDATE item_compra
                SET ic_quantity = ?, ic_discount = ?
                WHERE comp_id = ? AND prod_id = ?`;
    const values = [itemCompra.quantity, itemCompra.discount, itemCompra.comp_id, itemCompra.prod_id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(comp_id: string, prod_id: string) {
    const sql = 'DELETE FROM item_compra WHERE comp_id = ? AND prod_id = ?';
    const values = [comp_id, prod_id];

    const row = await execQuery(sql, values);
    return row;
  }

}

export default new ItemCompraRepository();
