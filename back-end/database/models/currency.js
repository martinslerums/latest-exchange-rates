module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    base_currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'EUR', 
    },
    target_currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  Currency.associate = (models) => {
    Currency.hasMany(models.ExchangeRate, { foreignKey: 'currency_id' });
  };

  return Currency;
};
