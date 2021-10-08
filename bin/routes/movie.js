const { Router } = require('express');
const db = require('../helper/mysql/database');
const config = require('../helper/global_config');
const router = Router();
const Http = require('../helper/axios/http');
const http = new Http();
const validator = require('../helper/validator/validate');
const movieModel = require('../models/movie');

router.get('/search', async (req, res) => {
    const { page } = req.query;

    //validate payload
    const validatePayload = validator.isValidPayload(req.query, movieModel.getMovie);
    if(validatePayload.err){
        res.status(422).send({success: false, message: validatePayload.err.details[0].message});
    }

    //create parms to get movie
    const result = await http.get(config.get('/omdbUrl'), {
        apiKey: config.get('/apiKey'),
        page: page,
        s: req.query.movieName
    })
    if(result.data.Response === "False"){
        res.status(200).send({
            success: true,
            data: {}
        })
    } else {
        //prepare meta
        const meta = {
            page: parseInt(page),
            totalData: parseInt(result.data.totalResults),
            totalPage: Math.ceil(result.data.totalResults / 10),
            totalDataOnPage: result.data.Search.length,
        }
        res.status(200).send({
            sucess: true,
            data: result.data.Search,
            meta
        })
    }

     //Add Log Calls
     const apiUrl = '/search'
     const parameters = JSON.stringify(req.query);
     const logResult = await db.promise().query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
     if(logResult){
         console.log(`Add Log Success, Log ID: ${logResult[0].insertId}`);
     }
})

router.get('/detail/:movieId', (req, res) => {
    // console.log('hi from router');
})

module.exports = router;