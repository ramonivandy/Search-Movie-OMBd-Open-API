const Joi = require('joi');

const getMovie = Joi.object({
    page: Joi.number().integer().required(),
    movieName: Joi.string().optional().allow(' ', null).default(' '),
})

module.exports = {
    getMovie
}