# MVP Scope — A-DAP Citizen Verifier App

This document defines the scope of the first MVP for the A-DAP Citizen Verifier App.

The MVP is intentionally narrow.

It is not a full compliance product.

It is not a legal, financial, medical, or regulatory decision tool.

It is a minimal citizen-facing verifier designed to test whether an A-DAP decision record can be exercised by a non-technical user.

## Core MVP Claim

The MVP should allow a user to:

1. Paste or upload an A-DAP envelope.
2. Paste or upload the explanation or decision notice they received.
3. Run basic verification checks.
4. See a plain-language result.
5. See technical details.
6. Export a plain-language report.
7. Export a machine-readable JSON result.

The MVP tests record consistency.

It does not prove truth, fairness, legality, correctness, or accountability.

## MVP Purpose

A-DAP creates reconstructible decision evidence.

But reconstructible evidence is not enough if only specialists can exercise it.

The purpose of this MVP is to demonstrate that a citizen-facing verification path can exist.

The user should not need to understand hashes, signatures, timestamp tokens, canonicalization, custody graphs, or NDC in order to run a basic check.

At the same time, the verification result must remain reproducible and inspectable by someone else.

## MVP User

The MVP is designed for:

- affected people
- advocates
- public defenders
- lawyers
- auditors
- regulators
- journalists
- civil society organizations
- courts
- technical reviewers

The interface should be understandable to a non-technical user.

The exported result should be useful to a technical or institutional reviewer.

## MVP In Scope

The first MVP should include the following features.

### 1. Paste JSON envelope

The user can paste a JSON-based A-DAP envelope into the interface.

The app should attempt to parse the envelope.

Possible outcomes:

- valid JSON
- invalid JSON
- missing required fields
- unsupported schema
- unknown envelope format

### 2. Upload JSON envelope

The user can upload a JSON file containing an A-DAP envelope.

The app should process it locally where possible.

Possible outcomes:

- file loaded
- file unreadable
- invalid JSON
- missing required fields
- unsupported schema

### 3. Paste explanation text

The user can paste the explanation, denial notice, decision statement, or institutional account they received.

The MVP does not need advanced natural language reasoning.

The first comparison can be deterministic and field-based.

### 4. Basic schema validation

The app should check for expected envelope fields.

Minimum fields may include:

- decision ID
- schema version
- committed record or committed record hash
- hash algorithm
- decision output or output commitment
- explanation-relevant fields
- timestamp claim or timestamp evidence status
- signature status or signature metadata
- reconstruction instructions or reconstruction status

The exact schema may evolve.

The MVP should clearly show which fields are present and which are missing.

### 5. Missing-field detection

The app should identify missing fields that limit verification.

Examples:

- missing decision ID
- missing schema version
- missing committed record
- missing committed hash
- missing hash algorithm
- missing policy version
- missing model version
- missing output commitment
- missing explanation mapping
- missing public key
- missing signature
- missing timestamp evidence
- missing reconstruction rules

Missing fields should be shown in plain language.

### 6. Hash consistency check

When enough data is available, the app should compute or compare a SHA-256 hash.

The MVP should support:

- hash match
- hash mismatch
- hash not checkable
- hash algorithm missing
- committed object missing
- committed hash missing

The app should not imply that a hash match proves the decision was fair, lawful, or correct.

### 7. Signature status

The MVP may include a basic signature status field.

If full signature validation is not implemented in v0.1, the app should label it honestly.

Possible statuses:

- valid
- invalid
- missing
- public key missing
- unsupported signature method
- not checked in this MVP

The app should not imply that a valid signature proves input truth, fairness, legality, or correctness.

### 8. Timestamp status

The MVP may include a basic timestamp status field.

If full timestamp validation is not implemented in v0.1, the app should label it honestly.

Possible statuses:

- present
- missing
- externally verifiable
- present but not independently verifiable
- operator-controlled
- not checked in this MVP

The app should not imply that timestamp evidence proves the decision was fair, lawful, or correct.

### 9. Deterministic explanation comparison

The MVP should compare the explanation against committed record fields in a deterministic way.

Examples:

- explanation reason matches committed reason
- explanation reason differs from committed reason
- explanation references policy version not present in envelope
- explanation references threshold not present in envelope
- explanation cannot be compared because required field is missing

The first MVP does not need semantic AI comparison.

It should start with clear field-level comparison.

### 10. Dependency warning checklist

The app should identify when verification still depends on the operator being verified.

Warnings may include:

- envelope available only through operator portal
- public key hosted only by operator
- reconstruction rules hosted only by operator
- timestamp evidence not independently reachable
- verifier interface controlled by the same organization that made the decision
- no downloadable receipt provided
- schema controlled only by operator
- no external anchor available

These warnings do not prove manipulation.

They identify structural dependency.

### 11. Result levels

The MVP should produce one of four result levels:

- Green
- Yellow
- Red
- Gray

Each result level must include a limitation notice.

### 12. Plain-language report export

The app should export a human-readable report.

The report should include:

- result level
- plain-language result
- what was checked
- what matched
- what failed
- what was missing
- what could not be checked
- dependency warnings
- limitation notice
- suggested next steps
- tool version
- verification time

### 13. Machine-readable JSON export

The app should export a structured JSON result.

The JSON should include:

- tool name
- tool version
- schema version
- verification time
- decision ID
- result level
- plain-language result
- envelope status
- reconstruction status
- hash status
- signature status
- timestamp status
- explanation match status
- missing fields
- dependency warnings
- does_not_prove list
- recommended next steps

## MVP Out of Scope

The first MVP does not need to include:

- OCR for scanned PDFs
- advanced PDF parsing
- multilingual interface
- court-ready filing package
- regulator submission integration
- public key registry integration
- external timestamp authority integration
- browser extension
- mobile app store deployment
- backend storage
- user accounts
- case management dashboard
- legal advice
- medical advice
- financial advice
- automated fairness analysis
- automated discrimination analysis
- automated legal interpretation
- full NDC computation
- full custody graph visualization
- full cryptographic audit
- institution-specific compliance claims

These may be future work.

## Result Levels

### Green: Explanation matches the committed record

Use Green when:

- envelope is present
- required fields are present
- reconstruction or field comparison succeeds
- hash matches when checkable
- signature is valid or clearly labeled if not checked
- timestamp evidence is present or clearly labeled
- explanation matches the committed record
- no critical missing field is detected

Plain-language result:

```text
The explanation appears to match the committed record.
```

Required warning:

```text
This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.
```

### Yellow: Record incomplete or partially checkable

Use Yellow when:

- envelope is present
- some checks pass
- some fields are missing
- explanation comparison is incomplete
- some verification resources are operator-controlled
- the record may still be useful but is not complete enough for a stronger result

Plain-language result:

```text
The record can be partly checked, but important information is missing.
```

Required warning:

```text
This record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.
```

### Red: Explanation does not match the committed record

Use Red when:

- envelope is present
- reconstruction or field comparison detects inconsistency
- explanation conflicts with committed record
- hash mismatch occurs
- output mismatch occurs
- policy or threshold mismatch occurs
- explanation mapping fails

Plain-language result:

```text
The explanation does not appear to match the committed record.
```

Required warning:

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

### Gray: Verification not exercisable

Use Gray when:

- no envelope is provided
- envelope cannot be parsed
- reconstruction rules are missing
- committed object is missing
- committed hash is missing
- public key is missing and required
- timestamp evidence is missing and required
- verification requires an operator-only portal
- the user does not have enough material to run a basic check

Plain-language result:

```text
This decision cannot be independently checked with the materials provided.
```

Required warning:

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

## Minimal Input Schema

The MVP may start with a simplified envelope format.

Example:

```json
{
  "schema_version": "adap-envelope-demo-0.1",
  "decision_id": "credit-denial-001",
  "committed_record": {
    "decision": "denied",
    "reason_code": "risk_score_threshold",
    "policy_version": "credit-policy-v3",
    "threshold": "risk_score_minimum"
  },
  "committed_hash": "example-sha256-hash",
  "hash_algorithm": "SHA-256",
  "signature": {
    "status": "present",
    "method": "demo-signature-placeholder",
    "public_key_reference": "operator-hosted-key"
  },
  "timestamp": {
    "status": "present",
    "type": "timestamp-claim",
    "independently_verifiable": false
  },
  "dependencies": {
    "public_key_hosted_by_operator": true,
    "reconstruction_rules_hosted_by_operator": true,
    "external_anchor_available": false
  }
}
```

This schema is only for MVP demonstration.

It should not be presented as the final A-DAP envelope standard.

## Minimal Explanation Input

The MVP may start with plain text or structured JSON.

Example plain text:

```text
Your application was denied because your income did not meet the required threshold.
```

Example structured explanation:

```json
{
  "decision_id": "credit-denial-001",
  "explanation": {
    "decision": "denied",
    "reason_code": "income_threshold",
    "policy_version": "credit-policy-v3"
  }
}
```

The first MVP should support structured comparison where possible.

Plain text comparison may initially be limited or manually mapped.

## Minimal Output Schema

The MVP should export a JSON result similar to this:

```json
{
  "adap_citizen_verification_result": {
    "tool_name": "citizen-verifier",
    "tool_version": "0.1.0",
    "schema_version": "citizen-ui-result-0.1",
    "verification_time": "2026-05-30T00:00:00Z",
    "decision_id": "credit-denial-001",
    "result_level": "red",
    "plain_language_result": "The explanation does not appear to match the committed record.",
    "envelope_status": "present",
    "schema_status": "valid",
    "reconstruction_status": "successful",
    "hash_status": "match",
    "signature_status": "present_not_fully_checked",
    "timestamp_status": "present_not_independently_verified",
    "explanation_match_status": "failed",
    "missing_fields": [],
    "dependency_warnings": [
      "public_key_hosted_only_by_operator",
      "reconstruction_rules_hosted_only_by_operator"
    ],
    "does_not_prove": [
      "truth",
      "fairness",
      "legality",
      "correctness",
      "accountability"
    ],
    "recommended_next_steps": [
      "download_report",
      "request_human_review",
      "ask_institution_to_explain_mismatch"
    ]
  }
}
```

## Required Screens for v0.1

### Screen 1: Start

Required elements:

- app title
- short explanation
- limitation notice
- paste envelope option
- upload envelope option
- continue button

Suggested text:

```text
A-DAP Citizen Verifier

Check whether the explanation you received matches the committed decision record.

This tool does not decide whether the decision was fair, lawful, or correct.
It checks whether the later explanation is consistent with the earlier committed record.

Paste or upload your A-DAP envelope to begin.
```

### Screen 2: Explanation Input

Required elements:

- paste explanation box
- optional upload notice button
- skip option
- check record button

Suggested text:

```text
Add the explanation you received.

You can paste the decision notice, denial reason, or explanation provided by the institution.
```

### Screen 3: Result

Required elements:

- result level
- plain-language result
- what matched
- what failed
- what was missing
- what could not be checked
- dependency warnings
- limitation notice
- next steps
- download report button
- download JSON button
- technical details toggle

### Screen 4: Technical Details

Required elements:

- decision ID
- schema version
- envelope status
- reconstruction status
- hash status
- signature status
- timestamp status
- explanation comparison status
- dependency warnings
- missing fields
- tool version
- verification time

## Required Test Fixtures

The MVP should include at least four sample cases.

### Green case

A valid envelope and matching explanation.

Expected result:

```text
Green
```

### Yellow case

An envelope with missing policy version or incomplete explanation mapping.

Expected result:

```text
Yellow
```

### Red case

An envelope where the committed reason differs from the later explanation.

Expected result:

```text
Red
```

### Gray case

A decision notice without a usable envelope.

Expected result:

```text
Gray
```

## Suggested Repository Structure

```text
.
├── README.md
├── MVP_SCOPE.md
├── THREAT_MODEL.md
├── UI_SPEC.md
├── examples/
│   ├── green-case/
│   │   ├── envelope.json
│   │   └── explanation.json
│   ├── yellow-case/
│   │   ├── envelope.json
│   │   └── explanation.json
│   ├── red-case/
│   │   ├── envelope.json
│   │   └── explanation.json
│   └── gray-case/
│       └── explanation.txt
├── src/
│   ├── components/
│   ├── verifier/
│   │   ├── parseEnvelope.ts
│   │   ├── validateSchema.ts
│   │   ├── checkHash.ts
│   │   ├── checkSignature.ts
│   │   ├── checkTimestamp.ts
│   │   ├── compareExplanation.ts
│   │   ├── analyzeDependencies.ts
│   │   └── generateResult.ts
│   ├── schemas/
│   ├── exports/
│   └── utils/
└── tests/
    ├── green.test.ts
    ├── yellow.test.ts
    ├── red.test.ts
    └── gray.test.ts
```

## Implementation Priority

### Priority 1: Basic flow

- paste envelope
- paste explanation
- parse JSON
- validate fields
- show result

### Priority 2: Result quality

- missing-field detection
- deterministic comparison
- dependency warnings
- limitation notices

### Priority 3: Export

- export JSON result
- export plain-language report

### Priority 4: Local verification

- SHA-256 hash checking
- signature status handling
- timestamp status handling

### Priority 5: UX refinement

- mobile layout
- clearer result cards
- technical details panel
- sample cases

## Acceptance Criteria

The MVP is acceptable when it can:

- load a pasted envelope
- load an uploaded envelope
- parse JSON safely
- detect invalid JSON
- detect missing fields
- accept explanation text or structured explanation
- compare explanation fields against committed record fields
- produce Green, Yellow, Red, or Gray result
- show what was checked
- show what was not checked
- show what was missing
- show dependency warnings
- show limitation notices
- export JSON result
- export plain-language report
- avoid legal, fairness, correctness, or accountability claims

## Privacy Requirements

The MVP should:

- process locally where possible
- avoid unnecessary data storage
- avoid requiring user accounts
- allow users to clear inputs
- warn before exporting sensitive data
- disclose whether any data leaves the browser
- avoid third-party data sharing by default

## Security Requirements

The MVP should:

- avoid executing uploaded content
- parse JSON safely
- handle malformed inputs
- avoid exposing sensitive data in logs
- avoid sending verification data to third parties by default
- avoid claiming cryptographic certainty where checks are not implemented
- label placeholder checks clearly

## Accessibility Requirements

The MVP should support:

- mobile-first layout
- plain-language explanations
- color plus text labels
- keyboard navigation where possible
- readable font sizes
- clear warnings
- downloadable results
- no account required for basic checks

Color alone should never carry meaning.

Use text labels such as:

```text
Red: Explanation does not match the committed record.
```

not only a red icon.

## Anti-Patterns

The MVP must avoid:

- trust badges without details
- pass/fail only output
- operator-only verification path
- hiding missing fields
- hiding dependency warnings
- non-exportable results
- legal overclaims
- fairness overclaims
- implying that local execution alone creates independence
- implying that usability equals NDC
- implying that a valid signature proves input truth
- implying that timestamp evidence proves decision fairness

## Safe Claims

The MVP may claim:

- it helps users exercise A-DAP verification
- it checks whether provided materials are reconstructible
- it detects mismatches under stated assumptions
- it identifies missing fields
- it identifies dependency warnings
- it exports a report
- it reduces the cost of first-level verification

The MVP must not claim:

- the decision was fair
- the decision was lawful
- the decision was correct
- accountability has been achieved
- the verifier is the source of truth
- a green result eliminates the need for human review
- local execution alone creates independence
- a hosted verifier is independent by default
- a valid signature proves input truth
- a timestamp proves decision fairness
- usability equals structural independence

## Definition of Done

The MVP_SCOPE.md file supports development when:

- the MVP boundaries are clear
- the excluded features are explicit
- the result levels are defined
- the minimum inputs are defined
- the minimum outputs are defined
- test fixtures are specified
- privacy and security requirements are stated
- safe claims and unsafe claims are separated
- the implementation path is narrow enough to build

The MVP itself is done when a user can complete this flow:

```text
paste/upload envelope
paste/upload explanation
run verification
see result level
see technical details
see dependency warnings
export report
export JSON
```

The MVP remains honest about scope:

It tests record consistency.

It does not prove truth, fairness, legality, correctness, or accountability.
