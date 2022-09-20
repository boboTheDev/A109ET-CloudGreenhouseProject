"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Condition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Condition.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      temp_thres: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      humidity_thres: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      soil_thres: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      water_thres: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      light_thres: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Condition",
      tableName: "conditions",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return Condition;
};
