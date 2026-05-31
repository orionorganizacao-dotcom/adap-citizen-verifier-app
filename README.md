# A-DAP Citizen Verifier App

A citizen-facing verifier for reconstructible automated decision records.

This repository contains a minimal MVP implementation of an A-DAP verifier interface.

A-DAP means:

**Auditable Decision Accountability Protocol**

The core idea is narrow:

high-impact automated decisions should be born with a reconstructible evidentiary object, so that affected people, auditors, regulators, lawyers, journalists, or courts can later check whether a later explanation matches the committed decision record.

This MVP does not prove that a decision was true, fair, lawful, correct, or accountable.

It tests whether the materials provided allow a simplified verifier to compare a later explanation against a committed decision record.

## Executive Summary

The A-DAP Citizen Verifier App is designed to help a user check whether an automated decision explanation can be compared against a committed record.

The verifier accepts:

- an A-DAP demo envelope;
- a later explanation;
- simplified dependency metadata;
- demo signature and timestamp metadata.

It then returns one of four result levels:

- `green`
- `yellow`
- `red`
- `gray`

The verifier is intentionally honest about its limits.

It does not claim full cryptographic verification.

It does not claim legal compliance.

It does not decide fairness.

It does not decide truth.

It does not replace institutional accountability.

Its purpose is to demonstrate the minimum structure of contestability:

    Can the decision be independently checked against a committed record?

## Result Levels

### Green

Green means:

> The explanation appears to match the committed record.

A Green result does not prove:

- truth
- fairness
- legality
- correctness
- accountability

It only means that, under the MVP assumptions, the later explanation appears consistent with the committed decision record.

### Yellow

Yellow means:

> The record can be partly checked, but important information is missing.

A Yellow result does not mean the decision is wrong.

It means that verification is incomplete, weaker, or still dependent on missing or operator-controlled materials.

Examples:

- missing recommended fields;
- missing policy version;
- operator-hosted public key;
- operator-hosted reconstruction rules;
- no external anchor available.

### Red

Red means:

> The explanation does not appear to match the committed record.

A Red result does not automatically prove wrongdoing.

It identifies a concrete inconsistency that may support review, disclosure, escalation, or further investigation.

### Gray

Gray means:

> Verification is not exercisable with the materials provided.

Gray is not an internal verifier error.

Gray does not prove manipulation.

Gray means the verifier did not receive enough usable material to reconstruct or check the decision.

In the Gray case:

- `parse_envelope` runs;
- `generate_result` runs;
- `validate_schema` is skipped;
- `compare_explanation` is skipped;
- `analyze_dependencies` is skipped;
- `full_hash_validation` is skipped;
- `full_signature_validation` is skipped;
- `external_timestamp_validation` is skipped.

This preserves the core A-DAP principle:

> A verifier should not pretend to verify what it cannot actually check.

## A-DAP Readiness Model

This repository also includes an experimental readiness model for future A-DAP adoption:

- A-DAP Ready Badge
- NDC Challenge
- Citizen Escalation Package

See: [CERTIFICATION_MODEL.md](./CERTIFICATION_MODEL.md)

The readiness model is not a legal certification, fairness seal, or compliance guarantee.

It defines a cautious technical model for describing whether a system is prepared to produce reconstructible decision records.

## What This MVP Includes

- Minimal verifier pipeline
- Demo A-DAP envelope parsing
- MVP schema validation
- Deterministic explanation comparison
- Dependency warning detection
- Exportable verification result JSON
- Citizen-facing UI result card model
- Plain-language report formatting
- Green, Yellow, Red, and Gray tests
- UI result card test
- GitHub Actions CI workflow
- Root README documentation
- Tests README documentation
- A-DAP Readiness Model documentation

## What This MVP Does Not Include

This MVP does not yet implement:

- full cryptographic hash validation;
- full signature validation;
- external timestamp authority validation;
- full NDC computation;
- legal interpretation;
- fairness analysis;
- discrimination analysis;
- model quality analysis;
- institutional accountability;
- production security hardening;
- browser UI rendering;
- QR code scanning;
- PDF OCR;
- multilingual workflows.

These are future work.

## Repository Structure

    .
    ├── CERTIFICATION_MODEL.md
    ├── MVP_SCOPE.md
    ├── QUICKSTART.md
    ├── README.md
    ├── THREAT_MODEL.md
    ├── UI_SPEC.md
    ├── examples/
    ├── src/
    ├── tests/
    │   ├── README.md
    │   ├── green.test.ts
    │   ├── yellow.test.ts
    │   ├── red.test.ts
    │   ├── gray.test.ts
    │   └── ui-result-card.test.ts
    ├── package.json
    └── tsconfig.json

## Main Modules

The MVP verifier is organized into small framework-neutral modules.

### Envelope Parsing

File:

    src/verifier/parseEnvelope.ts

Purpose:

- parse pasted or uploaded envelope JSON;
- reject empty input;
- reject invalid JSON;
- reject oversized input;
- reject arrays and primitive values.

Parsing does not mean the envelope is valid.

Schema validation happens separately.

### Schema Validation

File:

    src/verifier/validateSchema.ts

Purpose:

- check minimum MVP envelope fields;
- report missing required fields;
- report missing recommended committed-record fields;
- preserve warnings.

Schema validation does not verify hashes, signatures, timestamps, legality, fairness, or correctness.

### Explanation Comparison

File:

    src/verifier/compareExplanation.ts

Purpose:

- compare the committed record with a structured later explanation;
- detect matched fields;
- detect missing explanation fields;
- detect deterministic mismatches.

The comparison is deterministic and field-based.

It does not use AI.

### Dependency Analysis

File:

    src/verifier/analyzeDependencies.ts

Purpose:

- identify dependency warnings;
- show when verification materials may still depend on the operator;
- surface operator-controlled verification resources.

Dependency warnings do not prove manipulation.

They indicate that verification may still depend on the organization whose decision is being reviewed.

### Result Generation

File:

    src/verifier/generateResult.ts

Purpose:

- combine parser, schema, comparison, and dependency outputs;
- generate final result level;
- preserve modules run;
- preserve modules skipped;
- preserve limitations;
- generate recommended next steps.

### Verification Runner

File:

    src/verifier/runVerification.ts

Purpose:

- run the full MVP pipeline;
- return final result;
- return exportable JSON;
- return diagnostics.

### UI Result Card

File:

    src/ui/ResultCard.ts

Purpose:

- convert `VerificationResult` into a citizen-facing UI view model;
- map result levels to tones;
- preserve limitation notices;
- expose missing fields, mismatches, dependency warnings, and skipped modules.

### Report Formatting

File:

    src/ui/formatReport.ts

Purpose:

- generate short text reports;
- generate plain-language reports;
- generate markdown reports;
- prepare downloadable report filenames.

## Result Contract

The MVP result contract is represented by `VerificationResult`.

A result includes:

- tool name;
- tool version;
- schema version;
- verification time;
- decision ID;
- result level;
- plain-language result;
- envelope status;
- schema status;
- reconstruction status;
- hash status;
- signature status;
- timestamp status;
- explanation match status;
- matched fields;
- mismatches;
- missing fields;
- dependency warnings;
- modules run;
- modules skipped;
- does-not-prove list;
- recommended next steps;
- limitation notice.

## Exportable Result

The verifier exports results in this structure:

    {
      "adap_citizen_verification_result": {
        "...": "..."
      }
    }

The exportable result is designed to be saved, shared, reviewed, or attached to a future contestation package.

It is not a legal determination.

## Example Cases

The repository includes simplified demo fixtures:

    examples/
    ├── green-case/
    ├── yellow-case/
    ├── red-case/
    └── gray-case/

### Green Case

The later explanation matches the committed record.

Expected result:

    result_level == "green"

### Yellow Case

The record is partly checkable, but important information or dependency independence is missing.

Expected result:

    result_level == "yellow"

### Red Case

The later explanation conflicts with the committed record.

Expected result:

    result_level == "red"

### Gray Case

No usable A-DAP envelope is provided.

Expected result:

    result_level == "gray"

Gray is especially important because it confirms that the verifier can honestly say:

    verification is not exercisable with the materials provided

instead of pretending to verify what it cannot check.

## Installation

Install dependencies:

    npm install

## Running Tests

Run all tests:

    npm test

Run individual tests:

    npm run test:green
    npm run test:yellow
    npm run test:red
    npm run test:gray
    npm run test:ui

Run TypeScript type checking:

    npm run typecheck

## Expected Test Output

A successful test run should show:

    green-case passed
    yellow-case passed
    red-case passed
    gray-case passed
    ui-result-card passed

## CI

This repository uses GitHub Actions to run:

- TypeScript type checking;
- Green test;
- Yellow test;
- Red test;
- Gray test;
- UI result card test.

The CI workflow is defined in:

    .github/workflows/test.yml

## Release

Current release:

    v0.1.0 — MVP Result Contract

This release freezes the first tested MVP contract for citizen-facing verification of reconstructible automated decision records.

It defines and tests:

- Green;
- Yellow;
- Red;
- Gray.

## A-DAP Ready Is Not a Trust Badge

The A-DAP Readiness Model defines a cautious adoption path.

A-DAP Ready must not be presented as:

- a fairness seal;
- a legal compliance certificate;
- a regulator approval mark;
- a proof of safe AI;
- a proof of unbiased AI;
- a guarantee of institutional accountability.

A-DAP Ready should mean only:

> This system supports reconstructible decision records that can later be checked against explanations.

Short version:

> Verifiable record support, not a fairness or legality guarantee.

Portuguese version:

> Suporte a registro verificável, não garantia de justiça ou legalidade.

## NDC Challenge

The repository’s readiness model also introduces the NDC Challenge.

Core question:

> Can your audit trail survive dependency analysis?

Portuguese version:

> Sua trilha de auditoria sobrevive à análise de dependência?

The challenge is to identify systems that appear auditable through logs, dashboards, reports, or explanations, but whose verification path still depends on the operator.

This is intended as an adversarial review exercise, not as a marketing claim.

## Citizen Escalation Package

The Citizen Escalation Package is a future-facing concept for helping users preserve and share verification results.

It may include:

- plain-language report;
- machine-readable JSON;
- decision ID;
- result level;
- detected mismatches;
- missing fields;
- dependency warnings;
- modules run;
- modules skipped;
- limitation notice;
- suggested review request text.

The package should empower citizens without pretending to replace lawyers, regulators, courts, auditors, public defenders, or institutional review.

The MVP should not automatically submit reports to courts, prosecutors, regulators, public defenders, or litigation platforms.

## Design Discipline

This project follows a strict design discipline:

- Do not treat Green as proof of fairness.
- Do not treat Yellow as failure.
- Do not treat Red as proof of wrongdoing.
- Do not treat Gray as proof of manipulation.
- Do not hide missing fields.
- Do not hide dependency warnings.
- Do not present placeholder cryptographic checks as completed checks.
- Do not collapse record consistency into accountability.
- Do not let the verifier become a trust badge.
- Do not pretend to verify what the MVP cannot actually check.

## Core Principle

The core principle of this repository is:

> A verifier should not pretend to verify what it cannot actually check.

This applies to the app.

It applies to the tests.

It applies to the release.

It applies to the A-DAP Ready model.

It applies to any future badge, certification, challenge, or escalation package.

## License

MIT

## Author

Ezio v.s. Santos
