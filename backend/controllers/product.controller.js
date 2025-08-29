const db = require('../db')
const createError = require('http-errors')

class ProductsController {
  async createProduct(req, res) {
    const {seller, name, price, category, image_url} = req.body
    const newProduct = await db.query('INSERT INTO product (seller, product, price, category, image_url) values ($1, $2, $3, $4, $5) RETURNING *', [seller, name, price, category, image_url])
    res.json(newProduct.rows[0])
  }

  async getProducts(req, res) {
    const product = await db.query('SELECT * FROM product')
    res.json(product.rows)
  }

  async getProduct(req, res) {
    const product = await db.query('SELECT * FROM product WHERE product_id = $1', [req.params.id])
    if (product.rows[0] !== undefined) res.json(product.rows[0])
    else throw createError(404, 'Продукт не найден!')
  }

  async updateProduct(req, res) {
    const {seller, name, price, category, image_url} = req.body
    const updatedProduct = await db.query('UPDATE product set seller = $1, product = $2, price = $3, category = $4, image_url = $5 WHERE product_id = $6 RETURNING *', [seller, name, price, category, image_url, req.params.id])
    if (updatedProduct.rows[0] !== undefined) res.json(updatedProduct.rows[0])
    else throw createError(404, 'Продукт не найден!')
  }

  async deleteProduct(req, res) {
    const product = await db.query('DELETE FROM product WHERE product_id = $1', [req.params.id])
    res.json(product)
  }
}

module.exports = new ProductsController()