const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  language: String,
  name: String,
  pages: Number,
  price: Number,
  publication_address: String,
  publication_date: String,
});

const Book = mongoose.model("Book", bookSchema, "books");

module.exports = { Book };
