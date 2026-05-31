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

## v0.1.1 — MVP Hardening

The next version should focus on small, clear improvements that make the MVP easier to understand, test, and use without expanding its claims.

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

Each result level should explain what was checked, what was not checked, and what the result does not prove.

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
- full cryptographic assurance unless actually implemented and tested;
- app store deployment;
- browser extension deployment;
- public key registry integration;
- external timestamp authority integration;
- institutional compliance guarantee.

These may be future work, but they are not part of the next MVP hardening step.

## Safe Positioning

Citizen Verifier `v0.1.1` should be described as:

> an incremental MVP improvement for citizen-facing verification of committed decision records.

It must not be described as:

- a finished app;
- a trust badge;
- a legal compliance product;
- a fairness verifier;
- a correctness verifier;
- an accountability system;
- a regulator-approved tool;
- a court-ready filing system;
- a production-grade security product.

## Safe Claims

The MVP may claim that it helps users:

- exercise A-DAP verification;
- check whether provided materials are reconstructible;
- compare a later explanation against a committed decision record;
- detect mismatches under stated assumptions;
- identify missing fields;
- identify dependency warnings;
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
- usability equals structural independence.

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
- stronger cryptographic verification;
- browser extension prototype;
- mobile-first interface;
- citizen escalation package;
- regulator-facing export format.

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

Version `v0.1.1` can be considered complete when it improves the MVP without expanding its claims beyond what the repository actually implements.

Minimum completion criteria:

- README wording is clearer;
- UI-facing limitation notices are stronger;
- result levels remain honest;
- dependency warnings are visible;
- report export is easier to understand;
- JSON export remains reproducible;
- mobile usability is addressed at least in documentation;
- no production-grade, legal, fairness, or accountability claim is introduced.

## Final Constraint

The roadmap must remain aligned with the central discipline of the repository:

> Do not pretend to verify what the MVP cannot actually check.
