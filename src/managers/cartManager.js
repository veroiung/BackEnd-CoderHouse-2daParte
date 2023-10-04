import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.cart = [];
  }

  _writeProductsToFile = async (carts) => {
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"), "utf-8");
    //return products;
  };
  createCart = async () => {
    let currentCarts = await this.getCart();

    let cartId = 1;
    if (currentCarts.length != 0) {
      cartId = currentCarts[currentCarts.length - 1].id + 1;
    }
    const newCart = {
      id: cartId,
      products: []
    };
    

    currentCarts.push(newCart);

    try {
      await this._writeProductsToFile(currentCarts);
    } catch (error) {
      console.error(`Error al guardar el archivo: ${this.path} - ${error.message}`);
    }
    return newCart.id;

  };

  //lista los carritos
  getCarts = async () => {
    let cartsFromFile = [];
    try {
      const fileContent = await fs.promises.readFile(this.path, "utf-8");
      cartsFromFile = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error al leer el archivo: ${this.path} - ${error.message}`);
    }
    return cartsFromFile;
  };

  //lista los productos de un carrito con id=id
  getProductsOnCart = async (id) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === id);
      //return products.find((product) => product.id === id);
      if (cart) return cart.products
      else return false;
    } catch (error) {
      console.log(error);
    }
  }
  //Agrega un producto a un carrito cid
  addProductToCart = async (cid, pid) => {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id === cid);
      console.log(cart)
      let product = {}

      if (cart) {
        const products = cart.products;
        const indexOfProductToUpdate = products.findIndex((p) => p.id === pid);
        if (indexOfProductToUpdate < 0) {
          product.id = pid;
          product.quantity = 1;
          products.push(product);
        } else {
          product.id = pid;
          product.quantity = products[indexOfProductToUpdate].quantity + 1;
          products[indexOfProductToUpdate] = product;
          console.log(product);
        }
        cart.products = products;
        // Actualizo el carrito
        const indexOfCartToUpdate = carts.findIndex((c) => c.id === cid);
        if (indexOfCartToUpdate < 0) {
          return 'No existe el carrito 01'
        } else {
          carts[indexOfCartToUpdate] = cart;
        }
      } else {
        return 'No existe el carrito 02'
      }
      await this._writeProductsToFile(carts);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}



