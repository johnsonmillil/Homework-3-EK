const express = require("express");
const app = express();

const axios = require("axios");

const client = axios.create();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index", { bands: [] });
});

app.post("/", function (req, res) {
  client
    .get(`https://itunes.apple.com/search?term=${req.body.band}`)
    .then(function (response) {
      const results = response.data?.results;
      const bands = results?.slice(undefined, 11);
      res.render("index", { bands: bands });
    })
    .catch(function (error) {
      res.render("index", { bands: [] });
    });
});

app.listen(3000, function () {
  console.log("Server Started 🚀");
});
