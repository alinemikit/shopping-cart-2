import { Request, Response } from "express"
import Compra from "../models/Compra";
import CompraRepository from "../repositories/CompraRepository";

class CompraController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const compra = await CompraRepository.findAll(orderBy);

      response.status(200).json(compra);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const compra = await CompraRepository.findById(id);

      if (!Object.keys(compra).length) {
        return response.status(404).json({ error: 'Order not found' });
      }

      response.status(200).json(compra);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        usu_id, comp_date, comp_total, comp_status
      } = request.body;

      const compra = await CompraRepository.create(
        new Compra('', usu_id, comp_date, comp_total, comp_status)
      );

      const newCompra = await CompraRepository.findById(compra[1]);
      if (Object.keys(newCompra).length) {
        response.status(200).json(newCompra);
      } else {
        response.status(400).send('Compra não pode ser finalizada, por favor tente novamente!');
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
        usu_id, comp_date, comp_total, comp_status
      } = request.body;

      const compra = await CompraRepository.update(
        new Compra(id, usu_id, comp_date, comp_total, comp_status)
      );

      const updated = await CompraRepository.findById(id);
      // if (Object.keys(newCompra).length) {
      if (compra.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(compra);
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

      await CompraRepository.delete(id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

}

export default new CompraController();




