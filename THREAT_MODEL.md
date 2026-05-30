# Threat Model — A-DAP Citizen Verifier App

This document defines the threat model for the A-DAP Citizen Verifier App.

The app is a citizen-facing verification tool.

It helps users test whether a later explanation appears consistent with a committed A-DAP decision record under stated assumptions.

It does not prove truth, fairness, legality, correctness, or accountability.

## Core Security Claim

The app should help users exercise A-DAP verification without becoming a new trust authority.

The app must not ask users to trust the interface.

It must show:

- what was checked
- what was not checked
- what matched
- what failed
- what was missing
- what remains operator-controlled
- what the result does not prove

The app is useful only if its outputs remain explainable, exportable, and reproducible.

## Protected Assets

The app may handle sensitive information.

Protected assets include:

- A-DAP envelopes
- decision notices
- denial letters
- explanation text
- committed decision records
- input commitments
- output commitments
- policy or model version references
- hashes
- signatures
- timestamp evidence
- public key references
- reconstruction rules
- dependency warnings
- exported reports
- machine-readable JSON results
- user-uploaded files
- personally identifiable information
- sensitive financial, health, employment, education, insurance, or public-benefit information

The app should treat all user-provided decision materials as potentially sensitive.

## Main Threats

## 1. Trust Badge Misuse

### Threat

The app displays a label such as:

```text
A-DAP Verified
```

or:

```text
Verified
```

without showing what was actually checked.

### Risk

Users, companies, regulators, or courts may treat the result as a general trust certification.

That would turn A-DAP into a compliance badge instead of a verification architecture.

### Mitigation

The app must avoid generic trust badges.

It should show specific findings:

- envelope present
- schema valid
- hash matched
- signature valid
- timestamp present
- explanation matched
- missing fields
- dependency warnings

The app should always include limitation notices.

### Safe output

```text
Record checked.
Explanation comparison failed.
Download reproducible report.
```

### Unsafe output

```text
A-DAP Verified.
```

## 2. Legal, Fairness, or Correctness Overclaim

### Threat

The app implies that a green result means the decision was fair, lawful, correct, or accountable.

### Risk

A technically consistent record may still reflect an unfair, unlawful, biased, or wrong decision.

A-DAP tests consistency against a committed record.

It does not judge the substantive quality of the decision.

### Mitigation

Every result level must include a limitation notice.

Required language:

```text
This does not prove the decision was fair, lawful, or correct.
```

The app must not provide legal, medical, financial, or regulatory advice.

### Safe output

```text
The explanation appears consistent with the committed record under the stated assumptions.
```

### Unsafe output

```text
The decision is valid.
```

## 3. Interface Becomes a New Authority

### Threat

The app becomes another system asking the user to trust its conclusion.

### Risk

The app recreates the same problem A-DAP is designed to expose:

the verifier becomes the authority.

### Mitigation

The app must produce reproducible outputs.

Each result should include:

- tool version
- schema version
- verification time
- files checked
- fields checked
- assumptions used
- missing fields
- dependency warnings
- machine-readable JSON result
- plain-language report

The app should allow another reviewer to reproduce or inspect the result.

### Safe output

```text
This result was produced by tool version 0.1.0 using schema citizen-ui-result-0.1.
Download JSON result.
Download report.
```

### Unsafe output

```text
Trust this result because the app says so.
```

## 4. Operator-Controlled Verification Path

### Threat

The verification path depends on the same organization whose decision is being reviewed.

Examples:

- envelope available only through operator portal
- public key hosted only by operator
- schema hosted only by operator
- timestamp evidence not externally reachable
- reconstruction rules controlled by operator
- verifier interface controlled by operator

### Risk

The user may believe verification is independent when it still depends on the verified party.

### Mitigation

The app must show dependency warnings.

Example warning:

```text
The verification path still depends on the organization whose decision is being reviewed.
```

The app should distinguish:

- usability
- reproducibility
- structural independence
- institutional accountability

The app must not imply that local execution or a web interface automatically increases NDC.

## 5. Local Execution Confused With Independence

### Threat

The app runs in the browser, and users assume this means verification is independent.

### Risk

Local execution can reduce friction, but the verification may still depend on operator-controlled keys, schemas, receipts, timestamps, or reconstruction rules.

### Mitigation

The app should label local execution honestly.

Safe statement:

```text
This check ran locally, but some verification materials may still depend on the operator.
```

Unsafe statement:

```text
Because this runs locally, verification is independent.
```

## 6. Hosted App Capture

### Threat

The app is hosted by an operator, vendor, or financially dependent party.

### Risk

The hosted verifier may become part of a compliance theater deployment.

The operator may control:

- interface behavior
- result wording
- schema availability
- public key references
- receipt retrieval
- logs
- data retention
- updates
- export availability

### Mitigation

The app should disclose:

- who operates the verifier
- whether data is uploaded
- whether data is stored
- whether verification can be reproduced elsewhere
- whether the verifier is open source
- whether receipts can be exported
- whether schemas and keys are available outside the operator

The app should support local or independent reproduction where possible.

## 7. Sensitive Data Exposure

### Threat

Users upload sensitive decision materials to the verifier.

These materials may include financial, health, employment, education, insurance, public-benefit, or identity information.

### Risk

The app may expose sensitive data through:

- server logs
- browser storage
- analytics
- third-party scripts
- cloud uploads
- exported files
- screenshots
- accidental sharing
- insecure transport
- retained files
- developer debugging tools

### Mitigation

The MVP should:

- process locally where possible
- avoid unnecessary storage
- avoid user accounts for basic checks
- avoid third-party analytics by default
- avoid logging sensitive inputs
- allow users to clear inputs
- warn before exporting sensitive data
- disclose whether data leaves the browser
- avoid sending verification data to third parties by default

## 8. Malformed Input and Parser Abuse

### Threat

A user or attacker uploads malformed, oversized, or malicious input.

Examples:

- invalid JSON
- deeply nested JSON
- extremely large files
- unexpected file types
- malicious HTML
- embedded scripts
- corrupted data
- misleading schema fields

### Risk

The app may crash, freeze, produce misleading results, or expose data.

### Mitigation

The app should:

- parse JSON safely
- reject unsupported file types
- limit file size
- handle malformed inputs gracefully
- avoid executing uploaded content
- avoid rendering untrusted HTML
- display clear parse errors
- never treat parse failure as verification failure against the user

Safe result:

```text
The envelope could not be parsed. Verification is not exercisable with this file.
```

## 9. False Confidence From Partial Checks

### Threat

The app runs only some checks but presents the result as complete.

### Risk

Users may rely on incomplete verification.

For example:

- hash checked but signature not checked
- signature metadata present but not validated
- timestamp claim present but not externally verified
- explanation comparison incomplete
- missing policy version ignored

### Mitigation

Each module must disclose status:

- ran
- passed
- failed
- skipped
- not implemented
- not checkable
- missing required data

The app should show:

```text
Signature status: not checked in this MVP.
```

instead of implying validation.

## 10. Missing Fields Hidden From User

### Threat

The app hides missing fields or treats absent data as acceptable.

### Risk

The user may believe the record is stronger than it is.

### Mitigation

The app must show missing fields clearly.

Examples:

- missing decision ID
- missing schema version
- missing committed hash
- missing committed record
- missing public key
- missing timestamp evidence
- missing policy version
- missing model version
- missing explanation mapping
- missing reconstruction rules

Missing fields should influence result level.

## 11. Explanation Comparison Overreach

### Threat

The app compares free-text explanations semantically and overstates the result.

### Risk

Natural-language comparison can be ambiguous.

An AI or heuristic comparator may hallucinate, misread, or overstate inconsistency.

### Mitigation

The first MVP should prefer deterministic field-level comparison.

If free-text comparison is used, it must be labeled as limited or heuristic.

Safe statement:

```text
The explanation comparison is based on structured fields provided in the envelope and explanation.
```

Unsafe statement:

```text
The app fully understands the explanation.
```

## 12. AI-Based Comparison Risk

### Threat

A future version uses an LLM or AI model to compare explanations and records.

### Risk

The app may introduce:

- hallucinated mismatches
- missed mismatches
- inconsistent outputs
- hidden reasoning
- model drift
- non-reproducible comparisons
- privacy exposure if data is sent to external APIs

### Mitigation

For the MVP, avoid AI-based comparison.

If AI comparison is later added, it must be:

- optional
- clearly labeled
- reproducible where possible
- separated from deterministic checks
- excluded from core verification claims unless independently validated
- privacy-disclosed if external APIs are used

## 13. Exported Report Misuse

### Threat

A user, company, lawyer, or regulator treats the exported report as proof of legality, fairness, or correctness.

### Risk

A-DAP verification can identify consistency or inconsistency.

It does not decide legal remedy.

### Mitigation

Every exported report must include:

```text
This report does not prove that the decision was true, fair, lawful, or correct.
```

The report should state:

- what was checked
- what was not checked
- what assumptions were used
- what remains unresolved

## 14. JSON Result Misinterpretation

### Threat

Machine-readable results are ingested by another system that treats a green result as compliance.

### Risk

Automated downstream systems may convert record consistency into a compliance or fairness claim.

### Mitigation

The JSON export must include:

```json
"does_not_prove": [
  "truth",
  "fairness",
  "legality",
  "correctness",
  "accountability"
]
```

It should also include explicit status fields, not a single trust score.

## 15. Dependency Warning Suppression

### Threat

A deployer removes dependency warnings to make the app look more favorable.

### Risk

The verifier becomes part of adoption capture or compliance theater.

### Mitigation

Dependency warnings should be part of the core result object.

They should be included in both:

- plain-language report
- machine-readable JSON export

Removing them should be treated as a material modification.

## 16. Version Drift

### Threat

The app, schema, or verification logic changes over time.

### Risk

Old reports may become hard to reproduce.

Different versions may produce different results.

### Mitigation

Every result should include:

- tool name
- tool version
- schema version
- verification time
- result schema version
- modules run
- assumptions used

## 17. Schema Capture

### Threat

Operators define schemas that omit material fields.

### Risk

A decision may appear reconstructible while key decision factors remain outside the envelope.

### Mitigation

The app should warn when expected fields are missing.

It should not treat schema presence as sufficient.

Safe statement:

```text
The envelope uses a declared schema, but relevant fields may still be outside the committed record.
```

## 18. Materiality Capture

### Threat

The operator defines what counts as material.

### Risk

NDC or verification may be shaped by self-serving boundaries.

### Mitigation

The app should distinguish:

- self-declared materiality
- externally anchored materiality
- adversarially contestable materiality
- independently reproducible materiality

For MVP, this may be shown as a warning if materiality assumptions are missing or self-declared.

## 19. Public Key Trust Problem

### Threat

The app validates a signature using a public key controlled only by the operator.

### Risk

The signature may confirm that the operator signed something, but not that the key is independently anchored.

### Mitigation

The app should separate:

- signature cryptographically valid
- public key independently anchored
- public key operator-hosted
- public key missing
- public key not checked

Safe output:

```text
Signature appears valid using the provided key, but the key is hosted only by the operator.
```

## 20. Timestamp Trust Problem

### Threat

The app treats a timestamp claim as independent timestamp evidence.

### Risk

An operator-controlled timestamp claim may be mistaken for external anchoring.

### Mitigation

The app should separate:

- timestamp missing
- timestamp claim present
- timestamp evidence present
- timestamp independently verifiable
- timestamp authority unavailable
- timestamp operator-controlled
- timestamp not checked in this MVP

Safe output:

```text
Timestamp claim is present, but independent timestamp evidence was not verified.
```

## 21. Hash Misunderstanding

### Threat

Users believe a hash match proves the decision was correct.

### Risk

A hash only shows consistency between a reconstructed object and a commitment.

It does not prove input truth, fairness, legality, completeness, or proper policy.

### Mitigation

Hash result should include explanatory text.

Safe output:

```text
The hash matched. This means the reconstructed record matches the committed value. It does not prove the decision was fair, lawful, or correct.
```

## 22. Green Result Overtrust

### Threat

A green result is interpreted as no problem.

### Risk

A green result only means the later explanation appears consistent with the committed record under stated assumptions.

The committed record itself may still encode a bad, unfair, unlawful, or incorrect decision.

### Mitigation

Green results must include limitation text and next-step guidance.

Safe next step:

```text
You may still request human review if you believe the decision was unfair, unlawful, or based on incorrect information.
```

## 23. Red Result Overclaim

### Threat

A red result is interpreted as proof of wrongdoing.

### Risk

A mismatch may result from:

- bad data
- missing field
- wrong schema
- extraction error
- malformed envelope
- app bug
- genuine inconsistency
- operator error
- tampering

### Mitigation

Red results must say:

```text
This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.
```

## 24. Gray Result Misuse

### Threat

A gray result is treated as proof that the operator did something wrong.

### Risk

Lack of exercisable verification may be a contestability weakness, but not proof of manipulation.

### Mitigation

Gray results should state:

```text
The decision may have documentation, but the verification path is not exercisable from the materials provided.
```

## 25. Accessibility Failure

### Threat

The app is technically functional but inaccessible to many users.

### Risk

Contestability remains unequal.

Affected people may be blocked by:

- small text
- color-only labels
- low contrast
- no screen reader support
- complex language
- desktop-only layout
- high bandwidth requirements
- account requirements
- unsupported language

### Mitigation

The app should support:

- mobile-first layout
- color plus text labels
- readable font sizes
- plain-language summaries
- downloadable reports
- keyboard navigation where possible
- no account required for basic checks
- clear limitation notices

Color alone should never carry meaning.

## 26. Cost Barrier

### Threat

Verification requires paid experts or paid infrastructure.

### Risk

The evidence exists, but ordinary users cannot exercise it.

### Mitigation

The MVP should make first-level verification free or low-cost.

It should identify when expert review may be needed, but it should not require payment for basic checks.

The app should make clear that expert review may be required for legal, clinical, financial, or regulatory interpretation.

## 27. Privacy Through Export Failure

### Threat

Exported reports expose sensitive data unnecessarily.

### Risk

Users may share reports containing personal or sensitive decision information.

### Mitigation

The app should warn before export.

Future versions may support:

- redacted reports
- selective export
- metadata-only export
- encrypted export
- user-controlled sharing

For MVP, include a warning:

```text
This report may contain sensitive decision information. Review before sharing.
```

## 28. Supply Chain Risk

### Threat

Dependencies, packages, or build tooling introduce vulnerabilities.

### Risk

The app may expose data or produce wrong verification results.

### Mitigation

The project should:

- keep dependencies minimal
- pin versions where practical
- avoid unnecessary third-party scripts
- review cryptographic libraries carefully
- avoid custom cryptography when standard libraries exist
- document dependency choices

## 29. Cryptographic Implementation Error

### Threat

The app incorrectly implements hashing, signature validation, or timestamp checks.

### Risk

The app may produce false results.

### Mitigation

The MVP should start conservatively.

If full cryptographic validation is not implemented, label it as not checked.

Do not fake cryptographic completion.

Safe output:

```text
Signature metadata present. Signature validation is not implemented in this MVP.
```

## 30. Reproducibility Failure

### Threat

The app cannot reproduce results later.

### Risk

Exports are not useful for regulators, courts, auditors, or technical reviewers.

### Mitigation

Exports should include enough metadata to reproduce results:

- tool version
- schema version
- verification time
- inputs used or input hashes
- modules run
- result statuses
- assumptions
- warnings

## Trust Boundaries

The app should distinguish at least these trust boundaries:

1. User device
2. Browser runtime
3. Uploaded files
4. Decision operator
5. Verifier app maintainer
6. Public key host
7. Timestamp authority
8. Schema provider
9. Reconstruction-rule provider
10. Export recipient
11. Regulator or court
12. External auditor

The app should avoid collapsing these boundaries into one generic claim of trust.

## Attacker Models

## Operator

The organization that made the decision may try to:

- provide incomplete envelopes
- control public keys
- control reconstruction rules
- host the only verifier
- omit material fields
- provide non-exportable results
- use the app as a trust badge
- suppress dependency warnings

## Malicious User

A user may upload malformed inputs or attempt to exploit parsing.

## Confused User

A user may misunderstand the result and treat it as proof of fairness, legality, or correctness.

## Captured Verifier

A verifier may be formally separate but economically or operationally dependent on the operator.

## Third-Party Service

A hosting provider, analytics service, file processor, or API provider may access sensitive data.

## Developer

A developer may accidentally introduce bugs, overclaims, logging, hidden dependencies, or unsafe defaults.

## Assumptions

The MVP assumes:

- user-provided files may be sensitive
- uploaded data may be malformed
- not all envelopes will be complete
- not all signatures can be checked
- not all timestamps are independently verifiable
- not all explanations are structured
- users may misunderstand technical results
- operators may use A-DAP vocabulary without satisfying A-DAP separability
- usability does not equal independent verification
- local execution does not automatically increase NDC

## Non-Goals

The app does not attempt to:

- determine whether a decision was fair
- determine whether a decision was lawful
- determine whether a decision was correct
- determine whether discrimination occurred
- provide legal advice
- provide medical advice
- provide financial advice
- replace institutional review
- replace courts or regulators
- compute full NDC in the first MVP
- fully validate every cryptographic artifact in the first MVP
- guarantee independent verification
- guarantee accountability

## Safe Claims

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

## Required Warnings

Every result should include appropriate warnings.

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

### Dependency warning

```text
This does not prove manipulation. It means the verification path still depends on the organization whose decision is being reviewed.
```

### Export warning

```text
This report may contain sensitive decision information. Review before sharing.
```

## Minimum Security Requirements for v0.1

The first MVP should:

- parse JSON safely
- handle malformed inputs
- avoid executing uploaded content
- avoid unnecessary data storage
- avoid account requirements
- avoid third-party analytics by default
- avoid sending data to external services by default
- avoid hidden server-side processing unless disclosed
- allow users to clear inputs
- label unimplemented checks honestly
- show missing fields
- show dependency warnings
- include limitation notices
- export reproducible results

## Open Security Questions

The following questions remain open:

- Should verification be fully local by default?
- Should any server-side processing be allowed?
- How should large files be handled?
- Should reports support redaction?
- Should exported reports be signed?
- Should the app provide offline mode?
- How should public keys be anchored?
- How should timestamp evidence be checked?
- How should schema versions be preserved?
- How should dependency warnings be standardized?
- How should the app prevent trust-badge misuse by third parties?
- How should independent verifiers be listed or evaluated?
- How should user privacy be protected when reports are shared?
- How should future AI-based explanation comparison be constrained?

## Final Position

The A-DAP Citizen Verifier App is not a trust machine.

It is a verification interface.

Its job is to help users test whether a later explanation appears consistent with a committed decision record.

Its value depends on honesty about limits.

A useful verifier must show what it checked, what it could not check, what failed, what was missing, and where trust still remains.

The app should not ask to be trusted.

It should help the record be tested.
