# RFM Tier 5.0

> It’s time to FEEL what the future of AI has to offer.

[![npm version](https://img.shields.io/npm/v/rfm_tier5)](https://www.npmjs.com/package/rfm_tier5)
[![License](https://img.shields.io/badge/license-BY--NC%204.0-lightgrey)](https://creativecommons.org/licenses/by-nc/4.0/)

An emotion-driven AI toolkit for waveform normalization, event detection, self-audit, analysis and simulation engines—fully written in TypeScript.

---

## 🚀 Features

- **WaveformNormalizer**  
  Normalize raw `WaveNode[]`, detect emotional “spikes,” and trigger a human-readable self-audit.

- **SelfAudit & DecisionRationale**  
  Transform low-level events into plain-English rationale and decision tags.

- **Analyzers**
  - `PUTMANWaveAnalyzer`: extract high-level emotional patterns from waveforms.

- **Engines**
  - `NPC`: stateful, emotion-aware virtual agent.
  - `ResonanceEngine`: simulate resonance patterns over input waveforms.

- **Type-Safe API**  
  Strict TypeScript definitions (`WaveNode`, `EmotionalProfile`, etc.), zero unchecked imports or implicit anys.

- **Ready-to-Run Examples**  
  six demos in `src/examples/` illustrating the full pipeline.

---

## 🏁 Getting Started

### 📦 Install from npm

```bash
npm install rfm_tier5
```

### 🛠️ Clone & Build Locally

```bash
git clone https://github.com/putmanmodel/RFM_Tier5.git
cd RFM_Tier5
npm install
npm run build
```

### 🔁 Import & Use

```ts
import { WaveformNormalizer } from 'rfm_tier5/modules/WaveformNormalizer'
import { EmotionalProfile }   from 'rfm_tier5/types/EmotionalProfile'
import type { WaveNode }      from 'rfm_tier5/types/WaveNode'

const waves: WaveNode[]         = /* your waveform data */
const profile: EmotionalProfile = /* your emotional profile */

const { events, rationale } = WaveformNormalizer.detectEventsAndAudit(
  waves,
  profile,
  { threshold: 0.5, minEventsToAudit: 3 }
)

console.log('Detected events:', events)
if (rationale) console.log('Audit rationale:', rationale)
```

### 🔍 Explore Examples

```bash
node dist/examples/decision-rationale.example.js
node dist/examples/demo-shopkeeper.js
node dist/examples/wave-analyzer-demo.js
# …and more in dist/examples/
```

---

## 📂 Project Structure

```
.
├── README.md
├── LICENSE
├── package.json
├── tsconfig.json
└── src
    ├── assets
    │   └── .gitkeep
    ├── analyzers
    │   └── PUTMANWaveAnalyzer.ts
    ├── engine
    │   ├── NPC.ts
    │   └── ResonanceEngine.ts
    ├── modules
    │   ├── WaveformNormalizer.ts
    │   ├── SelfAudit.ts
    │   └── DecisionRationale.ts
    ├── types
    │   ├── WaveNode.ts
    │   ├── EmotionalProfile.ts
    │   ├── FieldVector.ts
    │   └── ToneVector.ts
    └── examples
        ├── npc-fixture.ts
        ├── decision-rationale.example.ts
        ├── demo-shopkeeper.ts
        ├── detect-events-and-audit.example.ts
        ├── resonance-demo.ts
        └── wave-analyzer-demo.ts
```

---

## 🛣️ Roadmap & HUD Preview

Tier 5.0 delivers the core emotion-AI pipeline.

In the next release (`v1.1.0`), we’ll introduce an interactive Heads-Up Display (HUD) that:

- Renders live waveform charts  
- Highlights detected events & displays audit rationale  
- Allows on-the-fly parameter tweaking (thresholds, decay rates)  
- Integrates with the NPC state machine for immersive demos

---

## 🤝 Contributing

- Fork the repo  
- Create a feature branch  
- Open a pull request  
- Discuss & iterate

Please follow existing TypeScript conventions and add tests/examples for new features.

---

## ⚖️ License

This project is licensed under Creative Commons Attribution-NonCommercial 4.0 International.  
See `LICENSE` for details.

---

## 📬 Contact

- Email: [putmanmodel@pm.me](mailto:putmanmodel@pm.me)  
- Twitter/X: [@putmanmodel](https://twitter.com/putmanmodel)  
- Reddit: [u/putmanmodel](https://www.reddit.com/user/putmanmodel)  
- Homepage: [github.com/putmanmodel](https://github.com/putmanmodel)
