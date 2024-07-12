const express = require('express');

// require controllers here
const dogController = require('../controllers/dogController');
const router = express.Router();

//router for get dog info
router.get('/', dogController.getDogs, (req, res) => {
    return res.status(200).json(res.locals.dogInfo);
});