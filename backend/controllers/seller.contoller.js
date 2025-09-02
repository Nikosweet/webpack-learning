const db = require('../db')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('../service/token.service')
const mailService = require('../service/mail.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api.error')
const { validationResult } = require('express-validator')


class SellerContoller {
  async registration(req, res, next) {
try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка валидации данных', errors.array()))
    }
    const {mail, password, phone, name} = req.body
    const candidate = await db.query('SELECT * FROM seller WHERE mail = $1 OR name = $2 OR phone_number = $3', [mail, name, phone])
    if (candidate.rows.length === 0) {
      const hashPassword = await bcrypt.hash(password, 3)
      const activationLink = uuid.v4()
      const seller = await db.query('INSERT INTO seller (mail, password, name, phone_number, activationLink) values ($1, $2, $3, $4, $5) RETURNING *', [mail, hashPassword, name, phone, activationLink])
      await mailService.sendActivationMail(mail, `${process.env.API_URL}/api/seller/activate/${activationLink}`)
      const userDto = new UserDto(seller.rows[0])
      const tokens = tokenService.generateBuyerTokens({...userDto})
      await tokenService.saveSellerToken(userDto.id, tokens.refreshToken);
      res.cookie('refreshSellerToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({...tokens, user: userDto})
    }
    throw ApiError.BadRequest('Продавец с таким адресом или именем или номером телефона уже существует')
  } catch(e) {
    next(e)
  }
  }
  async login(req, res, next) {
    try {
      const {mail, password} = req.body;
      const seller = await db.query('SELECT * FROM seller WHERE mail = $1', [mail])
      if(!seller.rows.length) {
        throw ApiError.BadRequest('Продавец не был найден')
      }
      const isPassEqual = await bcrypt.compare(password, seller.rows[0].password)
      if (!isPassEqual) {
        throw ApiError.BadRequest('Некорректный пароль')
      }
      const userDto = new UserDto(seller.rows[0]);
      const tokens = tokenService.generateSellerTokens({...userDto});
      await tokenService.saveSellerToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshSellerToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({...tokens, user: userDto})
    } catch(e) {
      next(e)
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await tokenService.removeToken(refreshToken)
      res.clearCookie('refreshSellerToken');
      return res.json(token);
    } catch(e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink  = req.params.link
      const seller = await db.query('SELECT * FROM seller WHERE activationlink = $1', [activationLink])
      if(!seller.rows.length) {
        throw ApiError.BadRequest('Некорректная ссылка активации!')
      }
      const updatedSeller = await db.query('UPDATE seller set isActivated = TRUE WHERE activationlink = $1 RETURNING *', [activationLink])
      return res.redirect(process.env.CLIENT_URL)
    } catch(e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshSellerToken } = req.cookies;
      if(!refreshSellerToken) {
        throw ApiError.UnathorizedError();
      }

      const userData = tokenService.validateRefreshToken(refreshSellerToken);
      const tokenFromDb = await db.query('SELECT * FROM sellertoken WHERE refreshtoken = $1', [refreshSellerToken])
      if(!userData || !tokenFromDb.rows.length) {
        throw ApiError.UnathorizedError()
      }

      const seller = await db.query('SELECT * FROM seller WHERE id = $1', [userData.id])
      const userDto = new UserDto(seller.rows[0]);
      const tokens = tokenService.generateSellerTokens({...userDto});
      await tokenService.saveSellerToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshSellerToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({...tokens, user: userDto})
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new SellerContoller();