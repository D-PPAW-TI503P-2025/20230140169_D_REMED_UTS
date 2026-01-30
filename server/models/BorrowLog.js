const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BorrowLog = sequelize.define("BorrowLog", {
  userId: DataTypes.INTEGER,
  bookId: DataTypes.INTEGER,
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT
});

module.exports = BorrowLog;
