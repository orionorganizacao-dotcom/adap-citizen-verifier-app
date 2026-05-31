# Tests — A-DAP Citizen Verifier App

This folder contains the minimal MVP test suite for the A-DAP Citizen Verifier App.

The tests verify the four basic result levels:

- Green
- Yellow
- Red
- Gray

They also verify that a `VerificationResult` can be converted into a citizen-facing UI result card.

Each test loads fixtures from the `examples/` folder when needed, runs the verifier pipeline, and checks whether the generated result matches the expected behavior.

## Purpose

The tests are designed to confirm that the verifier behaves honestly.

They do not prove that A-DAP is complete.

They do not prove that a decision is true, fair, lawful, correct, or accountable.

They only test whether the MVP verifier correctly classifies simplified demo cases and preserves the limitations of each result.

## Test Files

```text
tests/
├── README.md
├── green.test.ts
├── yellow.test.ts
├── red.test.ts
├── gray.test.ts
└── ui-result-card.test.ts
