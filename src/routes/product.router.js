import express from 'express';

import { createProduct, getProducts, getProdById, updateProdById, deleteProdById  } from '../controllers/product.controller.js';

const router = express.Router();

//Crear Producto
router.post('/', createProduct );

//Obtener todos los productos
router.get('/', getProducts);

//Producto por ID
router.get('/:pid', getProdById );

//Subir producto por ID
router.put('/:pid', updateProdById );

//Borrar producto por ID
router.delete('/:pid', deleteProdById );


export default router;