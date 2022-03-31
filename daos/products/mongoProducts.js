const MongoContainer = require('../../contenedor/mongoContainer');
const Product = require('../../models/product');

class MongoProductDao {
	
	productManager = new MongoContainer(Product);

	async getAll() {
		return await this.productManager.getAll();
	}

	async getById(id) {
        return await this.productManager.getById(id);
    }

    async deleteById(id) {
        return await this.productManager.deleteById(id);
    }

    async createProduct(product){
        return await this.productManager.createProduct(product);
    } 

    async updateProductById(id,product){
        return await this.productManager.updateProductById(id,product);
    }
}

module.exports = MongoProductDao; // Singleton
