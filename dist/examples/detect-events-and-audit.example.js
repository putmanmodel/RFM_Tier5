"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WaveformNormalizer_1 = require("../modules/WaveformNormalizer");
const npc_fixture_1 = require("./npc-fixture"); // has .waves & .profile
const { events, rationale } = WaveformNormalizer_1.WaveformNormalizer.detectEventsAndAudit(npc_fixture_1.npc.waves, npc_fixture_1.npc.profile, { threshold: 0.3, minEventsToAudit: 1 });
console.log('Detected Events:', events);
if (rationale)
    console.log('SelfAudit Rationale:', rationale);
