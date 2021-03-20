const Sequelize = require('sequelize'); //for things like Sequelize.STRING

//initialize your db, don't forget to include the possible heroku database URL
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/campuses_db'
);

const { DataTypes } = Sequelize;
console.log(db);
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
    defaultValue: 'https://loremflickr.com/640/360',
    validate: {
      isUrl: true,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
});

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'https://picsum.photos/200/300',
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
      name: 'University of Michigan',
      address: '12 Central St., Ann Arbor, MI 48220',
    }),
    Campus.create({
      name: 'University of Wisconsin',
      address: '43 Isthmus Way, Madison, WI 45789',
    }),
    Campus.create({
      name: 'University of North Carolina',
      address: '98 Tar Heel Ave., Chapel Hill, NC 87954',
    }),
  ]);
  await Promise.all([
    Student.create({
      firstName: 'Peter',
      lastName: 'Parker',
      email: 'pparker@gmail.com',
    }),
    Student.create({
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bwayne@wayneenterprises.com',
    }),
    Student.create({
      firstName: 'James',
      lastName: 'Howlett',
      email: 'jhowlett@gmail.com',
    }),
  ]);
};

//export your model
module.exports = { db, syncAndSeed, models: { Campus, Student } };
