require("dotenv").config();

var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var server = require("http").createServer(app);
const methodOverride = require("method-override");

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(async function (req, res, next) {
  req.io = io;
  res.io = io;
  next();
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


var apiRoute = require("./app/api/router.js");
require("./db/index.js")(app);
app.use("/api", apiRoute);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./app/live')(io);


module.exports = { app, server };
