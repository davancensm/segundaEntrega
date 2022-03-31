const dbToUse = 'mongo';

let productDao;
let cartDao;

switch (dbToUse) {
	case 'mongo':
		// const connectToDb = require('../db/mongoConn')
		const MongoProductDao = require('./products/mongoProducts');
		const MongoCartDao = require('./carts/mongoCarts');
		// connectToDb().catch((e) => console.log(e));
		productDao = new MongoProductDao();
		cartDao = new MongoCartDao();
		break;
	case 'fs':
		const fsProducts = require('./products/fsProducts');
		const fsCarts = require('./carts/fsCarts');
		productDao = new fsProducts();
		cartDao = new fsCarts();
		break;
	default:
		break;
}

module.exports = {productDao,cartDao}