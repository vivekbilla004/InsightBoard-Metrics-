const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const requestLogger = require("./middleware/requestLogger");
const chartsRoute = require("./routes/charts");
const logsRoute = require("./routes/logs");
const metricsRoute = require("./routes/metrics");
const authRoute = require("./routes/auth");

dotenv.config();
connectDB();

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
const server = http.createServer(app);

// socket.io setup
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

// make io globally accessible
app.set("io", io);

// middlewares
app.use(express.json());
app.use(cors({
  origin: "Client_URL",
}));

app.use(requestLogger);

// test route
app.get("/", (req, res) => {
  res.send("InsightBoard Backend Running");
});

app.use("/api/logs", logsRoute);

//metrics route
app.use("/api/metrics",metricsRoute);

// route to force an error for testing
app.get("/api/error-test", (req, res) => {
  res.status(500).json({ message: "Forced error" });
});

// charts route
app.use("/api/charts", chartsRoute);

// auth route
app.use("/api/auth", authRoute);

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
