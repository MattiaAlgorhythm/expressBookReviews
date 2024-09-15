const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  // Check if username and psw are provided
  if (!username || !password) {
    return res.status(400).send({ message: "Username and password are required." });
  }
  // Check if username already exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send({ message: "Username already exists." });
  }
  // Register the new user
  users.push({ username: username, password: password });
  // Respond with success
  res.status(201).send({ message: "User registered successfully." });
});

/*
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(books);
});
*/

// Get the book list availble in the shop with Promises
public_users.get('/', (req, res) => {
    // Wrap the operation in a promise
    new Promise((resolve, reject) => {
      if (books) { // Assuming `books` is defined and contains the book data
        resolve(books); // Resolve with the books
      } else {
        reject({ message: 'No books available.' }); // Reject if `books` is not defined
      }
    })
    .then((books) => {
      res.send(books); // Send the books if promise resolves
    })
    .catch((err) => {
      res.status(500).send(err); // Send error message if promise rejects
    });
  });

/*
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    // Cerca direttamente l'ISBN nell'oggetto `books`
    let book = Object.values(books).find((book) => book.isbn === isbn);
    // Rispondi con il libro trovato o con un messaggio di errore
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: "Libro non trovato" });
    }
  });
*/

// Get book details based on ISBN with Promises 
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
  
    // Wrap the operation in a promise
    new Promise((resolve, reject) => {
      // Search for the book based on ISBN
      const book = Object.values(books).find((book) => book.isbn === isbn);
      
      if (book) {
        resolve(book); // Resolve with the book if found
      } else {
        reject({ message: "Libro non trovato" }); // Reject if the book is not found
      }
    })
    .then((book) => {
      res.send(book); // Send the book details if promise resolves
    })
    .catch((err) => {
      res.status(404).send(err); // Send error message if promise rejects
    });
  });

/*
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.trim().toLowerCase(); // Normalizza l'input
    // Cerca tutti i libri che hanno l'autore specificato
    let booksByAuthor = Object.values(books).filter((book) => book.author.toLowerCase() === author);
    
    // Rispondi con i libri trovati o con un messaggio di errore
    if (booksByAuthor.length > 0) { 
        res.send(booksByAuthor);
    } else {
        return res.status(404).send({ message: "Nessun libro trovato per l'autore specificato" });
    }
});
*/

// Get book details based on author with Promises
public_users.get('/author/:author', (req, res) => {
    const author = req.params.author.trim().toLowerCase(); // Normalize input
  
    // Wrap the operation in a promise
    new Promise((resolve, reject) => {
      // Search for books by the specified author
      const booksByAuthor = Object.values(books).filter((book) => book.author.toLowerCase() === author);
  
      if (booksByAuthor.length > 0) {
        resolve(booksByAuthor); // Resolve with the list of books if found
      } else {
        reject({ message: "Nessun libro trovato per l'autore specificato" }); // Reject if no books found
      }
    })
    .then((booksByAuthor) => {
      res.send(booksByAuthor); // Send the books if promise resolves
    })
    .catch((err) => {
      res.status(404).send(err); // Send error message if promise rejects
    });
  });

/*
// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.trim().toLowerCase();
    // Cerca tutti i libri che hanno il titolo specificato
    let booksByTitle = Object.values(books).filter((book) => book.title.toLowerCase() === title);
    // Rispondi con i libri trovati o con un messaggio di errore
    if (booksByTitle.length > 0) {
        res.send(booksByTitle);
    } else {
        res.status(404).send({ message: "Libro non trovato" });
    }
});
*/

// Get all books based on title with Promises
public_users.get('/title/:title', (req, res) => {
    const title = req.params.title.trim().toLowerCase();
  
    // Wrap the operation in a promise
    new Promise((resolve, reject) => {
      // Search for books with the specified title
      const booksByTitle = Object.values(books).filter((book) => book.title.toLowerCase() === title);
  
      if (booksByTitle.length > 0) {
        resolve(booksByTitle); // Resolve with the list of books if found
      } else {
        reject({ message: "Libro non trovato" }); // Reject if no books found
      }
    })
    .then((booksByTitle) => {
      res.send(booksByTitle); // Send the books if promise resolves
    })
    .catch((err) => {
      res.status(404).send(err); // Send error message if promise rejects
    });
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    // Cerca direttamente la review in base all'isbn nell'oggetto `books`
    let book = Object.values(books).find((book) => book.isbn === isbn);
    // Rispondi con il libro trovato o con un messaggio di errore
    if (book) {
      res.send(book.reviews);
    } else {
      res.status(404).send({ message: "Libro non trovato" });
    }
});

// Aggiungi una recensione a un libro specifico
public_users.post('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const review = req.body.review; // Supponiamo che la recensione sia fornita nel corpo della richiesta

    // Trova il libro in base all'ISBN
    let book = Object.values(books).find((book) => book.isbn === isbn);

    if (book) {
        // Genera un ID univoco per la recensione
        const reviewId = `review-${Date.now()}`;

        // Aggiungi la recensione al libro
        book.reviews[reviewId] = review;

        res.send({ message: "Recensione aggiunta con successo", book });
    } else {
        return res.status(404).send({ message: "Libro non trovato" });
    }
});

module.exports.general = public_users;