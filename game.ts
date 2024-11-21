import { DiceParser } from "./diceParser";
import { RandomGenerator } from "./randomGenerator";
import { FairRandom } from "./fairRandom";
import { DiceGame } from "./diceGame";
import { ProbabilityTable } from "./probabilityTable";

const args = process.argv.slice(2);

try {
  const dice = DiceParser.parse(args);
  const game = new DiceGame(dice);
  game.start();
} catch (error: any) {
  console.error(error.message);
  console.log("Использование: node game.js <кубик1> <кубик2> [<кубик3> ...]");
  console.log("Пример: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
}
