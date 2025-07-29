const { error } = require('../utils/response.util');
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json(error(err.message || 'Internal Server Error'));
};
