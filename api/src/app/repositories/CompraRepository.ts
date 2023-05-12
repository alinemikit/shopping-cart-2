import { execQuery } from '../../database'
import Compra from "../models/Compra";

class CompraRepository {

  async findAll(orderBy: any) {
    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM Compra ORDER BY comp_date ${direction}`;

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Compra WHERE comp_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async create(compra: Compra) {
    const now = new Date();
    const id = now.valueOf();
    const sql = `INSERT INTO
                Compra(comp_id , usu_id, comp_date, comp_total, comp_status)
                VALUES(${id}, ?, ?, ?, ?)`;
    const values = [compra.usu_id, compra.date, compra.total, compra.status];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  async update(compra: Compra) {
    const now = new Date();
    const sql =`UPDATE Compra
                SET usu_id = ?, comp_date = ?, comp_total = ?, comp_status = ?
                WHERE comp_id = ?`;
    const values = [compra.usu_id, compra.date, compra.total, compra.status, compra.id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(id: string) {
    const sql = 'DELETE FROM Compra WHERE comp_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

}

export default new CompraRepository();
