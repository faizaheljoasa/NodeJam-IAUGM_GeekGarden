const express = require('express');

const productController = require('../controllers/product.controller');
const authenticate = require('../middlewares/authenticate');
const productRouter = express.Router();

productRouter.get('/product', authenticate, productController.get);
productRouter.post('/product', authenticate, productController.post);
productRouter.put('/product/:id', authenticate, productController.put);
productRouter.delete('/product/:id', authenticate, productController.delete);

module.exports = productRouter;
