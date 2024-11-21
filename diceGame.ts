import * as readlineSync from "readline-sync";
import { FairRandom } from "./fairRandom";

export class DiceGame {
  private dice: number[][];

  constructor(dice: number[][]) {
    this.dice = dice;
  }

  start(): void {
    console.log("Добро пожаловать в игру с кубиками!");
    this.determineFirstMove();
  }

  private determineFirstMove(): void {
    console.log("Давайте определим, кто ходит первым.");
    const fairRandom = new FairRandom(0, 1);
    console.log(
      `Я выбрал число 0 или 1 (HMAC=${fairRandom.getHMAC()}). Угадайте его:`
    );
    const userChoice = this.getUserChoice(["0", "1"], "Ваш выбор:");

    if (userChoice === -1) {
      console.log("Выход из игры.");
      return;
    }

    const computerChoice = fairRandom.getNumber(userChoice, 2);
    console.log(
      `Мой выбор: ${computerChoice} (KEY=${fairRandom.revealKey()}).`
    );
    console.log(computerChoice === userChoice ? "Вы начинаете!" : "Я начинаю!");

    this.playGame(computerChoice === userChoice);
  }

  private getUserChoice(options: string[], prompt: string): number {
    const userChoice = readlineSync.keyInSelect(options, prompt);
    if (userChoice === -1) {
      console.log("Выход из игры.");
      return -1;
    }
    return userChoice;
  }

  private playGame(userStarts: boolean): void {
    let userScore = 0;
    let computerScore = 0;
    let round = 1;

    while (true) {
      console.log(`Раунд ${round}:`);

      if (userStarts) {
        console.log("Ваш ход!");
        if (!this.confirmRoll("Вы")) break;
        userScore += this.rollDice("Вы");
        if (this.checkWinner(userScore, computerScore)) break;

        console.log("Мой ход!");
        computerScore += this.rollDice("Компьютер");
        if (this.checkWinner(userScore, computerScore)) break;
      } else {
        console.log("Мой ход!");
        computerScore += this.rollDice("Компьютер");
        if (this.checkWinner(userScore, computerScore)) break;

        console.log("Ваш ход!");
        if (!this.confirmRoll("Вы")) break;
        userScore += this.rollDice("Вы");
        if (this.checkWinner(userScore, computerScore)) break;
      }

      round++;
    }

    this.askToPlayAgain();
  }

  private confirmRoll(player: string): boolean {
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

    console.log(
      "Некорректный ввод. Пожалуйста, введите 'y' для продолжения или 'n' для отмены."
    );
    return this.confirmRoll(player);
  }

  private rollDice(player: string): number {
    console.log(`${player}, кидаю кубик...`);
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(`${player} выбросил ${diceRoll}`);
    return diceRoll;
  }

  private showHelp(): void {
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

  private checkWinner(userScore: number, computerScore: number): boolean {
    if (userScore >= 20) {
      console.log(
        `Поздравляем! Вы победили! Ваш итоговый счет: ${userScore}, счет компьютера: ${computerScore}`
      );
      return true;
    } else if (computerScore >= 20) {
      console.log(
        `Извините, вы проиграли. Победил компьютер! Его итоговый счет: ${computerScore}, ваш счет: ${userScore}`
      );
      return true;
    }
    return false;
  }

  private askToPlayAgain(): void {
    const playAgain = readlineSync.keyInYNStrict("Хотите сыграть снова?");
    if (playAgain) {
      this.start();
    } else {
      console.log("Спасибо за игру!");
    }
  }
}
