const inquirer = require("inquirer");
const { directoryExists } = require("../helpers/index");

const askFilePath = () => {
  const questions = [
    {
      name: "file",
      type: "input",
      message:
        "S'il vous plaît, veuillez entrer le chemin du fichier à traiter\n",
      validate: function (path) {
        if (directoryExists(path)) {
          return true;
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
