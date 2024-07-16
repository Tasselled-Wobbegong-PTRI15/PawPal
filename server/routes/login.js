const express = require('express');
const path = require('path'); 
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');

// router to handle GET request to /login - serve 'login.html' file (TBD)
router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/login.html')) // TODO: update after creating login.html 
})

// router to handle POST request to /login - verify user, start session, and add cookie  
router.post('/', 
    userController.verifyUser, // -> verifyUser 
    sessionController.startsession,
    cookieController.setSSIDCookie, 
  (req, res) => {
    res.redirect('/'); 
  }
)

module.exports = router;