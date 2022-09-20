"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Command extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Command.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      light: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      pump: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fans: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      camera: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "Command",
      tableName: "commands",
    }
  );
  return Command;
};
