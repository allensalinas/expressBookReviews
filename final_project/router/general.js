const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const waitTime = 2000;

public_users.post("/register", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  users.push({ "username": username, "password": password });

  return res.status(200).send('User registered succesful');
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  let dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books)
    }, waitTime)
  });

  dummyPromise.then((listResult) => {
    return res.status(200).json(listResult);
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  let dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let isbn = req.params.isbn;
      let filteredBooks = books[isbn];

      resolve(filteredBooks)
    }, waitTime)
  });

  dummyPromise.then((listResult) => {
    return res.status(200).json(listResult);
  });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  let dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let author = req.params.author;
      let filteredBooks = [];    
      var keys = Object.keys(books);
    
      keys.forEach(key => {
        if (books[key].author === author) {
          filteredBooks.push(books[key]);
        }
      });
    

      resolve(filteredBooks)
    }, waitTime)
  });

  dummyPromise.then((listResult) => {
    return res.status(200).json(listResult);
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let title = req.params.title;
      let filteredTitles = [];    
      var keys = Object.keys(books);
    
      keys.forEach(key => {
        if (books[key].title === title) {
          filteredTitles.push([key, books[key]]);
        }
      });
      resolve(filteredTitles)
    }, waitTime)
  });

  dummyPromise.then((listResult) => {
    return res.status(200).json(listResult);
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  let isbn = req.params.isbn;
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
