const Actions = require("./Actions");

class Operator extends Actions {
  async getOrganization(id) {
    const operator = await this.find(id);
    const searchOrganization = operator.$relatedQuery("organization");

    return searchOrganization;
  }

  async getAccessRooms(id) {
    const operator = await this.find(id);
    const searchAccessRooms = operator.$relatedQuery("accessRooms");

    return searchAccessRooms;
  }
}

module.exports = function (app) {
  const { Operator: Model } = app.get("dataModels");

  return new Operator(Model);
};
