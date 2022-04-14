const db = require('../models/userModel.js');

const newProgrammerController = {};

// base function for getting a new programmer from database
// how to query database for random person; put x amount of people in an array and iteratue thru as 1s and 0s are hit
// get everyone, //outer join //array of user objects for database query
// add column seen/not interested in matches table
// return table that excludes anyone that's been decided on by user

// array of objects, with everyone from the db
// query string to get * from users table

newProgrammerController.getNewProgrammer = async (req, res, next) => {
  try {
    // Query for excluding people you've already swiped in the past
    // const getNewProgrammerQ = `SELECT id, languages, name FROM users LEFT JOIN matches ON users.id = matches.userId WHERE matches.userId IS NULL;`;
    const getNewProgrammerQ = `SELECT id, languages, name FROM users;`;
    const data = await db.query(getNewProgrammerQ);
    res.locals.newProgrammer = [data.rows, req.app.locals.user_session];
    return next();
  } catch (err) {
    return next({
      log: `There was an error in getNewProgrammer middleware: ERROR ${err}`,
      status: 400,
      message: { err: 'No hablo your language' },
    });
  }
};

// if 1 is hit, store that programmer in user's matches database
module.exports = newProgrammerController;
