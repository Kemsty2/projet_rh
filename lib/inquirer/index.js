const inquirer = require("inquirer");
const { directoryExists } = require("../helpers/index");

const askFilePath = () => {
  const argv = require("minimist")(process.argv.slice(2));

  const questions = [
    {
      name: "client_path",
      type: "input",
      message:
        "S'il vous plaît, veuillez entrer le chemin du fichier des clients\n",
      default: argv._[0],
      validate: function (path) {
        if (directoryExists(path)) {
          if (path.indexOf("csv") !== -1) {
            return true;
          }
          return "Désolé, ce fichier n'est pas un fichier csv, veuillez utiliser les fichiers templates";
        } else {
          return "Désolé, ce fichier n'existe pas. Veuillez entrer un chemin correct";
        }
      },
    },
    {
      name: "gestionnaire_path",
      type: "input",
      message:
        "S'il vous plaît, veuillez entrer le chemin du fichier des gestionnaires\n",
      default: argv._[1],
      validate: function (path) {
        if (directoryExists(path)) {
          if (path.indexOf("csv") !== -1) {
            return true;
          }
          return "Désolé, ce fichier n'est pas un fichier csv, veuillez utiliser les fichiers templates";
        } else {
          return "Désolé, ce fichier n'existe pas. Veuillez entrer un chemin correct";
        }
      },
    },
  ];

  return inquirer.prompt(questions);
};

module.exports = {
  askFilePath,
};
