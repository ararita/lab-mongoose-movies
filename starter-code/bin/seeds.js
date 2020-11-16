const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/lab-mongoose-labs", {
  useNewUrlParser: true,
});

const celebrities = [
  {
    name: "Cosmo Kramer",
    occupation: "unknown",
    catchPhrase: "You Contribute Nothing To Society!",
  },
  {
    name: "George Constanza",
    occupation: "Hand model",
    catchPhrase: "I lie every second of the day. My whole life is a sham.",
  },
  {
    name: "Elaine Benes",
    occupation: "Editor",
    catchPhrase:
      "I don't need you to tell me what I don't want, you stupid hipster doofus!",
  },
];

Celebrity.insertMany(celebrities)
  .then((data) => {
    console.log(`Success! ${data.length} celebs added to the collection`);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("error in seeds", err);
  });
