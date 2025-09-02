const db = require('../db')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const tokenService = require('../service/token.service')
const mailService = require('../service/mail.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api.error')
const { validationResult } = require('express-validator')

const createError = require('http-errors')
class BuyerContoller {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка валидации данных', errors.array()))
      }
      const {mail, password,} = req.body
      const candidate = await db.query('SELECT * FROM buyer WHERE mail = $1', [mail])
      if (candidate.rows.length === 0) {
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const buyer = await db.query('INSERT INTO buyer (mail, password, activationLink) values ($1, $2, $3) RETURNING *', [mail, hashPassword, activationLink])
        await mailService.sendActivationMail(mail, `${process.env.API_URL}/api/buyer/activate/${activationLink}`)
        const userDto = new UserDto(buyer.rows[0])
        const tokens = tokenService.generateBuyerTokens({...userDto})
        await tokenService.saveBuyerToken(userDto.id, tokens.refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({...tokens, user: userDto})
      }
      throw ApiError.BadRequest('Пользователь с таким адресом уже существует')
    } catch(e) {
      next(e)
    }
  }


  async login(req, res, next) {
    try {
      const {mail, password} = req.body;
      const buyer = await db.query('SELECT * FROM buyer WHERE mail = $1', [mail])
      if(!buyer.rows.length) {
        throw ApiError.BadRequest('Пользователь не был найден')
      }
      const isPassEqual = await bcrypt.compare(password, buyer.rows[0].password)
      if (!isPassEqual) {
        throw ApiError.BadRequest('Некорректный пароль')
      }
      const userDto = new UserDto(buyer.rows[0]);
      const tokens = tokenService.generateBuyerTokens({...userDto});
      await tokenService.saveBuyerToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({...tokens, user: userDto})
    } catch(e) {
      next(e)
    }
  }


  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await tokenService.removeBuyerToken(refreshToken)
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch(e) {
      next(e)
    }
  }


  async activate(req, res, next) {
    try {
      const activationLink  = req.params.link
      const buyer = await db.query('SELECT * FROM buyer WHERE activationlink = $1', [activationLink])
      if(!buyer.rows.length) {
        throw ApiError.BadRequest('Некорректная ссылка активации!')
      }
      const updatedBuyer = await db.query('UPDATE buyer set isActivated = TRUE WHERE activationlink = $1 RETURNING *', [activationLink])
      return res.redirect(process.env.CLIENT_URL)
    } catch(e) {
      next(e)
    }
  }


  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      if(!refreshToken) {
        throw ApiError.UnathorizedError();
      }

      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await db.query('SELECT * FROM buyertoken WHERE refreshtoken = $1', [refreshToken])
      if(!userData || !tokenFromDb.rows.length) {
        throw ApiError.UnathorizedError()
      }
      
      const buyer = await db.query('SELECT * FROM buyer WHERE id = $1', [userData.id])
      const userDto = new UserDto(buyer.rows[0]);
      const tokens = tokenService.generateBuyerTokens({...userDto});
      await tokenService.saveBuyerToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json({...tokens, user: userDto})
    } catch(e) {
      next(e)
    }
  }

}

module.exports = new BuyerContoller()