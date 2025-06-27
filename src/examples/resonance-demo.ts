import { PUTMANWaveAnalyzer } from '../modules/PUTMANWaveAnalyzer'
import { ResonanceEngine }    from '../engine/ResonanceEngine'

const sample: string[] = ['hello', 'world', 'this', 'is', 'a', 'test']
const analyzer = PUTMANWaveAnalyzer
const engine = new ResonanceEngine()

console.log(analyzer.analyze(sample, []))
console.log(engine.run(sample))