const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username: 'MattiaAlgorhythm', password: '7070abcd' }];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

// Example secret key for JWT
const JWT_SECRET = 'myjwtsecretkey';
//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    // Check users array
    console.log(users);
    // Check if the username and password are provided
    if (!username || !password){
      return res.status(400).send({ message: "Username and password are required" });
    }
    // Find the user with the given username
    const user = users.find((user) => user.username === username && user.password === password);
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    // Respond with the JWT token
    res.status(200).send({ message: "Login successful", token: token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;
    // Verify the user is logged in
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    // Decode the JWT token to get the username
    let username;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      username = decoded.username;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
    // Check if the book with the ISBN provided exists
    let book = Object.values(books).find((book) => book.isbn === isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    // Add or modify the review for the user
    if (!book.reviews) {
      book.reviews = {};
    }
    book.reviews[username] = review; // Add or update the review
    res.status(200).json({ message: "Review added/modified successfully.", reviews: book.reviews });
  });

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized. No token provided." });
    }
    // Verify the token and extract the username
    let username;
    try {
        const decoded = jwt.verify(token, "myjwtsecretkey"); // Ensure you use the correct secret
        username = decoded.username;
    } catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
    // Find the book by ISBN
    let book = Object.values(books).find((book) => book.isbn === isbn);
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }
    // Check if the user has a review to delete
    if (book.reviews && book.reviews[username]) {
        // Delete the user's review
        delete book.reviews[username];
        return res.status(200).json({ message: "Review deleted successfully.", reviews: book.reviews });
    } else {
        return res.status(404).json({ message: "No review found for this user." });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

