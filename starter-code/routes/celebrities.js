const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

//get all celebs from the db
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

//add new celeb view with form
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

//get celeb details from db
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

//add new celeb
router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log("name, occupation, catchPhrase", name, occupation, catchPhrase);

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celeb) => {
      console.log(`${celeb.name} was added to the db`);
      res.redirect(`/celebrities/${celeb._id}`);
    })
    .catch((err) => {
      console.log("error while adding new celeb", err);
      res.redirect("celebrities/new");
    });
});

//delete celeb
router.post("/celebrities/:id/delete", (req, res) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(res.redirect("/celebrities"))
    .catch((err) => {
      console.log("error while deleting a celeb", err);
      res.redirect("celebrities/new");
    });
});

module.exports = router;
