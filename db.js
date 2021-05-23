const UserModel = require('./models/user');
const GameModel = require('./models/game');
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');


const db = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.PASS,
  {
    dialect: 'postgres',
    host: 'localhost',
    port: 5433
  }
);

db.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

const User = UserModel(db, Sequelize);
const Game = GameModel(db, Sequelize);

module.exports = {db, User, Game};
