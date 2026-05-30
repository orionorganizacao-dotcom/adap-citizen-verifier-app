# QUICKSTART — A-DAP Citizen Verifier App

This guide helps a reviewer, developer, or contributor run the A-DAP Citizen Verifier App MVP locally.

The MVP tests simplified A-DAP verification behavior using four fixture cases:

- Green
- Yellow
- Red
- Gray

The app does not prove truth, fairness, legality, correctness, or accountability.

It tests record consistency under stated MVP assumptions.

## 1. What this repository contains

This repository contains a minimal citizen-facing A-DAP verifier prototype.

It includes:

```text
README.md
MVP_SCOPE.md
THREAT_MODEL.md
UI_SPEC.md
package.json
tsconfig.json
examples/
src/verifier/
tests/
```

Main folders:

```text
examples/     Demo fixtures for Green, Yellow, Red, and Gray cases
src/verifier/ Core verifier modules
tests/        Minimal test suite
```

## 2. Requirements

You need:

```text
Node.js 20 or newer
npm
```

Recommended:

```text
Node.js 22 or newer
```

Check your versions:

```text
node --version
npm --version
```

## 3. Install dependencies

From the repository root, run:

```text
npm install
```

This installs the development tools used by the MVP:

```text
typescript
tsx
@types/node
```

## 4. Run all tests

Run:

```text
npm test
```

Expected output:

```text
green-case passed
yellow-case passed
red-case passed
gray-case passed
```

## 5. Run one test at a time

Green case:

```text
npm run test:green
```

Yellow case:

```text
npm run test:yellow
```

Red case:

```text
npm run test:red
```

Gray case:

```text
npm run test:gray
```

## 6. Run TypeScript type checking

Run:

```text
npm run typecheck
```

This checks the TypeScript code without emitting build files.

## 7. What each test means

### Green

Fixture:

```text
examples/green-case/
```

Meaning:

```text
The explanation appears to match the committed record.
```

Expected result:

```text
green
```

Important limitation:

```text
Green does not prove the decision was fair, lawful, correct, true, or accountable.
```

### Yellow

Fixture:

```text
examples/yellow-case/
```

Meaning:

```text
The record can be partly checked, but important information is missing.
```

Expected result:

```text
yellow
```

In the MVP fixture, the committed record is missing:

```text
policy_version
```

The fixture also includes dependency warnings.

Important limitation:

```text
Yellow does not mean the decision is wrong. It means verification is incomplete.
```

### Red

Fixture:

```text
examples/red-case/
```

Meaning:

```text
The explanation does not appear to match the committed record.
```

Expected result:

```text
red
```

In the MVP fixture, the committed record says the reason was:

```text
risk_score_threshold
```

But the later explanation says:

```text
income_threshold
```

Important limitation:

```text
Red does not automatically prove wrongdoing. It identifies a specific inconsistency.
```

### Gray

Fixture:

```text
examples/gray-case/
```

Meaning:

```text
No usable A-DAP envelope was provided.
```

Expected result:

```text
gray
```

Important limitation:

```text
Gray does not prove manipulation. It means verification is not exercisable with the materials provided.
```

## 8. Core verifier pipeline

The MVP verifier runs this pipeline:

```text
parseEnvelope
validateSchema
compareExplanation
analyzeDependencies
generateResult
```

Main orchestrator:

```text
src/verifier/runVerification.ts
```

Main export file:

```text
src/verifier/index.ts
```

## 9. Core source files

```text
src/verifier/types.ts
src/verifier/parseEnvelope.ts
src/verifier/validateSchema.ts
src/verifier/compareExplanation.ts
src/verifier/analyzeDependencies.ts
src/verifier/generateResult.ts
src/verifier/runVerification.ts
src/verifier/index.ts
```

## 10. Minimal usage example

A developer can call:

```typescript
import { runVerification } from "./src/verifier";

const output = runVerification({
  envelopeRaw: "{...}",
  explanationRaw: "{...}"
});

console.log(output.result.result_level);
console.log(output.result.plain_language_result);
console.log(output.exportable);
```

## 11. Exportable result shape

The verifier returns an exportable object like:

```json
{
  "adap_citizen_verification_result": {
    "tool_name": "citizen-verifier",
    "tool_version": "0.1.0",
    "schema_version": "citizen-ui-result-0.1",
    "decision_id": "example-decision-id",
    "result_level": "green",
    "plain_language_result": "The explanation appears to match the committed record.",
    "envelope_status": "present",
    "schema_status": "valid",
    "reconstruction_status": "successful",
    "hash_status": "demo_placeholder_not_fully_checked",
    "signature_status": "present_not_fully_checked",
    "timestamp_status": "present_not_independently_verified",
    "explanation_match_status": "matched",
    "missing_fields": [],
    "dependency_warnings": [],
    "modules_run": [],
    "modules_skipped": [],
    "does_not_prove": [
      "truth",
      "fairness",
      "legality",
      "correctness",
      "accountability"
    ],
    "recommended_next_steps": [],
    "limitation_notice": "This tool checks whether the materials provided allow comparison between a later explanation and a committed decision record. It does not prove truth, fairness, legality, correctness, or accountability."
  }
}
```

## 12. What the MVP checks

The MVP checks:

```text
Envelope parsing
Minimal schema validation
Recommended field presence
Structured explanation comparison
Dependency warning detection
Result-level generation
Exportable JSON wrapping
Basic diagnostics
```

## 13. What the MVP does not check yet

The MVP does not yet perform:

```text
Full cryptographic hash validation
Full signature validation
External timestamp authority validation
Full NDC computation
Legal interpretation
Fairness analysis
Model quality analysis
Discrimination analysis
Institutional accountability assessment
PDF OCR
QR code scanning
Browser extension behavior
Mobile app behavior
```

## 14. Design discipline

The verifier must not overclaim.

It should not say:

```text
This decision is fair.
This decision is lawful.
This decision is correct.
This institution is accountable.
This record proves wrongdoing.
This result is certified.
```

It may safely say:

```text
The explanation appears to match the committed record.
The record can be partly checked.
The explanation does not appear to match the committed record.
Verification is not exercisable with the materials provided.
```

## 15. Expected reviewer path

A reviewer should read these files in order:

```text
README.md
MVP_SCOPE.md
THREAT_MODEL.md
UI_SPEC.md
examples/README.md
tests/README.md
src/verifier/runVerification.ts
```

Then run:

```text
npm install
npm test
npm run typecheck
```

## 16. MVP success condition

The MVP is working when:

```text
All four tests pass.
The result levels match the examples.
Missing fields are visible.
Dependency warnings are visible.
Placeholder cryptographic checks are not presented as completed checks.
Every result preserves limitation notices.
```

## 17. Current maturity

This repository is an early MVP.

It is not a finished compliance product.

It is not a legal tool.

It is not a fairness audit tool.

It is a minimal implementation surface for testing whether a citizen-facing A-DAP verifier can classify simplified decision-record scenarios honestly.

## 18. Next development steps

Recommended next steps:

```text
1. Add a simple React UI.
2. Add upload and paste flows.
3. Render Green, Yellow, Red, and Gray result cards.
4. Add report export.
5. Add JSON export.
6. Add real hash verification.
7. Add signature verification.
8. Add timestamp verification.
9. Add more examples.
10. Add CI test workflow.
```

## Final position

The A-DAP Citizen Verifier App should make verification easier to exercise.

It should not become a trust badge.

It should not hide uncertainty.

It should help people test the record.
