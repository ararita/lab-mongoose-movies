const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  // console.log(celebrities);
  Celebrity.find({})
    .then((celebsFromDB) => {
      console.log("celebsData", celebsFromDB);
      res.render("celebrities/index", {
        celebsList: celebsFromDB,
      });
    })
    .catch((err) => {
      // If there's an error, call the route's next function and return the error.
      console.log("error from get celebs", err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebDetails) => {
      console.log("celebdetails", celebDetails);
      res.render("celebrities/details", {
        celebDetails: celebDetails,
      });
    })
    .catch((err) => {
      console.log("error from find by id", err);
    });
});

module.exports = router;
