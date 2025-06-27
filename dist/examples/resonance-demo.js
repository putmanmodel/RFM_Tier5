"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PUTMANWaveAnalyzer_1 = require("../modules/PUTMANWaveAnalyzer");
const ResonanceEngine_1 = require("../engine/ResonanceEngine");
const sample = ['hello', 'world', 'this', 'is', 'a', 'test'];
const analyzer = PUTMANWaveAnalyzer_1.PUTMANWaveAnalyzer;
const engine = new ResonanceEngine_1.ResonanceEngine();
console.log(analyzer.analyze(sample, []));
console.log(engine.run(sample));
