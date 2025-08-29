const db = require('../db')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('../service/token.service')

const createError = require('http-errors')
class BuyerContoller {
  async registration(req, res, next) {
    try {
      const {mail, password} = req.body
      const candidate = await db.query('SELECT * FROM buyer WHERE mail = $1', [mail])
      if (!candidate.rows.length) {
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const buyer = await db.query('INSERT INTO buyer (mail, password, activationLink) values ($1, $2, $3) RETURNING *', [mail, hashPassword, activationLink])
        const tokens = tokenService.generateBuyerTokens()
        
      } else {
        throw new Error('Buyer is already registered')
      }
    } catch(e) {

    }
  }
  async login(req, res, next) {
    try {

    } catch(e) {

    }
  }
  async logout(req, res, next) {
    try {

    } catch(e) {

    }
  }
  async refresh(req, res, next) {
    try {

    } catch(e) {

    }
  }
  async getBuyers(req, res, next) {
    try {
      res.json(['346', '345'])
    } catch(e) {

    }
  }
}

module.exports = new BuyerContoller()