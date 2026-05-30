# Tests — A-DAP Citizen Verifier App

This folder contains the minimal MVP test suite for the A-DAP Citizen Verifier App.

The tests verify the four basic result levels:

- Green
- Yellow
- Red
- Gray

Each test loads fixtures from the `examples/` folder, runs the verifier pipeline, and checks whether the generated result matches the expected behavior.

## Purpose

The tests are designed to confirm that the verifier behaves honestly.

They do not prove that A-DAP is complete.

They do not prove that a decision is true, fair, lawful, correct, or accountable.

They only test whether the MVP verifier correctly classifies simplified demo cases.

## Test Files

```text
tests/
├── README.md
├── green.test.ts
├── yellow.test.ts
├── red.test.ts
└── gray.test.ts
```

## Fixture Sources

The tests use fixtures from:

```text
examples/
├── green-case/
├── yellow-case/
├── red-case/
└── gray-case/
```

Each case contains the input materials and the expected result.

## Result Levels Tested

```text
Green  = explanation matches the committed record
Yellow = record is incomplete or only partly checkable
Red    = explanation does not match the committed record
Gray   = verification is not exercisable with the materials provided
```

## Green Test

File:

```text
tests/green.test.ts
```

Fixture:

```text
examples/green-case/
```

Expected behavior:

```text
result_level == "green"
explanation_match_status == "matched"
missing_fields == []
dependency_warnings == []
mismatches == []
```

Meaning:

The envelope is present, the explanation is structured, and the explanation appears to match the committed record.

Important limitation:

A Green result does not prove fairness, legality, correctness, truth, or accountability.

## Yellow Test

File:

```text
tests/yellow.test.ts
```

Fixture:

```text
examples/yellow-case/
```

Expected behavior:

```text
result_level == "yellow"
schema_status == "valid_with_missing_fields"
reconstruction_status == "partial"
missing_fields includes "policy_version"
dependency_warnings includes "public_key_hosted_only_by_operator"
dependency_warnings includes "reconstruction_rules_hosted_only_by_operator"
dependency_warnings includes "no_external_anchor_available"
```

Meaning:

The record can be partly checked, but important information is missing or verification still depends on operator-controlled materials.

Important limitation:

A Yellow result does not mean the decision is wrong.

It means verification is incomplete.

## Red Test

File:

```text
tests/red.test.ts
```

Fixture:

```text
examples/red-case/
```

Expected behavior:

```text
result_level == "red"
explanation_match_status == "failed"
mismatches includes "reason_code"
mismatches includes "threshold"
```

Meaning:

The envelope is present, but the later explanation conflicts with the committed record.

Important limitation:

A Red result does not automatically prove wrongdoing.

It identifies a specific inconsistency that may support review, disclosure, or escalation.

## Gray Test

File:

```text
tests/gray.test.ts
```

Fixture:

```text
examples/gray-case/
```

Expected behavior:

```text
result_level == "gray"
envelope_status == "missing"
schema_status == "not_checkable"
reconstruction_status == "not_possible"
verification_path_not_exercisable is present
```

Meaning:

No usable A-DAP envelope was provided.

Verification cannot be exercised with the materials available.

Important limitation:

A Gray result does not prove manipulation.

It means the verification path is not usable with the provided materials.

## How to Run Tests

Install dependencies:

```text
npm install
```

Run all tests:

```text
npm test
```

Run a single test:

```text
npm run test:green
npm run test:yellow
npm run test:red
npm run test:gray
```

Run TypeScript type checking:

```text
npm run typecheck
```

## Expected Console Output

A successful full test run should show:

```text
green-case passed
yellow-case passed
red-case passed
gray-case passed
```

## What These Tests Cover

The tests check:

- envelope parsing
- schema validation
- explanation comparison
- dependency warning detection
- result-level generation
- missing-field reporting
- mismatch reporting
- recommended next steps
- exportable JSON wrapping
- basic diagnostics

## What These Tests Do Not Cover

The MVP tests do not cover:

- full cryptographic hash verification
- full signature validation
- external timestamp authority validation
- full NDC computation
- legal interpretation
- fairness analysis
- model quality analysis
- discrimination analysis
- institutional accountability
- real-world deployment security
- UI rendering
- browser upload behavior
- QR code scanning
- PDF OCR
- multilingual behavior

These are future work.

## Design Discipline

The tests must preserve the project’s core discipline:

- Do not treat Green as proof of fairness.
- Do not treat Yellow as failure.
- Do not treat Red as proof of wrongdoing.
- Do not treat Gray as proof of manipulation.
- Do not hide missing fields.
- Do not hide dependency warnings.
- Do not present placeholder cryptographic checks as completed checks.
- Do not collapse record consistency into accountability.
- Do not let the verifier become a trust badge.

## Adding New Tests

Future tests should follow the same pattern:

1. Create a fixture folder in `examples/`.
2. Add input files.
3. Add `expected-result.json`.
4. Create a matching test file in `tests/`.
5. Assert the result level.
6. Assert important fields.
7. Assert limitations and warnings are preserved.

Suggested future tests:

```text
hash-mismatch.test.ts
signature-invalid.test.ts
timestamp-missing.test.ts
malformed-envelope.test.ts
operator-controlled-key.test.ts
schema-mismatch.test.ts
partial-explanation.test.ts
```

## Test Philosophy

These tests are not designed to make the verifier look successful.

They are designed to make failure visible.

The app should say clearly:

- what matched
- what failed
- what was missing
- what could not be checked
- what remains dependent
- what the result does not prove

The verifier should help the record be tested.
