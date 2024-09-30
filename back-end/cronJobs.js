const axios = require("axios");
const dotenv = require("dotenv");
const cron = require("node-cron");
const db = require("./models"); 

dotenv.config();
const { Currency, ExchangeRate } = db;

const updateExchangeRates = async () => {
  const date = new Date();
  const apiKey = process.env.ANYAPI_KEY;
  const baseCurrency = process.env.ANYAPI_BASE_CURRENCY;

  try {
    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?apiKey=${apiKey}&base=${baseCurrency}`
    );
    const rates = response.data.rates;

    for (const [currency, rate] of Object.entries(rates)) {
      if (currency !== "EUR") {
        const currencyEntry = await Currency.findOne({
          where: { target_currency: currency },
        });

        if (currencyEntry) {
          await ExchangeRate.create({
            currency_id: currencyEntry.id,
            date: date,
            exchange_rate: rate,
          });
        }
      }
    }

    console.log("Exchange rates updated successfully.");

    await db.CronJob.create({
      lastRunDate: date,
    });
    
    console.log("Last run date updated in cronJobs table:", date);
  } catch (error) {
    console.error("Error updating exchange rates:", error.message);
  }
}


cron.schedule("0 12 * * *", () => {
  console.log("Running daily exchange rate update at 12 PM");
  updateExchangeRates();
});

module.exports = { updateExchangeRates };
