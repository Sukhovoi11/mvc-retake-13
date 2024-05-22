// controllers/moviesController.js
const Movie = require('../models/movie');

module.exports = {
    addMovie: (title, genre, year) => Movie.addMovie(title, genre, year),
    getMovies: () => Movie.getMovies(),
    findMovieById: (id) => Movie.findMovieById(id),
    updateMovie: (id, title, genre, year) => Movie.updateMovie(id, title, genre, year),
    deleteMovie: (id) => Movie.deleteMovie(id),
    getMovieReport: () => Movie.getMovieReport()
};