# A-DAP Citizen Verifier App

A-DAP Citizen Verifier is a minimal, citizen-facing verification tool for A-DAP decision records.

Its purpose is simple:

Allow a person to paste or upload an A-DAP envelope, paste or upload the explanation they received, run basic verification checks, and export a plain-language report plus a machine-readable result.

This app does not prove that an automated decision was true, fair, lawful, or correct.

It tests whether the later explanation appears consistent with the committed decision record under stated assumptions.

## Why this app exists

A-DAP creates reconstructible decision evidence.

But reconstructible evidence is not socially useful if only specialists can exercise it.

A person affected by an automated decision should not need to understand hashes, signatures, canonicalization, timestamp tokens, or custody graphs just to perform a basic check.

This app is the usability layer of A-DAP.

It helps affected people, advocates, auditors, regulators, lawyers, journalists, and courts answer a narrower question:

Does the explanation, notice, or institutional account match the committed decision record?

## Core principle

The citizen should not need to understand the proof in order to exercise the verification path, but the proof must remain reproducible by someone else.

The app should make verification easier to exercise.

It must not become a new trust authority.

The app should not ask users to trust a badge.

It should help users test the record.

## What this app does

The MVP aims to support:

- paste or upload an A-DAP envelope
- paste or upload the explanation or decision notice received
- run basic schema checks
- identify missing fields
- check hash consistency when enough data is available
- check signature status when a public key is provided
- check timestamp status when timestamp evidence is provided
- compare the later explanation against the committed decision record
- identify operator-controlled dependencies
- show a plain-language result
- show technical details
- export a plain-language report
- export a machine-readable JSON result

## What this app does not do

This app does not prove:

- truth
- fairness
- legality
- correctness
- accountability
- model quality
- non-discrimination
- institutional compliance

This app does not replace:

- courts
- regulators
- auditors
- lawyers
- public defenders
- human review
- institutional remedies

This app does not provide:

- legal advice
- medical advice
- financial advice
- automated fairness analysis
- automated regulatory judgment

## Result levels

The app should produce four plain-language result levels.

### Green: Explanation matches the committed record

Meaning:

- envelope is present
- reconstruction succeeds
- hash matches
- signature is valid if available
- timestamp evidence is present or clearly labeled
- explanation matches the committed record
- no critical missing field is detected

Required warning:

```text
This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.
```

### Yellow: Record incomplete or partially checkable

Meaning:

- envelope may be present
- some checks may pass
- some fields may be missing
- some assumptions may be unclear
- some verification resources may be operator-controlled
- explanation comparison may be incomplete

Required warning:

```text
This record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.
```

### Red: Explanation does not match the committed record

Meaning:

- reconstruction succeeds or partially succeeds
- comparison detects inconsistency
- explanation diverges from committed decision state
- hash, signature, output, policy, threshold, or explanation mapping may have failed

Required warning:

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

### Gray: Verification not exercisable

Meaning:

- no envelope was provided
- no reconstruction rules were provided
- no accessible receipt exists
- public key is missing
- timestamp evidence is missing or operator-controlled
- verification requires an operator-only portal
- the user does not have enough information to run the check

Required warning:

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

## MVP user flow

```text
Step 1:
User pastes or uploads an A-DAP envelope.

Step 2:
User pastes or uploads the explanation, notice, denial letter, or institutional account.

Step 3:
The verifier runs basic checks.

Step 4:
The verifier shows a plain-language result.

Step 5:
The verifier shows technical details for auditors or representatives.

Step 6:
The user exports a report and machine-readable verification result.
```

## MVP screens

### Screen 1: Start

```text
A-DAP Citizen Verifier

Check whether the explanation you received matches the committed decision record.

This tool does not decide whether the decision was fair, lawful, or correct.
It checks whether the later explanation is consistent with the earlier committed record.

[Paste receipt]
[Upload file]
[Scan QR code]
[Enter receipt ID]

[Next]
```

### Screen 2: Add explanation

```text
Add the explanation you received

[Paste explanation]
[Upload notice]
[Skip if not available]

[Check record]
```

### Screen 3: Result

Example red result:

```text
Result:
The explanation does not appear to match the committed record.

What matched:
- Envelope was present.
- Reconstruction succeeded.
- Hash matched.
- Signature was valid.
- Timestamp evidence was present.

What did not match:
- The explanation says the decision was based on income threshold.
- The committed record shows the decision used a different risk-score threshold.

What this means:
This does not prove the decision was wrong, unfair, or unlawful.
It identifies a specific inconsistency that may support review or escalation.

Next steps:
- Download the verification report.
- Request human review.
- Ask the institution to explain the mismatch.
- Share the report with a lawyer, regulator, auditor, or advocate.

[Download report]
[Download JSON]
[Show technical details]
```

## Required technical details

The result screen should include an expandable technical section with:

- decision ID
- envelope status
- schema version
- reconstruction status
- hash algorithm
- hash result
- signature method
- signature result
- timestamp evidence type
- timestamp result
- explanation comparison method
- missing fields
- dependency warnings
- verifier tool version
- assumptions used
- files checked
- output generated

## Dependency warnings

The app should identify whether verification still depends on the operator being verified.

Examples:

```text
The envelope is available only through the operator portal.
```

```text
The public key is hosted only by the operator.
```

```text
The reconstruction rules are hosted only by the operator.
```

```text
The timestamp evidence is not independently reachable.
```

```text
The verifier interface is controlled by the same organization that made the decision.
```

```text
No downloadable receipt was provided.
```

Plain-language warning:

```text
This does not prove manipulation. It means the verification path still depends on the organization whose decision is being reviewed.
```

## Export formats

The MVP should export two formats.

### Plain-language report

The report should be understandable by a non-technical user and usable by:

- affected person
- lawyer
- public defender
- regulator
- court
- auditor
- journalist
- civil society organization

The report should include:

- plain-language result
- what was checked
- what matched
- what failed
- what was missing
- what could not be checked
- dependency warnings
- limitation notice
- suggested next steps

### Machine-readable JSON result

Suggested schema:

```json
{
  "adap_citizen_verification_result": {
    "tool_name": "citizen-verifier",
    "tool_version": "0.1.0",
    "schema_version": "citizen-ui-result-0.1",
    "verification_time": "2026-05-30T00:00:00Z",
    "decision_id": "example-decision-id",
    "result_level": "red",
    "plain_language_result": "The explanation does not appear to match the committed record.",
    "envelope_status": "present",
    "reconstruction_status": "successful",
    "hash_status": "match",
    "signature_status": "valid",
    "timestamp_status": "present",
    "explanation_match_status": "failed",
    "missing_fields": [],
    "dependency_warnings": [
      "public_key_hosted_only_by_operator"
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

## Suggested stack

Initial stack:

- React
- TypeScript
- local-first verification where possible
- client-side JSON parsing
- exportable JSON result
- exportable plain-language report
- no backend required for first MVP unless needed for demos

The first prototype should prioritize:

- clarity
- reproducibility
- mobile usability
- export
- limitation notices
- dependency warnings

It should not prioritize visual polish over evidentiary clarity.

## MVP modules

```text
Input Parser
    accepts envelope, receipt, QR, file, or text

Schema Validator
    checks expected fields

Reconstruction Engine
    rebuilds committed decision object where possible

Hash Checker
    compares reconstructed hash to committed hash

Signature Checker
    validates signature if key is available

Timestamp Checker
    checks timestamp evidence if available

Explanation Comparator
    compares notice or explanation to committed record

Dependency Analyzer
    identifies operator-controlled verification components

Result Generator
    produces plain-language and machine-readable output

Export Module
    generates report and JSON verification package
```

Each module should disclose whether it:

- ran
- passed
- failed
- was skipped
- could not run because required data was missing

## Acceptance criteria

The MVP should be able to:

- accept a pasted JSON envelope
- accept an uploaded JSON envelope
- accept pasted explanation text
- validate required envelope fields
- identify missing fields
- compute or compare a SHA-256 hash when required data is available
- indicate signature status when a public key/signature is provided
- indicate timestamp status when timestamp evidence is provided
- compare explanation fields against committed record fields in a deterministic way
- show Green, Yellow, Red, or Gray result levels
- display limitation notices
- display dependency warnings
- export a plain-language report
- export a machine-readable JSON result
- avoid claiming truth, fairness, legality, correctness, or accountability
- clearly state what was checked and what was not checked

## Test cases

### Test Case 1: Green

Input:

- valid envelope
- valid reconstruction
- hash match
- signature valid
- timestamp present
- explanation matches committed record

Expected result:

```text
Green:
The explanation appears to match the committed record.
```

### Test Case 2: Yellow

Input:

- envelope present
- reconstruction partially succeeds
- policy version missing
- explanation comparison incomplete

Expected result:

```text
Yellow:
The record can be partly checked, but important information is missing.
```

### Test Case 3: Red

Input:

- envelope present
- reconstruction succeeds
- hash match
- signature valid
- timestamp present
- explanation conflicts with committed decision field

Expected result:

```text
Red:
The explanation does not appear to match the committed record.
```

### Test Case 4: Gray

Input:

- decision notice provided
- no envelope
- no reconstruction rules
- no public key
- no timestamp evidence

Expected result:

```text
Gray:
This decision cannot be independently checked with the materials provided.
```

### Test Case 5: Operator-controlled verification path

Input:

- envelope available only through operator URL
- public key hosted only by operator
- no downloadable independent verification package

Expected result:

```text
Dependency warning:
The verification path still depends on the organization whose decision is being reviewed.
```

## Security and privacy requirements

The MVP should:

- avoid unnecessary data storage
- disclose whether data is processed locally or uploaded
- avoid requiring account creation for basic checks
- allow the user to clear inputs
- avoid sharing user data with third parties by default
- warn users before exporting sensitive data
- avoid presenting itself as legal, medical, or financial advice
- avoid presenting a green result as proof of fairness or legality

## UI anti-patterns to avoid

Do not build:

```text
A-DAP Verified
```

as a badge without showing what was checked.

Do not build:

```text
Passed.
```

as the only result.

Do not build an operator-only verification path.

Do not hide missing fields.

Do not hide dependency warnings.

Do not make export impossible.

Do not imply that local execution alone creates independence.

Do not imply that usability equals independent verification.

Do not imply that a valid signature proves the underlying decision was proper.

## Safe claims

The app may claim:

- it helps users exercise A-DAP verification
- it checks whether provided materials are reconstructible
- it detects mismatches under stated assumptions
- it identifies missing fields
- it identifies dependency warnings
- it exports a report
- it reduces the cost of first-level verification

The app must not claim:

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

## Relationship to A-DAP

This app is an implementation-facing companion to A-DAP.

Primary A-DAP repository:

```text
adap-ndc-technical-note
```

Relevant A-DAP architecture files:

- `architecture/exercisable-citizen-verification.md`
- `architecture/citizen-verifier-ui-spec.md`
- `architecture/exercisable-verification-interface.md`
- `architecture/ndc-separability-criterion.md`
- `architecture/non-self-attested-materiality.md`
- `architecture/adoption-capture-risk.md`
- `architecture/verifier-funding-capture.md`
- `THREAT_MODEL.md`
- `ADAP-EXP-003.md`

This app should not redefine A-DAP.

It should implement a narrow, testable citizen-facing verification flow based on the A-DAP architecture.

## Repository structure

Suggested initial structure:

```text
.
├── README.md
├── MVP_SCOPE.md
├── THREAT_MODEL.md
├── UI_SPEC.md
├── examples/
│   ├── green-case/
│   ├── yellow-case/
│   ├── red-case/
│   └── gray-case/
├── src/
│   ├── components/
│   ├── verifier/
│   ├── schemas/
│   ├── exports/
│   └── utils/
└── tests/
    ├── green.test.ts
    ├── yellow.test.ts
    ├── red.test.ts
    └── gray.test.ts
```

## Current status

Initial MVP planning stage.

No production claim is made.

No compliance claim is made.

No legal, medical, financial, or institutional advice is provided.

## Roadmap

### v0.1

- paste JSON envelope
- upload JSON envelope
- paste explanation text
- basic schema validation
- missing-field detection
- deterministic field comparison
- result levels
- dependency warnings
- export JSON
- export plain-language report

### v0.2

- improved example envelopes
- test fixtures
- better technical detail panel
- downloadable sample cases
- local-first hash verification
- clearer result explanations

### v0.3

- signature validation
- timestamp evidence status
- public key handling
- better dependency analysis
- mobile layout refinement

### Future

- QR code scanning
- browser extension
- offline mode
- PDF notice support
- OCR support
- multilingual interface
- regulator export package
- court-ready evidence bundle
- independent verifier registry integration

## Final position

A-DAP cannot stop at the decision envelope.

A citizen who cannot exercise reconstruction still depends on others to transform evidence into contestation.

The Citizen Verifier is the usability layer of A-DAP.

Its job is not to make hard problems disappear.

Its job is to make the verification path visible, usable, exportable, and reproducible.

The citizen should see a simple result.

The auditor should see the technical record.

The regulator should see the dependency structure.

The court should receive a reproducible evidence package.

The verifier should not ask to be trusted.

It should help the record be tested.
