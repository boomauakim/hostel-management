const code = {
  INVALID_PARAMETER: 'INVALID_PARAMETER',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
};

const success = (topic = '', details = {}) => {
  if (!details || (Object.entries(details).length === 0 && details.constructor === Object)) {
    return { [topic]: {} };
  }
  return { [topic]: details };
};

const error = (errorCode = '', message = {}) => {
  if (errorCode && message) {
    return {
      errors: {
        code: errorCode, message,
      },
    };
  }
  return {
    errors: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Sorry, Something went wrong.',
    },
  };
};

module.exports = { code, success, error };
