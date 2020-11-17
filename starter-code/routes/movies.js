const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

//get all movies from the db
router.get("/movies", (req, res, next) => {
  // console.log(movies);
  Movie.find()
    .populate("cast")
    .then((moviesFromDB) => {
      console.log("moviesFromDB", moviesFromDB);
      res.render("movies/index", {
        moviesList: moviesFromDB,
      });
    })
    .catch((err) => {
      console.log("error from get movies", err);
    });
});

//add new movie form view
router.get("/movies/new", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      // console.log("celebs", celebs);
      res.render("movies/new", {
        celebsList: celebs,
      });
    })
    .catch((err) => {
      console.log("error from get new movies", err);
    });
});

//see movie details
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

//add new movie
router.post("/movies", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((movie) => {
      console.log(`${movie.title} was added to the db`);

      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      console.log("error from post movies", err);
    });
});

module.exports = router;
