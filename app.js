require("dotenv").config();
const { errors } = require("celebrate");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/error-handler");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

app.use(cors());

app.use(express.json());

// USE ROUTER
app.use(requestLogger);

// App's Main App router
app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.use(errorLogger); // enabling error loger after routes and before error

// celebrate's speial error middleware for sending errors to user before custom  centralized error handler
app.use(errors());

// centralized handler
app.use(errorHandler);
