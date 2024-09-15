Hands-on Lab: Book Review Application [Final Course Project]

In this project you will assume the role of a back-end developer working for an online retailer selling books. You have been tasked with developing a server-side application that stores, retrieve and manages book ratings and reviews.

Your server-side application is required to provide the following features and capabilities to allow users to:
-	Retrieve a list of all books available in the bookshop
-	Search for specific books and retrieve their details based on the book’s ISBN code, author names and titles
-	Retrieve reviews/comments for specifc books
-	Register as a new user of the application
-	Login to the application
-	Add a new reviewer for a book (logged in users only)
-	Modify a book review (loggedin users can modify only their own reviews)
-	Delete a book review (logged in users can delete only their own reviews)
-	(Multiple users) Access the application at the same time to view and manage different book reviews simultaneously
  
As in the case with most software development projects, different people in the team work on different parts of the application. Another front-end developer in your team is working on the web-based client-side application that will communicate with your server-side application using REST. Therefore your job is to implement your server-side application as  RESTful web service. A software architect on your team has written the skeleton code for your server-side application using Node.js and Express.js.

To complete the project you will fork the skeleton code into your own repo, clone it locally into your development environment, and develop the code further to implement the CRUD capabilities listed above as HTTP methods in your Express server and test them using Postman. You will also implement Session and JWT authentication to allow only logged in users to perform certain operations. 
Furthermore you will need to enhance your code using Promises, Callbacks or Async/Await functions to allow multiple users to interact with the application simultaneously and not have to wait for each other’s operations to complete.
