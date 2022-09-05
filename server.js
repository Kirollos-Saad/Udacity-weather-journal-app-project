// Setup empty JS object to act as endpoint for all routes
projectData = {};

// declaring the port
const port = 5000;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//declaring body-parser to be used as a dependency 
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize the GET Route
app.get("/all", getAll);

// Callback function to complete the GET all
function getAll(req, res) {
    res.send(projectData);
}

// Callback function to complete POST '/add'
function Postdata (req, res) {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
    
}

// Post Route
app.post('/addData', Postdata)



// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Spin up the server
app.listen(port, listen);

// Callback to debug
function listen() {
    console.log(`Server running on port ${port}`);
}