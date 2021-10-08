const sinon = require('sinon');
const http = require('../../bin/helper/axios/http');
const db = require('../../bin/helper/mysql/database');
const validator = require('../../bin/helper/validator/validate');

const movie = require('../../bin/modules/movie/controller');

describe('Movie', () => {
  const res = {
    send: sinon.stub()
  };
  describe('Get List Movie', async () => {
    it('should success', async () => {
      sinon.stub(http.prototype, 'get').resolves({err: null, data: { Search: [] }});
      sinon.stub(db, 'query').resolves({err:null, data:{}});
      sinon.stub(validator, 'isValidPayload').resolves({err: null, data: {}});
      await movie.getListMovie({query: {page: 1, movieName: 'abc'}}, res);
      http.prototype.get.restore();
      db.query.restore();
      validator.isValidPayload.restore();
    });
    it('should cover null data function', async () =>{
      sinon.stub(http.prototype, 'get').resolves({err: null, data: { Response: 'False' }});
      sinon.stub(validator, 'isValidPayload').resolves({err: null, data: {}});
      await movie.getListMovie({query: {page: 1, movieName: 'abc'}}, res);
      http.prototype.get.restore();
      validator.isValidPayload.restore();
    });
    it('should cover err validator', async () =>{
      sinon.stub(validator, 'isValidPayload').resolves({err: true, data: {}});
      await movie.getListMovie({query: {}}, res);
      validator.isValidPayload.restore();
    });
  });

  describe('Get Detail Movie', async () => {
    it('should success', async () => {
      sinon.stub(http.prototype, 'get').resolves({err: null, data: {}});
      await movie.getDetailMovie({params: '123'}, res);
      http.prototype.get.restore();
    });
    it('should cover error', async () => {
      sinon.stub(http.prototype, 'get').resolves({err: null, data: { Response: 'False' }});
      await movie.getDetailMovie({params: '123'}, res);
      http.prototype.get.restore();
    });
    it('should cover movieId error', async () => {
      sinon.stub(http.prototype, 'get').resolves({err: null, data: { Response: 'False' }});
      await movie.getDetailMovie({params: {movieId: false}}, res);
      http.prototype.get.restore();
    });
  });

});
