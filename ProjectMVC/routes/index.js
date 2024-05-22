const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', (req, res) => {
  res.render('index', { movies: moviesController.getMovies() });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.post('/add', (req, res) => {
  moviesController.addMovie(req.body.title, req.body.genre, req.body.year);
  res.redirect('/');
});

router.get('/edit/:id', (req, res) => {
  const movie = moviesController.findMovieById(parseInt(req.params.id));
  if (movie) {
    res.render('edit', { movie: movie });
  } else {
    res.status(404).send('Film nie znaleziony');
  }
});

router.post('/edit/:id', (req, res) => {
  moviesController.updateMovie(parseInt(req.params.id), req.body.title, req.body.genre, req.body.year);
  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  moviesController.deleteMovie(parseInt(req.params.id));
  res.redirect('/');
});

router.get('/report', (req, res) => {
  const reportData = moviesController.getMovieReport();
  res.render('report', { movies: reportData });
});

module.exports = router;
