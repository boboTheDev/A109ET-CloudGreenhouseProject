"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("data_collects", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      temperature: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      humidity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      soil_moisture: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      water_tank: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      lighting: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("data_collects");
  },
};
