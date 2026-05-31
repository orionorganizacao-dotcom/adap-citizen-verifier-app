import type {
  ExportableVerificationResult,
  VerificationResult
} from "./types";

import { parseEnvelope } from "./parseEnvelope";
import { validateSchema } from "./validateSchema";
import { compareCommittedRecordWithRawExplanation } from "./compareExplanation";
import { analyzeDependencies } from "./analyzeDependencies";
import { generateResult, toExportableResult } from "./generateResult";

/**
 * High-level MVP verification input.
 *
 * The UI can pass pasted envelope text and pasted explanation text directly
 * into runVerification().
 */
export type RunVerificationInput = {
  envelopeRaw?: string;
  explanationRaw?: string;
  verificationTime?: string;
};

/**
 * High-level MVP verification output.
 *
 * This includes:
 * - final VerificationResult
 * - exportable JSON wrapper
 * - parser/schema/comparison/dependency debug data for UI or tests
 */
export type RunVerificationOutput = {
  ok: boolean;
  result: VerificationResult;
  exportable: ExportableVerificationResult;
  diagnostics: RunVerificationDiagnostics;
};

/**
 * Diagnostics are useful for development, tests, and technical detail panels.
 *
 * They should not be treated as legal, fairness, or accountability findings.
 */
export type RunVerificationDiagnostics = {
  envelopeParseOk: boolean;
  envelopeParseError: string | null;

  explanationProvided: boolean;
  explanationCompared: boolean;

  schemaWarnings: string[];
  comparisonWarnings: string[];
  dependencyWarnings: string[];

  notes: string[];
};

/**
 * Run the full MVP verification pipeline.
 *
 * Pipeline:
 * 1. Parse envelope.
 * 2. Validate schema.
 * 3. Compare committed record with explanation.
 * 4. Analyze dependency metadata.
 * 5. Generate final result.
 * 6. Wrap result for export.
 *
 * Scope:
 * - tests record consistency
 * - detects missing fields
 * - detects deterministic explanation mismatch
 * - detects operator-controlled dependency warnings
 *
 * Non-scope:
 * - does not prove truth
 * - does not prove fairness
 * - does not prove legality
 * - does not prove correctness
 * - does not prove accountability
 */
export function runVerification(
  input: RunVerificationInput
): RunVerificationOutput {
  const envelopeRaw = input.envelopeRaw ?? "";
  const explanationRaw = input.explanationRaw ?? "";
  const verificationTime = input.verificationTime;

  const envelopeParse = parseEnvelope(envelopeRaw);

  if (!envelopeParse.ok) {
    const result = generateResult({
      envelope: null,
      schemaResult: null,
      comparisonResult: null,
      dependencyResult: null,
      verificationTime
    });

    return {
      ok: false,
      result,
      exportable: toExportableResult(result),
      diagnostics: {
        envelopeParseOk: false,
        envelopeParseError: envelopeParse.error,
        explanationProvided: hasText(explanationRaw),
        explanationCompared: false,
        schemaWarnings: [],
        comparisonWarnings: [],
        dependencyWarnings: [
          "No usable envelope was provided, so the verification path is not exercisable."
        ],
        notes: [
          envelopeParse.error,
          "Verification returned Gray because the envelope could not be parsed."
        ]
      }
    };
  }

  const envelope = envelopeParse.envelope;
  const schemaResult = validateSchema(envelope);
  const dependencyResult = analyzeDependencies(envelope);

  const comparisonResult = hasText(explanationRaw)
    ? compareCommittedRecordWithRawExplanation(
        envelope.committed_record,
        explanationRaw
      )
    : compareCommittedRecordWithRawExplanation(
        envelope.committed_record,
        ""
      );

  const result = generateResult({
    envelope,
    schemaResult,
    comparisonResult,
    dependencyResult,
    verificationTime
  });

  return {
    ok: result.result_level === "green" || result.result_level === "yellow",
    result,
    exportable: toExportableResult(result),
    diagnostics: {
      envelopeParseOk: true,
      envelopeParseError: null,
      explanationProvided: hasText(explanationRaw),
      explanationCompared:
        comparisonResult.explanationMatchStatus === "matched" ||
        comparisonResult.explanationMatchStatus === "partial" ||
        comparisonResult.explanationMatchStatus === "failed",
      schemaWarnings: schemaResult.warnings,
      comparisonWarnings: comparisonResult.warnings,
      dependencyWarnings: dependencyResult.warnings,
      notes: buildDiagnosticNotes(result)
    }
  };
}

/**
 * Run verification and return only the final result.
 *
 * Useful for UI components that do not need diagnostics.
 */
export function runVerificationResultOnly(
  input: RunVerificationInput
): VerificationResult {
  return runVerification(input).result;
}

/**
 * Run verification and return exportable JSON.
 *
 * Useful for download/export buttons.
 */
export function runVerificationForExport(
  input: RunVerificationInput
): ExportableVerificationResult {
  return runVerification(input).exportable;
}

/**
 * Run verification from already-loaded example fixture strings.
 *
 * This helper is useful for tests using examples/green-case, yellow-case,
 * red-case, and gray-case.
 */
export function runFixtureVerification(params: {
  envelopeRaw?: string;
  explanationRaw?: string;
  fixedVerificationTime?: string;
}): RunVerificationOutput {
  return runVerification({
    envelopeRaw: params.envelopeRaw ?? "",
    explanationRaw: params.explanationRaw ?? "",
    verificationTime:
      params.fixedVerificationTime ?? "2026-05-30T00:00:00Z"
  });
}

/**
 * Convert exportable verification result to pretty JSON.
 */
export function stringifyExportableResult(
  exportable: ExportableVerificationResult
): string {
  return JSON.stringify(exportable, null, 2);
}

/**
 * Convert final verification result to pretty JSON.
 */
export function stringifyVerificationResult(
  result: VerificationResult
): string {
  return JSON.stringify(result, null, 2);
}

/**
 * Small helper to check whether a text input exists.
 */
export function hasText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Build short diagnostic notes for technical details.
 */
export function buildDiagnosticNotes(result: VerificationResult): string[] {
  const notes: string[] = [];

  notes.push(
    "This MVP tests record consistency. It does not prove truth, fairness, legality, correctness, or accountability."
  );

  if (result.result_level === "green") {
    notes.push(
      "Green means the later explanation appears consistent with the committed record under stated assumptions."
    );
  }

  if (result.result_level === "yellow") {
    notes.push(
      "Yellow means the record is incomplete, partially checkable, or contains dependency warnings."
    );
  }

  if (result.result_level === "red") {
    notes.push(
      "Red means a specific inconsistency was detected between the explanation and committed record."
    );
  }

  if (result.result_level === "gray") {
    notes.push(
      "Gray means verification is not exercisable with the materials provided."
    );
  }

  if (result.dependency_warnings.length > 0) {
    notes.push(
      "Dependency warnings do not prove manipulation. They indicate that some verification materials may still depend on the operator."
    );
  }

  if (result.modules_skipped.length > 0) {
    notes.push(
      "Some modules were skipped or are not fully implemented in the MVP."
    );
  }

  return notes;
}
