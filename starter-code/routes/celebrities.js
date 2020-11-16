const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

// Call the Celebrity model's find method to retrieve all the celebrities.
// If there's an error, call the route's next function and return the error.
// If there isn't an error, render the celebrities/index view.
// Pass the array of celebrities into the view as a variable.
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
      console.log("error from get celebs", err);
    });
});

module.exports = router;
