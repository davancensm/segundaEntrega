const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductsSchema = new Schema({
	title: String, 
	price: Number,
	thumbnail: String,
	code: Number,
	description: String,
	stock: Number,
});

const Product = mongoose.model('Product', ProductsSchema);

module.exports = Product;
