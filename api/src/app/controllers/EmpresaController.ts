import { Request, Response } from "express"
import Empresa from "../models/Empresa";
import EmpresaRepository from "../repositories/EmpresaRepository";

class EmpresaController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const compra = await EmpresaRepository.findAll(orderBy);

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
      const empresa = await EmpresaRepository.findById(id);

      if (!Object.keys(empresa).length) {
        return response.status(404).json({ error: 'Company not found' });
      }

      response.status(200).json(empresa);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        emp_name, emp_desc, emp_address
      } = request.body;
      const imagePath = request.file?.filename;

      let required = ''
      if (!emp_name) {
        required += `'Company Name'`;
      }
      if (!emp_address) {
        required += ` 'Company Address'`;
      }

      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }

      const empresa = await EmpresaRepository.create(
        new Empresa('', emp_name, emp_desc, emp_address, imagePath)
      );

      console.log(empresa[0]);

      const newEmpresa = await EmpresaRepository.findById(empresa[1]);
      if (Object.keys(newEmpresa).length) {
        response.status(200).json(newEmpresa);
      } else {
        response.status(400).send('Empresa não pode ser cadastrada, por favor tente novamente!');
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
        emp_name, emp_desc, emp_address
      } = request.body;
      const imagePath = request.file?.filename;

      let required = ''
      if (!emp_name) {
        required += `'Company Name'`;
      }
      if (!emp_address) {
        required += ` 'Company Address'`;
      }

      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }


      const empresa = await EmpresaRepository.update(
        new Empresa(id, emp_name, emp_desc, emp_address, imagePath)
      );

      console.log(empresa);
      const updated = await EmpresaRepository.findById(id);
      // if (Object.keys(newEmpresa).length) {
      if (empresa.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(empresa);
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

      await EmpresaRepository.delete(id);
      response.sendStatus(204);

    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

}

export default new EmpresaController();




