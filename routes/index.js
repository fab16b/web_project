const express = require("express");

const coursesRoute = require("./courses");
const prereqsRoute = require("./prereqs");
const newcourseRoute = require("./newcourse");
const signupRoute = require("./signup"); // added
const bodyParser = require('body-parser'); // added
const router = express.Router();

module.exports = params => {
  router.get("/", (req, res) => {
    console.log("index.js /");
    res.render("pages/index", { pageTitle: "Welcome" });
  });

  router.get("/hello", (req, res) => {
    console.log("index.js /hello");
    res.render("pages/hello", {
      pageTitle: "Yo Hello",
      message: "Hey, Bubba!"
    });
  });

  router.use("/courses", coursesRoute(params));
  router.use("/prereqs", prereqsRoute(params));
  router.use("/newcourse", newcourseRoute(params));
  router.use("/signup", signupRoute(params)); // added
  router.use(bodyParser.urlencoded({ extended: true })); // added

  return router;
};
