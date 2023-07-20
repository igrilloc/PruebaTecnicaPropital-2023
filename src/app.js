const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mainRouter = require("./routes/main.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(mainRouter);

module.exports = app;
