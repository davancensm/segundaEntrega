const express = require('express');
const {cartDao} = require('../daos/index.js');

const router = express.Router();

router.post('/', (req,res) => {
    const cart = cartDao.createCart().then((data) => res.send(data));
})

router.delete('/:id', (req,res) => {
    let id= req.params;
    const cart = cartDao.deleteById(id).then((data) => res.send(data));
})

router.get('/', (req,res) => {
    const cart = cartDao.getAll().then((data) => res.send(data));
})

router.get('/:id', async (req, res) => {
	let id = req.params.id;
	const cart = cartDao.getById(id).then((data) => res.send(data));
});

router.get('/:id/products', (req,res) =>{
    let id= req.params.id;
    const cart = cartDao.getProductsByCartId(id).then((data) => res.send(data));
})

router.post('/:id/products', (req,res) => {
    let product = req.body.id;
    let id= req.params.id;
    const addProductToCartById = cartDao.addProductToCartById(id,product).then((data) => res.send(data));
})

router.delete('/:id/products/:idProd', (req,res) => {
    let id = req.params.id;
    let product = req.params.idProd;
    console.log(product);
    const deleteProductInCartById = cartDao.deleteProductInCartById(id,product).then((data) => res.send(data));
})

module.exports = router;