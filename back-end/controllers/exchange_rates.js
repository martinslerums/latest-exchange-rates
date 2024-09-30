const db = require("../models");

const getLatestExchangeRates = async (req, res) => {
  const { target_currency = 'USD' } = req.query;

  const currency = await db.Currency.findOne({
    where: { target_currency },
  });

  if (!currency) {
    return res.status(404).json({ message: `Currency pair EUR-${target_currency} not found.` });
  }

  const exchangeRates = await db.ExchangeRate.findAll({
    where: { currency_id: currency.id },
    order: [["date", "DESC"]],
  });

  const [aggregateResults] = await db.ExchangeRate.findAll({
    attributes: [
      [db.Sequelize.fn('MAX', db.Sequelize.col('exchange_rate')), 'highest'],
      [db.Sequelize.fn('MIN', db.Sequelize.col('exchange_rate')), 'lowest'],
      [db.Sequelize.fn('AVG', db.Sequelize.col('exchange_rate')), 'average'],
    ],
    where: { currency_id: currency.id },
  });


  res.json({
    results: exchangeRates,
    highest: aggregateResults.get('highest'),  
    lowest: aggregateResults.get('lowest'),    
    average: parseFloat(aggregateResults.get('average').toFixed(4))
  });
};

module.exports = getLatestExchangeRates;
