const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  const isPresent = users.find((u) => u.username === username);
  return isPresent;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  const isPresent = users.find(
    (u) => u.username === username && u.password === password
  );
  return isPresent;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "No user found" });
  }
  let accessToken = jwt.sign(
    {
      data: username,
    },
    "secret",
    { expiresIn: 60 * 60 }
  );
  req.session.authorization = {
    accessToken,
  };
  return res.status(300).json({ message: "Login Success" });
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { data } = req.user;
  books[req.params.isbn]["reviews"][data] = req.query.review;
  return res
    .status(300)
    .json({ message: "Review Updated", book: books[req.params.isbn] });
  // return res.status(300).json({ message: "Yet to be implemented" });
});
// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { data } = req.user;
  delete books[req.params.isbn]["reviews"][data];
  return res.status(300).json({ message: "Review Deleted" });
  // return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
