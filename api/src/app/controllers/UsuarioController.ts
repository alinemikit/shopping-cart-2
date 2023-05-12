import { request, Request, response, Response } from "express";
import UsuarioRepository from "../repositories/UsuarioRepository";
import { emailValidate } from "../utils/helpers";
import Usuario from "../models/Usuario";

class UsuarioController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const usuarios = await UsuarioRepository.findAll(orderBy);

      response.status(200).json(usuarios);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const usuario = await UsuarioRepository.findById(id);

      if (!Object.keys(usuario).length) {
        return response.status(404).json({ error: 'User not found' });
      }

      response.status(200).json(usuario);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        usu_name, usu_email, usu_password, usu_address, usu_type
      } = request.body;

      let required = ''
      if (!usu_name) {
        required += `'Name'`;
      }
      if (!usu_email) {
        required += ` 'Email'`;
      } else if (!emailValidate.test(usu_email)) {
        required += ` 'Valid Email'`;
      }
      if (!usu_password) {
        required += ` 'Password'`;
      }
      if (!usu_address) {
        required += ` 'Address'`;
      }

      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }

      let type = usu_type;
      if (!usu_type) {
        type = 2;
      }

      const usuarioExists = await UsuarioRepository.findByEmail(usu_email);

      // console.log(Object.keys(usuarioExists).length);
      // como o valor esta retornando [], ele faz a verificacao do tamanho da lista de objs
      if (Object.keys(usuarioExists).length) {
        return response.status(400).json({ error: 'This e-mail is already in use' });
      }

      const usuario = await UsuarioRepository.create(
        new Usuario('', usu_email, usu_email, usu_password, usu_address, usu_type)
      );

      const newUsuario = await UsuarioRepository.findByEmail(usu_email);
      if (Object.keys(newUsuario).length) {
        response.status(200).json(newUsuario);
      } else {
        response.status(400).send('Usuário não pode ser adicionado, por favor tente novamente!');
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async update(request: Request, response: Response) {
    // Editar um registro
    try {
      const { id } = request.params;
      const {
        usu_name, usu_password, usu_address, usu_type
      } = request.body;

      const usuarioById = await UsuarioRepository.findById(id);
      if (!Object.keys(usuarioById).length) {
        return response.status(404).json({ error: 'User not found' });
      }

      // Usuario que vai ser alterado
      const updateUsuario = Object(usuarioById)[0]

      let required = ''
      if (!usu_name) {
        required += `'Name'`;
      }
      if (!usu_password) {
        required += ` 'Password'`;
      }
      if (!usu_address) {
        required += ` 'Address'`;
      }


      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }

      let type = usu_type;
      if (!usu_type) {
        type = 2;
      }

      const usuario = await UsuarioRepository.update(
        new Usuario(id, usu_name, '', usu_password, usu_address, type)
      );

      const updated = await UsuarioRepository.findById(id);
      // if (Object.keys(updated).length) {
      if (usuario.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(usuario);
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async delete(request: Request, response: Response) {
    // Deletar um registro
    try {
      const { id } = request.params;

      await UsuarioRepository.delete(id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new UsuarioController();




