import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import UsuarioController from './app/controllers/UsuarioController';
import ProdutoController from './app/controllers/ProdutoController';
import CategoriaController from './app/controllers/CategoriaController';
import CompraController from './app/controllers/CompraController';
import ItemCompraController from './app/controllers/ItemCompraController';
import ItemProdutoCategoriaController from './app/controllers/ItemProdutoCategoriaController';
// import EmpresaController from './app/controllers/EmpresaController';
// import MenuController from './app/controllers/MenuController';
// import ItemEmpresaCategoriaController from './app/controllers/ItemEmpresaCategoriaController';

export const router = Router();

// armazenamento
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// User routes
router.get('/usuario', UsuarioController.index);
router.get('/usuario/:id', UsuarioController.show);
router.post('/usuario', UsuarioController.store);
router.put('/usuario/:id', UsuarioController.update);
router.delete('/usuario/:id', UsuarioController.delete);

// Produto routes
router.get('/produto', ProdutoController.index);
router.get('/produto/:id', ProdutoController.show);
// router.get('/produto/menu/:id', ProdutoController.showByMenu);
router.post('/produto', upload.single('prod_image'), ProdutoController.store);
router.put('/produto/:id', upload.single('prod_image'), ProdutoController.update);
router.delete('/produto/:id', ProdutoController.delete);
// router.get('/prodemp/:id', ProdutoController.showByEmpresa);

// Compra routes
router.get('/compra', CompraController.index);
router.get('/compra/:id', CompraController.show);
router.post('/compra', CompraController.store);
router.put('/compra/:id', CompraController.update);
router.delete('/compra/:id', CompraController.delete);

// ItemCompra routes
router.get('/itemCompra', ItemCompraController.index);
router.post('/itemCompra', ItemCompraController.store);
router.get('/itemCompra/:id', ItemCompraController.showByCompra);
router.put('/itemCompra', ItemCompraController.update);
router.delete('/itemCompra/', ItemCompraController.delete);

// Categoria routes
router.get('/categoria', CategoriaController.index);
router.get('/categoria/:id', CategoriaController.show);
router.post('/categoria', upload.single('cat_image'), CategoriaController.store);
router.put('/categoria/:id', upload.single('cat_image'), CategoriaController.update);
router.delete('/categoria/:id', CategoriaController.delete);

// Empresa routes
// router.get('/empresa', EmpresaController.index);
// router.get('/empresa/:id', EmpresaController.show);
// router.post('/empresa', upload.single('emp_image'), EmpresaController.store);
// router.put('/empresa/:id',upload.single('emp_image'), EmpresaController.update);
// router.delete('/empresa/:id', EmpresaController.delete);

// Menu routes
// router.get('/menu', MenuController.index);
// router.get('/menu/:id', MenuController.show);
// router.post('/menu', MenuController.store);
// router.put('/menu/:id', MenuController.update);
// router.delete('/menu/:id', MenuController.delete);
// router.get('/menuemp/:id', MenuController.showByEmpresa);
// router.get('/menuemp/:id/:id2', MenuController.showItemsMenu);

// ItemEmpresaCategoria routes
// router.get('/itemEmpCat', ItemEmpresaCategoriaController.index);
// router.post('/itemEmpCat', ItemEmpresaCategoriaController.store);
// router.get('/itemEmpCat/:id', ItemEmpresaCategoriaController.showByCategoria);
// // router.put('/itemEmpCat', ItemEmpresaCategoriaController.update);
// router.delete('/itemEmpCat/', ItemEmpresaCategoriaController.delete);

// ItemProdutoCategoria routes
router.get('/itemProdCat', ItemProdutoCategoriaController.index);
router.post('/itemProdCat', ItemProdutoCategoriaController.store);
router.get('/itemProdCat/:id', ItemProdutoCategoriaController.showByCategoria);
router.delete('/itemProdCat/', ItemProdutoCategoriaController.delete);
