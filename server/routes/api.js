const express = require('express');

// require controllers here
const petController = require('../controllers/petController');

const router = express.Router();

// handle 'get' request to /api. Send dog info to a client 
router.get('/', petController.getPets, (req, res) => {
    return res.status(200).json(res.locals.petInfo);
});

// handle 'post' request to /api. Save dog info into the database 
router.post('/', petController.createPets, (req, res) => {
    return res.status(200).json('success');
})

// handle 'patch' request to /api. Edit dog info in the database 
router.patch('/', (req, res) => {
    // add code 
})

// handle 'delete' request to /api. Delete dog info (row) from the database
router.patch('/', (req, res) => {
    // add code 
})


module.exports = router;