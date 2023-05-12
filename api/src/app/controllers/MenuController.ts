import { Request, Response } from "express"
import Menu from "../models/Menu";
import MenuRepository from "../repositories/MenuRepository";
import ProdutoRepository from "../repositories/ProdutoRepository";

class MenuController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const menu = await MenuRepository.findAll(orderBy);

      response.status(200).json(menu);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const menu = await MenuRepository.findById(id);

      if (!Object.keys(menu).length) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json(menu);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        menu_name
      } = request.body;

      if (!menu_name) {
        return response.status(400).json({ error: 'Menu name is required' });
      }

      const menu = await MenuRepository.create(
        new Menu('', menu_name)
      );

      const newMenu = await MenuRepository.findById(menu[1]);
      if (Object.keys(newMenu).length) {
        response.status(200).json(newMenu);
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
        menu_name
      } = request.body;

      if (!menu_name) {
        return response.status(400).json({ error: 'Menu name is required' });
      }

      const menu = await MenuRepository.update(
        new Menu(id, menu_name)
      );

      const updated = await MenuRepository.findById(id);
      // if (Object.keys(updated).length) {
      if (menu.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(menu);
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

      const produtoExists = await ProdutoRepository.findByMenu(id);

      if (Object.keys(produtoExists).length) {
        response.status(400).send('Há produtos cadastrados nesse menu, não pode ser deletada!');
      } else {
        await MenuRepository.delete(id);
        response.sendStatus(204);
      }
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async showByEmpresa(request: Request, response: Response) {
    //show menu by empresa
    try {
      const { id } = request.params;
      const menu = await MenuRepository.findByEmpresa(id);

      if (!Object.keys(menu).length) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json(menu);

    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async showItemsMenu(request: Request, response: Response) {
    //show items do menu
    try {
      const { id, id2 } = request.params;
      const items = await MenuRepository.findItemsMenu(id, id2);

      if (!Object.keys(items).length) {
        return response.status(404).json({ error: 'Category not found' });
      }

      response.status(200).json(items);

    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new MenuController();





