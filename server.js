const express = require("express");
const bodyParser = require("body-parser");
const app = express();
path = require("path");
const morgan = require("morgan");
require("./config/mongo");

app.use(bodyParser.json()).use(morgan());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,DELETE,OPTIONS,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.static(path.join(__dirname, '/route/uploads')));

app.get("/download/*", function (req, res) {
  const filepath = req.path.replace("/download/", "").replace("/", "\\");
  const file = `${
    __dirname + "\\" + "route" + "\\" + "uploads" + "\\" + filepath
  }`;
  res.download(file);
});

app.use("/api", require("./route/loginform"));
app.use("/api", require("./route/blog"));
app.use("/api", require("./route/contactUs"));

app.use((req, res, next) => {
  req.status = 404;
  const error = new Error("Route Not Found");
  next(error);
});

app.use((error, req, res, next) => {
  res.status(req.status || 500).send({
    message: error.message,
    stack: error.stack,
  });
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully!");
});
