const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { operator } = require("../app").get("dataActions");
  const collection = await operator.getAll();
  res.json({
    status: collection ? "Ok" : "Not Found",
    result: collection,
  });
});

router.get("/:id", async function (req, res, next) {
  const { operator } = require("../app").get("dataActions");
  const { id } = req.params;
  const searchResult = await operator.find(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

router.get("/organization/:id", async function (req, res, next) {
  const { operator } = require("../app").get("dataActions");
  const { id } = req.params;
  const searchResult = await operator.getOrganization(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

router.get("/accessRooms/:id", async function (req, res, next) {
  const { operator } = require("../app").get("dataActions");
  const { id } = req.params;
  const searchResult = await operator.getAccessRooms(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

module.exports = router;
