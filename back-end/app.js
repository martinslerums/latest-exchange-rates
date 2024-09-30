require("express-async-errors");
require("./cronJobs.js");

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./models/index.js");

const routes = require("./routes/router.js");
const { updateExchangeRates } = require("./cronJobs.js");

const notFoundMiddleware = require("./middleware/not-found.js");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", routes);

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  console.log("Connected to SQLite successfully");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecord = await db.CronJob.findOne({
    where: {
      lastRunDate: today,
    },
  });

  if (!todayRecord) {
    await updateExchangeRates();
  } else {
    console.log("Today's exchange rates have already been updated.");
  }

  app.listen(PORT, () =>
    console.log(`Server is listening on http://localhost:${PORT}`)
  );
};

startServer();
