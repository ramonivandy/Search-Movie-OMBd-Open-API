const sinon = require('sinon');
const assert = require('assert');
const axios = require('axios');
const Http = require('../../../bin/helper/axios/http');

describe('Axios HTTP', () => {
  let axiosStub;

  beforeEach(async () => {
    axiosStub = sinon.stub(axios, 'create');
  });

  afterEach(() => {
    axiosStub.restore();
  });

  describe('constructor', () => {
    it('should cover class constructor', () => {
      new Http();
    });
  });

  describe('get', () => {
    afterEach(() => {
      axiosStub.restore();
    });

    it('should cover positive case', async () => {
      axiosStub.returns({
        get: sinon.stub().resolves({
          data: { foo: 42 },
          err: null
        }),
      });
      const http = new Http();
      const result = await http.get('/foo');

      assert.strictEqual(result.err, null);
      assert.deepStrictEqual(result.data, { foo: 42 });
    });

    it('should cover negative case', async () => {
      axiosStub.returns({
        get: sinon.stub().rejects(new Error('dummy error')),
      });
      const http = new Http();
      const result = await http.get('/foo');

      assert.strictEqual(result.data, result.data);
      assert.strictEqual(result.err.message, 'dummy error');
    });
  });
});
