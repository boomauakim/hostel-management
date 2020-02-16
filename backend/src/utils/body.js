const errorMsg = {
  INVALID_PARAMETER: 'INVALID_PARAMETER',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  UNAUTHORIZED: 'UNAUTHORIZED'
};

const success = (topic = '', details = {}) => {
  if (
    !details ||
    (Object.entries(details).length === 0 && details.constructor === Object)
  ) {
    return { [topic]: {} };
  }
  return { [topic]: details };
};

const error = (errorMessage = '', message = {}) => {
  if (errorMessage && message) {
    return {
      errors: {
        error: errorMessage,
        message
      }
    };
  }
  return {
    errors: {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Sorry, Something went wrong.'
    }
  };
};

module.exports = { errorMsg, success, error };
