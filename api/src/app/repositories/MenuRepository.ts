import { execQuery } from '../../database';
import Menu from '../models/Menu';

class CategoriaRepository {

  async findAll(orderBy: any) {
    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM Menu ORDER BY menu_name ${direction}`;

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Menu WHERE menu_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async create(menu: Menu) {
    const now = Date.now();
    const id = now.valueOf();
    const sql = `INSERT INTO
                Menu(menu_id , menu_name)
                VALUES(${id}, ?)`;
    const values = [menu.name];

    const row = await execQuery(sql, values);
    return [row, id];
  }

  async update(menu: Menu) {
    const now = new Date();
    const sql = `UPDATE Menu
                SET menu_name = ?
                WHERE menu_id = ?`;
    const values = [menu.name, menu.id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(id: string) {
    const sql = `DELETE FROM Menu WHERE menu_id = ?`;
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async findByEmpresa(id: string) {
    //distinct
    const sql = `SELECT Menu.menu_id, Menu.menu_name FROM Menu
                INNER JOIN Produto ON Produto.menu_id = Menu.menu_id
                INNER JOIN Empresa ON Empresa.emp_id = Produto.emp_id
                WHERE Empresa.emp_id = ?`;
    const values = [id];

    const rows = await execQuery(sql, values);
    return rows;
  }

  async findItemsMenu(menu_id: string, emp_id: string) {
    const sql = `SELECT * FROM Produto
                WHERE Produto.menu_id = ? AND Produto.emp_id = ?`;
    const values = [menu_id, emp_id];

    const rows = await execQuery(sql, values);
    return rows;
  }

}

export default new CategoriaRepository();
