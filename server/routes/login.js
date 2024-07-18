const express = require('express');
const path = require('path'); 
const router = express.Router();

const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');

// router to handle GET request to /login - serve 'login.html' file (TBD)
router.get('/', (req, res) => {
  console.log('/login get is hit')
  res.sendFile(path.resolve(__dirname, '../../client/login.html')) // TODO: update after creating login.html 
})

// router to handle POST request to /login - verify user, start session, and add cookie  
router.post('/', 
    userController.verifyUser, // -> verifyUser 
    sessionController.startsession,
    cookieController.setSSIDCookie, 
  (req, res) => {
    console.log('redirect to main')
    res.redirect('/'); 
  }
)


// router.get('/', sessionController.isLoggedIn, (req, res) => {
//   console.log("isLoggedIn successful");
//   res.sendFile(path.resolve(__dirname, '../client/Main.jsx'));
// });

module.exports = router;