const express = require("express");
const router = express.Router();
const mysqlConnection = require("../data/connection");

// localhost:3000/prereqs

module.exports = params => {
  router
    .get("/", async (request, response) => {
      console.log("routes/prereqs");
      mysqlConnection.query(
        "select c.id, c.title, c.description, c.created_date, p.id as p_id, p.title as p_title, p.description as p_description from course c left outer join prereqs i on (i.course_id = c.id) left outer join course p on (i.prereq_id = p.id) order by c.title;",
        (err, rows, fields) => {
          if (!err) {
            response.send(rows);
          } else {
            console.log("routes/prereqs not happy");
            console.log(err);
          }
        }
      );
    })
    .get("/table", async (request, response) => {
      console.log("routes/prereqs/table");
      mysqlConnection.query(
        "select c.id, c.title, c.description, c.created_date, p.id as p_id, p.title as p_title, p.description as p_description from course c left outer join prereqs i on (i.course_id = c.id) left outer join course p on (i.prereq_id = p.id) order by c.title;",
        (err, rows, fields) => {
          if (!err) {
            response.render("pages/prereqs", {
              pageTitle: "Prerequisites",
              message: "Dependencies",
              rows: rows
            });
          } else {
            console.log("routes/prereqs not happy");
            console.log(err);
          }
        }
      );
    });

  router.post("/", (request, response) => {
    return response.send("prereqs.js POST");
  });

  return router;
};
