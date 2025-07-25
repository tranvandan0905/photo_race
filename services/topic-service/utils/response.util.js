exports.success = (data,message) => ({
  errorCode: 0,
  data,
  message: message || 'Success',
});

exports.error = (message = 'Error') => ({
  errorCode: 1,
  data: null,
  message,
});
