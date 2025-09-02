const Router = require('express').Router;
const sellerRouter = new Router();
const sellerController = require('../controllers/seller.contoller')
const { body } = require('express-validator')


sellerRouter.post('/registration',
  body('mail').isEmail(),
  body('password').isLength({min: 3, max: 25}),
  sellerController.registration
);
sellerRouter.post('/login', sellerController.login);
sellerRouter.post('/logout', sellerController.logout);
sellerRouter.get('/activate/:link', sellerController.activate);
sellerRouter.get('/refresh', sellerController.refresh);

module.exports = sellerRouter