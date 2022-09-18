const express = require("express");
const app = express();
const port = 3003;
const bodyParser = require("body-parser");
const cors = require("cors");
var axios = require("axios");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/data", (req, res) => {
  console.log(req.body);
  var config = {
    method: "post",
    url: "http://localhost:8088/query",
    headers: {
      "Content-Type": "text/plain",
      Accept: "application/vnd.ksql.v1+json",
    },
    data: req.body,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/streams", (req, res) => {
  console.log(req.body);
  var config = {
    method: "post",
    url: "http://localhost:8088/ksql",
    headers: {
      "Content-Type": "text/plain",
      Accept: "application/vnd.ksql.v1+json",
    },
    data: req.body,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
