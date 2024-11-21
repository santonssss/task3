import { RandomGenerator } from "./randomGenerator";

export class FairRandom {
  private key: string;
  private number: number;
  private hmac: string;

  constructor(min: number, max: number) {
    this.key = RandomGenerator.generateKey();
    this.number = RandomGenerator.generateSecureNumber(min, max);
    this.hmac = RandomGenerator.calculateHMAC(this.key, this.number.toString());
  }

  getHMAC(): string {
    return this.hmac;
  }

  getNumber(userNumber: number, range: number): number {
    return (this.number + userNumber) % range;
  }

  revealKey(): string {
    return this.key;
  }
}
