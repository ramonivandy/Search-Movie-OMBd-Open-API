const { Router } = require('express');
const axios = require('axios');
const db = require('../helper/mysql/database');
require('dotenv').config();
const router = Router();

router.get('/search', async (req, res) => {
    const apiUrl = '/search'
    const parameters = JSON.stringify(req.query);
    try {
        db.promise().query(`INSERT INTO log (api_endpoint, parameters) VALUES ('${apiUrl}', '${parameters}')`);
        res.status(201).send({msg: "Success add log"});
    } catch (error) {
        res.status(422).send({msg: 'Failed to add log'})
    }
})

router.get('/detail/:movieId', (req, res) => {
    // console.log('hi from router');
})

module.exports = router;