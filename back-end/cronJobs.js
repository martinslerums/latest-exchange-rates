const axios = require("axios");
const cron = require("node-cron");
const db = require("./database/models"); 

const { Currency, ExchangeRate } = db; 

async function updateExchangeRates() {
  const date = new Date();
  try {
    const response = await axios.get(
      "https://anyapi.io/api/v1/exchange/rates?apiKey=27t3m46p5t8iep78rvqb88a5amb9hqquoc4i72hs60f8ebklh19gl2&base=EUR"
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
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}


cron.schedule("0 12 * * *", () => {
  console.log("Running daily exchange rate update...");
  updateExchangeRates();
});

module.exports = { updateExchangeRates }; 

