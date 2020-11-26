const { Model } = require("objection");

class Room extends Model {
  static get tableName() {
    return "rooms";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "ownerId"],

      properties: {
        name: { type: "string" },
        ownerId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Organization = require("./organization")();
    return {
      organization: {
        relation: Model.BelongsToOneRelation,
        modelClass: Organization,
        join: {
          from: "rooms.ownerId",
          to: "organizations.id",
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
  if (!app) return Room;

  const db = app.get("knex");

  console.log("Creating rooms model"); // eslint-disable-line no-console

  db.schema
    .hasTable("rooms")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("rooms", (table) => {
            table.increments("id");
            table.string("name");
            table.integer("ownerId");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created rooms table")) // eslint-disable-line no-console
          .then(() =>
            db("rooms").insert([
              {
                name: "Alex Doe's Room",
                ownerId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ])
          )
          .then(() => console.log("Prepare rooms data")); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating rooms table", e)); // eslint-disable-line no-console

  return Room;
};
