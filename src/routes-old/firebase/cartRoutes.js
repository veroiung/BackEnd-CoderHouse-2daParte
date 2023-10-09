import { Router } from 'express';
const router = Router();
import CartManager from "../managers/cartManager.js";
const carts = new CartManager("./src/db/carts.json");

router.post('/', async (req, res) => {
    const cart = await carts.createCart();
    res.status(200).json(cart);
})

router.post('/:cid/:pid', async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = parseInt(req.params.pid);
    const cart = await carts.addProductToCart(cartId, productId);
    res.status(200).json(cart);
})

router.get('/', async (req, res) => {
    const listCart = await carts.getCarts();
    res.status(200).json(listCart);
})

router.get('/:cid', async (req, res) => {
    let param = req.params.cid
    if (isNaN(param)) return (res.status(400).send({
        error: "No es un numero"
    }))
    let id = parseInt(param)
    let products = await carts.getProductsOnCart(id)

    /*let cartProducts = []
    await Promise.all(productsId.map(async (products) => {
        let newProduct = await ProductService.getById(products)
        cartProducts.push(newProduct)
    }))*/
    res.send(products)
})

export default router;