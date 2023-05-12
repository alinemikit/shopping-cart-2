import { execQuery } from '../../database'
import ItemEmpresaCategoria from '../models/ItemEmpresaCategoria';

class ItemEmpresaCategoriaRepository {

  async findAll() {
    const sql = 'SELECT * FROM item_empcat';

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(emp_id: string, cat_id: string) {
    const sql = `SELECT * FROM item_empcat
                WHERE emp_id = ? AND cat_id = ?`;
    const values = [emp_id, cat_id];

    const row = await execQuery(sql, values);
    return row;
  }

  //find empresas by categoria
  async findByCategoria(id: string) {
    const sql = `SELECT * FROM item_empcat
                INNER JOIN Empresa ON Empresa.emp_id = item_empcat.emp_id
                WHERE item_empcat.cat_id = ?`;
    const values = [id];

    const rows = await execQuery(sql, values);
    return rows;
  }

  async create(itemEmpCat: ItemEmpresaCategoria) {
    const now = new Date();
    const id = now.valueOf();
    const sql = `INSERT INTO
                item_empcat(emp_id , cat_id)
                VALUES(?, ?)`;
    const values = [itemEmpCat.emp_id, itemEmpCat.cat_id];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  // async update(itemEmpCat: ItemEmpresaCategoria) {
  // }

  async delete(emp_id: string, cat_id: string) {
    const sql = 'DELETE FROM item_empcat WHERE emp_id = ? AND cat_id = ?';
    const values = [emp_id, cat_id];

    const row = await execQuery(sql, values);
    return row;
  }

}

export default new ItemEmpresaCategoriaRepository();
