"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diceParser_1 = require("./diceParser");
const diceGame_1 = require("./diceGame");
const args = process.argv.slice(2);
try {
    const dice = diceParser_1.DiceParser.parse(args);
    const game = new diceGame_1.DiceGame(dice);
    game.start();
}
catch (error) {
    console.error(error.message);
    console.log("Использование: node game.js <кубик1> <кубик2> [<кубик3> ...]");
    console.log("Пример: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
}
