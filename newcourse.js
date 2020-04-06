const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

const { check, validationResult } = require("express-validator");

// localhost:3000/courses

module.exports = params => {
  router.get("/", async (request, response, next) => {
    console.log("routes/newcourse");
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
        successMessage
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    "/",
    [
      check("course_title")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Course Title is Required, Bucko"),

      check("course_description")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Course Description is Required, Bucko")
    ],
    async (request, response) => {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.newcourse_info = {
          errors: errors.array()
        };
        return response.redirect("/newcourse"); // send them back
      }

      console.log(request.body);
      let stmt = `insert into course (title, description) values ( ?, ? )`;
      let jive = [request.body.course_title, request.body.course_description];

      await mysqlConnection.query(stmt, jive, (err, results, fields) => {
        if (!err) {
          request.session.newcourse_info = {
            message: `Database Happy: Course Inserted ${results.insertId}`
          };
          console.log(`Course Inserted ${results.insertId}`);
        } else {
          request.session.newcourse_info = {
            errors: results.array()
          };
          console.log("newcourse insert not happy");
        }
        return response.redirect("/newcourse"); // send them back
      });
    }
  );

  return router;
};
