import { Request, Response } from "express"
import ItemEmpresaCategoria from "../models/ItemEmpresaCategoria";
import ItemEmpresaCategoriaRepository from "../repositories/ItemEmpresaCategoriaRepository";

class ItemEmpresaCategoriaController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const itemEmpCat = await ItemEmpresaCategoriaRepository.findAll();

      response.status(200).json(itemEmpCat);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async showByCategoria(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const items = await ItemEmpresaCategoriaRepository.findByCategoria(id);

      // if (!Object.keys(items).length) {
      //   return response.status(404).json({ error: 'Items not found' });
      // }

      response.status(200).json(items);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        emp_id, cat_id
      } = request.body;

      const item = await ItemEmpresaCategoriaRepository.create(
        new ItemEmpresaCategoria(emp_id, cat_id)
      );

      const newItem = await ItemEmpresaCategoriaRepository.findById(emp_id, cat_id);
      if (Object.keys(newItem).length) {
        response.status(200).json(newItem);
      } else {
        response.status(400).send('Item da compra não pode ser adicionado, por favor tente novamente!');
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  // async update(request: Request, response: Response) {
  //   // Editar um registro
  //   try {
  //     const {
  //       emp_id, cat_id
  //     } = request.body;

  //     const item = await ItemEmpresaCategoriaRepository.update(
  //       new ItemEmpresaCategoria(emp_id, cat_id)
  //     );

  //     const updated = await ItemEmpresaCategoriaRepository.findById(emp_id, cat_id);
  //     // if (Object.keys(updated).length) {
  //     if (item.affectedRows) {
  //       response.status(200).json(updated);
  //     } else {
  //       response.status(400).send(item);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     response.sendStatus(500);
  //   }
  // }

  async delete(request: Request, response: Response) {
    // Deletar um registro
    try {
      const {
        emp_id, cat_id
      } = request.body;

      await ItemEmpresaCategoriaRepository.delete(emp_id, cat_id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new ItemEmpresaCategoriaController();




