const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();
app.use(express.static(__dirname + "/public")); // for static content

const port = 3000;

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["Ghdur687399s7w", "hhjjdf89s866799"]
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // or Pug, Handlebars, Mustache
app.set("views", path.join(__dirname, "./views"));

app.use("/", routes({}));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
