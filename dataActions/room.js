const Actions = require("./Actions");

class Room extends Actions {
  async getOrganization(id) {
    const room = await this.find(id);
    const searchOrganization = room.$relatedQuery("organization");

    return searchOrganization;
  }
}

module.exports = function (app) {
  const { Room: Model } = app.get("dataModels");

  return new Room(Model);
};
