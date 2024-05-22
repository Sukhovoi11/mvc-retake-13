const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/movies.json');

class Movie {
    constructor(id, title, genre, year) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
    }

    static loadMovies() {
        try {
            if (!fs.existsSync(DATA_FILE)) {
                fs.writeFileSync(DATA_FILE, JSON.stringify([]));
                return [];
            }
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data || '[]');
        } catch (error) {
            console.error("Could not load movies:", error);
            return [];
        }
    }

    static saveMovies(movies) {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(movies, null, 2));
        } catch (error) {
            console.error("Could not save movies:", error);
        }
    }

    static getMovies() {
        return Movie.loadMovies();
    }

    static addMovie(title, genre, year) {
        const movies = Movie.loadMovies();
        const nextId = movies.length ? movies[movies.length - 1].id + 1 : 1;
        const movie = new Movie(nextId, title, genre, year);
        movies.push(movie);
        Movie.saveMovies(movies);
    }

    static findMovieById(id) {
        const movies = Movie.loadMovies();
        return movies.find(movie => movie.id === id);
    }

    static updateMovie(id, title, genre, year) {
        const movies = Movie.loadMovies();
        const movie = movies.find(movie => movie.id === id);
        if (movie) {
            movie.title = title;
            movie.genre = genre;
            movie.year = year;
            Movie.saveMovies(movies);
        }
    }

    static deleteMovie(id) {
        const movies = Movie.loadMovies();
        const index = movies.findIndex(movie => movie.id === id);
        if (index !== -1) {
            movies.splice(index, 1);
            Movie.saveMovies(movies);
        }
    }

    static getMovieReport() {
        const reportData = {};
        const movies = Movie.loadMovies();
        movies.forEach(movie => {
            if (reportData[movie.genre]) {
                reportData[movie.genre] += 1;
            } else {
                reportData[movie.genre] = 1;
            }
        });
        return reportData;
    }
}

module.exports = Movie;
