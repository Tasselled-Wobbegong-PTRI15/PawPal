const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser'); 

/*
require routers  
*/

// write code here 

// serve static files from build

app.use(express.static(path.join(__dirname, '../build')));


// handling incoming request bodies as JSON
app.use(express.json());

// cookie parser - populate req.cookies
app.use(cookieParser());

/*
route handler 
*/

// respond with html file when a GET request is made to homepage 
app.get('/', (req, res) => {
  console.log("hitting get");
  return res.status(200).sendFile(path.join(__dirname, '../build', 'index.html'));
});

// TO DO: mount the route handlers
// write code here 


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  console.log('catch-all route handler is executed');
  res.sendStatus(404);
});

// global error handler to return status and message to client 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
});

// listening on PORT (3000)
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`)
});
