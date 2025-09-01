const Router = require('express').Router;
const buyerRouter = new Router();
const buyerController = require('../controllers/buyer.controller')
const { body } = require('express-validator')

buyerRouter.post('/registration',
  body('mail').isEmail(),
  body('password').isLength({min: 3, max: 25}),
  buyerController.registration
);
buyerRouter.post('/login', buyerController.login);
buyerRouter.post('/logout', buyerController.logout);
buyerRouter.get('/activate/:link', buyerController.activate);
buyerRouter.get('/refresh', buyerController.refresh);
buyerRouter.get('/', buyerController.getBuyers);

module.exports = buyerRouter;