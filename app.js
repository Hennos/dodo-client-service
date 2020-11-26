const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("config");

const operatorsRouter = require("./routes/operators");
const organizationsRouter = require("./routes/organizations");
const roomsRouter = require("./routes/rooms");

const objection = require("./objection");
const dataModels = require("./dataModels");
const dataActions = require("./dataActions");
const organization = require("./dataModels/organization");

const app = express();

app.set("config", config);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

objection(app);

dataModels(app);
dataActions(app);

app.use("/operators", operatorsRouter);
app.use("/organizations", organizationsRouter);
app.use("/rooms", roomsRouter);

module.exports = app;
