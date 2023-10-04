import express from 'express';
import { engine } from "express-handlebars"
import * as path from "path";
import __dirname from "./utils.js";
import { Server } from "socket.io";


// dependencias para las sessions
//import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
//import mongoose from 'mongoose';
import session from 'express-session';

//Passport imports
import passport from 'passport';
import initializePassport from './config/passport.config.js';


//import Routers
import routerP from './routes/productsRoutes.js';
import routerC from './routes/cartsRoutes.js';
import routerV from './routes/viewsRoutes.js';
import routerS from './routes/sessionsRoutes.js';
import routerU from './routes/usersRoutes.js';

import githubLoginViewRouter from './routes/github-login.views.router.js'

//import ProductManager from "./managers/productManager.js";

//import productRoutes from './routes/productsRoutes.js';
//import cartRoutes from './routes/cartRoutes.js';



import connectToDB from "./config/configServer.js"



const app = express();
//const productManager = new ProductManager("./src/db/products.json");


//JSON settings:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Configuraciones handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

//Routers
app.use('/api/products', routerP)
app.use('/api/carts', routerC)
app.use('/', routerV);
app.use('/users', routerU);
app.use('/api/sessions', routerS);

app.use("/github", githubLoginViewRouter);


const PORT = 8080;

connectToDB()

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
    }
    catch (err) {
        console.log(err);
    }
});

const socketServer = new Server(httpServer);

//Conectamos nuestra session con el file storage.
// const fileStorage = FileStore(session);

const MONGO_URL = "mongodb+srv://VeroIung:coder2023@cluster0.fctujru.mongodb.net/sessions?retryWrites=true&w=majority";

/*=============================================
=                   session                   =
=============================================*/
app.use(session({

     //ttl: Time to live in seconds,
    //retries: Reintentos para que el servidor lea el archivo del storage.
    //path: Ruta a donde se buscará el archivo del session store.
    
    // Usando --> session-file-store
    // const fileStorageOptions = { 
        // store: new fileStorage({ 
        //path: "./sessions", 
        //ttl: 15, 
        //retries: 0 
        //}),
        //secret: 'xxxx',
        //reserve: false,
        //saveUninitialized: false,
        //coockie: {
        //maxAge: 6000
        //}
    //};

    // Usando --> connect-mongo
    store: MongoStore.create({
         mongoUrl: MONGO_URL,
    //     //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
         ttl: 30
    }),

    secret: "coderS3cr3t",
    resave: false, //guarda en memoria
    saveUninitialized: true, //lo guarda a penas se crea
}));


// app.get("/", async (req, res) => {
//  let allProducts = await productManager.getProducts()
//  res.render("home", {
//     title: "Handlebars",
//     products : allProducts

//  })
// })

// app.get("/realTimeProducts/", async (req, res) => {
//  let allProducts = await productManager.getProducts()
//  res.render("realTimeProducts", {
//     title: "Carga de Productos",
//     products : allProducts
//  })
// })

// app.get("/input/", async (req, res) => {
//     let form = await productManager.getProducts()
//     res.render("websocket", {
//        title: "Carga de Productos",
//        products : form
//     })
//    })


// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);


socketServer.on('connection', async (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado`);
    })

    socket.emit('reloadProducts', await productManager.getProducts());

    socket.on('respuesta', (message) =>{
        console.log(message);
    });

    socket.on('newProduct', async (obj) =>{
    await productManager.addProduct(obj);
    socketServer.emit('reloadProducts', await productManager.getProducts());
})

})

//TODO: Middlewares Passport
initializePassport();
app.use(passport.initialize())
app.use(passport.session())







