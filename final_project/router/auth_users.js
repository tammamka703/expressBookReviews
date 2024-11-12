const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
let users = [{
  username:"tammam",
  password:"12345611"
}];
const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return users.some((user) => user.username === username);
}
const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
return users.some((user)=>user.username === username && user.password === password);
}
//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username , password} = req.body;

  if(!username || !password){
    return res.status(400).json({message:"username and password are required"})
  }
  if(!authenticatedUser(username,password)){
    return res.status(401).json({message:"Invalid credentials"});
  }
  const token = jwt.sign({ username }, "your-secret-key", { expiresIn: "1h" });
    return res.status(200).json({ message: "Login successful", token });
});






// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const username = req.user.username;
  const{review} = req.body;
  if(!isbn || !review){
    return res.status(400).json({message:"ISBN and review are required"});
  }
  if(!books[isbn]){
    return res.status(401).json({message : "Book not found"});
  }
   books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
