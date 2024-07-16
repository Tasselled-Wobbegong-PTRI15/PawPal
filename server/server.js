const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser'); // parse cookie in request body 
const history = require('connect-history-api-fallback'); // always server index.html for all not asset requests, enabling client-side routing (SPA)

// require routers  
const apiRouter = require('./routes/api.js');
const signupRouter = require('./routes/signup.js');
const loginRouter = require('./routes/login.js');

// serve static files from build for production 
app.use(express.static(path.join(__dirname, '../build')));

// handling incoming request bodies as JSON
app.use(express.json());

// cookie parser - populate req.cookies
app.use(cookieParser());

// middleware to handle fallback for HTML5 history API
app.use(history());

// respond with html file when a GET request is made to homepage 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../build', 'index.html'));
});

// api route - handle a request to api 
app.use('/api', apiRouter);

// sign up route - handle a request to sign up 
app.use('/signup', signupRouter);

// log in route - handle a request to log in
app.use('/login', loginRouter)

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => {
  console.log('catch-all route handler is executed');
  return res.status(200).sendFile(path.join(__dirname, '../build', 'index.html'));
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
