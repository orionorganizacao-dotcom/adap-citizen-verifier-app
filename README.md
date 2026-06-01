# A-DAP Citizen Verifier App

A citizen-facing verifier for reconstructible automated decision records.

This repository contains a minimal MVP implementation of an A-DAP verifier interface.

A-DAP means:

**Auditable Decision Accountability Protocol**

The core idea is narrow:

> high-impact automated decisions should be born with a reconstructible evidentiary object, so that affected people, auditors, regulators, lawyers, journalists, or courts can later check whether a later explanation matches the committed decision record.

This MVP does **not** prove that a decision was true, fair, lawful, correct, independent, externally reproduced, or accountable.

It tests whether the materials provided allow a simplified verifier to compare a later explanation against a committed decision record.

It also introduces the first deterministic dependency rule engine for conservative dependency detection.

## Executive Summary

The A-DAP Citizen Verifier App is designed to help a user check whether an automated decision explanation can be compared against a committed record.

The verifier accepts:

- an A-DAP demo envelope;
- a later explanation;
- simplified dependency metadata;
- demo signature and timestamp metadata.

It then returns one of four result levels:

- green
- yellow
- red
- gray

The verifier is intentionally honest about its limits.

It does not claim full cryptographic verification.

It does not claim legal compliance.

It does not decide fairness.

It does not decide truth.

It does not prove independence.

It does not claim external reproduction.

It does not replace institutional accountability.

Its purpose is to demonstrate the minimum structure of contestability:

> Can the decision be checked against a committed record under stated assumptions?

## v0.1.1 Technical Direction

The project has begun the v0.1.1 hardening path.

The first technical artifact of this path is a deterministic dependency rule engine.

The purpose of the rule engine is not to compute full NDC.

The purpose is narrower:

> detect clear dependency signals, never assert independence.

The current rule engine is:

- separated from the UI;
- deterministic;
- versioned;
- reproducible by design;
- not externally reproduced yet;
- tested in CI.

Current limitation:

> reproducible by design does not mean externally reproduced.

## Result Levels

### Green

Green means:

> The explanation appears to match the committed record.

A Green result does not prove:

- truth
- fairness
- legality
- correctness
- independence
- accountability
- external reproduction

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

- parse_envelope runs;
- generate_result runs;
- validate_schema is skipped;
- compare_explanation is skipped;
- analyze_dependencies is skipped;
- full_hash_validation is skipped;
- full_signature_validation is skipped;
- external_timestamp_validation is skipped.

This preserves the core A-DAP principle:

> A verifier should not pretend to verify what it cannot actually check.

## Dependency Rule Engine

The repository now includes a deterministic dependency rule engine.

File:

```text
src/rules/dependencyRuleEngine.ts
```

Test:

```text
tests/dependency-rule-engine.test.ts
```

The rule engine is designed to detect conservative dependency signals.

It does not assert independence.

It does not compute full NDC.

It does not prove manipulation, fraud, wrongdoing, truth, fairness, legality, correctness, independence, external reproduction, or accountability.

## Dependency Status

The v0.1.1 rule engine may emit only conservative dependency states.

Allowed:

- `dependency_detected`
- `dependency_unresolved`
- `ndc_1_operator_dependent`
- `not_computed`
- `reproducible_by_design`
- `not_yet_independently_reproduced`

Prohibited:

- `independent`
- `partially_independent`
- `verified_independent`
- `structurally_independent`
- `NDC>1`
- `NDC=2`
- `NDC=3`

For this version, independence is never asserted by the app.

The app may detect dependency.

If dependency cannot be clearly detected, the result remains unresolved.

## Initial Dependency Rule

The first rule is:

```text
ADAP-CV-DEP-001
```

Meaning:

> If the public key source domain matches the declared operator domain, emit `public_key_source_matches_operator_domain`.

This is a dependency signal.

It does not prove:

- manipulation;
- fraud;
- wrongdoing;
- bad intent;
- full operator dependence by itself;
- independence;
- full NDC computation.

## Rule Engine Metadata

The rule engine exposes metadata distinguishing design reproducibility from demonstrated external reproduction.

```json
{
  "name": "adap-citizen-dependency-rules",
  "version": "0.1.1",
  "deterministic": true,
  "reproducible_by_design": true,
  "externally_reproduced": false,
  "reproduction_status": "not_yet_independently_reproduced"
}
```

Important distinction:

- `reproducible_by_design` means the rule engine is deterministic, versioned, separated from the UI, and intended to produce the same result for the same input.
- `externally_reproduced` means an independent implementation or external reviewer has actually reproduced the same classification over the same input materials.

Until independent reproduction exists, external reproducibility remains a debt.

## Rule Reproduction Debt

The dependency rule engine may be reproducible by design before it has been externally reproduced in practice.

These are different claims.

This repository does not claim that the dependency rule engine has already been externally reproduced.

External reproduction requires a separate implementation, script, reviewer, or third-party run reproducing the same dependency classification over the same input materials.

Until then:

> the rule engine is reproducible by design, not externally reproduced.

## Domain and Hosting Ambiguity

Domain analysis must be treated cautiously.

Different domains do not necessarily mean independent control.

Large operators may use CDNs, cloud providers, third-party hosting, authentication services, subdomains, or public repositories to serve verification materials.

Examples include:

- `auth.cloudfront.net`
- `operator.github.io`
- `cdn.provider.com`
- `storage.googleapis.com`
- `azureedge.net`
- `githubusercontent.com`

A public key, reconstruction rule, timestamp receipt, or envelope hosted on a different technical domain may still be operationally controlled by the same operator.

Therefore:

> same-domain or same-operator hosting is strong evidence of dependence; different-domain hosting is not sufficient evidence of independence.

## A-DAP Readiness Model

This repository also includes an experimental readiness model for future A-DAP adoption:

- A-DAP Ready Badge
- NDC Challenge
- Citizen Escalation Package

See:

```text
CERTIFICATION_MODEL.md
```

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
- Deterministic dependency rule engine
- Dependency rule engine test
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
- formal graph min-cut analysis;
- legal interpretation;
- fairness analysis;
- discrimination analysis;
- model quality analysis;
- institutional accountability;
- production security hardening;
- browser UI rendering;
- QR code scanning;
- PDF OCR;
- multilingual workflows;
- app store deployment;
- browser extension deployment;
- external public key registry integration;
- independent third-party exercise;
- independent rule engine reproduction.

These are future work.

## Repository Structure

```text
.
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│       └── test.yml
├── CERTIFICATION_MODEL.md
├── BADGE_POLICY.md
├── MVP_SCOPE.md
├── QUICKSTART.md
├── README.md
├── ROADMAP.md
├── THREAT_MODEL.md
├── UI_SPEC.md
├── examples/
├── src/
│   ├── app/
│   ├── rules/
│   │   └── dependencyRuleEngine.ts
│   ├── ui/
│   ├── verifier/
│   └── index.ts
├── tests/
│   ├── README.md
│   ├── green.test.ts
│   ├── yellow.test.ts
│   ├── red.test.ts
│   ├── gray.test.ts
│   ├── ui-result-card.test.ts
│   └── dependency-rule-engine.test.ts
├── package.json
└── tsconfig.json
```

## Main Modules

The MVP verifier is organized into small framework-neutral modules.

### Envelope Parsing

File:

```text
src/verifier/parseEnvelope.ts
```

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

```text
src/verifier/validateSchema.ts
```

Purpose:

- check minimum MVP envelope fields;
- report missing required fields;
- report missing recommended committed-record fields;
- preserve warnings.

Schema validation does not verify hashes, signatures, timestamps, legality, fairness, or correctness.

### Explanation Comparison

File:

```text
src/verifier/compareExplanation.ts
```

Purpose:

- compare the committed record with a structured later explanation;
- detect matched fields;
- detect missing explanation fields;
- detect deterministic mismatches.

The comparison is deterministic and field-based.

It does not use AI.

### Dependency Analysis

File:

```text
src/verifier/analyzeDependencies.ts
```

Purpose:

- identify dependency warnings;
- show when verification materials may still depend on the operator;
- surface operator-controlled verification resources.

Dependency warnings do not prove manipulation.

They indicate that verification may still depend on the organization whose decision is being reviewed.

### Dependency Rule Engine

File:

```text
src/rules/dependencyRuleEngine.ts
```

Purpose:

- detect conservative dependency signals;
- expose deterministic rule metadata;
- distinguish `reproducible_by_design` from `externally_reproduced`;
- avoid independence claims;
- support future dependency analysis.

The rule engine does not compute full NDC.

### Result Generation

File:

```text
src/verifier/generateResult.ts
```

Purpose:

- combine parser, schema, comparison, and dependency outputs;
- generate final result level;
- preserve modules run;
- preserve modules skipped;
- preserve limitations;
- generate recommended next steps.

### Verification Runner

File:

```text
src/verifier/runVerification.ts
```

Purpose:

- run the full MVP pipeline;
- return final result;
- return exportable JSON;
- return diagnostics.

### UI Result Card

File:

```text
src/ui/ResultCard.ts
```

Purpose:

- convert VerificationResult into a citizen-facing UI view model;
- map result levels to tones;
- preserve limitation notices;
- expose missing fields, mismatches, dependency warnings, and skipped modules.

### Report Formatting

File:

```text
src/ui/formatReport.ts
```

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

The v0.1.1 hardening path adds minimal dependency classification fields through the rule engine.

## Exportable Result

The verifier exports results in this structure:

```json
{
  "adap_citizen_verification_result": {
    "...": "..."
  }
}
```

The exportable result is designed to be saved, shared, reviewed, or attached to a future contestation package.

It is not a legal determination.

It is not proof of fairness.

It is not proof of independence.

It is not proof of accountability.

## Example Dependency Classification

Detected dependency:

```json
{
  "dependency_classification": {
    "dependency_status": "dependency_detected",
    "ndc_label": "ndc_1_operator_dependent",
    "summary": "The available verification path appears to depend on the organization whose decision is being reviewed.",
    "derivation": "deterministic_rule",
    "external_verification": false,
    "does_not_prove": [
      "manipulation",
      "fraud",
      "wrongdoing",
      "independence"
    ],
    "warning": "This classification is generated by the verifier. It is a conservative dependency signal, not independently verified proof."
  }
}
```

Unresolved dependency:

```json
{
  "dependency_classification": {
    "dependency_status": "dependency_unresolved",
    "ndc_label": "not_computed",
    "summary": "The verifier could not determine whether the verification path is structurally independent.",
    "derivation": "deterministic_rule",
    "external_verification": false,
    "does_not_prove": [
      "independence",
      "manipulation",
      "fraud",
      "wrongdoing"
    ],
    "warning": "No independence claim is made. The dependency state remains unresolved."
  }
}
```

## Example Cases

The repository includes simplified demo fixtures:

```text
examples/
├── green-case/
├── yellow-case/
├── red-case/
└── gray-case/
```

### Green Case

The later explanation matches the committed record.

Expected result:

```text
result_level == "green"
```

### Yellow Case

The record is partly checkable, but important information or dependency independence is missing.

Expected result:

```text
result_level == "yellow"
```

### Red Case

The later explanation conflicts with the committed record.

Expected result:

```text
result_level == "red"
```

### Gray Case

No usable A-DAP envelope is provided.

Expected result:

```text
result_level == "gray"
```

Gray is especially important because it confirms that the verifier can honestly say:

> verification is not exercisable with the materials provided

instead of pretending to verify what it cannot check.

## Installation

Install dependencies:

```bash
npm install
```

## Running Tests

Run all tests:

```bash
npm test
```

Run individual tests:

```bash
npm run test:green
npm run test:yellow
npm run test:red
npm run test:gray
npm run test:ui
npm run test:dependency
```

Run TypeScript type checking:

```bash
npm run typecheck
```

## Expected Test Output

A successful test run should show:

```text
green-case passed
yellow-case passed
red-case passed
gray-case passed
ui-result-card passed
dependency-rule-engine tests passed
```

## CI

This repository uses GitHub Actions to run:

- TypeScript type checking;
- Green test;
- Yellow test;
- Red test;
- Gray test;
- UI result card test;
- Dependency rule engine test.

The CI workflow is defined in:

```text
.github/workflows/test.yml
```

Current CI status:

> The deterministic dependency rule engine test has passed in GitHub Actions.

## Release

Current release:

```text
v0.1.0 — MVP Result Contract
```

This release freezes the first tested MVP contract for citizen-facing verification of reconstructible automated decision records.

It defines and tests:

- Green;
- Yellow;
- Red;
- Gray.

The v0.1.1 path is in progress and currently includes the first deterministic dependency rule engine scaffold.

## Roadmap

See:

```text
ROADMAP.md
```

The v0.1.1 roadmap focuses on:

- declared or inferred custody provenance;
- conservative dependency detection;
- deterministic dependency rules;
- no independence labels;
- Rule Reproduction Debt;
- Exercise Debt;
- minimal JSON expansion;
- clear limitation notices.

Core roadmap constraint:

> Do not merely make verification easier to read.
>
> Do not let the verifier certify its own inference.
>
> Do not let the rule engine certify its own reproducibility.
>
> Make operator dependence visible, and make dependency classification reproducible by design before claiming external reproduction.

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

## Exercise Debt

A citizen verifier is not fully validated until someone other than the author uses it on materials not created by the author.

For now, this remains a documented limitation.

The MVP can still be useful as a tested demonstration, but it should not imply fully exercised real-world verification until at least one third-party exercise exists.

Future versions should add an exercise criterion such as:

> At least one third-party user should run the verifier on a non-author-generated envelope or verification package and produce a reproducible report.

## Rule Reproduction Debt

The dependency rule engine is reproducible by design, but it has not yet been independently reproduced unless an external reproduction record is provided.

Suggested report notice:

> The dependency rule engine is reproducible by design, but this classification has not yet been independently reproduced unless an external reproduction record is provided.

This notice clarifies that deterministic rules are a design property.

They do not, by themselves, prove external reproduction.

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
- Do not assert independence from unresolved dependency signals.
- Do not treat different-domain hosting as proof of independence.
- Do not claim external reproduction before independent reproduction exists.

## Safe Claims

The MVP may claim that it helps users:

- exercise A-DAP verification;
- check whether provided materials are reconstructible;
- compare a later explanation against a committed decision record;
- detect mismatches under stated assumptions;
- identify missing fields;
- identify dependency warnings;
- identify operator-controlled verification paths;
- classify clear operator-dependent paths as `dependency_detected`;
- label unresolved dependency cases as `dependency_unresolved`;
- export a plain-language report;
- export a machine-readable JSON result;
- reduce the cost of first-level verification;
- make dependency classification reproducible by design through deterministic rules.

## Prohibited Claims

The MVP must not claim that:

- the decision was fair;
- the decision was lawful;
- the decision was correct;
- accountability has been achieved;
- the verifier is the source of truth;
- a Green result eliminates the need for human review;
- a Red result proves wrongdoing;
- a Gray result proves manipulation;
- local execution alone creates independence;
- a hosted verifier is independent by default;
- a valid signature proves input truth;
- a timestamp proves fairness;
- usability equals structural independence;
- dependency warnings alone create independent verification;
- inferred custody provenance is guaranteed to be correct;
- different-domain hosting proves independence;
- `dependency_detected` proves fraud, manipulation, or wrongdoing;
- `dependency_unresolved` proves independence;
- `NDC=1` proves fraud, manipulation, or wrongdoing;
- partial independence equals full structural independence;
- minimal custody provenance is equivalent to full NDC computation;
- diagnostic mode demonstrates real-world independent verification;
- the verifier’s own inference is externally verified unless independently reproduced;
- the rule engine has been externally reproduced unless an independent reproduction exists;
- `reproducible_by_design` means externally verified;
- deterministic rules alone prove independent verification;
- the app’s own classification proves its own reproducibility.

## Core Principle

The core principle of this repository is:

> A verifier should not pretend to verify what it cannot actually check.

This applies to the app.

It applies to the tests.

It applies to the release.

It applies to the A-DAP Ready model.

It applies to the dependency rule engine.

It applies to any future badge, certification, challenge, or escalation package.

## License

MIT

## Author

Ezio v.s. Santos
