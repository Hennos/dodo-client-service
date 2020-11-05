const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["givenName", "familyName", "email"],

      properties: {
        givenName: { type: "string" },
        familyName: { type: "string" },
        email: { type: "string" },
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
  if (!app) return User;

  const db = app.get("knex");

  db.schema
    .hasTable("users")
    .then((exists) => {
      if (!exists) {
        db.schema
          .createTable("users", (table) => {
            table.increments("id");
            table.string("givenName");
            table.string("familyName");
            table.string("email");
            table.timestamp("createdAt");
            table.timestamp("updatedAt");
          })
          .then(() => console.log("Created users table")) // eslint-disable-line no-console
          .then(() =>
            db("users").insert([
              {
                givenName: "Alex",
                familyName: "Doe",
                email: "alex_doe@gmail.com",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ])
          )
          .then(() => console.log("Prepare users data")); // eslint-disable-line no-console
      }
    })
    .catch((e) => console.error("Error creating users table", e)); // eslint-disable-line no-console

  return User;
};
