const Actions = require("./Actions");

class Organization extends Actions {
  async getOperators(id) {
    const organization = await this.find(id);
    const searchOperators = organization.$relatedQuery("operators");

    return searchOperators;
  }

  async getRooms(id) {
    const organization = await this.find(id);
    const searchRooms = organization.$relatedQuery("rooms");

    return searchRooms;
  }
}

module.exports = function (app) {
  const { Organization: Model } = app.get("dataModels");

  return new Organization(Model);
};
