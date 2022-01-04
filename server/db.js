const faker = require('faker');
const { Connection } = require('pg');
const Sequelize = require('sequelize'); //for things like Sequelize.STRING
const { DataTypes } = Sequelize;

//initialize your db, don't forget to include the possible heroku database URL
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/campuses_db',
  {
    logging: false,
  }
);

//define your model

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.name.firstName,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.name.lastName,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    defaultValue: faker.internet.email,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'public/images/placeholder.jpg',
  },
  gpa: {
    type: DataTypes.FLOAT,
    defaultValue: 3.6,
    validate: {
      max: 4,
      min: 0,
    },
  },
});
//define any class or instance methods

//state your model associations (hasOne etc)

//create syncAndSeed
const syncAndSeed = async () => {
  await db.sync({ force: true });

  const jack = await Student.create({
    firstName: 'Jack',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    gpa: 3.6,
    imageUrl: 'public/images/jack.jpeg',
  });
  const jane = await Student.create({
    firstName: 'Jane',
    lastName: 'Adams',
    email: 'jadams@gmail.com',
    gpa: 3.8,
    imageUrl: 'public/images/jane.jpeg',
  });
  const jen = await Student.create({
    firstName: 'Jen',
    lastName: 'Withers',
    email: 'jwithers@gmail.com',
    gpa: 3.5,
    imageUrl: 'public/images/jen.jpeg',
  });

  jack.campusId = 1;
  jack.save();
  jane.campusId = 2;
  jane.save();
  jen.campusId = 3;
  jen.save();

  return {
    students: { jack, jane, jen },
  };
};

//export your model
module.exports = { db, syncAndSeed, models: { Student } };
