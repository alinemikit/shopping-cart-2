import { execQuery } from '../../database'
import Usuario from "../models/Usuario";

class UsuarioRepository {

  async findAll(orderBy: any) {
    if (orderBy) {
      orderBy = orderBy.toUpperCase();
    } else {
      orderBy = "";
    }
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const sql = `SELECT * FROM Usuario ORDER BY usu_name ${direction}`;

    const rows = await execQuery(sql, '');
    return rows;
  }

  async findById(id: string) {
    const sql = 'SELECT * FROM Usuario WHERE usu_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }

  async findByEmail(email: string) {
    const sql = 'SELECT * FROM Usuario WHERE usu_email = ?';
    const values = [email];

    const row = await execQuery(sql, values);
    return row;
  }

  // async create(name: string, email: string, password: string, type: number) {
  async create(usuario: Usuario) {
    const now = new Date();
    const sql = `INSERT INTO
                Usuario(usu_id , usu_name, usu_email, usu_password, usu_address, usu_type)
                VALUES(${now.valueOf()}, ?, ?, ?, ?, ?)`;
    const values = [usuario.name, usuario.email, usuario.password, usuario.address, usuario.type];

    const row = await execQuery(sql, values);
    return row;
  }

  async update(usuario: Usuario) {
    const now = new Date();
    const sql = `UPDATE Usuario
                SET usu_name = ?, usu_password = ?, usu_address = ?, usu_type = ?
                WHERE usu_id = ?`;
    const values = [usuario.name, usuario.password, usuario.address, usuario.type, usuario.id];

    const row = await execQuery(sql, values);
    return row;
  }

  async delete(id: string) {
    const sql = 'DELETE FROM Usuario WHERE usu_id = ?';
    const values = [id];

    const row = await execQuery(sql, values);
    return row;
  }
}

export default new UsuarioRepository();
