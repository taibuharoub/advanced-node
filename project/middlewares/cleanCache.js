const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  //we want to run this middleware after the request handler
  // we will await next(), this will make sure that
  // the request handler completes first before our middleware
  //which will clear the cache

  await next();
  clearHash(req.user.id);
};
