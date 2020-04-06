const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

const bodyParser = require("body-parser");

const { check, validationResult } = require("express-validator");

// localhost:3000/login

module.exports = (params) => {
  router.get("/", (req, res) => {
    console.log("routes/login");
    res.render("pages/login", { pageTitle: "Login Page" });
    try {
      const errors = request.session.newcourse_info
        ? request.session.newcourse_info.errors
        : false;

      const successMessage = request.session.newcourse_info
        ? request.session.newcourse_info.message
        : false;

      request.session.newcourse_info = {};

      response.render("pages/newcourse", {
        pageTitle: "New Course",
        message: "Describe your new Course",
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    "/",
    [
      check("username")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Username not long enough"),

      check("password")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Password not long enough"),
    ],
    async (request, response) => {
      console.log("working");
      console.log(request.body.password);
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.newcourse_info = {
          errors: errors.array(),
        };
        return response.redirect("/login"); // send them back
      }

      console.log(request.body);
      console.log("working 3");
      let stmt = `select * from accounts where username = 'request.body.username' and password = 'request.body.password'`;
      let jive = [request.body.username, request.body.password];

      await mysqlConnection.query(stmt, jive, (err, results, fields) => {
        // err is error from query // results is
        console.log("working 2");
        if (!err) {
          request.session.newcourse_info = {
            message: `Database Happy: Account Inserted ${results.insertId}`,
          };
          console.log(`Account Inserted ${results.insertId}`);
          response.redirect("/login");
        } else {
          request.session.newcourse_info = {
            errors: results.array(),
          };
          console.log("Logged in properly");
        }
        return response.redirect("/home"); // send them back to login
      });
    }
  );
  return router;
};
