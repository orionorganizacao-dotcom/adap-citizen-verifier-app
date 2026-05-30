# UI Specification — A-DAP Citizen Verifier App

This document defines the user interface specification for the A-DAP Citizen Verifier App.

The app is a citizen-facing verification interface for A-DAP decision records.

Its goal is to make verification usable without turning the interface into a new trust authority.

The citizen should see a simple result.

The auditor should be able to inspect technical details.

The regulator or court should be able to receive an exportable report.

The app should help users test the record, not ask users to trust the app.

## Core UI Principle

The user should not need to understand cryptography to exercise the verification path.

But the result must remain:

- inspectable
- reproducible
- exportable
- honest about limitations
- clear about missing information
- clear about operator-controlled dependencies

The interface should translate technical checks into plain-language findings without hiding the underlying verification structure.

## What the UI Must Communicate

Every screen should preserve five ideas:

1. The app checks consistency between a later explanation and a committed decision record.
2. The app does not prove truth, fairness, legality, correctness, or accountability.
3. Missing information matters.
4. Operator-controlled verification paths matter.
5. Every result should be exportable for review.

## Primary User Flow

```text
Screen 1:
Start and provide A-DAP envelope.

Screen 2:
Provide explanation or decision notice.

Screen 3:
Run verification.

Screen 4:
View result.

Screen 5:
Inspect technical details.

Screen 6:
Export report and JSON result.
```

## Screen 1 — Start

### Purpose

Introduce the app and let the user provide an A-DAP envelope, receipt, or verification package.

### Required content

```text
A-DAP Citizen Verifier

Check whether the explanation you received matches the committed decision record.

This tool does not decide whether the decision was fair, lawful, or correct.
It checks whether the later explanation is consistent with the earlier committed record.

Start by pasting or uploading your A-DAP envelope or receipt.
```

### Required input options

The screen should include:

- Paste envelope
- Upload file
- Scan QR code
- Enter receipt ID

### MVP required options

For v0.1, the minimum required options are:

- Paste envelope
- Upload JSON envelope

QR code and receipt ID may be placeholders or future items.

### Suggested layout

```text
[A-DAP Citizen Verifier]

Check whether the explanation you received matches the committed decision record.

This tool does not decide whether the decision was fair, lawful, or correct.

Choose how to add your A-DAP record:

[Paste receipt or envelope]
[Upload JSON file]
[Scan QR code]        Coming later
[Enter receipt ID]    Coming later

[Continue]
```

### Validation behavior

If no envelope is provided:

```text
Please paste or upload an A-DAP envelope before continuing.
```

If invalid JSON is pasted:

```text
This does not appear to be valid JSON. Please check the file or pasted content.
```

If the file type is unsupported:

```text
This file type is not supported in the MVP. Please upload a JSON envelope.
```

### Safety note

The screen should show:

```text
Privacy note:
For the MVP, verification should run locally where possible. Do not upload sensitive files unless you understand how they are processed.
```

## Screen 2 — Explanation Input

### Purpose

Allow the user to provide the explanation, notice, denial letter, or institutional account they received.

### Required content

```text
Add the explanation you received.

Paste or upload the reason, notice, denial letter, or decision explanation provided by the institution.
```

### Required input options

The screen should include:

- Paste explanation text
- Upload explanation file
- Skip explanation

### MVP required options

For v0.1, the minimum required option is:

- Paste explanation text

Upload explanation file may be included later.

### Suggested layout

```text
[Add explanation]

Paste the explanation, notice, or reason you received.

This may be a denial reason, decision notice, eligibility explanation, or institutional account.

[Text area]

[Upload notice]       Coming later
[Skip explanation]

[Check record]
```

### Skip behavior

If the user skips explanation input, the app should not produce a Green or Red explanation comparison result.

It should produce Yellow or Gray depending on the envelope quality.

Suggested message:

```text
No explanation was provided. The app can inspect the envelope, but it cannot compare the later explanation against the committed record.
```

## Screen 3 — Verification Running

### Purpose

Show that the app is checking the record.

### Required content

The app should show the steps being checked.

Suggested layout:

```text
Checking record...

[ ] Parse envelope
[ ] Validate schema
[ ] Check required fields
[ ] Reconstruct committed record
[ ] Check hash
[ ] Check signature status
[ ] Check timestamp status
[ ] Compare explanation
[ ] Analyze dependencies
[ ] Generate result
```

### Status values

Each check should be able to show:

- pending
- passed
- failed
- skipped
- not checkable
- not implemented in MVP

### Important rule

The app must not hide skipped checks.

Example:

```text
Signature validation:
not checked in this MVP
```

Better than:

```text
Signature:
OK
```

## Screen 4 — Result Overview

### Purpose

Show the user a clear, plain-language result.

The result must be understandable without reading technical details.

### Required result levels

The app must support four result levels:

- Green
- Yellow
- Red
- Gray

Color alone must not carry meaning.

Each result must include text.

## Green Result

### Label

```text
Green: Explanation appears to match the committed record.
```

### Plain-language result

```text
The explanation appears to match the committed decision record.
```

### Meaning

Use Green when:

- envelope is present
- required fields are present
- reconstruction or field comparison succeeds
- hash matches when checkable
- signature is valid or clearly labeled if not checked
- timestamp evidence is present or clearly labeled
- explanation matches the committed record
- no critical missing field is detected

### Required warning

```text
This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.
```

### Suggested next steps

```text
You may still request human review if you believe the decision was unfair, unlawful, or based on incorrect information.
```

## Yellow Result

### Label

```text
Yellow: Record can be partly checked, but important information is missing.
```

### Plain-language result

```text
The record can be partly checked, but important information is missing.
```

### Meaning

Use Yellow when:

- envelope is present
- some checks pass
- some fields are missing
- explanation comparison is incomplete
- some verification resources are operator-controlled
- the record may still be useful but is not complete enough for a stronger result

### Required warning

```text
This record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.
```

### Suggested next steps

```text
You may request the missing fields, reconstruction rules, public key, timestamp evidence, policy version, model version, or human review.
```

## Red Result

### Label

```text
Red: Explanation does not appear to match the committed record.
```

### Plain-language result

```text
The explanation does not appear to match the committed decision record.
```

### Meaning

Use Red when:

- envelope is present
- reconstruction or field comparison detects inconsistency
- explanation conflicts with committed record
- hash mismatch occurs
- output mismatch occurs
- policy or threshold mismatch occurs
- explanation mapping fails

### Required warning

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

### Suggested next steps

```text
You may download the report, request human review, ask the institution to explain the mismatch, or share the result with a lawyer, regulator, auditor, advocate, or court.
```

## Gray Result

### Label

```text
Gray: Verification is not exercisable with the materials provided.
```

### Plain-language result

```text
This decision cannot be independently checked with the materials provided.
```

### Meaning

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

### Required warning

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

### Suggested next steps

```text
You may request the A-DAP envelope, reconstruction rules, public key, timestamp evidence, downloadable verification package, or human review.
```

## Result Overview Layout

The result screen should include:

```text
Result:
[Green / Yellow / Red / Gray label]

Plain-language result:
[Short result explanation]

What matched:
[List]

What failed:
[List]

What was missing:
[List]

What could not be checked:
[List]

Dependency warnings:
[List]

What this does not prove:
[List]

Next steps:
[List]

[Download report]
[Download JSON]
[Show technical details]
```

## Example Red Result Screen

```text
Result:
Red: Explanation does not appear to match the committed record.

What matched:
- Envelope was present.
- Required fields were present.
- Hash matched.
- Timestamp evidence was present.

What failed:
- The explanation reason does not match the committed reason.

What was missing:
- No independently anchored public key was provided.

Dependency warnings:
- Public key is hosted only by the operator.
- Reconstruction rules are hosted only by the operator.

What this means:
This does not prove the decision was wrong, unfair, or unlawful.
It identifies a specific inconsistency that may support review or escalation.

Next steps:
- Download the verification report.
- Request human review.
- Ask the institution to explain the mismatch.
- Share the report with a lawyer, regulator, auditor, advocate, or court.

[Download report]
[Download JSON]
[Show technical details]
```

## Screen 5 — Technical Details

### Purpose

Provide a reproducible technical summary for auditors, lawyers, regulators, courts, or technical reviewers.

### Required fields

The technical details screen should include:

- decision ID
- tool name
- tool version
- schema version
- verification time
- envelope status
- envelope format
- reconstruction status
- hash algorithm
- hash result
- signature method
- signature result
- public key status
- timestamp evidence type
- timestamp result
- explanation comparison method
- explanation comparison result
- missing fields
- dependency warnings
- assumptions used
- files checked
- modules run
- modules skipped
- modules not implemented

### Suggested layout

```text
Technical Details

Decision ID:
credit-denial-001

Tool:
A-DAP Citizen Verifier

Tool version:
0.1.0

Schema version:
citizen-ui-result-0.1

Verification time:
2026-05-30T00:00:00Z

Envelope:
present

Schema:
valid

Reconstruction:
successful

Hash algorithm:
SHA-256

Hash result:
match

Signature:
present, not fully checked in this MVP

Timestamp:
present, not independently verified

Explanation comparison:
failed

Missing fields:
none

Dependency warnings:
- public key hosted only by operator
- reconstruction rules hosted only by operator

Modules skipped:
- full signature validation
- external timestamp validation
```

## Screen 6 — Export

### Purpose

Allow the user to export results for review, escalation, or documentation.

### Required export options

The MVP should support:

- Download plain-language report
- Download machine-readable JSON result

### Future export options

Future versions may support:

- court-ready report
- regulator complaint package
- redacted report
- encrypted report
- signed verification receipt
- share with advocate
- share with public defender
- share with regulator

### Export warning

Before export, show:

```text
This report may contain sensitive decision information. Review before sharing.
```

### Plain-language report contents

The report should include:

- app name
- tool version
- verification time
- decision ID
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

### JSON export contents

The JSON export should include:

- tool name
- tool version
- schema version
- verification time
- decision ID
- result level
- plain-language result
- envelope status
- schema status
- reconstruction status
- hash status
- signature status
- timestamp status
- explanation match status
- missing fields
- dependency warnings
- modules run
- modules skipped
- does_not_prove list
- recommended next steps

## Suggested JSON Result

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
    "modules_run": [
      "parse_envelope",
      "validate_schema",
      "check_hash",
      "compare_explanation",
      "analyze_dependencies",
      "generate_result"
    ],
    "modules_skipped": [
      "full_signature_validation",
      "external_timestamp_validation"
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

## Navigation Structure

The app may use a simple step-based layout.

```text
Step 1:
A-DAP record

Step 2:
Explanation

Step 3:
Result

Step 4:
Technical details

Step 5:
Export
```

On mobile, use a vertical flow.

On desktop, a two-column layout may be used:

```text
Left column:
Inputs and current step

Right column:
Result summary and technical details
```

## Mobile UI Requirements

The MVP should be mobile-first.

Mobile requirements:

- large touch targets
- readable font sizes
- simple buttons
- no horizontal scrolling for main content
- visible limitation notices
- result labels with text, not only color
- export buttons easy to find
- technical details collapsible
- long JSON fields wrapped or scrollable inside code blocks
- no account required for basic checks

## Accessibility Requirements

The UI should support:

- readable text
- clear headings
- keyboard navigation where possible
- color plus text labels
- sufficient contrast
- screen-reader friendly labels where possible
- no color-only status indicators
- clear error messages
- plain-language explanations

Bad:

```text
🔴
```

Better:

```text
Red: Explanation does not match the committed record.
```

## Privacy UI Requirements

The UI should clearly tell users how data is processed.

Minimum privacy notice:

```text
Privacy note:
This tool should process your materials locally where possible. If any data is uploaded or sent to a server, the app must clearly disclose that before verification.
```

For MVP local-first mode:

```text
Local-first mode:
Your pasted envelope and explanation are processed in the browser for this check.
```

If server processing is ever added:

```text
Server processing notice:
Your materials may be sent to a server for verification. Review the privacy policy before continuing.
```

## Error States

## Invalid JSON

```text
The envelope could not be parsed as valid JSON.
Please check the content or upload a valid JSON envelope.
```

Result level:

```text
Gray
```

## Missing Required Fields

```text
The envelope is missing required fields.
Verification is only partially possible.
```

Result level:

```text
Yellow
```

or:

```text
Gray
```

depending on severity.

## Hash Mismatch

```text
The reconstructed record does not match the committed hash.
This may indicate alteration, incorrect reconstruction, missing information, or a malformed envelope.
```

Result level:

```text
Red
```

## Signature Not Checked

```text
Signature metadata is present, but full signature validation is not implemented in this MVP.
```

Result level:

```text
Yellow
```

unless other checks justify another level.

## Timestamp Not Independently Verified

```text
Timestamp information is present, but independent timestamp verification was not performed.
```

Result level:

```text
Yellow
```

unless other checks justify another level.

## Explanation Missing

```text
No explanation was provided.
The app can inspect the envelope, but it cannot compare the explanation against the committed record.
```

Result level:

```text
Yellow
```

or:

```text
Gray
```

depending on envelope quality.

## Operator Dependency Detected

```text
Some verification materials appear to be controlled by the same organization whose decision is being reviewed.
This does not prove manipulation, but it limits independent contestability.
```

Result level:

```text
Yellow
```

unless a mismatch also produces Red.

## Result Copy Guidelines

The UI should avoid overclaiming language.

## Safe words

Use:

- appears
- under stated assumptions
- may support review
- not independently verified
- not checkable
- missing
- dependency warning
- record consistency
- committed record
- later explanation

## Unsafe words

Avoid:

- certified
- compliant
- lawful
- fair
- unbiased
- accountable
- proven correct
- validated decision
- trusted
- guaranteed
- fraud proven
- manipulation proven

## Button Labels

Recommended button labels:

```text
Paste receipt
Upload envelope
Add explanation
Check record
Show technical details
Download report
Download JSON
Clear inputs
Start over
```

Avoid:

```text
Prove decision
Certify fairness
Validate legality
Confirm accountability
Trust result
```

## Limitation Notices

Every result screen must include a limitation notice.

General limitation notice:

```text
This tool checks whether the materials provided allow comparison between a later explanation and a committed decision record. It does not prove truth, fairness, legality, correctness, or accountability.
```

Green notice:

```text
This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.
```

Red notice:

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

Gray notice:

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

## Suggested Escalation Text

The UI may generate optional text for the user.

### Explanation mismatch

```text
I am requesting review of this automated decision because the explanation provided to me does not appear to match the committed decision record.

The A-DAP Citizen Verifier result indicates that reconstruction or field comparison identified an inconsistency between the later explanation and the committed record.

This does not by itself prove that the decision was unlawful or incorrect, but it identifies a specific inconsistency that should be reviewed.
```

### Missing envelope

```text
I am requesting review of this automated decision because the materials provided do not allow independent reconstruction of the decision state.

The verification result indicates that no usable A-DAP envelope or reconstruction rules were provided.

This limits my ability to contest the decision effectively.
```

### Operator dependency

```text
I am requesting review of this automated decision because the verification path appears to depend on the same organization whose decision is being reviewed.

This does not prove manipulation, but it limits independent contestability.
```

## Minimal Component List

The first React implementation may include:

```text
App
StartScreen
EnvelopeInput
ExplanationInput
VerificationRunner
ResultCard
ResultLevelBadge
MatchedItemsList
FailedItemsList
MissingFieldsList
DependencyWarnings
TechnicalDetails
ExportPanel
LimitationNotice
NextSteps
ErrorMessage
```

## Minimal State Shape

Suggested state shape:

```typescript
type ResultLevel = "green" | "yellow" | "red" | "gray";

type VerificationState = {
  envelopeRaw: string;
  explanationRaw: string;
  envelopeParsed: unknown | null;
  parseError: string | null;
  resultLevel: ResultLevel | null;
  checks: {
    schema: CheckStatus;
    reconstruction: CheckStatus;
    hash: CheckStatus;
    signature: CheckStatus;
    timestamp: CheckStatus;
    explanationComparison: CheckStatus;
    dependencies: CheckStatus;
  };
  missingFields: string[];
  dependencyWarnings: string[];
  modulesRun: string[];
  modulesSkipped: string[];
  plainLanguageResult: string;
  recommendedNextSteps: string[];
};
```

Suggested check status:

```typescript
type CheckStatus =
  | "not_started"
  | "passed"
  | "failed"
  | "skipped"
  | "not_checkable"
  | "not_implemented";
```

## MVP Interaction Rules

1. User cannot run verification without an envelope unless selecting a Gray “no envelope” path.
2. Invalid JSON should not crash the app.
3. Missing fields must be shown.
4. Skipped checks must be shown.
5. Placeholder cryptographic checks must be labeled honestly.
6. Result level must never be only color.
7. Export must include limitation notices.
8. Dependency warnings must appear in both UI and JSON export.
9. The app must never say the decision is fair, lawful, correct, or accountable.
10. The app must allow the user to clear inputs.

## MVP Definition of Done

The UI spec is satisfied when the app supports:

```text
paste envelope
upload JSON envelope
paste explanation
run verification
show Green / Yellow / Red / Gray result
show what matched
show what failed
show what was missing
show what could not be checked
show dependency warnings
show technical details
export plain-language report
export JSON result
clear inputs
```

The MVP remains honest about scope:

```text
It tests record consistency.
It does not prove truth, fairness, legality, correctness, or accountability.
```

## Final Position

The A-DAP Citizen Verifier UI should make verification simple without making it simplistic.

The interface should be readable by a citizen.

The result should be useful to an auditor.

The export should be usable by a lawyer, regulator, court, journalist, or civil society organization.

The app must not become a badge.

It must not become an authority.

It must not hide uncertainty.

It should help people test the record.
