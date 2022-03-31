const express = require('express');
const {productDao} = require('../daos/index.js');

const router = express.Router();

router.get('/', async (req, res) => {
	const newProduct = productDao.getAll().then((data) => res.send(data));
});

router.get('/:id', async (req, res) => {
	let id = req.params.id;
	const newProduct = productDao.getById(id).then((data) => res.send(data));
});

router.delete('/:id', async (req, res) => {
	let id = req.params.id;
	const newProduct = productDao.deleteById(id).then((data) => res.send(data));
});

router.post('/', async (req, res) => {
	const product = req.body;
	const newProduct = productDao.createProduct(product).then((data) => res.send(data));
});

router.post('/:id', async (req, res) => {
	let id = req.params.id;
	let product = req.body;
	const newProduct = productDao.updateProductById(id,product).then((data) => res.send(data));
});

module.exports = router;
