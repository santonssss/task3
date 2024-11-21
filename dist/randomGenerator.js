"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomGenerator = void 0;
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
class RandomGenerator {
    static generateSecureNumber(min, max) {
        const range = max - min + 1;
        let random;
        do {
            random = (0, crypto_1.randomBytes)(4).readUInt32BE(0) % range;
        } while (random >= range);
        return random + min;
    }
    static generateKey() {
        return (0, crypto_1.randomBytes)(32).toString("hex");
    }
    static calculateHMAC(key, message) {
        return (0, crypto_2.createHmac)("sha3-256", key).update(message).digest("hex");
    }
}
exports.RandomGenerator = RandomGenerator;
