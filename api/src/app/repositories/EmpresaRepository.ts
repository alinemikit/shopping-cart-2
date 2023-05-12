import { execQuery } from '../../database'
import Empresa from '../models/Empresa';

class EmpresaRepository {

  async findAll(orderBy: any) {
    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM Empresa ORDER BY emp_name ${direction}`;

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Empresa WHERE emp_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async create(empresa: Empresa) {
    const now = new Date();
    const id = now.valueOf();
    const sql = `INSERT INTO
                Empresa(emp_id , emp_name, emp_desc, emp_address, emp_image)
                VALUES(${id}, ?, ?, ?, ?)`;
    const values = [empresa.name, empresa.description, empresa.address, empresa.image];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  async update(empresa: Empresa) {
    const now = new Date();
    const sql =`UPDATE Empresa
                SET emp_name = ?, emp_desc = ?, emp_address = ?, emp_image = ?
                WHERE emp_id = ?`;
    const values = [empresa.name, empresa.description, empresa.address, empresa.image, empresa.id];

    const row = await execQuery(sql, values);
    console.log(row);

    return row;
  }

  async delete(id: string) {
    const sql = 'DELETE FROM Empresa WHERE emp_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

}

export default new EmpresaRepository();
