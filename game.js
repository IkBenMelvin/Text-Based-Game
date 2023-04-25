import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

function Battle(playerData) {
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose a action", choices: ["Fight", "Abilities", "Inventory", "Escape"]
    }]).then((answers) => {
        
    })
}

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
}


function CheckQuests(playerData, currentSave) {
    if (playerData["quests"].length == 0) {
        console.log(chalk.red("You have no quests"))
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
            console.log(`${quest.name} ${quest.progress}/${quest.goal}`)
        }
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