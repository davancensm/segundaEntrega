const FsContainer = require('../../contenedor/fsContainer');
const path = require('path')
const productsPath = path.join('files', 'carts.json')

class FsProductDao {
    cartManager = new FsContainer(productsPath);

    async getAll() {
        return await this.cartManager.getAll();
    }

    async getById(id) {
        id = parseInt(id);
        return await this.cartManager.getById(id);
    }

    async getProductsByCartId(id) {
        id = parseInt(id);
        return await this.cartManager.getProductsByCartId(id);
    }

    async deleteById(id) {
        id = parseInt(id);
        return await this.cartManager.deleteById(id);
    }       
    
    async addProductToCartById(id,product) {
        product = parseInt(product);
        id = parseInt(id);
    	return await this.cartManager.addProductToCartById(id,product);
    }

    async deleteProductInCartById(id,product){
        product = parseInt(product);
        id = parseInt(id);
        return await this.cartManager.deleteProductInCartById(id,product);
    }
    
    async createCart() {
        return await this.cartManager.createCart();
    }
}
module.exports = FsProductDao;