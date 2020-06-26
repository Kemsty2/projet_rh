#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("./lib/inquirer");

clear();

console.log(
  chalk`{yellow ${figlet.textSync("Projet RH", { horizontalLayout: "full" })}}`
);

console.log(
  chalk`{green.dim.strikethrough ${"Projet permettant de repartir des projets"}}`
);

const run = async () => {
  const filePath = await inquirer.askFilePath();

  console.log(filePath);
};

run();
