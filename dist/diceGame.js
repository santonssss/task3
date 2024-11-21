"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceGame = void 0;
const readlineSync = __importStar(require("readline-sync"));
const fairRandom_1 = require("./fairRandom");
class DiceGame {
    constructor(dice) {
        this.dice = dice;
    }
    start() {
        console.log("Добро пожаловать в игру с кубиками!");
        this.determineFirstMove();
    }
    determineFirstMove() {
        console.log("Давайте определим, кто ходит первым.");
        const fairRandom = new fairRandom_1.FairRandom(0, 1);
        console.log(`Я выбрал число 0 или 1 (HMAC=${fairRandom.getHMAC()}). Угадайте его:`);
        const userChoice = this.getUserChoice(["0", "1"], "Ваш выбор:");
        if (userChoice === -1) {
            console.log("Выход из игры.");
            return;
        }
        const computerChoice = fairRandom.getNumber(userChoice, 2);
        console.log(`Мой выбор: ${computerChoice} (KEY=${fairRandom.revealKey()}).`);
        console.log(computerChoice === userChoice ? "Вы начинаете!" : "Я начинаю!");
        this.playGame(computerChoice === userChoice);
    }
    getUserChoice(options, prompt) {
        const userChoice = readlineSync.keyInSelect(options, prompt);
        if (userChoice === -1) {
            console.log("Выход из игры.");
            return -1;
        }
        return userChoice;
    }
    playGame(userStarts) {
        let userScore = 0;
        let computerScore = 0;
        let round = 1;
        while (true) {
            console.log(`Раунд ${round}:`);
            if (userStarts) {
                console.log("Ваш ход!");
                if (!this.confirmRoll("Вы"))
                    break;
                userScore += this.rollDice("Вы");
                if (this.checkWinner(userScore, computerScore))
                    break;
                console.log("Мой ход!");
                computerScore += this.rollDice("Компьютер");
                if (this.checkWinner(userScore, computerScore))
                    break;
            }
            else {
                console.log("Мой ход!");
                computerScore += this.rollDice("Компьютер");
                if (this.checkWinner(userScore, computerScore))
                    break;
                console.log("Ваш ход!");
                if (!this.confirmRoll("Вы"))
                    break;
                userScore += this.rollDice("Вы");
                if (this.checkWinner(userScore, computerScore))
                    break;
            }
            round++;
        }
        this.askToPlayAgain();
    }
    confirmRoll(player) {
        const userInput = readlineSync
            .question(`Вы, хотите бросить кубик? (Введите '?' для справки) [y/n]: `)
            .trim();
        if (userInput === "?") {
            this.showHelp();
            return false;
        }
        if (userInput.toLowerCase() === "n") {
            console.log(`${player} отменил ход.`);
            return false;
        }
        if (userInput.toLowerCase() === "y") {
            return true;
        }
        console.log("Некорректный ввод. Пожалуйста, введите 'y' для продолжения или 'n' для отмены.");
        return this.confirmRoll(player);
    }
    rollDice(player) {
        console.log(`${player}, кидаю кубик...`);
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        console.log(`${player} выбросил ${diceRoll}`);
        return diceRoll;
    }
    showHelp() {
        console.log(`
      Правила игры:
      Это простая игра с кубиками между вами и компьютером.
      
      - В каждом раунде вы и компьютер по очереди кидаете кубики.
      - У каждого из вас есть свой ход. Вы можете нажать "y" или "n", чтобы подтвердить ваш ход.
      - Кубик имеет 6 сторон, и результат броска варьируется от 1 до 6.
      - Побеждает тот, кто первым наберет 20 очков.

      Управление:
      - Чтобы сделать ход, просто подтвердите его, нажав "y".
      - Чтобы отменить ход, нажмите "n".
      - В любой момент вы можете ввести '?' для вывода этого сообщения.

      Начать игру можно, следуя подсказкам.
    `);
    }
    checkWinner(userScore, computerScore) {
        if (userScore >= 20) {
            console.log(`Поздравляем! Вы победили! Ваш итоговый счет: ${userScore}, счет компьютера: ${computerScore}`);
            return true;
        }
        else if (computerScore >= 20) {
            console.log(`Извините, вы проиграли. Победил компьютер! Его итоговый счет: ${computerScore}, ваш счет: ${userScore}`);
            return true;
        }
        return false;
    }
    askToPlayAgain() {
        const playAgain = readlineSync.keyInYNStrict("Хотите сыграть снова?");
        if (playAgain) {
            this.start();
        }
        else {
            console.log("Спасибо за игру!");
        }
    }
}
exports.DiceGame = DiceGame;
