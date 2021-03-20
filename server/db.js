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
});
//define any class or instance methods

//state your model associations (hasOne etc)

//create syncAndSeed
const syncAndSeed = async () => {
  await db.sync({ force: true });
  await Campus.create({
    name: 'University of Michigan',
  });
};

//export your model
module.exports = { db, syncAndSeed, models: { Campus } };
