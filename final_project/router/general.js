const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username & Password both are required" });

  if (isValid(username))
    return res.status(400).json({ message: "Username already exists" });
  users.push({ username, password });
  return res.status(300).json({ message: "Registered Successfully" });
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  return res.status(200).json(Object.values(books));
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const data = Object.values(books).filter(
    (b) => b.author === req.params.author
  );
  return res.status(200).json(data);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const data = Object.values(books).filter((b) => b.title === req.params.title);
  return res.status(200).json(data);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]["reviews"]);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
