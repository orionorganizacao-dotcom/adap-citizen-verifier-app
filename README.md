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
- declared or inferred custody provenance;
- explicit operator-dependence classification;
- minimal JSON expansion;
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

## v0.1.1 Priority

The central priority of `v0.1.1` is:

1. Preserve the existing `v0.1.0` result contract.
2. Add declared or inferred custody provenance.
3. Add explicit operator-dependence classification.
4. Keep JSON expansion minimal.
5. Avoid implying bad intent from `NDC=1`.
6. Keep full NDC computation for future work.

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
- declared or inferred custody provenance summary;
- operator-dependence classification;
- Exercise Debt notice when applicable;
- limitation notice;
- suggested next steps.

The report must not present itself as legal, medical, financial, or regulatory advice.

### 5. Minimal Machine-Readable JSON Expansion

Version `v0.1.1` should not redesign the full JSON export contract.

The existing `v0.1.0` result structure should remain mostly stable.

Version `v0.1.1` should add only the minimum fields needed for structural dependency visibility:

- `inferred_custody_provenance`
- `dependency_classification`

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

Add declared or inferred custody provenance and classify cases where the verification path depends entirely on the operator.

This does not implement full NDC computation.

It introduces the first structural dependency classification needed for future NDC analysis.

The goal is to move dependency warnings from passive text into an explicit, computable MVP signal.

## Custody Provenance: Declared or Inferred

Version `v0.1.1` should not depend on operators already providing a complete `custody_provenance` field.

In real-world cases, legacy operators may not provide structured provenance metadata.

Therefore, the verifier should support two paths:

1. `custody_provenance` when explicitly provided by the envelope or metadata.
2. `inferred_custody_provenance` when provenance must be inferred from the materials available to the verifier.

This keeps the MVP practical without weakening the structural goal.

The verifier should not require the affected person to manually know or classify the full custody chain.

Instead, it should infer a minimal custody profile from available evidence, URLs, embedded metadata, source declarations, or missing materials.

## Declared Custody Provenance

When available, an envelope or metadata package may include declared custody provenance.

### Suggested Declared Field

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

Declared custody provenance should be treated as a claim to be surfaced, not as proof of independence.

## Inferred Custody Provenance

When declared custody provenance is missing, the verifier should generate an inferred custody profile.

### Suggested Inferred Field

```json
{
  "inferred_custody_provenance": {
    "envelope_available_via": "direct_user_upload",
    "public_key_available_via": "same_host_as_envelope",
    "reconstruction_rules_available_via": "embedded_in_envelope",
    "timestamp_available_via": "operator_provided_metadata",
    "verifier_interface_available_via": "open_source_repository",
    "classification_basis": [
      "public_key_source_matches_operator_domain",
      "reconstruction_rules_embedded_by_operator",
      "timestamp_metadata_not_independently_reachable"
    ]
  }
}
```

The inferred field should be conservative.

If the verifier cannot determine independence, it should not assume independence.

## Heuristic Nature of Inferred Custody Provenance

Inferred custody provenance is heuristic.

When declared custody provenance is missing, the verifier may infer a minimal custody profile from available materials such as URLs, embedded metadata, source declarations, file origin, missing fields, or operator-controlled references.

This inference may be incomplete or wrong.

The verifier should therefore treat inferred provenance as a conservative diagnostic signal, not as proof of actual control.

If the verifier cannot determine whether a verification component is independent, it should not assume independence.

Inferred provenance should be presented with a limitation notice such as:

> Custody provenance was inferred from the materials provided. This inference may be incomplete or wrong. It should be treated as a conservative dependency signal, not as proof of actual custody or control.

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

Therefore, the verifier should not infer independence from domain difference alone.

However, matching domains, matching organizational identifiers, or materials served from the same operator-controlled portal are strong dependency indicators.

Suggested rule:

> Same-domain or same-operator hosting is strong evidence of dependence. Different-domain hosting is not sufficient evidence of independence.

For `v0.1.1`, domain and hosting signals should be treated as heuristic indicators only.

They should contribute to `classification_basis`, but should not be treated as proof of independent custody.

## Mixed or Partially Independent Cases

Version `v0.1.1` only classifies clear operator-dependent collapse cases.

A case should be classified as `NDC=1 / operator-dependent` only when the available materials indicate that the envelope, public key, reconstruction rules, and timestamp evidence are all controlled by the operator or depend entirely on operator-controlled sources.

Mixed cases should not be classified as `NDC=1` in this version.

Examples of mixed cases include:

- envelope provided by the operator, but timestamp evidence is externally anchored;
- public key hosted by the operator, but reconstruction rules are independently archived;
- envelope uploaded by the user, but the public key is operator-hosted;
- verifier interface is open source, but key materials remain operator-controlled;
- materials are hosted across different technical domains, but operational control is unresolved.

For `v0.1.1`, mixed cases should be classified as:

> partially independent / dependency unresolved

or:

> partially operator-dependent

The app should explain that partial independence may improve the verification path, but does not automatically establish full structural independence.

Plain-language warning:

> Some verification materials appear independent, while others still depend on the operator. This version does not compute full NDC for mixed cases. Independent verification cannot be fully assumed from the materials provided.

## Minimal Classification Rule

The MVP does not need full NDC computation in `v0.1.1`.

However, it should implement a minimal collapse rule:

> If the envelope, public key, reconstruction rules, and timestamp evidence are all controlled by the operator, classify the verification path as `NDC=1 / operator-dependent`.

This classification should be explicit, visible, and included in both the plain-language report and the machine-readable JSON result.

## Minimal v0.1.1 Additive Fields

To avoid over-engineering, `v0.1.1` should add only the minimum fields required for dependency classification.

```json
{
  "inferred_custody_provenance": {
    "envelope_available_via": "direct_user_upload",
    "public_key_available_via": "same_host_as_envelope",
    "reconstruction_rules_available_via": "embedded_in_envelope",
    "timestamp_available_via": "operator_provided_metadata",
    "verifier_interface_available_via": "open_source_repository",
    "classification_basis": [
      "public_key_source_matches_operator_domain",
      "reconstruction_rules_embedded_by_operator",
      "timestamp_metadata_not_independently_reachable"
    ]
  },
  "dependency_classification": {
    "ndc_status": "ndc_1_operator_dependent",
    "summary": "The verification path still depends on the organization whose decision is being reviewed.",
    "warning": "Operator dependence does not imply bad intent. It means independent verification cannot be assumed from the materials provided.",
    "does_not_prove": [
      "manipulation",
      "fraud",
      "wrongdoing"
    ]
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

## Interpretive Caution

Operator dependence does not imply bad intent.

An operator may host the envelope, public key, reconstruction rules, and timestamp metadata in the same place for ordinary operational, budgetary, or administrative reasons.

The classification `NDC=1 / operator-dependent` does not prove fraud, manipulation, concealment, or wrongdoing.

It means only that independence cannot be assumed from the materials provided.

Plain-language warning:

> Operator dependence does not imply bad intent. It means the available verification path still depends on the organization whose decision is being reviewed, so independent verification cannot be assumed.

## Verifier Diagnostic Mode

Version `v0.1.1` may include a minimal diagnostic mode.

The diagnostic mode allows the verifier to generate a sample envelope, verify it, and classify the provenance as internally generated.

This does not prove independent verification.

It only confirms that the verifier pipeline can execute end-to-end on controlled test material.

Suggested diagnostic classification:

```json
{
  "diagnostic_mode": {
    "enabled": true,
    "classification": "verifier_generated_and_verified",
    "warning": "This diagnostic confirms pipeline execution only. It does not demonstrate independent verification or real-world citizen exercise."
  }
}
```

Diagnostic mode should be clearly separated from real verification.

It must not be presented as proof that the verifier works on external operator records.

## Exercise Debt

A citizen verifier is not fully validated until someone other than the author uses it on materials not created by the author.

For `v0.1.1`, this remains a documented limitation.

The MVP can still be useful as a tested demonstration, but it should not imply real-world exercised verification until at least one third-party exercise exists.

Future versions should add an exercise criterion such as:

> At least one third-party user should run the verifier on a non-author-generated envelope or verification package and produce a reproducible report.

Until then, the app should be described as an MVP for citizen-facing verification, not as evidence of fully exercised real-world verification.

## Exercise Debt Notice in User Reports

Generated user-facing reports should include a discreet Exercise Debt notice while the project remains in MVP status.

Suggested footer text:

> This verifier is in MVP mode. To remove the Exercise Debt notice, the ecosystem requires independent audits of envelopes generated outside the original development environment.

This notice should not undermine the value of the MVP.

It should clarify that the verifier may be useful for first-level contestability, but has not yet been validated through broad third-party exercise on real operator-generated materials.

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

- declared custody provenance when provided;
- inferred custody provenance when declared provenance is missing;
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
- classify mixed cases as partially independent or dependency unresolved;
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
- inferred custody provenance is guaranteed to be correct;
- different-domain hosting proves independence;
- `NDC=1` proves fraud, manipulation, or wrongdoing;
- partial independence equals full structural independence;
- minimal custody provenance is equivalent to full NDC computation;
- diagnostic mode demonstrates real-world independent verification.

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
- JSON export remains reproducible without unnecessary expansion;
- mobile usability is addressed at least in documentation;
- no production-grade, legal, fairness, or accountability claim is introduced;
- the verifier accepts declared custody provenance when provided;
- the verifier can generate inferred custody provenance when declared provenance is missing;
- inferred custody provenance is clearly labeled as heuristic and potentially incomplete or wrong;
- domain difference is not treated as proof of independence;
- same-domain or same-operator hosting is treated as a strong dependency indicator;
- the app does not require the citizen to manually understand the full custody chain;
- the app can classify an operator-dependent verification path as `NDC=1 / operator-dependent`;
- mixed or partially independent cases are not classified as `NDC=1` in this version;
- mixed cases are labeled as partially independent, partially operator-dependent, or dependency unresolved;
- `NDC=1 / operator-dependent` is presented as a structural dependency classification, not an accusation;
- the plain-language report explains that operator dependence does not prove manipulation, but weakens independent verification;
- the generated report includes an Exercise Debt notice while the project remains in MVP status;
- the machine-readable JSON includes minimal dependency classification fields;
- diagnostic mode, if included, is clearly labeled as internal pipeline testing, not independent verification;
- the roadmap acknowledges Exercise Debt;
- the app does not imply fully exercised real-world citizen verification before third-party use exists.

## Final Constraint

The central constraint becomes:

> Do not merely make verification easier to read. Make operator dependence impossible to hide.
