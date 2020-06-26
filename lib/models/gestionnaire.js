class Gestionnaire {
  constructor(id = "", name = "") {
    this.id = id;
    this.name = name;
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }
}

module.exports.default = Gestionnaire;
