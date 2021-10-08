const validate = require('validate.js');

const isValidPayload = (payload, schema) => {
  const { value, error } = schema.validate(payload);
  if (!validate.isEmpty(error)) {
    return {err: error, code: 422};
  }
  return {err: null, data: value}
};

module.exports = {
  isValidPayload
};
