import ProductService from "../services/dao/product.services.js";



export const createProduct = async (req, res) => {
    const { body } = req;
    try {
        const response = await ProductService.createProduct(body);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getProducts = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const filter = req.query.filter === 'false' ? false : true;
    try {
        const response = await ProductService.getAllProducts(limit, page, sort, filter);
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const getProdById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const response = await ProductService.getById({ _id: pid });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const updateProdById = async (req, res) => {
    const pid = req.params.pid;
    const { body } = req;
    try {
        const response = await ProductService.update({ _id: pid }, { ...body });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

export const deleteProdById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const response = await ProductService.delete({ _id: pid });
        res.send({ status: 'Success', payload: response });
    } catch (error) {
        res.status(400).json(error.message);
    }
};

