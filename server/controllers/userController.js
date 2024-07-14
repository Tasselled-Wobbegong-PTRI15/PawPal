const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('../models/petModels.js');

const userController = {};

// middleware to create a new user
userController.createUser = async ( req, res, next ) => {
    
    try{
      const { username, password, email } = req.body; 

      // console.log('req body is: ', req.body)

      // hash the password using bcrypt 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // console.log('hassedPassword is: ', hashedPassword);

      // write a query and param 
      const insertUserQuery = `
      INSERT INTO "user" (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email`;

      const insertUserParams = [username, email, hashedPassword]

      // run query to save a user in 'user' table 
      const result = await db.query(insertUserQuery, insertUserParams)

      // console.log('result of running db.query :', result);

      const userId = result.rows[0].id;

      // save user id in res.locals
      res.locals.userId = userId;
      // return next 
      next();
    } catch (error) {
      // handle error 
      console.log('error in db.query')
    }
}

// middleware to verify a user
userController.verifyUser = async (req, res, next) => {
  
  try{
    // get user data (username, password) from request body 
    const { username, password } = req.body;
    
    // note: added 'LIMIT 1' to make sure to get only 1 row. TODO: make sure a user cannot create a new account with a username that already exists. 
    const findUserQuery = `
      SELECT id, username, email, password 
      FROM "user"
      WHERE username = $1
      LIMIT 1
    `;
  
    const findUserParams = [username]; 
    const result = await db.query(findUserQuery, findUserParams);

    console.log('result of running query is', result)

    const storedPassword = result.rows[0].password;
    
    // compare username and password (bcrypt). if they dont match, redirect a user to signup page 
    console.log('passwords are ', password, ', ', storedPassword);

    const isMatch = await bcrypt.compare(password, storedPassword);
    if(!isMatch) { // TODO: hits if password is wrong? 
      console.log('username/password doesnt match - redirect to signup')
      res.redirect('/signup')
    }
    
    // store user's id in res.locals 
    res.locals.userId = result.rows[0].id;

    console.log('res.locals.userId ', res.locals.userId);
    
    // return next 
    return next();
    
  } catch (error) {
    return res.status(500).json({error: 'Server Error'});
  }
}


module.exports = userController;