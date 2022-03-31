const fs = require('fs');

class fsContainer {
    constructor(file) {
        this.filename = file;
    }

    readElements = async () =>{
        let data = await fs.promises.readFile(this.filename,'utf-8');
        let elements = JSON.parse(data);
        return elements;
    }

    getAll = async () => {
        if(fs.existsSync(this.filename)){
            let elements = await this.readElements();
            return {status:"success",elements:elements}
        }
    }

    getById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
           let elements = await this.readElements();
           console.log(elements);
           let element = elements.find(p => p.id === id);
           if(element) return {status:"success",element:element}
           else return {status:"error", error:"element not found"}
        }
    }

    getProductsByCartId = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
           let carts = await this.readElements();
           let cart = carts.find(p => p.id === id);
           if(cart) return {status:"success",products:cart.products}
           else return {status:"error", error:"Cart not found"}
        }
    }

    deleteById = async (id) => {
        if(!id) return {status:"error", error:"ID needed"}
        if(fs.existsSync(this.filename)){
            let elements = await this.readElements();
            console.log(elements)
            let element = elements.find(p => p.id === id);
            if(element) {
                elements.splice(element.id-1,1);
                await fs.promises.writeFile(this.filename,JSON.stringify(elements,null,2))
                return {status:"success",message:"Element deleted"}
            }
            else return {status:"error", error:"Element not found"}
        }
    }

    createCart = async() => {
        try{
            if(fs.existsSync(this.filename)){//El archivo existe
                let carts = await this.getAll();
                carts = carts.elements;
                let id = carts[(carts.length)-1].id+1;
                let cart = {
                    "id" : id,
                    "timestamp" : Date.now(),
                    "products" : []
                };
                carts.push(cart);
                console.log(cart)
                console.log(carts)
                await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }else{//El archivo no existe.
                let cart = {
                    "id" : 1,
                    "timestamp" : Date.now(),
                    "products" : []
                };
                await fs.promises.writeFile(this.filename,JSON.stringify([cart],null,2));
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }
        }catch(error){
            return {status:"error",message:error}
        }   
    }

    addProductToCartById = async (id,product) => {
        if(!id || !product) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
           let carts = await this.readElements();
           let cart = carts.findIndex(p => p.id === id);
           carts[cart].products.push(product);
           await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
           return {status:"success",message: `product added to Cart ID ${carts[cart].id}`}
        }
    }

    deleteProductInCartById = async (cart,product) => {
        if(!product || !cart) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
            let carts = await this.readElements();
            let cartIndex = carts.findIndex(c => c.id === cart);
            let productIndex = carts[cartIndex].products.findIndex(p => p === product);
            if(cartIndex >= 0 || productIndex >= 0)
            {
                carts[cartIndex].products.splice(productIndex,1);
                await fs.promises.writeFile(this.filename,JSON.stringify(carts,null,2))
                return {status:"success",message:`Product ${product} inside cart ${cart} deleted`}
            }
            else return {status:"error", error:"Cart/Product not found"}
        }
    }

    createProduct = async (producto) => {
        // Valido que el producto venga con todos los campos.
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.price || !producto.thumbnail) return {status:"error", error:"missing field"}
        try{
            if(fs.existsSync(this.filename)){//El archivo existe
                let products = await this.readElements();
                let id = products[products.length-1].id+1;
                producto.id = id;
                producto.timestamp = Date.now();
                products.push(producto);
                await fs.promises.writeFile(this.filename,JSON.stringify(products,null,2))
                return {status:"success",message:"Product created"}
            }else{//El archivo no existe.
                producto.id = 1;
                console.log("entro al else");
                await fs.promises.writeFile(this.filename,JSON.stringify([producto],null,2));
                return {status:"success",message:"Product created"}
            }
        }catch(error){
            return {status:"error",message:error}
        }
        
    }

    updateProductById = async (id,producto) => {
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.price || !producto.thumbnail) return {status:"error", error:"missing field"}
        if(fs.existsSync(this.filename)){
            let products = await this.readElements();
            let product = products.findIndex(p => p.id === id);
            console.log(product);
            if(product<=0) {
                products[product].title = producto.title;
                products[product].price = producto.price;
                products[product].code = producto.code;
                products[product].description = producto.description;
                products[product].stock = producto.stock;
                products[product].thumbnail = producto.thumbnail;
                await fs.promises.writeFile(this.filename,JSON.stringify(products,null,2))
                return {status:"success",message:"Product Modified"}
            }
            else return {status:"error", error:"Product not found"}
        }
    }
}
    


module.exports = fsContainer;