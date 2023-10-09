import { Router } from "express";
/* import {ProductModel} from "../../services/db/models/productModel.js"; */
import passport from "passport";
/* import envConfig from '../../config/env.config.js'; */
import {logAuthenticate} from '../controllers/user.controller.js'

const router = Router();
/* const PORT = envConfig.port; */

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/register", (req, res) => {
    res.render('register')
});



// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
router.get("/", passport.authenticate('jwt', { session: true}), logAuthenticate/* async (req, res) => {
    let page = parseInt(req.query.page);
        if (!page) page = 1;
        let result = await ProductModel.paginate({}, {page, lean: true })
        let prevLink = result.hasPrevPage ? `http://localhost:${PORT}/users?page=${result.prevPage}` : '';
        let nextLink = result.hasNextPage ? `http://localhost:${PORT}/users?page=${result.nextPage}` : '';
        let isValid = !(result.page <= 0 || result.page > result.totalPages)

        res.render('profile', {user: req.user,  result, prevLink, nextLink, isValid })
} */);

export default router;