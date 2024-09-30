module.exports = (sequelize, DataTypes) => {
  const ExchangeRate = sequelize.define('ExchangeRate', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currency_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Currencies',
        key: 'id',
      },
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    exchange_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  ExchangeRate.associate = (models) => {
    ExchangeRate.belongsTo(models.Currency, { foreignKey: 'currency_id' });
  };

  return ExchangeRate;
};
