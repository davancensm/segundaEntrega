require('dotenv').config();
const { mongoose } = require('mongoose');

// connección a la base de datos
mongoose.connect(
	process.env.MONGOURL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongoDB');
});


class MongoContainer {
	constructor(model) {
		this.model = model;
	}

	async getAll() {
		return await this.model.find();
	}

	async getById(id) {
		return await this.model.find({_id:id});
	}

	async getProductsByCartId(id) {
		let productsInCart = await this.model.find({_id:id});
		return productsInCart[0].products;
	}

	async deleteById(id) {
		return await this.model.deleteOne({_id:id});
	}

	async createProduct(element) {
		return await this.model.create(element);
	}
	
	async createCart(element) {
		return await this.model.create(element);
	}

	async addProductToCartById(id,product) {
		return await this.model.updateOne({_id:id},{$push:{products:product}});
	}

	async deleteProductInCartById(id,product){
        return await this.model.updateOne({_id:id},{$pull:{products:product}});
    }

	async updateProductById(id,product) {
		return await this.model.replaceOne({_id:id},product);
	}

}


module.exports = MongoContainer;
