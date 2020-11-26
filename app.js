const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("config");

const operatorsRouter = require("./routes/operators");
const organizationsRouter = require("./routes/organizations");
const roomsRouter = require("./routes/rooms");

const objection = require("./objection");
const dataModels = require("./dataModels");
const dataActions = require("./dataActions");
const organization = require("./dataModels/organization");

const app = express();

app.set("config", config);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

objection(app);

dataModels(app);
dataActions(app);

app.use("/operators", operatorsRouter);
app.use("/organizations", organizationsRouter);
app.use("/rooms", roomsRouter);

// const searchOperator = app.get("dataActions").operator.find(1);
// const searchOperatorOrganization = app
//   .get("dataActions")
//   .operator.getOrganization(1);
// const searchOperatorAccessRooms = app.get("dataActions").operator.getAccessRooms(1);

// Promise.all([
//   searchOperator,
//   searchOperatorOrganization,
//   searchOperatorAccessRooms,
// ]).then(([operator, organization, accessRooms]) => {
//   console.log({
//     id: operator.id,
//     name: `${operator.givenName} ${operator.familyName}`,
//     organization: {
//       id: organization.id,
//       name: organization.name,
//     },
//     accessRooms: accessRooms.map((room) => ({
//       id: room.id,
//       name: room.name,
//     })),
//   });
// });

// const searchOrganization = app.get("dataActions").organization.find(1);
// const searchOrganizationOperators = app
//   .get("dataActions")
//   .organization.getOperators(1);
// const searchOrganizationRooms = app.get("dataActions").organization.getRooms(1);

// Promise.all([
//   searchOrganization,
//   searchOrganizationOperators,
//   searchOrganizationRooms,
// ]).then(([organization, operators, rooms]) => {
//   console.log({
//     id: organization.id,
//     name: organization.name,
//     operators: operators.map((operator) => ({
//       id: operator.id,
//       name: `${operator.givenName} ${operator.familyName}`,
//     })),
//     rooms: rooms.map((room) => ({
//       id: room.id,
//       name: room.name,
//     })),
//   });
// });

// const searchRoom = app.get("dataActions").room.find(1);
// const searchRoomOrganization = app.get("dataActions").room.getOrganization(1);

// Promise.all([searchRoom, searchRoomOrganization]).then(
//   ([room, organization]) => {
//     console.log({
//       id: room.id,
//       name: room.name,
//       organization: {
//         id: organization.id,
//         name: organization.name,
//       },
//     });
//   }
// );

module.exports = app;
