import { execQuery } from '../../database'
import Categoria from "../models/Categoria";

class CategoriaRepository {

  async findAll(orderBy: any) {

    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    // const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    // const sql = `SELECT * FROM Categoria ORDER BY cat_name ${direction}`;
    const sql = `SELECT * FROM Categoria`;


    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Categoria WHERE cat_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async create(categoria: Categoria) {
    const now = Date.now();
    const id = now.valueOf();
    const sql = `INSERT INTO
                Categoria(cat_id , cat_name, cat_image)
                VALUES(${id}, ?, ?)`;
    const values = [categoria.name, categoria.image];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  async update(categoria: Categoria) {
    const now = new Date();
    const sql = `UPDATE Categoria
                SET cat_name = ?, cat_image = ?
                WHERE cat_id = ?`;
    const values = [categoria.name, categoria.image, categoria.id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(id: string) {
    const sql = 'DELETE FROM Categoria WHERE cat_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

}

export default new CategoriaRepository();
