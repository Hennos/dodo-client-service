module.exports = function (app) {
  app.set("dataModels", {
    Operator: require("./operator")(app),
    Organization: require("./organization")(app),
    Room: require("./room")(app),
  });
};
