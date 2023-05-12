import { Request, Response } from "express"
import ItemCompra from "../models/ItemCompra";
import ItemCompraRepository from "../repositories/ItemCompraRepository";

class ItemCompraController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const itemCompra = await ItemCompraRepository.findAll();

      response.status(200).json(itemCompra);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async showByCompra(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const items = await ItemCompraRepository.findByCompra(id);

      if (!Object.keys(items).length) {
        return response.status(404).json({ error: 'Items not found' });
      }

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
        comp_id, prod_id, ic_quantity, ic_discount
      } = request.body;

      const item = await ItemCompraRepository.create(
        new ItemCompra(comp_id, prod_id, ic_quantity, ic_discount)
      );

      const newItem = await ItemCompraRepository.findById(comp_id, prod_id);
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

  async update(request: Request, response: Response) {
    // Editar um registro
    try {
      const {
        comp_id, prod_id, ic_quantity, ic_discount
      } = request.body;

      const item = await ItemCompraRepository.update(
        new ItemCompra(comp_id, prod_id, ic_quantity, ic_discount)
      );

      const updated = await ItemCompraRepository.findById(comp_id, prod_id);
      // if (Object.keys(updated).length) {
      if (item.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(item);
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async delete(request: Request, response: Response) {
    // Deletar um registro
    try {
      const {
        comp_id, prod_id
      } = request.body;

      await ItemCompraRepository.delete(comp_id, prod_id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new ItemCompraController();




