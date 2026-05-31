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

```text
Can the decision be independently checked from the materials provided?
