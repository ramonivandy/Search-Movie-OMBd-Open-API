const express = require("express");
const app = express();
const port = 3001;
const movieRoute = require('./bin/routes/movie');

// parse requests of content-type
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// index route
app.get("/", (req, res) => {
  res.json({ message: "This server is running properly" });
});

// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}.`);
});

//set route app
app.use('/movie', movieRoute);