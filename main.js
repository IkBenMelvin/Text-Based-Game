import inquirer from 'inquirer';
import chalk from 'chalk';

let family;
// Max =50
let currentDay = 99;
let days = 1;
// if (currentDay) ++days

function Questions() {
    let question;
    if (family) {
        question = "You hear some rumbling outside, should you send someone to go and see what is happening?";
    } else {
        question = "You hear some rumbling outside, should you go and see what is happening?";
    }
    inquirer.prompt([{type: 'confirm', name: "choice", message: question
    }]).then((answers) => {
        if (answers.choice) {
            if (Math.floor(Math.random() * 100) + currentDay > currentDay) {
                console.log("You look what is going on outside, you see a person in the distance and you suddenly trip. You trip over a box of matches. You go back to safety and return with a box of matches.")
            } else {
                console.log("There is a hostile person which does not want to be friends. You get stabbed. Restart?")
            }
        } else {
            console.log("You stay inside and you decide to be safe and not go out looking for what people are doing. ")
        }
    })
}

function GameLoop() {
    console.log("Welcome to the game nuclear warfare, in this game you either choose to hide or flee from a evil hacker that is taking over the world.\n");
    inquirer.prompt([{type: 'list', name: "choice", message: "Choose to hide or flee", choices: ["Hide", "Flee"]
    }]).then((answers) => {
        if (answers.choice == "Hide") {
            console.log("You grabbed 5 soup cans and 5 water bottles in the hurry you were in to hide.")
            inquirer.prompt([{type: 'confirm', name: "choice", message: "Do you want to live in the bunker with your family?"
            }]).then((answers) => {
                if (answers.choice) {
                    family = true;
                    console.log("You decided you want to live with your family");
                    Questions()
                } else {
                    family = false;
                    console.log("You decided you want to be alone.")
                    Questions()
                }
            })
        } else if (answers.choice == "Flee") {
            console.log("bye")
        }
    })
}

GameLoop()