require("express-async-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/models/index.js"); 
require("./cronJobs.js"); 

const { updateExchangeRates } = require("./cronJobs.js");

// const routes = require("./routes/index.js"); // Uncomment and adjust after creating routes
// const notFoundMiddleware = require("./middleware/not-found.js"); // Uncomment after creating middleware
// const errorHandlerMiddleware = require("./middleware/error-handler.js"); // Uncomment after creating middleware

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

app.get("/", (req, res) => {
  res.send('<h1> STORE API </h1>');
});

// app.use("/api", routes); // Set up your routes here

// app.use(notFoundMiddleware); // Handle 404 errors (uncomment when created)
// app.use(errorHandlerMiddleware); // Centralized error handling (uncomment when created)

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await db.sequelize.authenticate(); 
    console.log("Connected to SQLite successfully");

    // await updateExchangeRates();


    app.listen(PORT, () =>
      console.log(`Server is listening on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1); 
  }
};

startServer();
