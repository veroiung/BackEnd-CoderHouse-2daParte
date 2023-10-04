import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  _writeProductsToFile = async (products) => {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");
    //return products;
  };

  addProduct = async (product) => {
    let currentProducts = await this.getProducts();

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todo los datos son necesarios");
      return;
    }
    if (!product.thumbnail){
      product.thumbnail=null;
    }

    if (currentProducts.some((p) => p.code === product.code)) {
      console.log(`El producto con el código: ${product.code} ya existe`);
      return;
    }

    let productId = 1;

    if (currentProducts.length != 0) {
      productId = currentProducts[currentProducts.length - 1].id + 1;
    }
    const newProducto = { ...product, id: productId };

    currentProducts.push(newProducto);

    try {
      await this._writeProductsToFile(currentProducts);
    } catch (error) {
      console.error(`Error al guardar el archivo: ${this.path} - ${error.message}`);
    }

    return newProducto;
  }

  getProducts = async () => {
    let productsFromFile = [];
    try {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      productsFromFile = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error al leer el archivo: ${this.path} - ${error.message}`);
    }
    return productsFromFile;
  };

  getProductById = async (id) => {
    try{
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    //return products.find((product) => product.id === id);
    if(product) return product
    else return false;
  } catch (error){
    console.log(error);
  }
}

  updateProduct = async (updateProduct, id) =>{
    const updateArray = await this.getProducts();
    const indexOfProductToUpdate = updateArray.findIndex((p) => p.id === id);

    if (indexOfProductToUpdate < 0) {
      console.error(`No se encuentra el producto que se quiere actualizar: id: ${updateProduct.id}`);
      return;
    }
    updateProduct.id = id
    updateArray[indexOfProductToUpdate] = updateProduct;

    try {
      await this._writeProductsToFile(updateArray);
    } catch (error) {
      console.error(`Error al actualizar el archivo: ${this.path} - ${error.message}`);
    }

    return updateProduct;
  }

  removeProduct = async (id) => {
    const arrayToUpdate = await this.getProducts();
    const indexOfProductToDelete = arrayToUpdate.findIndex((p) => p.id === id);

    if (indexOfProductToDelete < 0) {
      console.error(`No se encuentra el archivo que se quiere borar: id: ${id}`);
      return;
    }

    arrayToUpdate.splice(indexOfProductToDelete, 1);

    try {
      await this._writeProductsToFile(arrayToUpdate);
    } catch (error) {
      console.error(`Error al escribir el archivo: ${this.path} - ${error.message}`);
    }

    return arrayToUpdate;
  };
}