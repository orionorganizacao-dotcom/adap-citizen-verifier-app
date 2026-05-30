# Examples — A-DAP Citizen Verifier App

This folder contains demo fixtures for the A-DAP Citizen Verifier App.

The examples are designed to test the four basic result levels of the MVP:

- Green
- Yellow
- Red
- Gray

These examples are not production decision records.

They are simplified test fixtures for development, documentation, and review.

## Purpose

The purpose of these examples is to make the verifier behavior concrete.

Each case should help developers and reviewers understand:

- what input the app receives
- what explanation the user received
- what result the verifier should produce
- what the result does and does not prove
- what fields are missing or inconsistent
- what dependency warnings should appear

The examples are intentionally simple.

They are meant to support the first MVP, not define the final A-DAP envelope standard.

## Result Levels

The app should produce four basic result levels.

```text
Green  = explanation matches the committed record
Yellow = record is incomplete or only partly checkable
Red    = explanation does not match the committed record
Gray   = verification is not exercisable with the materials provided
```

## Folder Structure

```text
examples/
├── README.md
├── green-case/
│   ├── envelope.json
│   ├── explanation.json
│   └── expected-result.json
├── yellow-case/
│   ├── envelope.json
│   ├── explanation.json
│   └── expected-result.json
├── red-case/
│   ├── envelope.json
│   ├── explanation.json
│   └── expected-result.json
└── gray-case/
    ├── explanation.txt
    └── expected-result.json
```

## Green Case

Path:

```text
examples/green-case/
```

Files:

```text
envelope.json
explanation.json
expected-result.json
```

Meaning:

The A-DAP envelope is present.

The explanation matches the committed decision record.

The verifier should return:

```text
Green
```

Expected plain-language result:

```text
The explanation appears to match the committed record.
```

Important limitation:

A Green result does not prove that the decision was fair, lawful, correct, or accountable.

It only means that the later explanation appears consistent with the committed record under the stated assumptions.

## Yellow Case

Path:

```text
examples/yellow-case/
```

Files:

```text
envelope.json
explanation.json
expected-result.json
```

Meaning:

The A-DAP envelope is present, but important information is missing or verification remains partially dependent on operator-controlled materials.

In this fixture, the committed record is missing:

```text
policy_version
```

The verifier should return:

```text
Yellow
```

Expected plain-language result:

```text
The record can be partly checked, but important information is missing.
```

Important limitation:

A Yellow result does not mean the decision was wrong.

It means the record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.

## Red Case

Path:

```text
examples/red-case/
```

Files:

```text
envelope.json
explanation.json
expected-result.json
```

Meaning:

The A-DAP envelope is present, but the later explanation conflicts with the committed decision record.

In this fixture, the committed record says the decision was based on:

```text
risk_score_threshold
```

But the later explanation says the decision was based on:

```text
income_threshold
```

The verifier should return:

```text
Red
```

Expected plain-language result:

```text
The explanation does not appear to match the committed record.
```

Important limitation:

A Red result does not automatically prove wrongdoing.

It identifies a specific inconsistency that may support review, disclosure, or escalation.

## Gray Case

Path:

```text
examples/gray-case/
```

Files:

```text
explanation.txt
expected-result.json
```

Meaning:

No usable A-DAP envelope was provided.

There is no committed record, committed hash, public key, timestamp evidence, reconstruction rule, or downloadable verification package.

The verifier should return:

```text
Gray
```

Expected plain-language result:

```text
This decision cannot be independently checked with the materials provided.
```

Important limitation:

A Gray result does not prove manipulation.

It means verification is not exercisable with the materials provided.

## How to Use These Examples

A developer or reviewer can use each case as a fixture.

For each folder:

1. Load the envelope or explanation file.
2. Run the verifier.
3. Compare the generated output against `expected-result.json`.
4. Confirm that the app shows the correct result level.
5. Confirm that limitation notices are displayed.
6. Confirm that missing fields and dependency warnings are not hidden.
7. Confirm that the exported JSON follows the expected structure.

## Expected MVP Behavior

The MVP should handle the examples as follows:

```text
green-case  -> Green
yellow-case -> Yellow
red-case    -> Red
gray-case   -> Gray
```

The app should not collapse all outputs into pass or fail.

The app should explain what happened.

## Required Warnings

Every result should include a limitation notice.

### Green warning

```text
This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.
```

### Yellow warning

```text
This record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.
```

### Red warning

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

### Gray warning

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

## What These Examples Do Not Prove

These examples do not prove:

- truth
- fairness
- legality
- correctness
- accountability
- model quality
- non-discrimination
- institutional compliance
- real-world A-DAP adoption
- full cryptographic verification
- full NDC computation

They are development fixtures for testing result behavior.

## Design Discipline

The examples should preserve the app’s core discipline:

- Do not treat Green as proof of fairness.
- Do not treat Yellow as failure.
- Do not treat Red as proof of wrongdoing.
- Do not treat Gray as proof of manipulation.
- Do not hide missing fields.
- Do not hide dependency warnings.
- Do not present placeholder cryptographic checks as completed checks.
- Do not convert the verifier into a trust badge.
- Do not collapse explanation matching into full accountability.

## Suggested Test Assertions

A basic test suite should assert:

### Green case

```text
result_level == "green"
explanation_match_status == "matched"
missing_fields == []
dependency_warnings == []
```

### Yellow case

```text
result_level == "yellow"
missing_fields includes "policy_version"
dependency_warnings includes "public_key_hosted_only_by_operator"
dependency_warnings includes "reconstruction_rules_hosted_only_by_operator"
```

### Red case

```text
result_level == "red"
explanation_match_status == "failed"
mismatches includes "reason_code"
mismatches includes "threshold"
```

### Gray case

```text
result_level == "gray"
envelope_status == "missing"
reconstruction_status == "not_possible"
missing_fields includes "adap_envelope"
dependency_warnings includes "verification_path_not_exercisable"
```

## Future Example Cases

Future versions may add more complex cases.

Possible future examples:

```text
hash-mismatch-case/
signature-invalid-case/
timestamp-missing-case/
operator-controlled-key-case/
schema-mismatch-case/
malformed-envelope-case/
partial-explanation-case/
public-benefit-case/
healthcare-triage-case/
employment-screening-case/
insurance-denial-case/
```

Each future case should include:

```text
envelope.json
explanation.json or explanation.txt
expected-result.json
README.md
```

where appropriate.

## Final Position

The examples are not evidence of A-DAP compliance.

They are fixtures for testing whether the Citizen Verifier App behaves honestly.

The goal is not to make the app say “trusted.”

The goal is to make the app say clearly:

- what matched
- what failed
- what was missing
- what could not be checked
- what remains dependent
- what the result does not prove

The verifier should help the record be tested.
