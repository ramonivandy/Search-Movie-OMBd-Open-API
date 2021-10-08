const { Router } = require('express');
const db = require('../helper/mysql/database');
const config = require('../helper/global_config');
const router = Router();
const Http = require('../helper/axios/http');
const http = new Http();
const validator = require('../helper/validator/validate');
const movieModel = require('../models/movie');
const logger = require('../helper/logger/logger');

router.get('/search', async (req, res) => {
  const { page } = req.query;

  //validate payload
  const validatePayload = validator.isValidPayload(req.query, movieModel.getMovie);
  if(validatePayload.err){
    res.status(422).send({success: false, message: validatePayload.err.details[0].message});
  }

  //create params to get movie
  const result = await http.get(config.get('/omdbUrl'), {
    apiKey: config.get('/apiKey'),
    page: page,
    s: req.query.movieName
  });
  if(result.data.Response === 'False'){
    res.status(200).send({
      success: true,
      data: {}
    });
  } else {
    //prepare meta
    const meta = {
      page: parseInt(page),
      totalData: parseInt(result.data.totalResults),
      totalPage: Math.ceil(result.data.totalResults / 10),
      totalDataOnPage: result.data.Search.length,
    };
    res.status(200).send({
      sucess: true,
      data: result.data.Search,
      meta
    });
  }

  //Add Log Calls
  const apiUrl = '/search';
  const parameters = JSON.stringify(req.query);
  const logResult = await db.promise().query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
  if(logResult){
    logger.log('log-calls', `Add Log Get Movie Success, Log ID: ${logResult[0].insertId}`);
  }
});

router.get('/detail/:movieId', async (req, res) => {
  if(!req.params.movieId){
    res.status(404).send({
      success: false,
      message: 'Movie ID Not Found'
    });
  }

  const result = await http.get(config.get('/omdbUrl'), {
    apiKey: config.get('/apiKey'),
    i: req.params.movieId
  });

  if(result.data.Response === 'False'){
    res.status(404).send({
      success: false,
      message: result.data.Error
    });
  }
  else{
    delete result.data.Response;
    res.status(200).send({
      success: true,
      data: result.data
    });
  }

  //Add Log Calls
  const apiUrl = '/detail';
  const parameters = `Movie ID: ${req.params.movieId}`;
  const logResult = await db.promise().query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
  if(logResult){
    logger.log('log-calls', `Add Log Get Detail Success, Log ID: ${logResult[0].insertId}`);
  }
});

module.exports = router;
