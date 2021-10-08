const sinon = require('sinon');
const winston = require('winston');

const logger = require('../../../bin/helper/logger/logger');

describe('Logger', () => {
  describe('log', () => {
    beforeEach(() => {
      sinon.stub(winston, 'createLogger').resolves({
        info: sinon.stub(),
        error: sinon.stub()
      });
    });

    afterEach(() => {
      winston.createLogger.restore();
    });

    it('should send log', () => {
      logger.log('', 'Dummy Log', '');
    });

    it('should send info log', () => {
      logger.info('', 'Dummy Info Log', '');
    });

    it('should send info log with meta', () => {
      logger.info('', 'Dummy Info Log', '', { foo: 'bar' });
    });

    it('should send error log', () => {
      logger.error('', 'Dummy Error Log', '');
    });

    it('should send error log with meta', () => {
      logger.error('', 'Dummy Error Log', '', { foo: 'bar' });
    });
  });
});
