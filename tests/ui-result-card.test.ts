import { readFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

import { runFixtureVerification } from "../src/verifier";
import {
  buildResultCard,
  getResultAriaLabel,
  getResultBadge,
  getResultHeadline,
  getResultTone,
  getResultTitle,
  isCriticalResult,
  shouldShowEscalationHint
} from "../src/ui";

const FIXED_TIME = "2026-05-30T00:00:00Z";

function readFixture(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

const envelopeRaw = readFixture("examples/green-case/envelope.json");
const explanationRaw = readFixture("examples/green-case/explanation.json");

const output = runFixtureVerification({
  envelopeRaw,
  explanationRaw,
  fixedVerificationTime: FIXED_TIME
});

const result = output.result;
const card = buildResultCard(result);

assert.equal(card.level, "green");
assert.equal(card.tone, "success");
assert.equal(card.badge, "Green");

assert.equal(
  card.title,
  "Explanation matches the committed record"
);

assert.equal(
  card.headline,
  "The explanation appears consistent with the record."
);

assert.equal(
  card.plainLanguageResult,
  "The explanation appears to match the committed record."
);

assert.equal(card.decisionId, "green-credit-001");

assert.ok(
  card.summary.includes(
    "does not prove that the decision was fair, lawful, correct, or accountable"
  )
);

assert.equal(
  card.limitationNotice,
  result.limitation_notice
);

assert.equal(card.primaryAction.id, "download_report");
assert.equal(card.primaryAction.label, "Download report");

assert.equal(card.sections.mismatches.items.length, 0);
assert.equal(
  card.sections.mismatches.emptyText,
  "No mismatches were reported."
);

assert.equal(card.sections.missing.items.length, 0);
assert.equal(
  card.sections.missing.emptyText,
  "No missing fields were reported."
);

assert.equal(card.sections.dependencies.items.length, 0);
assert.equal(
  card.sections.dependencies.emptyText,
  "No dependency warnings were reported."
);

assert.ok(
  card.sections.skipped.items.includes("full_hash_validation")
);

assert.ok(
  card.sections.skipped.items.includes("full_signature_validation")
);

assert.ok(
  card.sections.skipped.items.includes("external_timestamp_validation")
);

assert.ok(
  card.sections.doesNotProve.items.includes("truth")
);

assert.ok(
  card.sections.doesNotProve.items.includes("fairness")
);

assert.ok(
  card.sections.doesNotProve.items.includes("legality")
);

assert.ok(
  card.sections.doesNotProve.items.includes("correctness")
);

assert.ok(
  card.sections.doesNotProve.items.includes("accountability")
);

assert.equal(card.technical.envelopeStatus, "present");
assert.equal(card.technical.schemaStatus, "valid");
assert.equal(card.technical.reconstructionStatus, "successful");
assert.equal(
  card.technical.hashStatus,
  "demo_placeholder_not_fully_checked"
);
assert.equal(
  card.technical.signatureStatus,
  "present_not_fully_checked"
);
assert.equal(
  card.technical.timestampStatus,
  "present_not_independently_verified"
);
assert.equal(card.technical.explanationMatchStatus, "matched");

assert.ok(card.technical.modulesRun.includes("parse_envelope"));
assert.ok(card.technical.modulesRun.includes("validate_schema"));
assert.ok(card.technical.modulesRun.includes("compare_explanation"));
assert.ok(card.technical.modulesRun.includes("analyze_dependencies"));
assert.ok(card.technical.modulesRun.includes("generate_result"));

assert.equal(getResultTone("green"), "success");
assert.equal(getResultTone("yellow"), "warning");
assert.equal(getResultTone("red"), "danger");
assert.equal(getResultTone("gray"), "neutral");

assert.equal(getResultBadge("green"), "Green");
assert.equal(
  getResultTitle("green"),
  "Explanation matches the committed record"
);
assert.equal(
  getResultHeadline("green"),
  "The explanation appears consistent with the record."
);

assert.equal(isCriticalResult("green"), false);
assert.equal(isCriticalResult("yellow"), false);
assert.equal(isCriticalResult("red"), true);
assert.equal(isCriticalResult("gray"), true);

assert.equal(shouldShowEscalationHint("green"), false);
assert.equal(shouldShowEscalationHint("yellow"), true);
assert.equal(shouldShowEscalationHint("red"), true);
assert.equal(shouldShowEscalationHint("gray"), true);

assert.equal(
  getResultAriaLabel(result),
  "Green result. The explanation appears to match the committed record."
);

console.log("ui-result-card passed");
