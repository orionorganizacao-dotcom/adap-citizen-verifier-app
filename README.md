# ROADMAP.md

# A-DAP Citizen Verifier App Roadmap

This roadmap defines the next small, defensible improvements for the A-DAP Citizen Verifier App after `v0.1.0`.

The goal is not to turn the MVP into a finished consumer product yet.

The goal is to improve the MVP while preserving its current scope:

- citizen-facing verification;
- committed decision record comparison;
- plain-language result;
- machine-readable output;
- explicit limitation notices;
- minimal custody provenance;
- explicit operator-dependence classification;
- no claim of truth, fairness, legality, correctness, or full accountability.

## Current Version

Current release:

`v0.1.0 — MVP Result Contract`

This version establishes the first tested MVP contract for citizen-facing verification of reconstructible automated decision records.

It defines and tests four result levels:

- Green
- Yellow
- Red
- Gray

The current MVP demonstrates the minimum structure of contestability:

> Can the decision explanation be compared against a committed decision record under stated assumptions?

## Core Principle

The core principle remains:

> A verifier should not pretend to verify what it cannot actually check.

This applies to:

- the app;
- the tests;
- the README;
- the release notes;
- the result levels;
- the A-DAP Ready model;
- any future badge, certification, challenge, or escalation package.

## Structural Correction

The v0.1.1 roadmap must not only improve the usability surface of the verifier.

It must also introduce a minimal structural check that asks whether the verification path still depends on the same operator whose decision is being reviewed.

Without this, the app risks becoming a clearer explanation interface rather than a stronger verification interface.

### Problem

The current roadmap improves:

- README clarity;
- limitation notices;
- upload flow;
- plain-language reports;
- JSON export;
- dependency warnings;
- mobile usability.

These are useful, but they mostly improve the presentation of the verification process.

They do not yet attack the core A-DAP problem:

> Can the verification path survive dependency analysis?

If the envelope, public key, reconstruction rules, timestamp evidence, and verifier interface are all controlled by the same operator, then the verification path collapses structurally.

In that case, the app may still be useful, but it should not imply independent verification.

It should explicitly classify the result as operator-dependent.

## v0.1.1 — MVP Hardening

The next version should focus on small, clear improvements that make the MVP easier to understand, test, and use without expanding its claims.

However, v0.1.1 must also include a minimal structural dependency check.

The goal is not full NDC computation yet.

The goal is to make operator dependence impossible to hide.

## Planned Improvements

### 1. README Polish

Improve README wording for clarity without expanding claims beyond what the MVP actually implements.

The README should continue to make clear that the app:

- does not prove truth;
- does not prove fairness;
- does not prove legality;
- does not prove correctness;
- does not produce full accountability;
- does not replace legal, regulatory, or institutional review.

### 2. UI-Facing Limitation Notices

Strengthen user-facing text to make the result levels harder to misunderstand.

Required clarification:

- Green does not prove fairness.
- Yellow does not mean failure.
- Red does not prove wrongdoing.
- Gray does not prove manipulation.

Each result level should explain:

- what was checked;
- what was not checked;
- what matched;
- what failed;
- what was missing;
- what remains operator-controlled;
- what the result does not prove.

### 3. Sample Envelope Upload Flow

Improve the demo flow for pasted or uploaded JSON envelopes.

The MVP should make it easier to test:

- valid demo envelope;
- incomplete envelope;
- mismatched explanation;
- missing envelope;
- operator-controlled dependency metadata.

This should remain a demo/MVP flow, not a production-grade verification workflow.

### 4. Plain-Language Report Export

Improve the plain-language report so it is easier for non-technical users to understand.

The report should be usable by:

- affected people;
- lawyers;
- journalists;
- auditors;
- regulators;
- advocates;
- civil society organizations.

The report should include:

- result level;
- what was checked;
- what matched;
- what failed;
- what was missing;
- what could not be checked;
- dependency warnings;
- custody provenance summary;
- operator-dependence classification;
- limitation notice;
- suggested next steps.

The report must not present itself as legal, medical, financial, or regulatory advice.

### 5. Machine-Readable JSON Export

Improve the exported JSON result structure for reproducibility and later review.

The JSON export should preserve:

- tool name;
- tool version;
- schema version;
- verification time;
- decision ID;
- result level;
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
- custody provenance;
- dependency classification;
- modules run;
- modules skipped;
- limitation notice;
- does-not-prove list;
- recommended next steps.

The JSON result should remain a verification artifact, not a legal determination.

### 6. Dependency Warnings

Make operator-controlled dependencies more visible in result output.

The app should clearly warn when verification still depends on the organization whose decision is being reviewed.

Examples:

- envelope available only through operator portal;
- public key hosted only by operator;
- reconstruction rules hosted only by operator;
- timestamp evidence not independently reachable;
- verifier interface controlled by the same organization that made the decision;
- no downloadable receipt provided.

Plain-language warning:

> This does not prove manipulation. It means the verification path still depends on the organization whose decision is being reviewed.

### 7. Mobile Usability Notes

Document how the MVP should remain usable on mobile devices.

Mobile usability matters because affected people may not use developer tools, desktop workflows, or command-line interfaces.

The MVP should prioritize:

- readable result cards;
- simple paste/upload flow;
- clear warnings;
- downloadable reports;
- plain-language explanations;
- minimal technical friction.

Mobile usability must not be confused with independent verification.

A hosted or easy-to-use verifier is not automatically independent.

### 8. Custody Provenance and NDC=1 Classification

Add a minimal custody provenance field and classify cases where the verification path depends entirely on the operator.

This does not implement full NDC computation.

It introduces the first structural dependency classification needed for future NDC analysis.

The goal is to move dependency warnings from passive text into an explicit, computable MVP signal.

## Custody Provenance Requirement

Version `v0.1.1` should introduce a required `custody_provenance` field in demo envelopes or verification metadata.

The purpose is to declare where key verification materials are hosted, controlled, or retrieved from.

### Suggested Field

```json
{
  "custody_provenance": {
    "envelope_source": {
      "type": "operator_portal",
      "controlled_by": "operator"
    },
    "public_key_source": {
      "type": "operator_hosted_url",
      "controlled_by": "operator"
    },
    "reconstruction_rules_source": {
      "type": "operator_documentation",
      "controlled_by": "operator"
    },
    "timestamp_source": {
      "type": "operator_provided_metadata",
      "controlled_by": "operator"
    },
    "verifier_interface_source": {
      "type": "repository_or_hosted_app",
      "controlled_by": "verifier_author"
    }
  }
}
```

## Minimal Classification Rule

The MVP does not need full NDC computation in `v0.1.1`.

However, it should implement a minimal collapse rule:

> If the envelope, public key, reconstruction rules, and timestamp evidence are all controlled by the operator, classify the verification path as `NDC=1 / operator-dependent`.

This classification should be explicit, visible, and included in both the plain-language report and the machine-readable JSON result.

## Suggested Output Field

```json
{
  "dependency_classification": {
    "ndc_status": "ndc_1_operator_dependent",
    "summary": "The verification path still depends on the organization whose decision is being reviewed.",
    "does_not_prove": [
      "manipulation",
      "fraud",
      "wrongdoing"
    ],
    "warning": "This does not prove manipulation. It means the available verification path does not yet provide structural independence from the operator."
  }
}
```

## Result-Level Impact

The `NDC=1 / operator-dependent` classification should not automatically force Red.

It should affect the structural confidence of the result.

Suggested behavior:

### Green + NDC=1

The explanation appears consistent with the committed record, but the verification path remains operator-dependent.

### Yellow + NDC=1

The record is partly checkable and structurally operator-dependent.

### Red + NDC=1

A mismatch was detected, but the verification materials still depend on operator-controlled sources.

### Gray + NDC=1 or Missing Provenance

Verification is not independently exercisable with the materials provided.

## Plain-Language Warning

The app should display a warning such as:

> The provided materials can be checked, but the verification path still depends on the organization whose decision is being reviewed. This does not prove manipulation. It means the evidence path is not structurally independent.

## Exercise Debt

A citizen verifier is not fully validated until someone other than the author uses it on materials not created by the author.

For `v0.1.1`, this remains a documented limitation.

The MVP can still be useful as a tested demonstration, but it should not imply real-world exercised verification until at least one third-party exercise exists.

Future versions should add an exercise criterion such as:

> At least one third-party user should run the verifier on a non-author-generated envelope or verification package and produce a reproducible report.

Until then, the app should be described as an MVP for citizen-facing verification, not as evidence of fully exercised real-world verification.

## Out of Scope for v0.1.1

Version `v0.1.1` must not claim or implement:

- production-grade security;
- legal certification;
- fairness analysis;
- discrimination analysis;
- automated legal advice;
- automated medical advice;
- automated financial advice;
- automated regulatory filing;
- court-ready submission;
- full NDC computation;
- complete graph min-cut analysis;
- external public key registry integration;
- external timestamp authority integration;
- production-grade independence scoring;
- app store deployment;
- browser extension deployment;
- institutional compliance guarantee.

These may be future work, but they are not part of the next MVP hardening step.

However, `v0.1.1` should include:

- minimal custody provenance;
- explicit operator-dependence detection;
- explicit `NDC=1 / operator-dependent` classification when applicable.

## Safe Positioning

Citizen Verifier `v0.1.1` should be described as:

> an incremental MVP improvement for citizen-facing verification of committed decision records, including minimal custody provenance and explicit operator-dependence classification.

It must not be described as:

- a finished app;
- a trust badge;
- a legal compliance product;
- a fairness verifier;
- a correctness verifier;
- an accountability system;
- a regulator-approved tool;
- a court-ready filing system;
- a production-grade security product;
- a full NDC engine.

## Safe Claims

The MVP may claim that it helps users:

- exercise A-DAP verification;
- check whether provided materials are reconstructible;
- compare a later explanation against a committed decision record;
- detect mismatches under stated assumptions;
- identify missing fields;
- identify dependency warnings;
- identify operator-controlled verification paths;
- classify fully operator-dependent verification paths as `NDC=1 / operator-dependent`;
- export a plain-language report;
- export a machine-readable JSON result;
- reduce the cost of first-level verification.

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
- `NDC=1` proves fraud, manipulation, or wrongdoing;
- minimal custody provenance is equivalent to full NDC computation.

## Future Work After v0.1.1

Potential future work may include:

- browser UI rendering;
- better upload handling;
- QR code receipt support;
- multilingual interface;
- improved report templates;
- downloadable verification package;
- public key discovery model;
- external timestamp authority integration;
- NDC-related dependency analysis;
- full NDC computation;
- stronger cryptographic verification;
- browser extension prototype;
- mobile-first interface;
- citizen escalation package;
- regulator-facing export format;
- third-party exercise report;
- external adversarial review.

Each future feature must preserve the same boundary:

> A-DAP supports reconstructible verification conditions. It does not, by itself, prove truth, fairness, legality, correctness, or accountability.

## Link to Current Issues

Current governance and roadmap issues:

- `#1 — Overclaim Review — Citizen Verifier App MVP positioning`
- `#2 — MVP Roadmap — Citizen Verifier v0.1.1`

These issues separate:

- editorial and methodological governance;
- technical roadmap execution.

## Definition of Done for v0.1.1

Version `v0.1.1` can be considered complete only if it improves usability without avoiding the structural dependency problem.

Minimum completion criteria:

- README wording is clearer;
- UI-facing limitation notices are stronger;
- result levels remain honest;
- dependency warnings are visible;
- report export is easier to understand;
- JSON export remains reproducible;
- mobile usability is addressed at least in documentation;
- no production-grade, legal, fairness, or accountability claim is introduced;
- custody provenance is represented in the input or metadata model;
- the app can classify an operator-dependent verification path as `NDC=1 / operator-dependent`;
- the plain-language report explains that operator dependence does not prove manipulation, but weakens independent verification;
- the machine-readable JSON includes the dependency classification;
- the roadmap acknowledges Exercise Debt;
- the app does not imply fully exercised real-world citizen verification before third-party use exists.

## Final Constraint

The central constraint becomes:

> Do not merely make verification easier to read. Make operator dependence impossible to hide.
