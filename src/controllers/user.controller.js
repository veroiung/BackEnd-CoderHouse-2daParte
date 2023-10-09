import userService from '../services/dao/user.services.js';

/* const services = new userService(); */

// controller registro por formulario
export  const  registerController = async (req, res) => {
    const { first_name, last_name, email, age, password} = req.body;
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    };
    const result = await services.save(user);
    res.send({ status: "200", message: "Usuario creado con exito con ID: " + result.id });
}

//controler login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.login(email, password, res);    
        return res.status(200).send({message: "Usuario logueado con exito" });
    
    } catch (error) {
        return res.status(500).send({ status: 'error', message: "Error interno de la aplicacion, controller" })
    }
}

export const logAuthenticate = async (req, res) => {
    let page = parseInt(req.query.page);
        if (!page) page = 1;
        await userService.loginShowProducts(page, req, res)       
};

//controler login github
export const gitHubCallbackController = async (req, res) => {
    const user = req.user;
    await userService.gitHubLogin(user, res);
}

//controler logout
export const logoutController = async (req, res) => {
    await userService.logout('jwtCookieToken', res);   
    }