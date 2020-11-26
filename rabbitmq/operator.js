const queues = {
  GET_OPERATOR: "get_operator",
  GET_OPERATORS: "get_operators",
  GET_OPERATOR_ORGANIZATION: "get_operator_organization",
  GET_OPERATOR_ACCESS_ROOMS: "get_operator_access_rooms",
};

module.exports = function (connection, dataActions) {
  getOperatorProcedure();
  getOperatorsProcedure();
  getOperatorOrganization();
  getOperatorAccessRooms();

  function getOperatorProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_OPERATOR, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_OPERATOR, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundOperator = await dataActions.find(request.id);
          const resultStatus = foundOperator ? "success" : "failed";
          console.log(
            `${resultStatus} get_operator procedure by id ${request.id}`
          );
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundOperator,
            })
          );
          channel.sendToQueue(message.properties.replyTo, resultData, {
            correlationId: message.properties.correlationId,
          });
          channel.ack(message);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  function getOperatorsProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_OPERATORS, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_OPERATORS, handleMessage);

        async function handleMessage(message) {
          const foundOperators = await dataActions.getAll();
          const resultStatus = foundOperators ? "success" : "failed";
          console.log(`${resultStatus} get_operators procedure`);
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundOperators,
            })
          );
          channel.sendToQueue(message.properties.replyTo, resultData, {
            correlationId: message.properties.correlationId,
          });
          channel.ack(message);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  function getOperatorOrganization() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_OPERATOR_ORGANIZATION, {
          durable: false,
        });
        channel.prefetch(1);

        return channel.consume(queues.GET_OPERATOR_ORGANIZATION, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundOrganization = await dataActions.getOrganization(
            request.id
          );
          const resultStatus = foundOrganization ? "success" : "failed";
          console.log(
            `${resultStatus} get_operator_organization procedure by id ${request.id}`
          );
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundOrganization,
            })
          );
          channel.sendToQueue(message.properties.replyTo, resultData, {
            correlationId: message.properties.correlationId,
          });
          channel.ack(message);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  function getOperatorAccessRooms() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_OPERATOR_ACCESS_ROOMS, {
          durable: false,
        });
        channel.prefetch(1);

        return channel.consume(queues.GET_OPERATOR_ACCESS_ROOMS, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundAccessRooms = await dataActions.find(request.id);
          const resultStatus = foundAccessRooms ? "success" : "failed";
          console.log(
            `${resultStatus} get_operator_access_rooms procedure by id ${request.id}`
          );
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundAccessRooms,
            })
          );
          channel.sendToQueue(message.properties.replyTo, resultData, {
            correlationId: message.properties.correlationId,
          });
          channel.ack(message);
        }
      })
      .catch((error) => {
        throw error;
      });
  }
};
