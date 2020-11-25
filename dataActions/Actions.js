class Actions {
  constructor(Model) {
    this.Model = Model;
  }

  getModel() {
    return this.Model;
  }

  async find(id) {
    const Model = this.getModel();

    const found = await Model.query().findById(id);

    return found;
  }

  async getCollection() {
    throw new TypeError(`${this.name}: "getCollection" method not implemented`);
  }

  async create() {
    throw new TypeError(`${this.name}: "create" method not implemented`);
  }

  async update() {
    throw new TypeError(`${this.name}: "update" method not implemented`);
  }

  async remove() {
    throw new TypeError(`${this.name}: "remove" method not implemented`);
  }
}

module.exports = Actions;
