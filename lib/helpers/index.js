"use strict";

const { default: Gestionnaire } = require("../models/gestionnaire");
const { default: Client } = require("../models/client");
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const createFakeGestionnaires = () => {
  let i = 1;
  const projects = [];
  while (i < 100) {
    projects.push(new Gestionnaire(i, `project${i}`));
    i++;
  }
  return projects;
};

const createFakeClient = () => {
  let i = 1;
  const projects = [];
  while (i < 50) {
    projects.push(new Client(i, `user${i}`));
    i++;
  }
  return projects;
};

const createCsv = (listOfClients) => {
  let rows = [];

  rows.push(["Utilisateur", "Projet 1", "Projet 2"]);

  listOfClients.forEach((client) => {
    rows.push(client.getRowForCsv());
  });

  const csvContent = rows.map((e) => e.join(";")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });

  //    Sauvegarde du fichier dans le répertoire courant
};

const parseCsvFile = (filePath, type, status) => {
  return new Promise(function (resolve, reject) {
    status.message(
      `Lecture des fichiers CSV ::: ${
        type === "client"
          ? "Fichiers des Clients"
          : "Fichiers des Gestionnaires"
      }`
    );

    const result = [];

    fs.createReadStream(filePath, { encoding: "utf-8" })
      .pipe(csv.parse({ headers: true, delimiter: ";" }))
      .on("error", (error) => {
        console.log(error);

        status.message(
          `Erreur Lors de la Lecture ::: ${
            type === "client"
              ? "Fichiers des Clients"
              : "Fichiers des Gestionnaires"
          }`
        );
        reject(error);
      })
      .on("data", (row) => {
        const elt =
          type === "client"
            ? new Client(row["id"], row["nom"])
            : new Gestionnaire(row["id"], row["nom"]);
        result.push(elt);
      })
      .on("end", () => {
        status.message(
          `Fin de la lecture ::: ${
            type === "client"
              ? "Fichiers des Clients"
              : "Fichiers des Gestionnaires"
          }`
        );

        resolve(result);
      });
  });
};

const createCsvFile = (data, status) => {
  const output = `résultat-${new Date().toLocaleDateString()}.csv`;
  const ws = fs.createWriteStream(output, { encoding: "utf-8" });

  csv.write(data, { headers: true, delimiter: ";" }).pipe(ws);

  status.message(
    `Fin ::: Sauvegarde de la répartition dans le fichier ${output}`
  );
};

const createCsvRow = (data) => {
  return data.map((row) => {
    return {
      Client: row.name,
      "Premier Gestionnaire": row.gestionnaires[0].name,
      "Deuxième Gestionnaire": row.gestionnaires[1].name,
    };
  });
};

const getGestionnaireForClient = async (filesPath, status) => {
  status.message("Début ::: Répartitions des Clients");

  const listOfGestionnaires = await parseCsvFile(
    filesPath.gestionnaire_path,
    "gestionnaire",
    status
  );
  const listOfClients = await parseCsvFile(
    filesPath.client_path,
    "client",
    status
  );

  let clientsKeys = _.keys(listOfClients);
  let gestionnairesKeys = _.keys(listOfGestionnaires);

  clientsKeys.forEach((key) => {
    if (gestionnairesKeys.length === 0) {
      gestionnairesKeys = _.keys(listOfGestionnaires);
    }

    let rndKey,
      i = 0;

    while (i <= 1) {
      //  Choisir au hasard 1 éléments dans la liste des projets
      rndKey = _.sample(gestionnairesKeys);

      //  Rétirer cet élément de la liste des clés des projets

      _.pull(gestionnairesKeys, rndKey);

      //  Ajouter ce projet à l'utilisateur
      listOfClients[key].gestionnaires.push(listOfGestionnaires[rndKey]);

      //  Réitérer ces actions
      i++;
    }
  });

  return listOfClients;
};

const getCurrentDirectory = () => {
  return path.basename(process.cwd());
};

const directoryExists = (filePath) => {
  return fs.existsSync(filePath);
};

module.exports = {
  createFakeGestionnaires,
  createFakeClient,
  createCsv,
  getCurrentDirectory,
  directoryExists,
  getGestionnaireForClient,
  createCsvFile,
  parseCsvFile,
  createCsvRow,
};
