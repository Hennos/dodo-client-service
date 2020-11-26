module.exports = function (app) {
  app.set("dataActions", {
    operator: require("./operator")(app),
    organization: require("./organization")(app),
    room: require("./room")(app),
  });
};
