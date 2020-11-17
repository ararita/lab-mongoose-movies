const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

//get all movies from the db
router.get("/movies", (req, res, next) => {
  // console.log(movies);
  Movie.find({})
    .then((moviesFromDB) => {
      // console.log("moviesFromDB", moviesFromDB);
      res.render("movies/index", {
        moviesList: moviesFromDB,
      });
    })
    .catch((err) => {
      console.log("error from get movies", err);
    });
});

router.get("/movies/new", (req, res) => {
  res.render("movies/new");
});

router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .then((movieFromDB) => {
      res.render("movies/details", {
        movieDetails: movieFromDB,
      });
    })
    .catch((err) => {
      console.log("error from get movies details", err);
    });
});

router.post("/movies", (req, res) => {
  const { title, genre, plot } = req.body;

  Movie.create({ title, genre, plot })
    .then((movie) => {
      console.log(`${movie.title} was added to the db`);

      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      console.log("error from post movies", err);
    });
});

module.exports = router;
