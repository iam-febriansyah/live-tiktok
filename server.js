require("dotenv").config();

var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var server = require("http").createServer(app);
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "live-tiktok",
    resave: false,
    saveUninitialized: true,
    cookie: {},
  })
);

app.use(methodOverride("_method"));
app.use(function (req, res, next) {
  res.io = io;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/velzon", express.static(path.join(__dirname, "/public/")));
app.use("/app", express.static(path.join(__dirname, "/app/")));

app.use(async function (req, res, next) {
  req.io = io;
  res.io = io;
  next();
});

app.get("/socket/:id", function (req, res) {
  var account = req.params.id;
  var htmlRes = html(account);
  res.send(htmlRes);
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var authRoute = require("./app/auth/router");
var dashboardRoute = require("./app/dashboard/router");
var userRoute = require("./app/user/router");
var giftRoute = require("./app/gift/router");
var apiRoute = require("./app/api/router.js");
// require("./db/index.js")(app);
app.use("/", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/user", userRoute);
app.use("/gift", giftRoute);
app.use("/api", apiRoute);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


function html(account) {
  var http = process.env.HTTP;
  var baseurl = process.env.BASEURL;
  var port = process.env.PORT;
  var domain = `${http}${baseurl}`;
  if (port != "" && typeof port != "undefined") {
    domain = `${domain}:${port}`;
  }
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <title>Bootstrap Example</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <style>
              .scroll{
                  max-height: 500px;
                  overflow-y: scroll;
              }
            </style>
          </head>
          <body>
          
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6 scroll" style="background-color:lavender;" id="chat"></div>
              <div class="col-sm-6 scroll" style="background-color:lavenderblush;" id="gift"></div>
            </div>
          </div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.6.2/socket.io.js" integrity="sha512-jMNwWSmjje4fjYut9MBGKXw5FZA6D67NHAuC9szpjbbjg51KefquNfvn4DalCbGfkcv/jHsHnPo1o47+8u4biA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
          
          <script>
              var chat = document.getElementById('chat');
              var gift = document.getElementById('gift');
              var baseurlDomain = '${domain}';
              const socket = io(baseurlDomain);
              socket.on('chat_${account}', function(data) {
                  var nickname = data.nickname;
                  var comment = data.comment;
                  var createdAt = data.createdAt;
                  var html = '<b>'+nickname+'</b><br>';
                      html += '<small>'+createdAt+'</small><br>';
                      html += '<p>'+comment+'</p>';
                  chat.innerHTML += html;
                  chat.scrollTop = chat.scrollHeight;
              });
              socket.on('gift_${account}', function(data) {
                  var nickname = data.nickname;
                  var giftName = data.giftName;
                  var createdAt = data.createdAt;
                  var html = '<b>'+nickname+'</b><br>';
                      html += '<small>'+createdAt+'</small><br>';
                      html += '<p>'+giftName+'</p>';
                  gift.innerHTML += html;
                  gift.scrollTop = gift.scrollHeight;
              });
          </script>
          
          </body>
          </html>
          `;
}

module.exports = { app, server };
