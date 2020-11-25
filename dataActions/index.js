module.exports = function (app) {
  app.set("actions", {
    operator: require("./operator")(app),
    organization: require("./organization")(app),
    room: require("./room")(app),
  });
};
