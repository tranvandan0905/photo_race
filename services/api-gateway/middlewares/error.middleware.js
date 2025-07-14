
const { error } = require('../utils/response.util');
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || err.response?.status || 500;
  const message = err.message || err.response?.data?.message || 'Internal Server Error';

  res.status(statusCode).json(error(message));
};
