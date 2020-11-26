const amqp = require("amqplib");

const operatorProcedures = require("./operator");
const organizationProcedures = require("./organization");
const roomProcedures = require("./room");

module.exports = function (app) {
  const {
    amqp: { connection: url },
  } = app.get("config");

  const {
    operator: operatorActions,
    organization: organizationActions,
    room: roomActions,
  } = app.get("dataActions");

  amqp.connect(url).then((connection) => {
    operatorProcedures(connection, operatorActions);
    organizationProcedures(connection, organizationActions);
    roomProcedures(connection, roomActions);
  });
};
