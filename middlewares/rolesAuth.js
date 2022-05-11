const { roles } = require("../utils/constants");
const { BadRequestError, UnauthenticatedError } = require("../errors");

function adminAuth(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    throw new UnauthenticatedError("Invalid Authentication");
  }
}

function workerAuth(req, res, next) {
  if (req.user.role === roles.worker) {
    next();
  } else {
    throw new UnauthenticatedError("Invalid Authentication");
  }
}

function clientAuth(req, res, next) {
  if (req.user.role === roles.client || roles.worker) {
    next();
  } else {
    throw new UnauthenticatedError("Invalid Authentication");
  }
}

module.exports = {
  adminAuth,
  workerAuth,
  clientAuth,
};
