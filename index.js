#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("./lib/inquirer/index");
const {
  getGestionnaireForClient,
  createCsvFile,
  createCsvRow,
} = require("./lib/helpers/index");

const CLI = require("clui");
const Spinner = CLI.Spinner;

clear();

console.log(
  chalk`{yellow ${figlet.textSync("AttributionClient RH", {
    horizontalLayout: "full",
  })}}`
);

console.log(
  chalk`{green.dim.strikethrough ${"Projet permettant de repartir des clients à des gestionnaires"}}`
);

const run = async () => {
  const status = new Spinner(
    "Veuillez Patienter S'il vous plaît, Traitement en cours"
  );

  try {
    const filesPath = await inquirer.askFilePath();

    status.start();

    const listOfClients = await getGestionnaireForClient(filesPath, status);

    createCsvFile(createCsvRow(listOfClients), status);
  } catch (err) {
    console.log(chalk`{red ${err.message}}`);

    console.log(
      chalk`{red ${"Erreur lors de la répartition des gestionnaires, Veuillez réessayer s'il vous plaît!"}}`
    );
    return;
  } finally {
    status.stop();
  }
};

run();
