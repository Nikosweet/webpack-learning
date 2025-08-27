const db = require('../db')
const createError = require('http-errors')

class ProductsController {
  async createProduct(req, res) {
    const {manuf, name, price, category, image_url} = req.body
    const newProduct = await db.query('INSERT INTO products (product_manuf, product_name, price, category, image_url) values ($1, $2, $3, $4, $5) RETURNING *', [manuf, name, price, category, image_url])
    
    res.json(newProduct.rows[0])
  }
  async getProducts(req, res) {
    const products = await db.query('SELECT * FROM products')
    res.json(products.rows)
  }
  async getProduct(req, res, next) {
    const product = await db.query('SELECT * FROM products WHERE product_id = $1', [req.params.id])
    if (product.rows[0] !== undefined) res.json(product.rows[0])
    else throw createError(404, 'Продукт не найден!')
  }
  async updateProduct(req, res) {
    const {manuf, name, price, category, image_url} = req.body
    const updatedProduct = await db.query('UPDATE products set product_manuf = $1, product_name = $2, price = $3, category = $4, image_url = $5 WHERE product_id = $6 RETURNING *', [manuf, name, price, category, image_url, req.params.id])
    res.json(updatedProduct)
  }
  async deleteProduct(req, res) {
    const product = await db.query('DELETE FROM products WHERE product_id = $1', [req.params.id])
    res.json(product)
  }
}

module.exports = new ProductsController()