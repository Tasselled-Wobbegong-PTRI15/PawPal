const db = require('../models/petModels.js');


const journalController = {};

// get all journals

journalController.getJournalList = async (req, res, next) => {
    console.log('getJournalList hits')
    const { dog_id } = req.query;
    console.log(typeof dog_id);
    console.log('Received dog_id:', dog_id);
    try {
      const text = `
        SELECT * FROM journal
        INNER JOIN pet
        ON journal.dog_id = pet.pet_id
        WHERE journal.dog_id = $1
      `;
      const params = [dog_id];
      console.log(`query params: `, params);
      const result = await db.query(text, params);

      console.log('Query result:', result.rows);

        if (result.rows.length === 0) {
            console.log('No journals found for this dog_id');
            res.locals.allJournals = [];
        } else {
        res.locals.allJournals = result.rows;
        console.log(`res.locals.allJournals: `, res.locals.allJournals)
        }
      console.log("continuing to next middleware")
      return next();
    } catch (error) {
      return next({
        log: `journalController.getJournalList ERROR: ${error}`,
        message: {
          err: 'Error in journalController.getJournalList.'
        },
        status: 500
      });
    }
  }



  // create journal
journalController.createJournal = async (req, res, next) => {
    // get dog_id from query 
    const {pet_id} = req.query;
    console.log('pet_id is', pet_id);

    const { title, text_input, photo_url } = req.body;
    console.log(`req.body: `, req.body)
    // console.log('req body is ', req.body);
    try {
      const text = `
        INSERT INTO journal (title, text_input, dog_id, photo_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `
      const params = [ title, text_input, pet_id, photo_url ];
      console.log('params is', params)
      const result = await db.query(text, params);

      console.log("passing query")

      res.locals.pet_id = result.rows[0].pet_id;
      
      return next();
    } catch (error) {
      return next({
          log: `journalController.createJournal ERROR: ${error}`,
          message: {
              err: 'Error in journalController.createJournal.'
          },
          status: 500
      });
    }
  }

//   // get single journal

// journalController.getJournals = async (req, res, next) => {
//     console.log('getJournals hit')
//     const { pet_id } = req.query;
//     console.log('pet_id is', pet_id)
  
//     try {
//       const text = `
//         SELECT * FROM journal
//         INNER JOIN pet
//         ON journal.dog_id = pet.pet_id
//       `
//       // TO DO: edit param's arry to dynamically get owner_id (or pet_id) from request body 
//       const param = [pet_id]
//       const result = await db.query(text, param);
  
//       res.locals.journalInfo = result.rows[0];
      
//       return next();

//     } catch (error) {
//       return next({
//         log: `journalController.getJournals ERROR: ${error}`,
//         message: {
//           err: 'Error in journalController.getJournals.'
//         },
//         status: 500
//       });
//     }
//   };

module.exports = journalController;