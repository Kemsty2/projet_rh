class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.projects = [];
  }

  getRowForCsv() {
    let row = [];
    row.push(this.name);

    this.projects.forEach((projet) => row.push(projet.name));

    return row;
  }
}

module.exports.default = User;
