import express from 'express';
import { creatNewCart, searchCart, putProductToCart, deleteProductFromCart, cleanCart } from '../controllers/cart.controller.js';

const router = express.Router();

//Creamos un carrito
router.post('/', creatNewCart);

// Buscamos el carrito de compra especifico
router.get ('/:cid', searchCart);

//Agregamos un producto especifico al carrito
router.put('/:cid/products', putProductToCart);

//Bajamos la cantidad de un producto especifico al carrito o lo eliminamos en el caso de solo quedar uno
router.delete('/:cid/products/:pid', deleteProductFromCart);

//limipamos el carrito de compras
router.put('/:cid/clean', cleanCart);


export default router;