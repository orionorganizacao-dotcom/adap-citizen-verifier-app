import type {
  CheckStatus,
  CommittedRecord,
  ExplanationMatchStatus,
  ExplanationRecord,
  FieldMismatch,
  StructuredExplanation
} from "./types";

/**
 * Result returned by compareExplanation.
 *
 * This module compares a committed record from the A-DAP envelope with the
 * later explanation provided by the user or institution.
 *
 * The MVP comparison is deterministic and field-based.
 *
 * It does not use AI.
 * It does not perform legal interpretation.
 * It does not decide whether the decision was fair, lawful, correct, or accountable.
 */
export type CompareExplanationResult = {
  ok: boolean;
  checkStatus: CheckStatus;
  explanationMatchStatus: ExplanationMatchStatus;
  matchedFields: string[];
  mismatches: FieldMismatch[];
  missingExplanationFields: string[];
  comparedFields: string[];
  warnings: string[];
};

/**
 * Default fields compared by the MVP.
 *
 * These are intentionally simple and deterministic.
 * Future versions may support domain-specific mappings.
 */
export const DEFAULT_COMPARISON_FIELDS = [
  "decision",
  "reason_code",
  "policy_version",
  "model_version",
  "threshold",
  "explanation_summary"
];

/**
 * Compare the committed record with a structured explanation.
 *
 * Use this when the explanation has already been parsed into JSON.
 */
export function compareExplanation(
  committedRecord: CommittedRecord | null | undefined,
  structuredExplanation: StructuredExplanation | null | undefined,
  fieldsToCompare: string[] = DEFAULT_COMPARISON_FIELDS
): CompareExplanationResult {
  if (!isObject(committedRecord)) {
    return {
      ok: false,
      checkStatus: "not_checkable",
      explanationMatchStatus: "not_checkable",
      matchedFields: [],
      mismatches: [],
      missingExplanationFields: [],
      comparedFields: [],
      warnings: ["Committed record is missing or is not a JSON object."]
    };
  }

  if (!structuredExplanation) {
    return {
      ok: false,
      checkStatus: "skipped",
      explanationMatchStatus: "missing_explanation",
      matchedFields: [],
      mismatches: [],
      missingExplanationFields: fieldsToCompare,
      comparedFields: [],
      warnings: ["No structured explanation was provided."]
    };
  }

  const explanation = structuredExplanation.explanation;

  if (!isObject(explanation)) {
    return {
      ok: false,
      checkStatus: "not_checkable",
      explanationMatchStatus: "not_checkable",
      matchedFields: [],
      mismatches: [],
      missingExplanationFields: fieldsToCompare,
      comparedFields: [],
      warnings: ["Explanation is missing or is not a JSON object."]
    };
  }

  const matchedFields: string[] = [];
  const mismatches: FieldMismatch[] = [];
  const missingExplanationFields: string[] = [];
  const comparedFields: string[] = [];
  const warnings: string[] = [];

  for (const field of fieldsToCompare) {
    const committedValue = committedRecord[field];
    const explanationValue = explanation[field];

    const committedHasField = hasMeaningfulValue(committedValue);
    const explanationHasField = hasMeaningfulValue(explanationValue);

    if (!committedHasField && !explanationHasField) {
      continue;
    }

    if (committedHasField && !explanationHasField) {
      missingExplanationFields.push(field);
      continue;
    }

    if (!committedHasField && explanationHasField) {
      warnings.push(
        `Explanation includes field not present in committed record: ${field}`
      );
      continue;
    }

    comparedFields.push(field);

    if (valuesEqual(committedValue, explanationValue)) {
      matchedFields.push(field);
    } else {
      mismatches.push({
        field,
        committed_value: committedValue,
        explanation_value: explanationValue
      });
    }
  }

  if (mismatches.length > 0) {
    return {
      ok: false,
      checkStatus: "failed",
      explanationMatchStatus: "failed",
      matchedFields,
      mismatches,
      missingExplanationFields,
      comparedFields,
      warnings
    };
  }

  if (missingExplanationFields.length > 0 || warnings.length > 0) {
    return {
      ok: true,
      checkStatus: "passed",
      explanationMatchStatus: "partial",
      matchedFields,
      mismatches,
      missingExplanationFields,
      comparedFields,
      warnings
    };
  }

  if (comparedFields.length === 0) {
    return {
      ok: false,
      checkStatus: "not_checkable",
      explanationMatchStatus: "not_checkable",
      matchedFields,
      mismatches,
      missingExplanationFields,
      comparedFields,
      warnings: [
        ...warnings,
        "No comparable fields were found between committed record and explanation."
      ]
    };
  }

  return {
    ok: true,
    checkStatus: "passed",
    explanationMatchStatus: "matched",
    matchedFields,
    mismatches,
    missingExplanationFields,
    comparedFields,
    warnings
  };
}

/**
 * Parse a raw explanation string.
 *
 * The MVP supports structured JSON explanations.
 * Plain text can be stored, but deterministic comparison requires structured fields.
 */
export function parseStructuredExplanation(rawInput: string): {
  ok: true;
  explanation: StructuredExplanation;
  raw: string;
  error: null;
} | {
  ok: false;
  explanation: null;
  raw: string;
  error: string;
} {
  const raw = typeof rawInput === "string" ? rawInput.trim() : "";

  if (!raw) {
    return {
      ok: false,
      explanation: null,
      raw,
      error: "No explanation was provided."
    };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      ok: false,
      explanation: null,
      raw,
      error:
        "The explanation could not be parsed as JSON. Plain text comparison is not implemented in this MVP."
    };
  }

  if (!isObject(parsed)) {
    return {
      ok: false,
      explanation: null,
      raw,
      error: "The parsed explanation must be a JSON object."
    };
  }

  return {
    ok: true,
    explanation: parsed as StructuredExplanation,
    raw,
    error: null
  };
}

/**
 * Compare committed record with raw explanation input.
 *
 * This helper is useful for UI flow:
 * - user pastes explanation
 * - app tries to parse JSON
 * - if JSON parse succeeds, deterministic comparison runs
 * - if parse fails, comparison is labeled not checkable
 */
export function compareCommittedRecordWithRawExplanation(
  committedRecord: CommittedRecord | null | undefined,
  rawExplanation: string,
  fieldsToCompare: string[] = DEFAULT_COMPARISON_FIELDS
): CompareExplanationResult {
  const parsed = parseStructuredExplanation(rawExplanation);

  if (!parsed.ok) {
    return {
      ok: false,
      checkStatus: "not_checkable",
      explanationMatchStatus: rawExplanation?.trim()
        ? "not_checkable"
        : "missing_explanation",
      matchedFields: [],
      mismatches: [],
      missingExplanationFields: fieldsToCompare,
      comparedFields: [],
      warnings: [parsed.error]
    };
  }

  return compareExplanation(
    committedRecord,
    parsed.explanation,
    fieldsToCompare
  );
}

/**
 * Convert comparison result to a plain-language message.
 */
export function getExplanationComparisonMessage(
  result: CompareExplanationResult
): string {
  if (result.explanationMatchStatus === "matched") {
    return "The explanation appears to match the committed record.";
  }

  if (result.explanationMatchStatus === "partial") {
    return "The explanation can be partly compared, but some fields are missing or incomplete.";
  }

  if (result.explanationMatchStatus === "failed") {
    return "The explanation does not appear to match the committed record.";
  }

  if (result.explanationMatchStatus === "missing_explanation") {
    return "No explanation was provided, so the app cannot compare it against the committed record.";
  }

  return "The explanation could not be compared with the committed record.";
}

/**
 * Get fields that failed comparison in plain-language form.
 */
export function getMismatchMessages(result: CompareExplanationResult): string[] {
  return result.mismatches.map((mismatch) => {
    return `${mismatch.field}: committed value "${String(
      mismatch.committed_value
    )}" does not match explanation value "${String(
      mismatch.explanation_value
    )}".`;
  });
}

/**
 * Basic value equality for MVP deterministic comparison.
 *
 * Strings are compared after trimming.
 * Other values are compared through JSON serialization when possible.
 */
export function valuesEqual(left: unknown, right: unknown): boolean {
  if (typeof left === "string" && typeof right === "string") {
    return left.trim() === right.trim();
  }

  if (left === right) {
    return true;
  }

  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return false;
  }
}

/**
 * Check whether a field has a meaningful value for comparison.
 */
export function hasMeaningfulValue(value: unknown): boolean {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string" && value.trim() === "") {
    return false;
  }

  return true;
}

/**
 * Minimal object guard.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
  }
