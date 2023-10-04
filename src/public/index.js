const socketClient = io()

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputStock = document.getElementById('stock');
const inputCode = document.getElementById('code');

form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const code = inputCode.value;
    socketClient.emit('newProduct', {title, description, price, stock, code});
}

socketClient.on('reloadProducts', (products)=>{
    let producto = document.getElementById('products')
    let infoProducts = '';
    products.forEach((prod) =>{
        infoProducts += `${prod.title} - ${prod.description} - ${prod.price} - ${prod.code} - ${prod.stock} </br>`
    })
    producto.innerHTML = infoProducts

})