import { Request, Response } from 'express'
import Categoria from '../models/Categoria';
import CategoriaRepository from '../repositories/CategoriaRepository';
import ItemEmpresaCategoriaRepository from '../repositories/ItemEmpresaCategoriaRepository';
import ItemEmpresaCategoriaController from './ItemEmpresaCategoriaController';
import ItemProdutoCategoriaRepository from '../repositories/ItemProdutoCategoriaRepository';

class CategoriaController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const categorias = await CategoriaRepository.findAll(orderBy);

      response.status(200).json(categorias);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const categoria = await CategoriaRepository.findById(id);

      if (!Object.keys(categoria).length) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json(categoria);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        cat_name
      } = request.body;
      const imagePath = request.file?.filename;

      if (!cat_name) {
        return response.status(400).json({ error: 'Category Name is required' });
      }

      const categoria = await CategoriaRepository.create(
        new Categoria('', cat_name, imagePath)
      );

      const newCategoria = await CategoriaRepository.findById(categoria[1]);
      if (Object.keys(newCategoria).length) {
        response.status(200).json(newCategoria);
      } else {
        response.status(400).send('Categoria não pode ser adicionada, por favor tente novamente!');
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
        cat_name
      } = request.body;
      const imagePath = request.file?.filename;

      // if (!cat_name) {
      //   return response.status(400).json({ error: 'Category Name is required' });
      // }

      const categoria = await CategoriaRepository.update(
        new Categoria(id, cat_name, imagePath)
      );

      console.log(categoria);
      const updated = await CategoriaRepository.findById(id);
      // if (Object.keys(updated).length) {
      if (categoria.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(categoria);
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

    //   const empresaExists = await ItemEmpresaCategoriaRepository.findByCategoria(id);

    //   if (Object.keys(empresaExists).length) {
    //     response.status(400).send('Há empresas cadastradas nessa categoria, não pode ser deletada!');
    //   } else {
    //     await CategoriaRepository.delete(id);
    //     response.sendStatus(204);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   response.sendStatus(500);
    // }

    const exist = await ItemProdutoCategoriaRepository.findByCat(id);
      if (Object.keys(exist).length){
        await ItemProdutoCategoriaRepository.deleteByCategory(id);
      }

      await CategoriaRepository.delete(id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new CategoriaController();





