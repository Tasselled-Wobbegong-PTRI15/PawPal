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

sessionController.isLoggedIn = async (req, res, next) => {

  const { userId } = req.cookies;

  console.log(`req.cookies`, req.cookies);

  if(!userId) {
    return res.send("not logged in")
  }

try {
  console.log("in checkSessionQuery")
  const checkSessionQuery = `
  SELECT * FROM "session"
  WHERE cookie_id = $1
  `;

  const checkSessionParams = [userId];

  // run the query to check if there is a matching session
  const result = await db.query(checkSessionQuery, checkSessionParams);

  if (result.rows.length === 0) {
  return res.status(401).send('Session not found');
  }
  next();

}
catch(error){
    console.log('error')
  }
}


module.exports = sessionController;