const jwt = require('jsonwebtoken')
const db = require('../db')

class TokenService {
  generateBuyerTokens(payload) {
     const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
     const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
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

  async removeBuyerToken(refreshToken) {
    const tokenData = await db.query('DELETE FROM buyertoken WHERE refreshtoken = $1 RETURNING *', [refreshToken])
    return tokenData.rows[0]
  }

  async removeSellerToken(refreshToken) {
    const tokenData = await db.query('DELETE FROM sellertoken WHERE refreshtoken = $1 RETURNING *', [refreshToken])
    return tokenData.rows[0]
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch(e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch(e) {
      return null
    }
  }
}

module.exports = new TokenService()