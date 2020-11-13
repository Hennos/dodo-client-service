const { Model } = require("objection");

class Organization extends Model {
  static get tableName() {
    return "organizations";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "email"],

      properties: {
        name: { type: "string" },
        email: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    const Operator = require("./operator")();
    const Room = require("./room")();
    return {
      operators: {
        relation: Model.HasManyRelation,
        modelClass: Operator,
        join: {
          from: "organizations.id",
          to: "operator.ownerId",
        },
      },
      rooms: {
        relation: Model.HasManyRelation,
        modelClass: Room,
        join: {
          from: "organizations.id",
          to: "rooms.ownerId",
        },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  if (!app) return Organization;

  const db = app.get("knex");

  console.log("Creating organizations model"); // eslint-disable-line no-console

  db.schema
    .hasTable("organizations")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("organizations", (table) => {
            table.increments("id");
            table.string("name");
            table.string("email");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created organizations table")) // eslint-disable-line no-console
          .then(() =>
            db("organizations").insert([
              {
                name: "Alex Doe's Corporation",
                email: "alex_doe_corp@corp.com",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ])
          )
          .then(() => console.log("Prepare organizations data")); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating organizations table", e)); // eslint-disable-line no-console

  return Organization;
};
