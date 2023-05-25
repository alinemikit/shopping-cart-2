import { Request, Response } from "express"
import Produto from "../models/Produto";
import ProdutoRepository from "../repositories/ProdutoRepository";
import ItemProdutoCategoriaRepository from "../repositories/ItemProdutoCategoriaRepository";
import ItemProdutoCategoria from "../models/ItemProdutoCategoria";

class ProdutoController {
  async index(request: Request, response: Response) {
    // Listar todos os registros
    try {
      const { orderBy } = request.query;
      const produtos = await ProdutoRepository.findAll(orderBy);

      response.status(200).json(produtos);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  async show(request: Request, response: Response) {
    // Obter UM registro
    try {
      const { id } = request.params;
      const produto = await ProdutoRepository.findById(id);

      if (!Object.keys(produto).length) {
        return response.status(404).json({ error: 'Product not found' });
      }

      response.status(200).json(produto);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }

  // async showByMenu(request: Request, response: Response) {
  //   // Obter UM registro
  //   try {
  //     const { id } = request.params;
  //     const produtos = await ProdutoRepository.findByMenu(id);

  //     if (!Object.keys(produtos).length) {
  //       return response.status(404).json({ error: 'Product not found' });
  //     }

  //     response.status(200).json(produtos);
  //   } catch (error) {
  //     console.log(error);
  //     response.sendStatus(500);
  //   }
  // }

  // async showByEmpresa(request: Request, response: Response) {
  //   // Obter UM registro
  //   try {
  //     const { id } = request.params;
  //     const produtos = await ProdutoRepository.findByEmpresa(id);

  //     if (!Object.keys(produtos).length) {
  //       return response.status(404).json({ error: 'Product not found' });
  //     }

  //     response.status(200).json(produtos);
  //   } catch (error) {
  //     console.log(error);
  //     response.sendStatus(500);
  //   }
  // }


  async store(request: Request, response: Response) {
    // Criar novo registro
    try {
      const {
        prod_name, prod_desc, prod_val, menu_id, emp_id, cat_id
      } = request.body;
      const imagePath = request.file?.filename;

      let required = ''
      if (!prod_name) {
        required += `'Product Name'`;
      }
      if (!prod_desc) {
        required += ` 'Product Description'`;
      }
      if (!prod_val) {
        required += ` 'Product Value'`;
      }
      // if (!menu_id) {
      //   required += ` 'Product Menu'`;
      // }
      // if (!emp_id) {
      //   required += ` 'Product Company'`;
      // }
      // if (!prod_image) {
      //   required += ` 'Product Image'`;
      // }

      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }

      const produto = await ProdutoRepository.create(
        new Produto('', prod_name, prod_desc, prod_val, imagePath, cat_id)
      );

      // console.log(produto);
      const newProduto = await ProdutoRepository.findById(produto[1]);
      if (Object.keys(newProduto).length) {
        const prodCat = await ItemProdutoCategoriaRepository.create(new ItemProdutoCategoria(newProduto[0].prod_id, cat_id));
        if (Object.keys(prodCat).length) {
          response.status(200).json(newProduto);
        }  else {
            response.status(400).send('Produto não pode ser adicionado, por favor tente novamente!');
          }
      } else {
        response.status(400).send('Produto não pode ser adicionado, por favor tente novamente!');
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
        prod_name, prod_desc, prod_val, menu_id, emp_id, cat_id
      } = request.body;
      const imagePath = request.file?.filename;

      console.log(request.body);

      const produtoById = await ProdutoRepository.findById(id);
      if (!Object.keys(produtoById).length) {
        return response.status(404).json({ error: 'Product not found' });
      }

      let required = ''
      if (!prod_name) {
        required += `'Product Name'`;
      }
      if (!prod_desc) {
        required += ` 'Product Description'`;
      }
      if (!prod_val) {
        required += ` 'Product Value'`;
      }
      // if (!menu_id) {
      //   required += ` 'Product Menu'`;
      // }
      // if (!emp_id) {
      //   required += ` 'Product Company'`;
      // }
      // if (!prod_image) {
      //   required += ` 'Product Image'`;
      // }

      if (required !== '') {
        return response.status(400).json({ error: required + ' is required' });
      }

      const produto = await ProdutoRepository.update(
        new Produto(id, prod_name, prod_desc, prod_val, imagePath, cat_id)
      );

      const updated = await ProdutoRepository.findById(id);
      // if (Object.keys(updated).length) {
      if (produto.affectedRows) {
        response.status(200).json(updated);
      } else {
        response.status(400).send(produto);
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

      const exist = await ItemProdutoCategoriaRepository.findByProd(id);
      if (Object.keys(exist).length){
        await ItemProdutoCategoriaRepository.deleteByProduct(id);
      }

      await ProdutoRepository.delete(id);
      response.sendStatus(204);
    } catch (error) {
      console.log(error);
      response.sendStatus(500);
    }
  }
}

export default new ProdutoController();




