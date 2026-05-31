import assert from "node:assert/strict";

import { runFixtureVerification } from "../src/verifier";

const FIXED_TIME = "2026-05-30T00:00:00Z";

const envelopeRaw = "";
const explanationRaw = "";

const output = runFixtureVerification({
  envelopeRaw,
  explanationRaw,
  fixedVerificationTime: FIXED_TIME
});

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

assert.deepEqual(output.result.mismatches ?? [], []);

assert.ok(
  output.result.dependency_warnings.includes(
    "verification_path_not_exercisable"
  )
);

assert.ok(output.result.does_not_prove.includes("truth"));
assert.ok(output.result.does_not_prove.includes("fairness"));
assert.ok(output.result.does_not_prove.includes("legality"));
assert.ok(output.result.does_not_prove.includes("correctness"));
assert.ok(output.result.does_not_prove.includes("accountability"));

assert.ok(output.result.modules_run.includes("generate_result"));

assert.ok(output.result.modules_skipped.includes("validate_schema"));
assert.ok(output.result.modules_skipped.includes("compare_explanation"));
assert.ok(output.result.modules_skipped.includes("full_hash_validation"));
assert.ok(output.result.modules_skipped.includes("full_signature_validation"));
assert.ok(output.result.modules_skipped.includes("external_timestamp_validation"));

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_adap_envelope"
  )
);

assert.ok(
  output.result.recommended_next_steps.includes(
    "request_downloadable_verification_package"
  )
);

assert.equal(
  output.exportable.adap_citizen_verification_result.result_level,
  "gray"
);

assert.equal(output.diagnostics.envelopeParseOk, false);
assert.equal(output.diagnostics.explanationProvided, false);
assert.equal(output.diagnostics.explanationCompared, false);

console.log("gray-case passed");
