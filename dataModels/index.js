module.exports = function (app) {
  app.set("dataModels", {
    User: require("./user")(app),
  });
};
