class Client {
  constructor(id = "", name = "") {
    this.id = id;
    this.name = name;
    this.gestionnaires = [];
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  getRowForCsv() {
    let row = [];
    row.push(this.name);

    this.gestionnaires.forEach((gestionnaire) => row.push(gestionnaire.name));

    return row;
  }
}

module.exports.default = Client;
