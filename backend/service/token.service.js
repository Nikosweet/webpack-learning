const jwt = require('jsonwebtoken')
const db = require('../db')

class TokenService {
  generateBuyerTokens(payload) {
    console.log('refresh')
     const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
     console.log('refresh1')
     const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
     console.log('refresh2')
     return {
      accessToken,
      refreshToken
     }
  }
  generateSellerTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '15d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveSellerToken(sellerId, refreshToken) {
    const tokenData = await db.query('SELECT * FROM sellerToken WHERE id = $1', [sellerId])
    if (tokenData.rows.length) {
      const newTokenData = await db.query('UPDATE sellerToken set refreshToken = $1 RETURNING *', [refreshToken])
      return newTokenData
    }
    const token = await db.query('INSERT INTO sellerToken (id, refreshToken) values ($1, $2) RETURNING *', [sellerId, refreshToken])
    return token
  }
  
  async saveBuyerToken(buyerId, refreshToken) {
    const tokenData = await db.query('SELECT * FROM buyerToken WHERE id = $1', [buyerId])
    if (tokenData.rows.length) {
      const newTokenData = await  db.query('UPDATE buyerToken set refreshToken = $1 RETURNING *', [refreshToken])
      return newTokenData
    }
    const token = await db.query('INSERT INTO buyerToken (id, refreshToken) values ($1, $2) RETURNING *', [buyerId, refreshToken])
    return token
  }
}

module.exports = new TokenService()