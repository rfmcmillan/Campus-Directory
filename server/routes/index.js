const router = require('express').Router();
//import models from /db
const {
  models: { Campus, Student },
} = require('../db');
//routes go here - these will be for your api routes
router.get('/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.send(campuses);
  } catch (error) {
    next(error);
  }
});

router.get('/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
