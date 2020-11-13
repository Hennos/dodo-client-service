const { Model } = require("objection");

class Operator extends Model {
  static get tableName() {
    return "operators";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["givenName", "familyName", "email", "ownerId"],

      properties: {
        givenName: { type: "string" },
        familyName: { type: "string" },
        email: { type: "string" },
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
          from: "operators.ownerId",
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
  if (!app) return Operator;

  const db = app.get("knex");

  console.log("Creating operators model"); // eslint-disable-line no-console

  db.schema
    .hasTable("operators")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("operators", (table) => {
            table.increments("id");
            table.string("givenName");
            table.string("familyName");
            table.string("email");
            table.integer("ownerId");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created operators table")) // eslint-disable-line no-console
          .then(() =>
            db("operators").insert([
              {
                givenName: "Alex",
                familyName: "Doe",
                email: "alex_doe@gmail.com",
                ownerId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ])
          )
          .then(() => console.log("Prepare operators data")); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating operators table", e)); // eslint-disable-line no-console

  return Operator;
};
