const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("config");

const objection = require("./objection");
const dataModels = require("./dataModels");

const app = express();

app.set("config", config);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

objection(app);

dataModels(app);

module.exports = app;
