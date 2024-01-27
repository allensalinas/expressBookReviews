const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
  let filter = users.filter((user)=>{
    return user.username === username && user.password === password;
  })

  return filter.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if(username && password){
    if (authenticatedUser(username, password)){
      let accessToken = jwt.sign({
        data: username
      }, "myprivatekey", {expiresIn: 60*60});

      req.session.authorization = {
        accessToken, username
      }

      return res.status(200).send('User logged in succesfully');
    }else
    {
      return res.status(400).json({message: 'Invalid user'});
    }
  }else{
    return res.status(400).json({message: 'Empty credentials'});
  }

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;
  let reviewContent = req.body.reviewContent;

  let user = req.user.data;

  books[isbn].reviews[user] = reviewContent;

  return res.status(200).json(books);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn;

  let user = req.user.data;

  delete  books[isbn].reviews[user];

  return res.status(200).json(books[isbn]);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
