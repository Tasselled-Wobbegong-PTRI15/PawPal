const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('../models/petModels.js');

const userController = {};

userController.createUser = async ( req, res, next ) => {
    console.log('createUser middleware is hit')
    
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
      console.log('res.locals.userId is: ', res.locals.userId)
      // return next 
      next();
    } catch (error) {
      // handle error 
      console.log('error in db.query')
    }
}

module.exports = userController;