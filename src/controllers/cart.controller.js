import CartServices from "../services/dao/cart.services.js";

//controller create cart
export const creatNewCart = async (req, res)=>{
    try {
        const {body} = req;
    const result = await cartService.createCart(body);
    
    if (CartServices) {
        res.send({ status: "200", message: "Carrito creado con exito con ID: " + result.id , payload: result})
    }
    
    }catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
    } 
};


//controller get CartServices by id
export const searchCart = async (req, res)=>{
    const cid = req.params.cid;
    try {
        const CartServices = await cartService.getCartById({ _id : cid})

        if (CartServices) {
            res.send({ status: 'Success', payload: CartServices });
        } else {
            res.send({ status: '404', message: 'Carrito no encontrado' }); 
        }
    }catch (error) {
        console.error('Error al buscar el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message }); 
    } 
};

export const putProductToCart = async (req, res) => {
    const cid = req.params.cid;
    const { body } = req;
    const pid = body.id;
    try {
        const CartServices = await cartService.prodInCart({_id:cid},{_id:pid})
        if (CartServices) {
            res.send({ status: 'Success', payload: CartServices });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    } 
};

export const deleteProductFromCart = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const CartServices = await cartService.deleteProdInCart({ _id: cid }, { _id: pid });
        if (CartServices) {
            res.send({ status: 'Success', payload: CartServices });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};


export const cleanCart = async (req, res) => {
    const cid = req.params.cid;
    try {
        const CartServices = await cartService.deleteAll({ _id: cid });     
        if (CartServices) {
            res.send({ status: 'Success', payload: CartServices });
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el carrito o producto:', error);
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

