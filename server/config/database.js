const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "library_db",       // nama database
  "root",             // user
  "Balikpapan30",   // ← GANTI dengan password kamu
  {
    host: "localhost",
    port: 3309,
    dialect: "mysql",
    logging: false
  }
);

module.exports = sequelize;
