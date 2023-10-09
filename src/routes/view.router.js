import express from 'express';
import {productsModel} from '../services/dao/models/products.model.js'
import {cartModel} from '../services/dao/models/carts.model.js';
import envConfig from '../config/env.config.js';

const router = express.Router();
const PORT = envConfig.port;

router.get('/', async (req, res) => {
        let page = parseInt(req.query.page);
        if (!page) page = 1;
        let resultProd = await productsModel.paginate({}, {page, lean: true })
        let prevLink = resultProd.hasPrevPage ? `http://localhost:${PORT}/products?page=${resultProd.prevPage}` : '';
        let nextLink = resultProd.hasNextPage ? `http://localhost:${PORT}/products?page=${resultProd.nextPage}` : '';
        let isValid = !(resultProd.page <= 0 || resultProd.page > resultProd.totalPages)
        res.render('products', { resultProd, prevLink, nextLink, isValid })
});

router.get('/:cid', async (req, res) => {
        let cid = req.params.cid;
        let page = parseInt(req.query.page);
        if (!page) page = 1;

        const cartProducts= await cartModel.paginate({_id : cid},{page, lean: true, populate: {path : 'products.product'}  })

        if (!cartProducts) {
                return res.status(404).send('Carrito no encontrado');
        }

        let prevLink = cartProducts.hasPrevPage ? `http://localhost:${PORT}/carts?page=${cartProducts.prevPage}` : '';
        let nextLink = cartProducts.hasNextPage ? `http://localhost:${PORT}/carts?page=${cartProducts.nextPage}` : '';
        let isValid = !(cartProducts.page <= 0 || cartProducts.page > cartProducts.totalPages)
        res.render('carts', { cartProducts, prevLink, nextLink, isValid })
});

export default router;