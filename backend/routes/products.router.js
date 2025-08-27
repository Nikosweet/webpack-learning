const Router = require('express')
const router = new Router()
const productsController = require('../controllers/products.controller')

router.post('/product', productsController.createProduct)
router.get('/product', productsController.getProducts)
router.get('/product/:id', productsController.getProduct)
router.put('/product/:id', productsController.updateProduct)
router.delete('/product/:id', productsController.deleteProduct)

module.exports = router