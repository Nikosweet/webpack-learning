const Router = require('express').Router;
const buyerRouter = new Router();
const buyerController = require('../controllers/buyer.controller')

buyerRouter.post('/registration', buyerController.registration);
buyerRouter.post('/login', buyerController.login);
buyerRouter.post('/logout', buyerController.logout);
buyerRouter.get('/refresh', buyerController.refresh);
buyerRouter.get('/', buyerController.getBuyers);

module.exports = buyerRouter;