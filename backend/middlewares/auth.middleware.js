const ApiError= require('../exceptions/api.error');
const tokenService = require('../service/token.service');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) throw ApiError.UnathorizedError();
    
    const accessToken = authorizationHeader.split(' ')[1];
    if(!accessToken) throw ApiError.UnathorizedError();

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) throw ApiError.UnathorizedError();

    req.user = userData;
    next();

  } catch (e) {
    return next(e);
  }
}