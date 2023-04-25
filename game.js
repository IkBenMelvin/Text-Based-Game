import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

function Battle() {
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Fight", "Abilities", "Inventory", "Escape"]
    }]).then((answers) => {
        
    })
}

function GameLoop(currentId) {
    let playerData;
    const data = JSON.parse(fs.readFileSync("game.json", "utf8"))
    Object.keys(data["slots"]).forEach(slot => {
        if (data["slots"][slot]["name"] == currentId) {
            playerData = data["slots"][slot]["character"]
        }
    });
    inquirer.prompt([{type: 'list', name: "choice", message: "What would you like to do?", choices: ["Battle", "Check inventory", "Check quests", "Check market"]
    }]).then((answers) => {
        if (answers.choice == "Battle") {
            Battle();
        } else if (answers.choice == "Check quests") {
            CheckQuests();
        } else if (answers.choice == "Check inventory") {
            CheckInventory();
        } else if (answers.choice == "Check market") {
            CheckMarket();
        }
    }
    )

    // Ask what you would like to do
    console.log(playerData)
}

function Game() {
    let savesList = [];
    const data = JSON.parse(fs.readFileSync("game.json", "utf8"))
    Object.keys(data["slots"]).forEach(slot => {
        savesList.push(`${data["slots"][slot]["name"]}`)
    });
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a save slot", choices: savesList
    }]).then((answers) => {
        if (answers.choice.includes("New slot")) {
            inquirer.prompt([{type: 'input', name: "choice", message: "Name your save slot"
            }]).then((answers2) => {
                if (savesList.includes(answers2.choice)) {
                    console.log(chalk.red("That slot already exists"))
                } else {
                    const index = answers.choice.split(" ")[2]
                    data["slots"][index]["name"] = answers2.choice
                    fs.writeFile('game.json', JSON.stringify(data), err => {
                        if (err) {
                          console.error(err);
                        }
                        GameLoop(answers2.choice)
                    });
                }
            })
        } else {
            GameLoop(answers.choice)
        }
    })
}

Game()