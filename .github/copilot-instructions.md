# A-DAP Copilot Instructions

This repository is part of A-DAP — Auditable Decision Accountability Protocol.

A-DAP is a contestability and verifiability architecture for high-impact automated decisions.

## Core boundaries

Do not describe A-DAP as proving truth, fairness, legality, correctness, or full accountability.

A-DAP does not make people blindly trust AI systems.

A-DAP helps affected parties, auditors, lawyers, journalists, regulators, and institutions detect whether a later explanation corresponds to a committed decision record.

## Required distinctions

Always preserve the distinction between:

- verification and accountability;
- explanation and evidence;
- logs and committed decision envelopes;
- internal measurement and independent verification;
- AI-generated explanation and reconstructible decision record;
- MVP status and production-ready assurance.

## Citizen Verifier App positioning

The Citizen Verifier App is currently an MVP.

Do not describe it as a finished consumer product.

Describe it as an open-source MVP designed to demonstrate how a user-facing verifier could help compare a later explanation against a committed decision envelope.

## Writing style

Use clear, precise, technically defensible English.

Avoid hype, certainty, and overclaiming.

Prefer phrases such as:

- "supports later reconstruction";
- "under defined custody assumptions";
- "helps detect inconsistencies";
- "does not prove that the decision was true or fair";
- "does not replace legal, regulatory, or institutional accountability."

## Code guidance

When writing code:

- keep examples minimal and auditable;
- prefer deterministic behavior;
- document assumptions;
- include verification steps where possible;
- avoid unnecessary dependencies;
- do not introduce features that imply production-grade security unless implemented.

## Documentation guidance

When writing README files, release notes, issues, or architecture documents:

- keep A-DAP positioned as contestability infrastructure;
- make limitations explicit;
- distinguish MVP features from roadmap features;
- avoid saying the app guarantees trust, fairness, compliance, or accountability.
