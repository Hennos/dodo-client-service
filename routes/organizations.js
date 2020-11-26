const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { organization } = require("../app").get("dataActions");
  const collection = await organization.getAll();
  res.json({
    status: collection ? "Ok" : "Not Found",
    result: collection,
  });
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { organization } = require("../app").get("dataActions");
  const searchResult = await organization.find(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

router.get("/operators/:id", async function (req, res, next) {
  const { id } = req.params;
  const { organization } = require("../app").get("dataActions");
  const searchResult = await organization.getOperators(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

router.get("/rooms/:id", async function (req, res, next) {
  const { id } = req.params;
  const { organization } = require("../app").get("dataActions");
  const searchResult = await organization.getRooms(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

module.exports = router;
