"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FairRandom = void 0;
const randomGenerator_1 = require("./randomGenerator");
class FairRandom {
    constructor(min, max) {
        this.key = randomGenerator_1.RandomGenerator.generateKey();
        this.number = randomGenerator_1.RandomGenerator.generateSecureNumber(min, max);
        this.hmac = randomGenerator_1.RandomGenerator.calculateHMAC(this.key, this.number.toString());
    }
    getHMAC() {
        return this.hmac;
    }
    getNumber(userNumber, range) {
        return (this.number + userNumber) % range;
    }
    revealKey() {
        return this.key;
    }
}
exports.FairRandom = FairRandom;
