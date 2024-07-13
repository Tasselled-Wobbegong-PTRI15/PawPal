const express = require('express');
const path = require('path'); 
const router = express.Router();
const userController = require('../controllers/userController.js');

// handle POST request to '/signup/' 
router.get('/', (req, res) => {
    console.log('signup router receives a get request')
    res.sendFile(path.resolve(__dirname, '../../client/signup.html')); // TO DO - revise the path once signup.html is created 
    }
  );

router.post('/', 
  userController.createUser, 
  // sessionController.startSession - store new session with uuid in database
  // cookieController.setSSIDCookie - set cookie in response body (ssid: uuid)
  (req, res) => {
    console.log('created a user and came back to the final middleware')
    // redirect to main app after sign up
    res.redirect('/'); // TO DO - check the redirect route 
  }
);

module.exports = router;