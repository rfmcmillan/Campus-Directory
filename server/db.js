const faker = require('faker');
const Sequelize = require('sequelize'); //for things like Sequelize.STRING

//initialize your db, don't forget to include the possible heroku database URL
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/campuses_db',
  {
    logging: false,
  }
);

const { DataTypes } = Sequelize;
//define your model
const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    //defaultValue: 'https://loremflickr.com/640/360',
    defaultValue: '/public/images/duke.jpg',
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.streetAddress,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.city,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.stateAbbr,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.zipCode,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: faker.lorem.paragraph,
  },
});

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
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
    //defaultValue: 'http://placeimg.com/640/480/people',
    defaultValue: 'public/images/jen.jpeg',
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
Student.belongsTo(Campus);
Campus.hasMany(Student);

//create syncAndSeed
const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Promise.all([
    Campus.create({
      name: 'Weigand University',
      imageUrl: 'public/images/duke.jpg',
    }),
    Campus.create({
      name: 'Braun University',
      imageUrl: 'public/images/unc.jpg',
    }),
    Campus.create({
      name: 'Bergstrom University',
      imageUrl: 'public/images/ncstate.png',
    }),
  ]);

  const jack = await Student.create({
    firstName: 'Jack',
    imageUrl: 'public/images/jack.jpeg',
  });
  const jane = await Student.create({
    firstName: 'Jane',
    imageUrl: 'public/images/jane.jpeg',
  });
  const jen = await Student.create({
    firstName: 'Jen',
    imageUrl: 'public/images/jen.jpeg',
  });

  jack.campusId = 1;
  jack.save();
  jane.campusId = 2;
  jane.save();
  jen.campusId = 3;
  jen.save();
};

//export your model
module.exports = { db, syncAndSeed, models: { Campus, Student } };
