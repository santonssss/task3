import { randomBytes } from "crypto";
import { createHmac } from "crypto";
export class RandomGenerator {
  static generateSecureNumber(min: number, max: number): number {
    const range = max - min + 1;
    let random: number;

    do {
      random = randomBytes(4).readUInt32BE(0) % range;
    } while (random >= range);

    return random + min;
  }

  static generateKey(): string {
    return randomBytes(32).toString("hex");
  }

  static calculateHMAC(key: string, message: string): string {
    return createHmac("sha3-256", key).update(message).digest("hex");
  }
}
