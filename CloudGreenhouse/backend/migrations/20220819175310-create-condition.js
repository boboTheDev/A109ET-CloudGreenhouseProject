"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conditions", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      temp_thres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      humidity_thres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      soil_thres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      water_thres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      light_thres: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("conditions");
  },
};
