import { Router } from "express";
import { authToken } from '../utils.js'

const routerU = Router();

routerU.get("/login", (req, res) => {
    res.render('login')
});

routerU.get("/register", (req, res) => {
    res.render('register')
});

// Cuando ya tenemos una session activa con los datos del user, renderizamos la vista profile
//routerU.get("/", (req, res) => {
//    res.render('profile', {
//        user: req.session.user
//    })
//});

routerU.get("/", authToken, (req, res) => {
    res.render("profile", {
        user: req.user
    });
});

routerU.get("/error", (req, res)=>{
    res.render("error");
});


export default routerU;