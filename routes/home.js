const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator");

// localhost:3000/signup

module.exports = (params) => {
  router.get("/", (req, res) => {
    console.log("routes/home");
    res.render("pages/home", {
      pageTitle: "Home Page",
      message: "Welcome to Home Page!!!",
    });
  });

  return router;
};
