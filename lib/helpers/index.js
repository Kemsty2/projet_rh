const { default: Project } = require("../models/project");
const { default: User } = require("../models/user");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const CLI = require("clui");

const Spinner = CLI.Spinner;

const createFakeProjects = () => {
  let i = 1;
  const projects = [];
  while (i < 100) {
    projects.push(new Project(i, `project${i}`));
    i++;
  }
  return projects;
};

const createFakeUser = () => {
  let i = 1;
  const projects = [];
  while (i < 50) {
    projects.push(new User(i, `user${i}`));
    i++;
  }
  return projects;
};

const createCsv = (listOfUsers) => {
  let rows = [];

  rows.push(["Utilisateur", "Projet 1", "Projet 2"]);

  listOfUsers.forEach((user) => {
    rows.push(user.getRowForCsv());
  });

  const csvContent = rows.map((e) => e.join(";")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

  //    Sauvegarde du fichier dans le répertoire courant
};

const parseCsvFile = (filePath) => {
  const status = new Spinner(
    "En cours de traitement, s'il vous plaît patientez"
  );
  status.start();

  status.stop();
  return {
    listOfProjects,
    listOfUsers,
  };
};

const getProjectForUser = (filePath) => {
  const { listOfProjects, listOfUsers } = parseCsvFile(filePath);

  const status = new Spinner(
    "En cours de traitement, s'il vous plaît patientez"
  );

  status.start();

  let usersKeys = _.keys(listOfUsers);
  let projectsKeys = _.keys(listOfProjects);

  usersKeys.forEach((key) => {
    let rndKey,
      i = 0;

    while (i <= 1) {
      //  Choisir au hasard 1 éléments dans la liste des projets
      rndKey = _.sample(projectsKeys);

      //  Rétirer cet élément de la liste des clés des projets

      _.pull(projectsKeys, rndKey);

      //  Ajouter ce projet à l'utilisateur
      listOfUsers[key].projects.push(listOfProjects[rndKey]);

      //  Réitérer ces actions
      i++;
    }
  });

  status.stop();

  return listOfUsers;
};

const getCurrentDirectory = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

module.exports = {
  createFakeProjects,
  createFakeUser,
  createCsv,
  getCurrentDirectory,
  directoryExists,
  getProjectForUser,
};
