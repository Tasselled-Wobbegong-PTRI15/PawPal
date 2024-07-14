const express = require('express');
const path = require('path'); 
const router = express.Router();
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');

// handle POST request to '/signup/' 
router.get('/', (req, res) => {
    console.log('signup router receives a get request')
    res.sendFile(path.resolve(__dirname, '../../client/signup.html')); // TO DO - revise the path once signup.html is created 
    }
  );

router.post('/', 
  userController.createUser, 
  sessionController.startsession,
  cookieController.setSSIDCookie, 
  (req, res) => {
    // redirect to main app after sign up
    res.redirect('/'); // TO DO - check the redirect route 
  }
);

module.exports = router;