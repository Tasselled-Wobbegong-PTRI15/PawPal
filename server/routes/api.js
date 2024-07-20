const express = require('express');

// require controllers here
const petController = require('../controllers/petController');
const sessionController = require('../controllers/sessionController');
const journalController = require ('../controllers/journalController');

const router = express.Router();

// handle 'get' request to /api. Send dog info to a client 
router.get('/', petController.getPet, (req, res) => {
    return res.status(200).json(res.locals.petInfo);
});

// handle 'post' request to /api. Save dog info into the database 
router.post('/', petController.createPets, petController.addImage, (req, res) => {
    return res.status(200).json('success');
})

// handle 'patch' request to /api. Edit dog info in the database 
router.patch('/',petController.editPets, (req, res) => {
    return res.status(200).json('successfully patched');
})

// handle 'delete' request to /api. Delete dog info (row) from the database
router.delete('/',petController.deletePets, (req, res) => {
    return res.status(200).json('successfully deleted');
})

// handle 'get' request to /api/image. Send dog image to a client 
router.get('/image', petController.getPetImage, (req, res) => {
    return res.status(200).json(res.locals.petImage);
})

router.get('/allpets', sessionController.isLoggedIn, petController.getPetList, (req, res) => {
    return res.status(200).json(res.locals.allPetList);
})

router.get('/alljournals', journalController.getJournalList, (req, res) =>{
    return res.status(200).json(res.locals.allJournals)
})

router.post('/journal', journalController.createJournal, (req, res) => {
    return res.status(200).json('success')
})

module.exports = router;