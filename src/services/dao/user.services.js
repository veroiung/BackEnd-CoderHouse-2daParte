
import userModel from "./models/userModel.js";
import {ProductModel }from "./models/productModel.js";
import { createHash } from '../../../utils.js';
import { isValidPassword } from '../../../utils.js';
import { generateToken } from '../../../utils.js';
import envConfig from '../../../config/env.config.js';

const PORT = envConfig.port;

export default class UserService {

    getAll = async () => {
        let users = await userModel.find();
        return users.map(user => user.toObject());
    };

    save = async (user) => {    
    const exists = await userModel.findOne({ email:user.email });
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    };
        user.password = createHash(user.password);
        let result = await userModel.create(user);
        return result
    };


    login = async (email, password, res) => {
            const exists = await userModel.findOne({ email });
            if (!exists) {
                return console.log("Usuario no encontrado");
                }
            if (!isValidPassword(exists, password)) {
                return console.log("Los datos ingresados son incorrectos");
            }
            const tokenUser = {
                name: `${exists.first_name} ${exists.last_name}`,
                email: exists.email,
                role: exists.role,
            };
            const accessToken = generateToken(tokenUser);
            //Cookies
            res.cookie('jwtCookieToken', accessToken, {
                maxAge: 60000,  
                httpOnly: true, // no expone la cookie cuando esta en true
            })
    };


    logout = async (cookieName, res) => {
        res.clearCookie(cookieName);
        return res.send({ message: 'Logout exitoso' });
    };
    
    gitHubLogin = async (user, res) => {
        const tokenUser = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role,
        };
        const accessToken = generateToken(tokenUser)
        res.cookie('jwtCookieToken', accessToken, {
            maxAge: 60000,  
            httpOnly: true,
        })
    
        res.redirect('/users');
    };

    loginShowProducts = async (page, req ,res) => {
        let result = await ProductModel.paginate({}, {page, lean: true });
            let prevLink = result.hasPrevPage ? `http://localhost:${PORT}/users?page=${result.prevPage}` : '';
            let nextLink = result.hasNextPage ? `http://localhost:${PORT}/users?page=${result.nextPage}` : '';
            let isValid = !(result.page <= 0 || result.page > result.totalPages)
    
            return res.render('profile', {user: req.user,  result, prevLink, nextLink, isValid })            
    };

}



    /*     findByUsername = async (userName) => {
        let result = await userModel.findOne({ userName });
        return result;
    }; */

/*     update = async (filter, value) => {
        let result = await userModel.updateOne(filter, value);
        return result;
    }; */



