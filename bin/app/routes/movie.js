const { Router } = require('express');
const router = Router();
const controllerMovie = require('../../modules/movie/controller');

router.get('/search', controllerMovie.getListMovie);
router.get('/detail/:movieId', controllerMovie.getDetailMovie);

module.exports = router;
