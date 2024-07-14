const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('../models/petModels.js');

const sessionController = {};

sessionController.startsession = async (req, res, next) => {
  const cookie_id = res.locals.userId;
  try {
    const insertSessionQuery = `
    INSERT INTO "session" (cookie_id)
    VALUES ($1)
    RETURNING id, created_at, cookie_id`;

    const insertSessionParams = [cookie_id];

    // run query to insert 'cookie_id' into session table 
    const result = await db.query(insertSessionQuery, insertSessionParams);
    // store returned 
    res.locals.session = result.rows[0].cookie_id;
    next();
  } catch (error) {
    console.log('error')
  }

}


module.exports = sessionController;