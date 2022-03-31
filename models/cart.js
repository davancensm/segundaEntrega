const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
	timestamp: { type: Date, default: Date.now },
	products: Array,
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
