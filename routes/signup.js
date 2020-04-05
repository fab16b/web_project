const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

const bodyParser = require('body-parser');

const { check, validationResult } = require("express-validator");

// localhost:3000/signup

module.exports = params => {
  router.get("/", (req, res) => {
    console.log("routes/signup");
    res.render("pages/signup", { pageTitle: "Signup" });
  });



  router.post(
    "/",
    [
      check("username")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Username not long enough"),

      check("email")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Email not long enough"),
      
        check("password")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Password not long enough")
    ],
    async (request, response) => {
      console.log("working")
      console.log(request.body.password);
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.newcourse_info = {
          errors: errors.array()
        };
        return response.redirect("/newcourse"); // send them back
      }

      console.log(request.body);
      console.log("working 3")
      let stmt = `insert into accounts (username, email, password, role) values ( ?, ?, ?, 'member')`;
      let jive = [request.body.username, request.body.email, request.body.password];

      await mysqlConnection.query(stmt, jive, (err, results, fields) => { // err is error from query // results is 
        console.log("working 2")
        if (!err) {
          // request.session.newcourse_info = {
          //   message: `Database Happy: Account Inserted ${results.insertId}`
          // };
          console.log(`Account Inserted ${results.insertId}`);
          //response.redirect("/signup");
        } else {
          // request.session.newcourse_info = {
          //   errors: results.array()
          // };
          console.log("newcourse insert not happy");
        }
        return response.redirect("/signup"); // send them back to signup
      });
    }
  );
  return router;
};
