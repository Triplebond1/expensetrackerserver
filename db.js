const { Sequelize } = require("sequelize");
const config = require("./config/config.js");

//console.log("DB_HOST". config.development.host)

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    port: config.development.port,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("connection has been esteblished succesfully");
  } catch (e) {
    console.error("unable to connect to the database:", e);
  }
})();

module.exports = sequelize;
