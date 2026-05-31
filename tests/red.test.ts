import { readFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

import { runFixtureVerification } from "../src/verifier";

const FIXED_TIME = "2026-05-30T00:00:00Z";

function readFixture(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

const envelopeRaw = readFixture("examples/red-case/envelope.json");
const explanationRaw = readFixture("examples/red-case/explanation.json");
const expectedRaw = readFixture("examples/red-case/expected-result.json");

const output = runFixtureVerification({
  envelopeRaw,
  explanationRaw,
  fixedVerificationTime: FIXED_TIME
});

const expected = JSON.parse(expectedRaw).adap_citizen_verification_result;

assert.equal(output.result.result_level, "red");
assert.equal(
  output.result.plain_language_result,
  "The explanation does not appear to match the committed record."
);

assert.equal(output.result.decision_id, "red-credit-001");
assert.equal(output.result.envelope_status, "present");
assert.equal(output.result.schema_status, "valid");
assert.equal(output.result.reconstruction_status, "successful");
assert.equal(output.result.hash_status, "demo_placeholder_not_fully_checked");
assert.equal(output.result.signature_status, "present_not_fully_checked");
assert.equal(
  output.result.timestamp_status,
  "present_not_independently_verified"
);
assert.equal(output.result.explanation_match_status, "failed");

assert.deepEqual(output.result.missing_fields, []);
assert.deepEqual(output.result.dependency_warnings, []);

assert.ok(output.result.mismatches);
assert.equal(output.result.mismatches.length, 3);

assert.deepEqual(output.result.mismatches, expected.mismatches);

assert.ok(
  output.result.mismatches.some(
    (mismatch) =>
      mismatch.field === "reason_code" &&
      mismatch.committed_value === "risk_score_threshold" &&
      mismatch.explanation_value === "income_threshold"
  )
);

assert.ok(
  output.result.mismatches.some(
    (mismatch) =>
      mismatch.field === "threshold" &&
      mismatch.committed_value === "risk_score_minimum" &&
      mismatch.explanation_value === "minimum_income_required"
  )
);

assert.deepEqual(
  output.result.does_not_prove,
  expected.does_not_prove
);

assert.ok(output.result.modules_run.includes("parse_envelope"));
assert.ok(output.result.modules_run.includes("validate_schema"));
assert.ok(output.result.modules_run.includes("compare_explanation"));
assert.ok(output.result.modules_run.includes("analyze_dependencies"));
assert.ok(output.result.modules_run.includes("generate_result"));

assert.ok(output.result.modules_skipped.includes("full_hash_validation"));
assert.ok(output.result.modules_skipped.includes("full_signature_validation"));
assert.ok(output.result.modules_skipped.includes("external_timestamp_validation"));

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_human_review"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "ask_institution_to_explain_mismatch"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "share_report_with_lawyer_regulator_auditor_or_advocate"
  )
);

assert.equal(
  output.exportable.adap_citizen_verification_result.result_level,
  "red"
);

assert.equal(output.diagnostics.envelopeParseOk, true);
assert.equal(output.diagnostics.envelopeParseError, null);
assert.equal(output.diagnostics.explanationProvided, true);
assert.equal(output.diagnostics.explanationCompared, true);

console.log("red-case passed");
