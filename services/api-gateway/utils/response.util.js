exports.success = (data) => ({
  errorCode: 0,
  data,
  message: 'Success',
});

exports.error = (message = 'Error') => ({
  errorCode: 1,
  data: null,
  message,
});
