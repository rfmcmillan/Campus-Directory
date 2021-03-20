const router = require('express').Router();
//import models from /db
const {
  models: { Campus },
} = require('../db');
//routes go here - these will be for your api routes
router.get('/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.send(campuses);
  } catch (error) {}
});

module.exports = router;
