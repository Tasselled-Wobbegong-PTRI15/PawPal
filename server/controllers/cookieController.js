const db = require('../models/petModels.js');

const cookieController = {}; 

cookieController.setSSIDCookie = (req,res,next) => {
    const userId = res.locals.session;
    console.log("getSSIDCookie hit");
    res.cookie('ssid', userId, { httpOnly : true });
    return next();
}

module.exports = cookieController;