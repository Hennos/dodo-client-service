const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { room } = require("../app").get("dataActions");
  const collection = await room.getAll();
  res.json({
    status: collection ? "Ok" : "Not Found",
    result: collection,
  });
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { room } = require("../app").get("dataActions");
  const searchResult = await room.find(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

router.get("/organization/:id", async function (req, res, next) {
  const { id } = req.params;
  const { room } = require("../app").get("dataActions");
  const searchResult = await room.getOrganization(id);
  res.json({
    status: searchResult ? "Ok" : "Not Found",
    result: searchResult,
  });
});

module.exports = router;
