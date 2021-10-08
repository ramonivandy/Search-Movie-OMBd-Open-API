const assert = require('assert');
const sinon = require('sinon');
const validator = require('../../../bin/helper/validator/validate');

describe('Validator', () => {
  describe('isValidPayload', () => {
    const payload = {
      foo: 'Lorem Ipsum',
      bar: 42
    };

    it('should cover default branch', () => {
      const schema = {
        validate: sinon.stub().returns({ value: payload, error: null })
      };
      const result = validator.isValidPayload(payload, schema);

      assert.deepStrictEqual(result.data, payload);
    });

    it('should cover validate error branch', () => {
      const schema = {
        validate: sinon.stub().returns({ value: null, error: { message: 'foobar' }})
      };
      const result = validator.isValidPayload(payload, schema);

      assert.strictEqual(result.err.message, 'foobar');
    });
  });
});
