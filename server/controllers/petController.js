const db = require('../models/petModels.js');

const petController = {};

petController.getPet = async (req, res, next) => {
  console.log('getPet hits')
  const { pet_id } = req.query;
  console.log('pet_id is', pet_id)

  try {
    const text = `
      SELECT * FROM pet
      WHERE pet_id = $1
    `
    // TO DO: edit param's arry to dynamically get owner_id (or pet_id) from request body 
    const param = [pet_id]
    const result = await db.query(text, param);

    res.locals.petInfo = result.rows[0];
    return next();
  } catch (error) {
    return next({
      log: `petController.getPets ERROR: ${error}`,
      message: {
        err: 'Error in petController.getPets.'
      },
      status: 500
    });
  }
};

// create pets
petController.createPets = async (req, res, next) => {
  const { name, dob, age, species, breed, weight_lb, height_cm, color, microchip, gender } = req.body;
  const owner_id = req.cookies.ssid;
  console.log('ownerId is', owner_id)
  // console.log('req body is ', req.body);
  try {
    const text = `
      INSERT INTO pet (name, dob, age, species, breed, weight_lb, height_cm, color, microchip, owner_id, gender)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `
    const params = [ name, dob, age, species, breed, weight_lb, height_cm, color, microchip, owner_id, gender ];
    const result = await db.query(text, params);
    res.locals.pet_id = result.rows[0].pet_id;
    return next();
  } catch (error) {
    return next({
        log: `petController.createPets ERROR: ${error}`,
        message: {
            err: 'Error in petController.createPets.'
        },
        status: 500
    });
  }
}

// add image to pets
petController.addImage = async (req, res, next) => {
  console.log('add image hits')
  const { image } = req.body;
  const pet_id = res.locals.pet_id;
  try {
    const text = `
    INSERT INTO pet_image (image, pet_id)
    VALUES ($1, $2)
    RETURNING *
  `
    const params = [image, pet_id];
    const result = await db.query(text, params);
    return next();
  } catch (error) {
    next({
      log: `petController.addImage ERROR: ${error}`,
      message: {
          err: 'Error in petController.addImage'
      },
      status: 500
   })
  }
}

// edit pets 
petController.editPets = async (req, res, next) => {
  // NOTE: 
  // 1. current query expects all columns data coming from req_body (including changed/non-changed values)
  // 2. 'pet_id' is expected in req.body 
  const { name, dob, age, species, breed, weight_lb, height_cm, color, microchip, owner_id, gender, pet_id } = req.body;
  
  try {
    const text = `
      UPDATE pet
      SET 
        name = $1,
        dob = $2,
        age = $3,
        species = $4,
        breed = $5,
        weight_lb = $6,
        height_cm = $7,
        color = $8,
        microchip = $9,
        owner_id = $10,
        gender = $11
      WHERE 
        pet_id = $12
      RETURNING *
    `
    const params = [ name, dob, age, species, breed, weight_lb, height_cm, color, microchip, owner_id, gender, pet_id];
    const result = await db.query(text, params);
    // console.log('result is ', result);
    return next();
  } catch (error) {
    return next({
      log: `petController.editPets ERROR: ${error}`,
      message: {
          err: 'Error in petController.editPets.'
      },
      status: 500
  });
  }

}

// delete pets 
petController.deletePets = async (req, res, next) => {
  const { pet_id } = req.query;
  try {
    const text = `
    DELETE FROM pet
    WHERE pet_id = $1;`
    const params = [pet_id];
    const result = await db.query(text, params);

    if (result.rowCount === 0) {
      return next({
        log: 'petController.deletePets ERROR: Pet not found',
        message: {
          err: 'Error finding pet'
        },
        status: 404
      });
    }
    return next();
  } catch (error) {
    return next({
      log: `petController.deletePets ERROR: ${error}`,
      message: {
          err: 'Error in petController.deletePets.'
      },
      status: 500
  });
  }
}

// get pet image 
petController.getPetImage = async (req, res, next) => {
  console.log('getPetImage middleware hits')
  const { pet_id } = req.query;
  console.log('pet id is', pet_id)
  try {
    const text = `
      SELECT * FROM pet_image
      WHERE pet_id = $1
    `
    const param = [pet_id]; // add '16' as test
    const result = await db.query(text, param);

    res.locals.petImage = result.rows[0].image;
    return next();
  } catch (error) {
    return next({
      log: `petController.getPets ERROR: ${error}`,
      message: {
        err: 'Error in petController.getPets.'
      },
      status: 500
    });
  }
}

// get all pet list 
petController.getPetList = async (req, res, next) => {
  console.log('getPetList hits')
  const owner_id = req.cookies.ssid;
  // console.log('owner id', owner_id)
  try {
    const text = `
      SELECT *
      FROM pet
      WHERE owner_id = $1
    `
    const params = [owner_id];
    const result = await db.query(text, params);
    // console.log('result rows ', result.rows);
    res.locals.allPetList = result.rows;
    return next();
  } catch (error) {
    return next({
      log: `petController.getPetList ERROR: ${error}`,
      message: {
        err: 'Error in petController.getPetList.'
      },
      status: 500
    });
  }
}

module.exports = petController;

/* example of insert 
 const text = `
      INSERT INTO "user" (username, password)
      VALUES ($1, $2)
      RETURNING *
    ` 
    const param = [username, hashedPassword];
*/