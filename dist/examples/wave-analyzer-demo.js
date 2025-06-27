"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sample = [];
console.table(sample.map((n) => ({
    score: n.symbolicScore,
    when: n.timestamp
})));
