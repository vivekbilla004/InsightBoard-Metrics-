const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const requestLogger = require("./middleware/requestLogger");

const logsRoute = require("./routes/logs");
const metricsRoute = require("./routes/metrics");

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// test route
app.get("/", (req, res) => {
  res.send("InsightBoard Backend Running");
});

app.use("/api/logs", logsRoute);

//metrics route
app.use("/api/metrics",metricsRoute);



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
