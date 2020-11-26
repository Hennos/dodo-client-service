const queues = {
  GET_ORGANIZATION: "get_organization",
  GET_ORGANIZATIONS: "get_organizations",
  GET_ORGANIZATION_OPERATORS: "get_organization_operators",
  GET_ORGANIZATION_ROOMS: "get_organization_rooms",
};

module.exports = function (connection, dataActions) {
  getOrganizationProcedure();
  getOrganizationsProcedure();
  getOrganizationOperatorsProcedure();
  getOrganizationRoomsProcedure();

  function getOrganizationProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ORGANIZATION, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ORGANIZATION, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundOrganization = await dataActions.find(request.id);
          const resultStatus = foundOrganization ? "success" : "failed";
          console.log(
            `${resultStatus} get_organization procedure by id ${request.id}`
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
  function getOrganizationsProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ORGANIZATIONS, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ORGANIZATIONS, handleMessage);

        async function handleMessage(message) {
          const foundOrganizations = await dataActions.getAll();
          const resultStatus = foundOrganizations ? "success" : "failed";
          console.log(`${resultStatus} get_organizations procedure`);
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundOrganizations,
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
  function getOrganizationOperatorsProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ORGANIZATION_OPERATORS, {
          durable: false,
        });
        channel.prefetch(1);

        return channel.consume(
          queues.GET_ORGANIZATION_OPERATORS,
          handleMessage
        );

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundOperators = await dataActions.getOperators(request.id);
          const resultStatus = foundOperators ? "success" : "failed";
          console.log(
            `${resultStatus} get_organization_operators procedure by id ${request.id}`
          );
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
  function getOrganizationRoomsProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ORGANIZATION_ROOMS, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ORGANIZATION_ROOMS, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundRooms = await dataActions.getRooms(request.id);
          const resultStatus = foundRooms ? "success" : "failed";
          console.log(
            `${resultStatus} get_organization_rooms procedure by id ${request.id}`
          );
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundRooms,
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
