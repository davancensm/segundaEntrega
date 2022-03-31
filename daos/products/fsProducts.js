const FsContainer = require('../../contenedor/fsContainer');
// const productsPath = '../files/productos.json';
const path = require('path')
const productsPath = path.join('files', 'productos.json')

class FsProductDao {
    productManager = new FsContainer(productsPath);

    async getAll() {
        return await this.productManager.getAll();
    }

    async getById(id) {
        id = parseInt(id);
        return await this.productManager.getById(id);
    }

    async deleteById(id) {
        id = parseInt(id);
        return await this.productManager.deleteById(id);
    }

    async createProduct(product){
        return await this.productManager.createProduct(product);
    } 

    async updateProductById(id,product){
        id = parseInt(id);
        return await this.productManager.updateProductById(id,product);
    }
}

module.exports = FsProductDao;