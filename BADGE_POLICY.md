# A-DAP Ready Badge Policy

Usage policy for the A-DAP Ready badge.

This document defines how the term **A-DAP Ready** may be used.

It does not create a legal certification.

It does not create a fairness seal.

It does not create a compliance guarantee.

It defines cautious usage rules for describing systems that claim support for reconstructible decision envelopes.

## 1. Badge Name

The approved badge name is:

**A-DAP Ready**

The preferred full label is:

**A-DAP Ready — Reconstructible Decision Envelope Support**

Short label:

**A-DAP Ready**

## 2. Meaning of the Badge

The badge means:

> This system claims to support reconstructible decision envelopes that allow a later explanation to be compared with a previously committed decision record.

In Portuguese:

> Este sistema declara suporte a envelopes decisórios reconstruíveis, permitindo comparar uma explicação posterior com um registro previamente comprometido.

## 3. What the Badge Does Not Mean

The badge does not prove:

- truth
- fairness
- legality
- correctness
- accountability
- non-discrimination
- model quality
- security against all attacks
- institutional compliance
- absence of manipulation
- full independence of verification

The badge must not be described as:

- a trust seal
- a fairness seal
- a legal certification
- a regulator approval mark
- a safe AI certificate
- proof that the system is unbiased
- proof that the system is compliant
- proof that every decision is contestable in practice

## 4. Minimum Conditions for Use

A system should only display the A-DAP Ready badge if it satisfies the following minimum conditions.

### 4.1 Decision Envelope Support

The system generates a decision envelope for covered high-impact automated decisions.

The envelope should include enough structured material to support later reconstruction or comparison.

### 4.2 Citizen or Representative Access

The system makes the decision envelope available to the affected person or their authorized representative.

Access should not depend only on a non-exportable operator dashboard.

### 4.3 Reconstruction Instructions

The system provides public or accessible reconstruction instructions.

These may include:

- schema version
- canonicalization method
- hash algorithm
- field mapping rules
- comparison rules
- public key reference
- timestamp evidence reference

### 4.4 Dependency Disclosure

The system must not hide dependency concentration.

If the public key, schema, reconstruction rules, timestamp evidence, verifier interface, or downloadable receipt depends only on the operator, that dependency should be disclosed.

### 4.5 Honest Failure Modes

The system must preserve honest result levels.

It must not present missing verification material as successful verification.

It must support the distinction between:

- explanation matches
- record is partly checkable
- explanation mismatch
- verification not exercisable

Gray must remain visible.

## 5. Required Limitation Notice

Any public display of A-DAP Ready should include a limitation notice.

Recommended notice:

> A-DAP Ready indicates support for reconstructible decision envelopes. It does not prove that any decision is true, fair, lawful, correct, or accountable.

Short notice:

> Verifiable record support, not a fairness or legality guarantee.

Portuguese notice:

> Suporte a registro verificável, não garantia de justiça ou legalidade.

## 6. Acceptable Usage

Acceptable language includes:

- supports reconstructible decision records
- supports A-DAP-style decision envelopes
- supports later explanation comparison
- supports citizen verification packages
- provides downloadable verification material
- helps make automated decisions more contestable

## 7. Prohibited Usage

The badge must not be used to claim or imply:

- guaranteed fair AI
- legally compliant AI
- regulator-approved AI
- unbiased AI
- fraud-proof decisioning
- fully safe automated decisions
- complete institutional accountability
- independent verification without dependency analysis
- certification of the underlying model’s quality

The badge must not be placed next to claims such as:

- “AI you can trust”
- “guaranteed fair”
- “legally certified”
- “fully compliant”
- “approved by A-DAP”
- “safe AI certified”
- “unbiased decisioning”

## 8. Misuse

Misuse of the badge includes:

- presenting A-DAP Ready as a guarantee
- presenting A-DAP Ready as legal certification
- presenting A-DAP Ready as proof of fairness
- hiding operator-controlled verification dependencies
- claiming independent verification when the verification path still depends on the operator
- using the badge without producing decision envelopes
- using the badge without giving affected people access to verification materials
- using the badge to mislead consumers, regulators, auditors, or the public

## 9. Response to Misuse

If misuse is identified, maintainers may:

1. request correction;
2. request removal of misleading language;
3. publicly document the misuse;
4. remove references to the system from A-DAP materials;
5. decline to recognize the system as A-DAP Ready;
6. create an issue or advisory describing the misuse.

These responses are not legal determinations.

They are project-level integrity measures.

## 10. No Endorsement

Use of the A-DAP Ready badge does not mean that the A-DAP project, its maintainers, contributors, or reviewers endorse the organization, product, model, or decision system displaying it.

The badge describes technical readiness claims only.

It does not endorse institutional behavior.

## 11. No Warranty

The badge is provided as a public technical signal.

It is not a warranty.

It is not a guarantee.

It is not an assurance of compliance.

It is not a substitute for independent audit, legal review, regulatory oversight, or judicial review.

## 12. Relationship to NDC

A-DAP Ready does not automatically mean NDC > 1.

A system can support A-DAP-style envelopes and still have operator-dependent verification.

For example:

- the public key may be operator-controlled
- the schema may be operator-controlled
- the reconstruction rules may be operator-controlled
- the timestamp evidence may be operator-controlled
- the verifier interface may be operator-controlled
- the downloadable receipt may be missing

A-DAP Ready means the system claims to support the basic materials needed for reconstructible verification.

It does not mean the verification path is fully independent.

## 13. Relationship to A-DAP Verified

The term **A-DAP Verified** should not be used at the MVP stage unless a separate independent verification process exists.

Until then, the preferred term is:

**A-DAP Ready**

“Ready” means technical support or compatibility.

“Verified” may imply independent validation.

This project intentionally avoids that implication unless a future governance process defines it.

## 14. Badge Display Format

Recommended display:

**A-DAP Ready**

Subtitle:

**Reconstructible Decision Envelope Support**

Required nearby limitation:

> Verifiable record support, not a fairness or legality guarantee.

## 15. Versioning

This policy may evolve.

Systems using the badge should indicate which version of the policy they follow when possible.

Suggested format:

**A-DAP Ready — Badge Policy v0.1**

## 16. Core Principle

The badge follows the same principle as the verifier:

> A verifier should not pretend to verify what it cannot actually check.

Likewise:

> A badge should not pretend to certify what it cannot actually prove.

## 17. Final Note

A-DAP Ready is not a claim that an automated decision system is good.

It is a claim that the system is prepared to produce materials that can be checked.

A-DAP should not become compliance theater.

A-DAP should make compliance theater easier to detect.
