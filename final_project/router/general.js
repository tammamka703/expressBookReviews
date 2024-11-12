const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username , password} = req.body;
  if(!password || !username || isValid(username)){
    return res.status(401).json({message:"Invalid username or password"})
  }
  users.push({username,password});
  return res.status(200).json({message : "User registered successfully"});
  
});








// Get the book list available in the shop
public_users.get('/',async (req, res)=> {
  //Write your code here
  try{
    await res.status(200).json({books});
  }catch{
    res.status(404).json({message:"No book to show"})
  }
});








// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if(!book){
    return res.status(400).json({ message: "Books was not found" });
  }
  return res.status(200).json({book});
  });
  










// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const authorBooks = Object.values(books).filter(book=>book.author === author);
  if(authorBooks.length > 0){
    return res.status(200).json({authorBooks});
  } 
  return res.status(404).json({message: "No books found for this author"});
});








// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const booksWithTitle = Object.values(books).filter(book=>book.title === title);
  if(booksWithTitle.length > 0){
    return res.status(200).json({booksWithTitle});
  }
  return res.status(404).json({message: "No books found with this title"});
});








//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    return res.status(200).json(book.reviews);
  }
  return res.status(404).json({ message: "No reviews found for this book" });
  
});









module.exports.general = public_users;
