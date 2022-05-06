 const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("genre", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true, //no puede haber 2 genero del mismo nombre
    },
  });
};
 