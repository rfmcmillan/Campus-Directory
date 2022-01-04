const router = require('express').Router();
//import models from /db
const {
  models: { Student },
} = require('../db');
//routes go here - these will be for your api routes

router.get('/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Campus,
      },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.post('/students', async (req, res, next) => {
  try {
    const student = req.body;
    const newStudent = await Student.create(student);
    newStudent.campusId = 1;
    newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    const newStudent = await student.update(req.body);
    res.send(newStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
