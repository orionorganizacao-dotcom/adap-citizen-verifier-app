# A-DAP Readiness Model

From citizen verification to public contestability.

This document defines the first experimental readiness model for the A-DAP Citizen Verifier ecosystem.

It does not create a legal certification.

It does not create a guarantee of fairness, legality, correctness, safety, or accountability.

It defines a cautious technical model for describing whether a system is prepared to produce reconstructible decision records that can later be checked by affected people, auditors, regulators, lawyers, researchers, or courts.

## 1. Purpose

The A-DAP Readiness Model exists to prevent a common failure in automated decision governance:

a system may appear transparent through logs, dashboards, explanations, audit pages, or reports, while the actual verification path still depends on the same operator that made the decision.

A-DAP focuses on a narrower question:

Can a later explanation be checked against a previously committed decision record?

This model defines three connected mechanisms:

1. A-DAP Ready Badge
2. NDC Challenge
3. Citizen Escalation Package

Together, they create a bridge between technical verifiability and public contestability.

## 2. A-DAP Ready Badge

The A-DAP Ready Badge is a public technical readiness statement.

It means that a system claims to support A-DAP-style reconstructible decision records.

It should be understood as a compatibility and readiness signal, not as a moral, legal, or institutional guarantee.

## 3. What the Badge Means

A system displaying the A-DAP Ready Badge should mean:

> This system produces reconstructible decision envelopes that allow a later explanation to be compared with a previously committed decision record.

In Portuguese:

> Este sistema produz envelopes decisórios reconstruíveis, permitindo comparar uma explicação posterior com um registro previamente comprometido.

The badge means the system is designed to support contestability through reconstructible records.

It does not mean the decision itself is correct.

It does not mean the institution is trustworthy.

It does not mean the model is fair.

It does not mean the system is legally compliant.

## 4. What the Badge Does Not Mean

The A-DAP Ready Badge does not prove:

- truth
- fairness
- legality
- correctness
- accountability
- non-discrimination
- model quality
- institutional compliance
- absence of manipulation
- absence of operator dependency
- security against all attacks

The badge must never be presented as:

- a trust badge
- a fairness seal
- a legal compliance certificate
- a guarantee of good AI behavior
- proof that the system is safe
- proof that every decision can be contested successfully

The badge only indicates that the system claims to provide the technical materials required for later reconstruction and comparison.

## 5. Why “Ready” Instead of “Verified”

The term A-DAP Ready is intentionally cautious.

“Verified” may imply that an independent authority has fully checked the system.

“Ready” means the system claims to support the minimum technical structure needed for A-DAP-style verification.

This distinction matters.

A-DAP Ready means:

- the system produces decision envelopes
- the system exposes reconstruction materials
- the system allows later comparison
- the system identifies what can and cannot be checked

A-DAP Ready does not mean:

- the system has been independently audited
- the system has passed full NDC analysis
- the system has proven legal compliance
- the system has eliminated operator dependency

## 6. Minimum Criteria for A-DAP Ready

To display the A-DAP Ready Badge, a system should satisfy the following minimum criteria.

### 6.1 Decision Envelope Generation

The system should generate a decision envelope for each covered high-impact automated decision.

The envelope should include, at minimum:

- decision ID
- committed decision record
- hash or commitment reference
- hash algorithm
- schema version
- timestamp metadata
- signature metadata
- reconstruction metadata
- dependency metadata

### 6.2 Citizen Access

The system should make the decision envelope available to the affected person or their authorized representative.

Access should not depend only on an operator-controlled dashboard.

A downloadable verification package should be available whenever possible.

### 6.3 Reconstruction Instructions

The system should provide public reconstruction instructions.

These may include:

- canonicalization method
- hash algorithm
- schema version
- field mapping rules
- comparison rules
- public key reference
- timestamp evidence reference

### 6.4 Dependency Disclosure

The system should disclose whether verification materials depend on the operator.

If the public key, schema, reconstruction rules, timestamp evidence, or verifier interface are controlled only by the same organization that made the decision, this must be visible.

The system must not hide dependency concentration.

### 6.5 Honest Failure Modes

The system should distinguish between:

- explanation matches the committed record
- record is only partly checkable
- explanation conflicts with the committed record
- verification is not exercisable

The system must not treat missing verification material as a successful verification.

Gray results must remain visible.

## 7. Result-Level Compatibility

An A-DAP Ready system should support the four basic result levels used by the Citizen Verifier App.

### Green

Green means the explanation appears to match the committed decision record under the stated assumptions.

Green does not prove truth, fairness, legality, correctness, or accountability.

### Yellow

Yellow means the record is incomplete, partly checkable, or contains dependency warnings.

Yellow does not prove wrongdoing.

It means the verification path is weaker than it should be.

### Red

Red means the later explanation does not appear to match the committed decision record.

Red does not automatically prove illegality, unfairness, or manipulation.

It identifies a concrete inconsistency that may support review or escalation.

### Gray

Gray means verification is not exercisable with the materials provided.

Gray is not an internal verifier error.

Gray does not prove manipulation.

It means the system did not provide enough usable material to support independent reconstruction or checking.

## 8. NDC Challenge

The NDC Challenge is a public adversarial review exercise.

Its purpose is to test whether systems that appear auditable are actually independently checkable.

The challenge question is:

> Can your audit trail survive dependency analysis?

In Portuguese:

> Sua trilha de auditoria sobrevive à análise de dependência?

## 9. NDC Challenge Prompt

Participants are invited to build or analyze systems that appear transparent through:

- logs
- dashboards
- audit reports
- explanations
- trace views
- internal monitoring
- compliance pages
- model cards
- human-readable summaries

The challenge is to determine whether the verification path still depends on the same operator that made the decision.

A system may look transparent and still collapse into operator-dependent verification.

## 10. NDC Challenge Goal

The goal is not to embarrass implementers.

The goal is to strengthen the protocol by making weak verification structures visible.

A successful NDC Challenge submission may show:

- operator-controlled public key
- operator-controlled schema
- operator-controlled reconstruction rules
- operator-controlled timestamp evidence
- operator-controlled verifier interface
- missing downloadable receipt
- post-hoc explanation without pre-committed record
- logs that can be rewritten without independent detection
- dashboards that cannot be checked outside the operator’s environment

## 11. Recognition for Reviewers

Independent reviewers may be recognized for constructive contributions.

Recognition may include:

- listing in a public reviewer file
- acknowledgement in release notes
- issue credit
- security review credit
- contribution to future test fixtures
- inclusion in adversarial examples

Recognition should not imply employment, endorsement, or legal certification.

## 12. Citizen Escalation Package

The Citizen Escalation Package is a generated bundle that helps a person contest or request review of a decision.

It should empower the citizen without pretending to replace lawyers, regulators, courts, auditors, or public defenders.

The package should be downloadable and shareable.

## 13. Package Contents

A Citizen Escalation Package may include:

- plain-language report
- machine-readable JSON result
- decision ID
- result level
- committed record summary
- explanation comparison summary
- detected mismatches
- missing fields
- dependency warnings
- modules run
- modules skipped
- hash status
- signature status
- timestamp status
- limitation notice
- recommended next steps
- suggested review request text

## 14. What the Package Is For

The package may be used to:

- request human review
- ask the institution to explain a mismatch
- ask for missing reconstruction materials
- ask for public key evidence
- ask for timestamp evidence
- ask for a downloadable verification package
- share the issue with a lawyer, auditor, regulator, advocate, journalist, or public defender

## 15. What the Package Is Not For

The package should not be presented as:

- proof of illegality
- proof of discrimination
- proof of fraud
- proof of manipulation
- automatic legal filing
- automatic complaint
- substitute for legal advice
- substitute for institutional review

The package creates structured material for contestation.

It does not decide the contest.

## 16. Escalation Language

The app may generate cautious escalation language.

Example:

> I am requesting review of this automated decision because the materials provided do not allow independent reconstruction of the decision state.

For Red results:

> I am requesting review of this automated decision because the later explanation provided to me does not appear to match the committed decision record.

For Yellow results:

> I am requesting review because the record can only be partly checked with the materials provided.

For Gray results:

> I am requesting the A-DAP envelope or verification package necessary to make this decision independently checkable.

## 17. No Automatic Legal Submission in MVP

The MVP should not automatically submit reports to courts, prosecutors, regulators, public defenders, or litigation platforms.

Automatic legal submission creates legal, institutional, jurisdictional, and reputational risks.

The safer MVP model is:

- generate package
- let the user download
- let the user copy
- let the user share with a qualified reviewer
- let institutions decide how to receive submissions

Future integrations may be considered only with proper legal and institutional partners.

## 18. Readiness Levels

The A-DAP Readiness Model may evolve into multiple levels.

### Level 0 — No A-DAP Support

The system provides explanations, logs, or dashboards but no reconstructible decision envelope.

### Level 1 — Envelope Present

The system produces a decision envelope, but verification materials may still depend heavily on the operator.

### Level 2 — Downloadable Verification Package

The system provides a downloadable package containing envelope, explanation, schema, and reconstruction instructions.

### Level 3 — External Anchoring

The system anchors key verification materials outside the operator’s exclusive control.

Examples may include independent timestamping, public key registry, external hash anchoring, or third-party custody.

### Level 4 — Independent Verification Path

The system supports reconstruction and comparison through tools or materials not controlled only by the decision operator.

### Level 5 — Audited A-DAP Implementation

The system has undergone independent technical review of its A-DAP implementation.

This does not prove fairness, legality, or correctness.

It only means the A-DAP implementation itself has been externally reviewed.

## 19. Relationship Between A-DAP Ready and NDC

A-DAP Ready does not automatically mean NDC > 1.

A system can produce decision envelopes and still have operator-dependent verification.

For example:

- the public key may be hosted only by the operator
- the reconstruction rules may be controlled only by the operator
- the verifier interface may be controlled only by the operator
- the timestamp evidence may not be independently reachable
- the schema may be mutable by the operator

A-DAP Ready means the system has started to provide the materials necessary for contestability.

It does not mean the verification path is fully independent.

## 20. Required Disclaimers

Any public display of A-DAP Ready should include a limitation notice.

Suggested language:

> A-DAP Ready indicates support for reconstructible decision envelopes. It does not prove that any decision is true, fair, lawful, correct, or accountable.

Short version:

> Verifiable record support, not a fairness or legality guarantee.

Portuguese version:

> Suporte a registro verificável, não garantia de justiça ou legalidade.

## 21. Badge Display Rules

A-DAP Ready should not be displayed in a way that misleads users.

The badge should not appear next to claims such as:

- AI you can trust
- guaranteed fair
- legally compliant
- regulator approved
- safe AI certified
- unbiased AI
- fraud-proof decisioning

Acceptable language:

- supports reconstructible decision records
- supports A-DAP-style envelopes
- supports later explanation comparison
- supports citizen verification package
- provides downloadable verification material

## 22. Public Accountability Without Overclaim

The purpose of this model is not to create a new authority that users must blindly trust.

The purpose is to make authority more testable.

A-DAP should not become a trust badge.

A-DAP should become a contestability mechanism.

## 23. Implementation Status

This document describes a readiness model.

It does not mean the full certification process exists.

It does not mean independent auditors have been appointed.

It does not mean any organization has been certified.

It is a public design proposal for how A-DAP adoption could be made technically and institutionally safer.

## 24. Future Work

Future versions may define:

- badge metadata format
- public registry format
- badge verification endpoint
- NDC scoring method
- external anchor requirements
- independent reviewer process
- revocation process
- dispute process
- audit report template
- citizen escalation package schema
- regulator-facing report format
- legal review workflow

## 25. Core Principle

The A-DAP Readiness Model follows one principle:

> A verifier should not pretend to verify what it cannot actually check.

The same principle applies to the badge.

A badge should not pretend to certify what it cannot actually prove.

## 26. Final Note

A-DAP does not turn automated decisions into truth.

It turns them into contestable records.

The A-DAP Readiness Model is a step toward a public ecosystem where citizens, researchers, institutions, and regulators can test whether automated decision systems are genuinely checkable or merely explainable.
