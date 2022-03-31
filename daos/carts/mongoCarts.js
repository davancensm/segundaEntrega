const MongoContainer = require('../../contenedor/mongoContainer');
const Cart = require('../../models/cart');

class MongoCartDao {
	
	cartManager = new MongoContainer(Cart);

	async getAll() {
		return await this.cartManager.getAll();
	}

	async getById(id) {
        return await this.cartManager.getById(id);
    }

	async getProductsByCartId(id) {
        return await this.cartManager.getProductsByCartId(id);
    }

	async deleteById(id) {
        return await this.cartManager.deleteById(id);
    }       
    
    async addProductToCartById(id,product) {
    	return await this.cartManager.addProductToCartById(id,product);
    }

    async deleteProductInCartById(id,product){
        return await this.cartManager.deleteProductInCartById(id,product);
    }

	async createCart(Cart) {
		return await this.cartManager.createCart(Cart);
	}
}


module.exports = MongoCartDao; // Singleton
