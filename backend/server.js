const express = require("express");
const { db } = require("./config/db");
const { Book } = require("./models/books");
const cors = require("cors");
const app = express();

const router = express.Router();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
db();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/get-all-books", async function (req, res) {
  const books = await Book.find({});
  res.send({
    message: "Retrieved Successfully",
    data: books,
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
