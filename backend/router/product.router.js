const Router = require('express')
const productRouter = new Router()
const productsController = require('../controllers/product.controller')

productRouter.post('/', productsController.createProduct)
productRouter.get('/', productsController.getProducts)
productRouter.get('/:id', productsController.getProduct)
productRouter.put('/:id', productsController.updateProduct)
productRouter.delete('/:id', productsController.deleteProduct)

module.exports = productRouter