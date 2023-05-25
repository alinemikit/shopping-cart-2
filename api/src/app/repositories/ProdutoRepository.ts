import { execQuery } from '../../database'
import Produto from '../models/Produto';

class ProdutoRepository {

  async findAll(orderBy: any) {
    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM Produto ORDER BY prod_name ${direction}`;

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Produto WHERE prod_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  // async findByMenu(cat_id: string) {
  //   const sql = 'SELECT * FROM Produto WHERE menu_id = ?';
  //   const values = [cat_id];

  //   const row = await execQuery(sql, values);
  //   return row;
  // }

  // async findByEmpresa(emp_id: string) {
  //   const sql = 'SELECT * FROM Produto WHERE emp_id = ?';
  //   const values = [emp_id];

  //   const row = await execQuery(sql, values);
  //   return row;
  // }

  async create(produto: Produto) {
    const now = new Date();
    const id = now.valueOf();
    const sql = `INSERT INTO
                Produto(prod_id , prod_name, prod_desc, prod_val, menu_id,
                  prod_image, emp_id, cat_id)
                VALUES(${id}, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [produto.name, produto.descricao, produto.valor, null,
      produto.image, null, produto.cat_id];

    const row = await execQuery(sql, values);
    console.log(row);
    return [row, id];
  }

  async update(produto: Produto) {
    const now = new Date();
    const sql = `UPDATE Produto
                SET prod_name = ?, prod_desc = ?, prod_val = ?, menu_id = ?,
                  prod_image = ?, emp_id = ?, cat_id = ?
                WHERE prod_id = ?`;
    const values = [produto.name, produto.descricao, produto.valor, null,
      produto.image, null, produto.cat_id, produto.id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(id: string) {
    const sql = 'DELETE FROM Produto WHERE prod_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }


}

export default new ProdutoRepository();
