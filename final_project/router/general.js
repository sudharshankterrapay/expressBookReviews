const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let doesExist = require("./auth_users.js").doesExist;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "Customer successfully registerd. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json({ books });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const booksList = books;
  const isbn = req.params.isbn;
  const bookBasedOnISBN = booksList[isbn];
  return res.status(200).json(bookBasedOnISBN);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const { author } = req.params;
  const book = searchBook("author", books, author);
  return res.status(200).json({ bookbyauthor: book });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const { title } = req.params;
  const book = searchBook("title", books, title);
  return res.status(300).json({bookbytitle: book });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const {isbn} = req.params
  const bookreview = books[isbn]?.reviews || {}
  return res.status(200).json(bookreview);
});

const searchBook = (propId, array, propVal) => {
    const res = [];
  for(let book in array){
    let currentBook = array[book];
    if(currentBook[propId]===propVal){
        delete currentBook[propId];
        currentBook.isbn=book;
        res.push(currentBook)
    }
  }
  return res;
}

module.exports.general = public_users;
