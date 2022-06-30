const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");
const DBClient = require("./srv/db-client");
const app = express();

app.use(bodyParser.json());

app.enable("trust proxy");

app.use((req, res, next) => {
  if (req.secure === false && app.get("env") !== "development") {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
    );

    next();
  }
});
app.use((req, res, next) => {
  if (req.path.substr(-1) == "/" && req.path.length > 1) {
    let query = req.url.slice(req.path.length);
    res.redirect(301, req.path.slice(0, -1) + query);
  } else {
    next();
  }
});

// allow local development without a server
app.use(cors());

// serve assets
app.use(express.static(__dirname + "/assets/html"));
app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  const html = fs.readFileSync(__dirname + "/assets/html/index.html", "utf8");
  response.end(html);
});
/*
app.get("/index.html", (request, response) => {
  const html = fs.readFileSync(__dirname + "/assets/html/index.html", "utf8");
  response.end(html);
});

app.get("/game.html", (request, response) => {
  const html = fs.readFileSync(__dirname + "/assets/html/game.html", "utf8");
  response.end(html);
});
app.get("/shop.html", (request, response) => {
  const html = fs.readFileSync(__dirname + "/assets/html/shop.html", "utf8");
  response.end(html);
});*/





app.post("/sql", (request, response) => {
  const data = request.body;

  if (data.sql && data.pw) {
    DBClient.execQuery(data.sql, data.pw)
      .then((res) => {
        response.setHeader("Content-Type", "application/json");
        response.end(JSON.stringify(res));
      })
      .catch((err) => {
        response.json({ error: err });
      });
  } else {
    response.json({ error: "invalid params" });
  }
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3099;
const server = app.listen(port, () => {
  console.log(
    "Listening on port %d",
    server.address().port,
    "ENV:",
    app.get("env")
  );
});
