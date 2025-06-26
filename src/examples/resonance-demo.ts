import { PUTMANWaveAnalyzer } from '../analyzers/PUTMANWaveAnalyzer'
import { ResonanceEngine }    from '../engine/ResonanceEngine'

const sample: number[] = []
const analyzer = new PUTMANWaveAnalyzer()
const engine = new ResonanceEngine()

console.log(analyzer.analyze(sample))
console.log(engine.run(sample))
