const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

// localhost:3000/courses

module.exports = params => {
  router.get("/", async (request, response) => {
    console.log("routes/courses");
    mysqlConnection.query(
      "select * from course order by title",
      (err, rows, fields) => {
        if (!err) {
          response.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
  router.get("/table", async (request, response) => {
    console.log("routes/courses/table");
    mysqlConnection.query(
      "select * from course order by title",
      (err, rows, fields) => {
        if (!err) {
          response.render("pages/courselist", {
            pageTitle: "Cool Page",
            message: "Good Stuff",
            rows: rows
          });
        } else {
          console.log(err);
        }
      }
    );
  });
  router.post("/", (request, response) => {
    return response.send("courses.js POST");
  });

  return router;
};
