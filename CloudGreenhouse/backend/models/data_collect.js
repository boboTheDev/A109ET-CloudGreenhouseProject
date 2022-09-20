"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data_collect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Data_collect.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      temperature: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      humidity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      soil_moisture: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      water_tank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lighting: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      updatedAt: "updated_at",
      createdAt: "created_at",
      tableName: "data_collects",
      modelName: "Data_collect",
    }
  );
  return Data_collect;
};
