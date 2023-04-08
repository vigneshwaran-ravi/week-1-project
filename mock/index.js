const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.get("/503/*", (req, res) => {
  res.statusCode = 503;
  res.send("service available 1 ");
});
app.get("/502/*", (req, res) => {
  res.statusCode = 502;
  res.send("service available 2");
});
app.get("/500/*", (req, res) => {
  res.statusCode = 500;
  res.send("service available 3");
});

app.listen(5000, function () {
  console.log("Server started on port 5000");
});
