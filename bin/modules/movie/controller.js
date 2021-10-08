const db = require('../../helper/mysql/database');
const config = require('../../helper/global_config');
const Http = require('../../helper/axios/http');
const http = new Http();
const validator = require('../../helper/validator/validate');
const movieModel = require('../../models/movie');

const getListMovie = async (req, res) => {
  const { page } = req.query;

  //validate payload
  const validatePayload = validator.isValidPayload(req.query, movieModel.getMovie);
  if(validatePayload.err){
    res.send(422, {success: false, message: validatePayload.err.details[0].message});
  }

  //create params to get movie
  const result = await http.get(config.get('/omdbUrl'), {
    apiKey: config.get('/apiKey'),
    page: page,
    s: req.query.movieName,
  });
  if (result.data.Response === 'False') {
    res.send(200, {
      success: true,
      data: {},
    });
  } else {
    //prepare meta
    const meta = {
      page: parseInt(page),
      totalData: parseInt(result.data.totalResults),
      totalPage: Math.ceil(result.data.totalResults / 10),
      totalDataOnPage: result.data.Search.length,
    };
    res.send(200, {
      sucess: true,
      data: result.data.Search,
      meta,
    });
  }

  //Add Log Calls
  const apiUrl = '/search';
  const parameters = JSON.stringify(req.query);
  await db.query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
};

const getDetailMovie = async (req, res) => {
/* istanbul ignore else */
  if(!req.params.movieId){
    res.send(404, {
      success: false,
      message: 'Movie ID Not Found'
    });
  }

  const result = await http.get(config.get('/omdbUrl'), {
    apiKey: config.get('/apiKey'),
    i: req.params.movieId
  });

  if(result.data.Response === 'False'){
    res.send(404, {
      success: false,
      message: result.data.Error
    });
  }
  else{
    delete result.data.Response;
    res.send(200, {
      success: true,
      data: result.data
    });
  }

  //Add Log Calls
  const apiUrl = '/detail';
  const parameters = `Movie ID: ${req.params.movieId}`;
  await db.query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
};

module.exports = {
  getListMovie,
  getDetailMovie
};
