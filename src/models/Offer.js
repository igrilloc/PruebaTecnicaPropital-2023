const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "offer",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
        type: DataTypes.ENUM("rent", "sale"),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      expiration: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stateOffer: {
        type: DataTypes.ENUM("pending", "inactive", "expired", "cancelled", "active"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
