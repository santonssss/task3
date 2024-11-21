export class ProbabilityTable {
  static generate(dice: number[][]): void {
    console.log("Таблица вероятностей выигрыша:");
    console.log("--------------------------------");

    for (let i = 0; i < dice.length; i++) {
      for (let j = 0; j < dice.length; j++) {
        if (i === j) continue;

        const winProbability = this.calculateProbability(dice[i], dice[j]);
        console.log(
          `Кубик ${i + 1} против кубика ${j + 1}: ${winProbability.toFixed(2)}%`
        );
      }
    }

    console.log("--------------------------------");
  }

  private static calculateProbability(
    dice1: number[],
    dice2: number[]
  ): number {
    let wins = 0;
    const totalThrows = dice1.length * dice2.length;

    for (const side1 of dice1) {
      for (const side2 of dice2) {
        if (side1 > side2) wins++;
      }
    }

    return (wins / totalThrows) * 100;
  }
}
