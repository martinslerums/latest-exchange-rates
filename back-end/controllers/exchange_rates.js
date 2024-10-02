const db = require("../models");

const getLatestExchangeRates = async (req, res) => {
  const { target_currency = 'USD', page = 1, limit = 5, order = 'DESC' } = req.query;

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const offset = (pageNum - 1) * limitNum;

  const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const currency = await db.Currency.findOne({
    where: { target_currency },
  });

  if (!currency) {
    return res.status(404).json({ message: `Currency pair EUR-${target_currency} not found.` });
  }

  const exchangeRates = await db.ExchangeRate.findAll({
    where: { currency_id: currency.id },
    order: [["date", sortOrder]],  
    limit: limitNum,
    offset,
  });

  const { count: totalRecords } = await db.ExchangeRate.findAndCountAll({
    where: { currency_id: currency.id },
  });

  const [aggregateResults] = await db.ExchangeRate.findAll({
    attributes: [
      [db.Sequelize.fn('MAX', db.Sequelize.col('exchange_rate')), 'highest'],
      [db.Sequelize.fn('MIN', db.Sequelize.col('exchange_rate')), 'lowest'],
      [db.Sequelize.fn('AVG', db.Sequelize.col('exchange_rate')), 'average'],
    ],
    where: { currency_id: currency.id },
  });

  const lastUpdate = await db.ExchangeRate.findOne({
    where: { currency_id: currency.id },
    order: [["createdAt", "DESC"]],
    attributes: ["createdAt"], 
  });

  res.json({
    results: exchangeRates,
    highest: aggregateResults.get('highest'),
    lowest: aggregateResults.get('lowest'),
    average: parseFloat(aggregateResults.get('average').toFixed(4)),
    lastUpdate: lastUpdate ? lastUpdate.createdAt : null,  
    pagination: {
      page: pageNum,
      limit: limitNum,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limitNum),
    },
  });
};

module.exports = getLatestExchangeRates;
