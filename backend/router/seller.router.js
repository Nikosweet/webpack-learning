const Router = require('express').Router;
const sellerRouter = new Router();
const sellerController = require('../controllers/seller.contoller')

sellerRouter.post('/registration', sellerController.registration);
sellerRouter.post('/login', sellerController.login);
sellerRouter.post('/logout', sellerController.logout);
sellerRouter.get('/refresh', sellerController.refresh);
sellerRouter.get('/', sellerController.getSellers);

module.exports = sellerRouter