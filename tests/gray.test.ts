import { readFileSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

import { runFixtureVerification } from "../src/verifier";

const FIXED_TIME = "2026-05-30T00:00:00Z";

function readFixture(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

const explanationRaw = readFixture("examples/gray-case/explanation.txt");
const expectedRaw = readFixture("examples/gray-case/expected-result.json");

const output = runFixtureVerification({
  envelopeRaw: "",
  explanationRaw,
  fixedVerificationTime: FIXED_TIME
});

const expected = JSON.parse(expectedRaw).adap_citizen_verification_result;

assert.equal(output.result.result_level, "gray");
assert.equal(
  output.result.plain_language_result,
  "This decision cannot be independently checked with the materials provided."
);

assert.equal(output.result.decision_id, null);
assert.equal(output.result.envelope_status, "missing");
assert.equal(output.result.schema_status, "not_checkable");
assert.equal(output.result.reconstruction_status, "not_possible");
assert.equal(output.result.hash_status, "not_checkable");
assert.equal(output.result.signature_status, "not_checkable");
assert.equal(output.result.timestamp_status, "not_checkable");
assert.equal(output.result.explanation_match_status, "not_checkable");

assert.ok(output.result.missing_fields.includes("adap_envelope"));
assert.ok(output.result.missing_fields.includes("decision_id"));
assert.ok(output.result.missing_fields.includes("committed_record"));
assert.ok(output.result.missing_fields.includes("committed_hash"));
assert.ok(output.result.missing_fields.includes("hash_algorithm"));
assert.ok(output.result.missing_fields.includes("public_key"));
assert.ok(output.result.missing_fields.includes("signature"));
assert.ok(output.result.missing_fields.includes("timestamp_evidence"));
assert.ok(output.result.missing_fields.includes("reconstruction_rules"));

assert.ok(
  output.result.dependency_warnings.includes(
    "verification_path_not_exercisable"
  )
);

assert.deepEqual(output.result.mismatches ?? [], []);

assert.deepEqual(
  output.result.does_not_prove,
  expected.does_not_prove
);

assert.ok(output.result.modules_run.includes("check_envelope_presence"));
assert.ok(output.result.modules_run.includes("analyze_dependencies"));
assert.ok(output.result.modules_run.includes("generate_result"));

assert.ok(output.result.modules_skipped.includes("parse_envelope"));
assert.ok(output.result.modules_skipped.includes("validate_schema"));
assert.ok(output.result.modules_skipped.includes("check_hash"));
assert.ok(output.result.modules_skipped.includes("full_signature_validation"));
assert.ok(output.result.modules_skipped.includes("external_timestamp_validation"));
assert.ok(output.result.modules_skipped.includes("compare_explanation"));

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_adap_envelope"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_reconstruction_rules"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_public_key"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_timestamp_evidence"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_downloadable_verification_package"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_human_review"
  )
);

assert.equal(
  output.exportable.adap_citizen_verification_result.result_level,
  "gray"
);

assert.equal(output.diagnostics.envelopeParseOk, false);
assert.equal(output.diagnostics.explanationProvided, true);
assert.equal(output.diagnostics.explanationCompared, false);

console.log("gray-case passed");
