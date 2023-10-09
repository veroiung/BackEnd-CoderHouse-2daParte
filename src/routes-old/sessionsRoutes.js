import { Router } from 'express';
//import userModel from '../models/user.model.js';
import passport from 'passport';
import { generateJWToken } from '../utils.js'

const routerS = Router();

// TODO: Router github
routerS.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });


// githubcallback
routerS.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/users");
});


routerS.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con éxtito." })

})

routerS.post("/login", passport.authenticate("login", { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);

    if (!user) return res.status(401).send({ status: "error", error: "credenciales incorrectas" });
    //req.session.user = {
    //   name: `${user.first_name} ${user.last_name}`,
    //    email: user.email,
    //    age: user.age
    //}
    //res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });

        // JWT
        const access_token = generateJWToken(user);
        console.log(access_token);
        res.send({ access_token: access_token });
});



routerS.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

routerS.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default routerS;