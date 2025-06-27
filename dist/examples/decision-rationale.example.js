"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SelfAudit_1 = require("../modules/SelfAudit");
const npc_fixture_1 = require("./npc-fixture");
// example stubs
const { waves, profile, currentState } = npc_fixture_1.npc;
const stateTag = 'INITIAL';
const rationale = SelfAudit_1.SelfAudit.review(waves, profile);
npc_fixture_1.npc.currentState = stateTag;
