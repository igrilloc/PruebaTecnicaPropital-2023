const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "opportunity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nameOpportunity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      typeOfProperty: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      length: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM("available", "not available", "paused"),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
