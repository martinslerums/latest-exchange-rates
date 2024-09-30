const express = require('express');
const getLatestExchangeRates = require('../controllers/exchange_rates');

const router = express.Router();

router.get('/exchange_rates', getLatestExchangeRates);

module.exports = router;
