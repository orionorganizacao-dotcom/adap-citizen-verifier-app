import type {
  CheckStatus,
  DemoAdapEnvelope,
  SchemaStatus
} from "./types";

import {
  REQUIRED_DEMO_ENVELOPE_FIELDS,
  RECOMMENDED_COMMITTED_RECORD_FIELDS
} from "./types";

/**
 * Result returned by validateSchema.
 *
 * This module checks whether a parsed A-DAP demo envelope contains the
 * minimum fields needed for the MVP.
 *
 * It does not verify hashes.
 * It does not verify signatures.
 * It does not verify timestamps.
 * It does not compare explanations.
 * It does not decide truth, fairness, legality, correctness, or accountability.
 */
export type ValidateSchemaResult = {
  ok: boolean;
  schemaStatus: SchemaStatus;
  checkStatus: CheckStatus;
  missingRequiredFields: string[];
  missingRecommendedFields: string[];
  presentFields: string[];
  warnings: string[];
};

/**
 * Validate the minimal demo envelope schema used by the MVP.
 *
 * The MVP schema is intentionally narrow:
 * - It is for demonstration and testing.
 * - It is not the final A-DAP envelope standard.
 * - It should not be treated as compliance proof.
 */
export function validateSchema(
  envelope: DemoAdapEnvelope | null | undefined
): ValidateSchemaResult {
  if (!envelope) {
    return {
      ok: false,
      schemaStatus: "missing",
      checkStatus: "not_checkable",
      missingRequiredFields: [...REQUIRED_DEMO_ENVELOPE_FIELDS],
      missingRecommendedFields: [...RECOMMENDED_COMMITTED_RECORD_FIELDS],
      presentFields: [],
      warnings: ["No parsed envelope was provided for schema validation."]
    };
  }

  const presentFields = getPresentTopLevelFields(envelope);
  const missingRequiredFields = findMissingTopLevelFields(
    envelope,
    REQUIRED_DEMO_ENVELOPE_FIELDS
  );

  const committedRecord = envelope.committed_record;
  const missingRecommendedFields = findMissingCommittedRecordFields(
    committedRecord,
    RECOMMENDED_COMMITTED_RECORD_FIELDS
  );

  const warnings: string[] = [];

  if (!envelope.schema_version) {
    warnings.push("Envelope schema_version is missing.");
  }

  if (
    envelope.schema_version &&
    envelope.schema_version !== "adap-envelope-demo-0.1"
  ) {
    warnings.push(
      `Unsupported or unexpected schema_version: ${String(
        envelope.schema_version
      )}`
    );
  }

  if (!isObject(envelope.committed_record)) {
    warnings.push("committed_record is missing or is not a JSON object.");
  }

  if (missingRecommendedFields.length > 0) {
    warnings.push(
      `Committed record is missing recommended fields: ${missingRecommendedFields.join(
        ", "
      )}`
    );
  }

  if (!envelope.signature) {
    warnings.push("signature metadata is missing.");
  }

  if (!envelope.timestamp) {
    warnings.push("timestamp metadata is missing.");
  }

  if (!envelope.dependencies) {
    warnings.push("dependency metadata is missing.");
  }

  if (missingRequiredFields.length > 0) {
    return {
      ok: false,
      schemaStatus: "invalid",
      checkStatus: "failed",
      missingRequiredFields,
      missingRecommendedFields,
      presentFields,
      warnings
    };
  }

  if (missingRecommendedFields.length > 0) {
    return {
      ok: true,
      schemaStatus: "valid_with_missing_fields",
      checkStatus: "passed",
      missingRequiredFields,
      missingRecommendedFields,
      presentFields,
      warnings
    };
  }

  return {
    ok: true,
    schemaStatus: "valid",
    checkStatus: "passed",
    missingRequiredFields,
    missingRecommendedFields,
    presentFields,
    warnings
  };
}

/**
 * Return top-level fields that are present in the envelope.
 */
export function getPresentTopLevelFields(envelope: DemoAdapEnvelope): string[] {
  return Object.keys(envelope).filter((key) => {
    const value = envelope[key];

    return value !== undefined && value !== null;
  });
}

/**
 * Find missing top-level fields.
 */
export function findMissingTopLevelFields(
  envelope: DemoAdapEnvelope,
  requiredFields: string[]
): string[] {
  return requiredFields.filter((field) => {
    const value = envelope[field];

    return value === undefined || value === null || value === "";
  });
}

/**
 * Find missing recommended fields inside committed_record.
 *
 * Recommended fields do not always make an envelope invalid.
 * They may still make verification incomplete.
 */
export function findMissingCommittedRecordFields(
  committedRecord: unknown,
  recommendedFields: string[]
): string[] {
  if (!isObject(committedRecord)) {
    return recommendedFields;
  }

  return recommendedFields.filter((field) => {
    const value = committedRecord[field];

    return value === undefined || value === null || value === "";
  });
}

/**
 * Minimal object guard.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Convert schema validation output into missing fields used by the verifier.
 *
 * Required and recommended fields are both useful for the UI, but they should
 * not be collapsed into the same evidentiary meaning.
 *
 * Required missing fields may make verification invalid or not exercisable.
 * Recommended missing fields may make verification incomplete.
 */
export function getAllMissingFields(result: ValidateSchemaResult): string[] {
  return [
    ...result.missingRequiredFields,
    ...result.missingRecommendedFields
  ];
}

/**
 * Plain-language summary for UI display.
 */
export function getSchemaValidationMessage(
  result: ValidateSchemaResult
): string {
  if (result.schemaStatus === "valid") {
    return "The envelope contains the expected MVP fields.";
  }

  if (result.schemaStatus === "valid_with_missing_fields") {
    return "The envelope can be partly checked, but important recommended fields are missing.";
  }

  if (result.schemaStatus === "invalid") {
    return "The envelope is missing required fields needed for MVP verification.";
  }

  if (result.schemaStatus === "missing") {
    return "No envelope was available for schema validation.";
  }

  if (result.schemaStatus === "unsupported") {
    return "The envelope uses an unsupported schema.";
  }

  return "The envelope schema could not be checked.";
}
