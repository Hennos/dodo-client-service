const queues = {
  GET_ROOM: "get_room",
  GET_ROOMS: "get_rooms",
  GET_ROOM_ORGANIZATION: "get_room_organization",
};

module.exports = function (connection, dataActions) {
  getRoomProcedure();
  getRoomsProcedure();
  getRoomOrganizationProcedure();

  function getRoomProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ROOM, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ROOM, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundRoom = await dataActions.find(request.id);
          const resultStatus = foundRoom ? "success" : "failed";
          console.log(`${resultStatus} get_room procedure by id ${request.id}`);
          const resultData = Buffer.from(
            JSON.stringify({
              status: resultStatus,
              result: foundRoom,
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
  function getRoomsProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ROOMS, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ROOMS, handleMessage);

        async function handleMessage(message) {
          const foundRooms = await dataActions.getAll();
          const resultStatus = foundRooms ? "success" : "failed";
          console.log(`${resultStatus} get_rooms procedure`);
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
  function getRoomOrganizationProcedure() {
    return connection
      .createChannel()
      .then((channel) => {
        channel.assertQueue(queues.GET_ROOM_ORGANIZATION, { durable: false });
        channel.prefetch(1);

        return channel.consume(queues.GET_ROOM_ORGANIZATION, handleMessage);

        async function handleMessage(message) {
          const request = JSON.parse(message.content.toString());
          const foundOrganization = await dataActions.find(request.id);
          const resultStatus = foundOrganization ? "success" : "failed";
          console.log(
            `${resultStatus} get_room_organization procedure by id ${request.id}`
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
};
