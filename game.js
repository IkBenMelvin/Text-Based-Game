import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import { randomInt } from "crypto";

function test() {
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Attack", "Defend", "Escape"]
    }]).then((answers) => {
        if (answers.choice == "Attack") {
            // enemyHealth -= damage;
            // currentHealth -= enemyDamage;
            console.log("You attacked the enemy.")
        }
        if (answers.choice == "Defend") {
            currentHealth += damage;
        }
        if (answers.choice == "Escape") {
            console.log("You escaped.");
            // break;
        }
        return true;
        // nextChoice = true;
    })
}
async function Battle(playerData) {
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Fight", "Abilities", "Inventory", "Escape"]
    }]).then((answers) => {
        if (answers.choice == "Fight") {
            let nextChoice = true;
            const currentLevel = 1;
            let currentHealth = playerData["maxhealth"];
            let enemyHealth = randomInt(currentLevel * 100, currentLevel * 200);
            const damage = randomInt(10, 20);
            const enemyDamage = randomInt(currentLevel * 10, currentLevel * 20);
            console.log(chalk.red(chalk.bold("You found the hacker and you decide you want to fight him.")))
            while (nextChoice) {
                console.log(chalk.red(`❤️  ${currentHealth}`));
                console.log(chalk.green(`💚 ${enemyHealth}`));
                if (currentHealth <= 0) {
                    console.log(chalk.red("You died."));
                    break;
                }
                if (enemyHealth <= 0) {
                    console.log("You won.");
                    break;
                }
                nextChoice = false;
                if (test()) {
                    nextChoice = true;
                };
            //     await inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Attack", "Defend", "Escape"]
            //     }]).then((answers) => {
            //         if (answers.choice == "Attack") {
            //             enemyHealth -= damage;
            //             currentHealth -= enemyDamage;
            //             console.log("You attacked the enemy.")
            //         }
            //         if (answers.choice == "Defend") {
            //             currentHealth += damage;
            //         }
            //         if (answers.choice == "Escape") {
            //             console.log("You escaped.");
            //             // break;
            //         }
            //         // nextChoice = true;
            // })
            }
        }
    })
}
function CheckMarket(playerData){
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Buy", "Sell", "Exit"]
    }]).then((answers) => {
        if (answers.choice == "Buy") {
            inquirer.prompt([{type: 'list', name: "choice", message: "Choose a item", choices: ["Carrot", "Potato", "Sword", "Exit"]
            }]).then((answers2) => {
                if (answers2.choice == "Potato") {
                    console.log("Would you like to buy a potato for 10 coins?");
                    if (playerData["coins"] >= 10) {
                        playerData["coins"] -= 10;
                        playerData["inventory"].push("Potato");
                    }
                } else if (answers2.choice == "Carrot") {
                    console.log("Would you like to buy a carrot for 10 coins?");
                    inquirer.prompt([{type: 'confirm', name: "choice", message: "Would you like to buy a carrot for 10 coins?"
                    }])
                    .then((answers3) => {
                        if (answers3.choice) {
                            if (playerData["coins"] >= 10) {
                                playerData["coins"] -= 10;
                                playerData["inventory"].push("Carrot");
                                console.log(playerData["inventory"])
                            } else {
                                console.log(chalk.red("You don't have enough coins."));
                            }
                        } else {
                            console.log(chalk.red("Cancelled."));
                        }
                    })
                }
            
            })
        }
    })
}
        // else if (answers.choice == "Sell") { 
        // if (answers.choice == "Sell") {
        //     console.log("Sell");
        // }
        // if (answers.choice == "Exit") {
        //     console.log("Exit");   
        // }

function GenerateQuests(playerData, currentSave) {
    // Array with all sorts of quests.
    const questArray = [
    {"name": "Kill an enemy", "progress": 0, "goal": 1, "reward": 10},
    {"name": "Kill 5 enemies", "progress": 0, "goal": 5, "reward": 50}, 
    {"name": "Kill 10 enemies", "progress": 0, "goal": 10, "reward": 100}, 
    {"name": "Kill 15 enemies", "progress": 0, "goal": 15, "reward": 150},
    {"name": "Kill 20 enemies", "progress": 0, "goal": 20, "reward": 200}, 
    {"name": "Kill 30 enemies", "progress": 0, "goal": 30, "reward": 300}, 
    {"name": "Kill 40 enemies", "progress": 0, "goal": 40, "reward": 400}, 
    {"name": "Kill 50 enemies", "progress": 0, "goal": 50, "reward": 500}, 
    {"name": "Farm 10 carrots", "progress": 0, "goal": 10, "reward": 100},
    {"name": "Farm 25 carrots", "progress": 0, "goal": 25, "reward": 250}, 
    {"name": "Farm 50 carrots", "progress": 0, "goal": 50, "reward": 500}, 
    {"name": "Farm 100 carrots", "progress": 0, "goal": 100, "reward": 1000},
    {"name": "Get a total of 150 coins",  "progress": 0, "goal": 150, "reward": 25}, 
    {"name": "Get a total of 300 coins", "progress": 0, "goal": 300, "reward": 50}, 
    {"name": "Get a total of 500 coins", "progress": 0, "goal": 500, "reward": 75}, 
    {"name": "Get a total of 1000 coins", "progress": 0, "goal": 1000, "reward": 100},
    {"name": "Buy 1 item in the shop", "progress": 0, "goal": 1, "reward": 25},
    {"name": "Buy 5 items in the shop", "progress": 0, "goal": 5, "reward": 50},
    {"name": "Buy 10 items in the shop", "progress": 0, "goal": 10, "reward": 150},
    {"name": "Buy 15 items in the shop", "progress": 0, "goal": 15, "reward": 200},
    {"name": "Buy 20 items in the shop", "progress": 0, "goal": 20, "reward": 250},
    {"name": "Buy 30 items in the shop", "progress": 0, "goal": 30, "reward": 300},
    ]

    // Randomly pick a quest
    const quest = questArray[Math.floor(Math.random() * questArray.length)];
    playerData["quests"].push(quest)
    const data = JSON.parse(fs.readFileSync("game.json", "utf8"))
    Object.keys(data["slots"]).forEach(slot => {
        if (data["slots"][slot]["name"] == currentSave) {
            data["slots"][slot]["character"] = playerData
        }
        // console.log(data["slots"][slot]["character"])
    });
    fs.writeFileSync('game.json', JSON.stringify(data), err => {
        if (err) {
          console.error(err);
        }
    });
    return CheckQuests(playerData, currentSave);
}


function CheckQuests(playerData, currentSave) {
    if (playerData["quests"].length == 0) {
        // console.log(chalk.red("You have no quests"))
        for (let i = 0; i < 5; i++) {
            GenerateQuests(playerData, currentSave);
        }
    } else if (playerData["quests"].length < 6) {
        for (let i = 0; i < (5 - playerData.length); i++) {
            GenerateQuests(playerData, currentSave);
        }
    }
    playerData["quests"].forEach(quest => {
        // Check if progress matches goal
        if (quest["progress"] >= quest["goal"]) {
            // Remove quest from user data
            playerData["quests"].splice(playerData["quests"].indexOf(quest), 1);
            // Add reward to user data
            playerData["coins"] += quest["reward"];
            console.log(chalk.green(`${quest.name} ${quest.progress}/${quest.goal} - ${quest.reward} coins earned`))
            GenerateQuests(playerData, currentSave);
        } else {
            console.log(chalk.yellow(`${quest.name} ${quest.progress}/${quest.goal}`))
        }
    })
    return GameLoop(currentSave)
}

function CheckInventory(playerData, currentSave) {
    const inventory = playerData["inventory"]
    inventory.forEach(item => {
        console.log(item)
    })
    if (inventory.length == 0) {
        console.log(chalk.red("You have no items"));
        inquirer.prompt([{type: 'confirm', name: "choice", message: "Return to menu?"}])
        .then((answer) => {
            if (answer.choice) {
                return GameLoop(currentSave);
            }
            else {
                return CheckInventory(playerData, currentSave);
            }
          });
        } else if (inventory.length >= 1) {
            inquirer.prompt([{type: 'confirm', name: "choice", message: "Return to menu?"}])
            .then((answer) => {
                if (answer.choice) {
                    return GameLoop(currentSave);
                }
                else {
                    return CheckInventory(playerData, currentSave);
                }
                });
}

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
            Battle(playerData, currentId);
        } else if (answers.choice == "Check quests") {
            CheckQuests(playerData, currentId);
        } else if (answers.choice == "Check inventory") {
            CheckInventory(playerData, currentId);
        } else if (answers.choice == "Check market") {
            CheckMarket(playerData, currentId);
        }
    }
    )

    // Ask what you would like to do
    // console.log(playerData)
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