import { PUTMANWaveAnalyzer } from '../modules/PUTMANWaveAnalyzer'
import { WaveNode }           from '../types/WaveNode'

const sample: WaveNode[] = []

console.table(
  sample.map((n: WaveNode) => ({
    score: n.symbolicScore,
    when:  n.timestamp
  }))
)
