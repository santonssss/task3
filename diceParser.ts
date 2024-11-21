export class DiceParser {
  static parse(args: string[]): number[][] {
    if (args.length < 3) {
      throw new Error("Ошибка: должно быть минимум три кубика.");
    }

    const dice: number[][] = args.map((arg, index) => {
      const sides = arg.split(",").map((side) => {
        const num = parseInt(side, 10);
        if (isNaN(num)) {
          throw new Error(
            `Ошибка: Кубик ${
              index + 1
            } содержит недопустимое значение "${side}".`
          );
        }
        return num;
      });

      if (sides.length !== 6) {
        throw new Error(
          `Ошибка: Кубик ${index + 1} должен содержать ровно 6 значений.`
        );
      }
      return sides;
    });

    return dice;
  }
}
