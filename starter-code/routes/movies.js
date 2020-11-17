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

//get movie details from db
router.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
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

//edit movie form view
router.get("/movies/:id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .populate("cast")
    .then((movie) => {
      // console.log({ movie });
      res.render("movies/edit", {
        movie: movie,
      });
    })
    .catch((err) => {
      console.log("error while editing a movie", err);
    });
});

//edit movie
router.post("/movies/:id/edit", (req, res) => {
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, {
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
  })
    .populate("cast")
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch((err) => {
      console.log("error while editing a movie in the post request", err);
    });
});

//delete movie
router.post("/movies/:id/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(res.redirect("/movies"))
    .catch((err) => {
      console.log("error while deleting a movie", err);
      res.redirect("movies/new");
    });
});

module.exports = router;
