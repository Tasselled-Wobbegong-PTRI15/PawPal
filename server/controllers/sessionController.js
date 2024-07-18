const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('../models/petModels.js');

const sessionController = {};

sessionController.startsession = async (req, res, next) => {
  console.log("startSession hit");
  const cookie_id = res.locals.userId;
  console.log(`res.locals.userId from startSession: `, res.locals.userId);
  try {
    const insertSessionQuery = `
    INSERT INTO "session" (cookie_id)
    VALUES ($1)
    RETURNING id, created_at, cookie_id`;

    const insertSessionParams = [cookie_id];

    // run query to insert 'cookie_id' into session table 
    const result = await db.query(insertSessionQuery, insertSessionParams);
    // store returned 
    console.log(`sessionID: `, result);
    res.locals.session = result.rows[0].cookie_id;
    next();
  } catch (error) {
    console.log('error')
  }

}

sessionController.isLoggedIn = async (req, res, next) => {
  console.log("isLoggedIn hit")
  const { ssid } = req.cookies;
  // console.log(`ssid: `, ssid);

  if(!ssid) {
    console.log("entering here")
    return res.status(400).send("not logged in")
  }

try {
  console.log("ssid found on account")
  const checkSessionQuery = `
  SELECT * FROM "session"
  WHERE cookie_id = $1
  `;

  const checkSessionParams = [ssid];
  console.log("getting to before the query")
  // run the query to check if there is a matching session

    console.log("Query: ", checkSessionQuery);
    console.log("Params: ", checkSessionParams);
  const result = await db.query(checkSessionQuery, checkSessionParams);
  console.log(`result from query: `, result)

  if (result.rows.length === 0) {
  console.log("No matching session found, redirecting to /signup");
  return res.redirect('/signup');
  }
  console.log("Session found, proceeding");
  return next();

}
catch(error){
  console.log("Error executing query: ", error);
  }
}


module.exports = sessionController;