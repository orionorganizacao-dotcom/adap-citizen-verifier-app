import type {
  DemoAdapEnvelope,
  DependencyWarning,
  DoesNotProve,
  ExplanationMatchStatus,
  FieldMismatch,
  HashStatus,
  ModuleName,
  RecommendedNextStep,
  ReconstructionStatus,
  ResultLevel,
  SchemaStatus,
  SignatureStatus,
  TimestampStatus,
  VerificationResult
} from "./types";

import {
  DEFAULT_DOES_NOT_PROVE,
  DEFAULT_LIMITATION_NOTICE,
  DEFAULT_VERIFIER_CONFIG,
  RESULT_LEVEL_WARNINGS
} from "./types";

import type { ValidateSchemaResult } from "./validateSchema";
import type { CompareExplanationResult } from "./compareExplanation";
import type { AnalyzeDependenciesResult } from "./analyzeDependencies";

/**
 * Input required to generate the final A-DAP Citizen Verifier MVP result.
 *
 * This module combines the outputs of:
 * - parseEnvelope
 * - validateSchema
 * - compareExplanation
 * - analyzeDependencies
 *
 * It does not prove truth, fairness, legality, correctness, or accountability.
 * It only generates a result about record consistency and verification exercisability
 * under the MVP assumptions.
 */
export type GenerateResultInput = {
  envelope: DemoAdapEnvelope | null;
  schemaResult: ValidateSchemaResult | null;
  comparisonResult: CompareExplanationResult | null;
  dependencyResult: AnalyzeDependenciesResult | null;
  verificationTime?: string;
};

/**
 * Main result-generation function.
 *
 * Decision order:
 * 1. Gray if no usable envelope or schema cannot be checked.
 * 2. Red if explanation comparison fails or a hard mismatch is detected.
 * 3. Yellow if schema is incomplete, comparison is partial, or dependency warnings exist.
 * 4. Green if the record is present, checkable, and explanation matches.
 */
export function generateResult(input: GenerateResultInput): VerificationResult {
  const resultLevel = determineResultLevel(input);
  const decisionId = getDecisionId(input.envelope);

  const dependencyWarnings = input.envelope
    ? getDependencyWarnings(input.dependencyResult)
    : ["verification_path_not_exercisable"];

  const missingFields = getMissingFields(
    input.schemaResult,
    input.comparisonResult
  );

  const mismatches = getMismatches(input.comparisonResult);

  return {
    tool_name: DEFAULT_VERIFIER_CONFIG.tool_name,
    tool_version: DEFAULT_VERIFIER_CONFIG.tool_version,
    schema_version: DEFAULT_VERIFIER_CONFIG.result_schema_version,
    verification_time: input.verificationTime ?? new Date().toISOString(),

    decision_id: decisionId,
    result_level: resultLevel,
    plain_language_result: getPlainLanguageResult(resultLevel),

    envelope_status: input.envelope ? "present" : "missing",
    schema_status: getSchemaStatus(input.schemaResult, input.envelope),
    reconstruction_status: getReconstructionStatus(input),
    hash_status: getHashStatus(input),
    signature_status: getSignatureStatus(input.envelope),
    timestamp_status: getTimestampStatus(input.envelope),
    explanation_match_status: getExplanationMatchStatus(input.comparisonResult),

    matched_fields: input.comparisonResult?.matchedFields ?? [],
    mismatches,
    missing_fields: missingFields,
    dependency_warnings: dependencyWarnings,

    modules_run: getModulesRun(input),
    modules_skipped: getModulesSkipped(input),

    does_not_prove: getDoesNotProve(resultLevel),
    recommended_next_steps: getRecommendedNextSteps(
      resultLevel,
      missingFields,
      dependencyWarnings
    ),

    limitation_notice: getLimitationNotice(resultLevel)
  };
}

/**
 * Determine the final MVP result level.
 */
export function determineResultLevel(input: GenerateResultInput): ResultLevel {
  if (!input.envelope) {
    return "gray";
  }

  if (!input.schemaResult) {
    return "gray";
  }

  if (
    input.schemaResult.schemaStatus === "missing" ||
    input.schemaResult.schemaStatus === "invalid" ||
    input.schemaResult.schemaStatus === "not_checkable"
  ) {
    return "gray";
  }

  if (
    input.comparisonResult?.explanationMatchStatus === "failed" ||
    (input.comparisonResult?.mismatches?.length ?? 0) > 0
  ) {
    return "red";
  }

  if (
    input.schemaResult.schemaStatus === "valid_with_missing_fields" ||
    input.comparisonResult?.explanationMatchStatus === "partial" ||
    input.comparisonResult?.explanationMatchStatus === "missing_explanation" ||
    input.comparisonResult?.explanationMatchStatus === "not_checkable" ||
    (input.dependencyResult?.dependencyWarnings?.length ?? 0) > 0
  ) {
    return "yellow";
  }

  if (
    input.schemaResult.schemaStatus === "valid" &&
    input.comparisonResult?.explanationMatchStatus === "matched"
  ) {
    return "green";
  }

  return "yellow";
}

/**
 * Plain-language result by level.
 */
export function getPlainLanguageResult(resultLevel: ResultLevel): string {
  switch (resultLevel) {
    case "green":
      return "The explanation appears to match the committed record.";

    case "yellow":
      return "The record can be partly checked, but important information is missing.";

    case "red":
      return "The explanation does not appear to match the committed record.";

    case "gray":
      return "This decision cannot be independently checked with the materials provided.";

    default:
      return "The verification result could not be determined.";
  }
}

/**
 * Limitation notice by level.
 */
export function getLimitationNotice(resultLevel: ResultLevel): string {
  return RESULT_LEVEL_WARNINGS[resultLevel] ?? DEFAULT_LIMITATION_NOTICE;
}

/**
 * Extract decision ID.
 */
export function getDecisionId(envelope: DemoAdapEnvelope | null): string | null {
  if (!envelope?.decision_id) {
    return null;
  }

  return String(envelope.decision_id);
}

/**
 * Convert schema validation output to final schema status.
 */
export function getSchemaStatus(
  schemaResult: ValidateSchemaResult | null,
  envelope: DemoAdapEnvelope | null
): SchemaStatus {
  if (!envelope) {
    return "not_checkable";
  }

  return schemaResult?.schemaStatus ?? "not_checkable";
}

/**
 * MVP reconstruction status.
 *
 * In v0.1, reconstruction is simplified:
 * - successful when a committed_record exists and schema is valid
 * - partial when committed_record exists but recommended fields are missing
 * - not_possible when no envelope or required schema is invalid
 */
export function getReconstructionStatus(
  input: GenerateResultInput
): ReconstructionStatus {
  if (!input.envelope) {
    return "not_possible";
  }

  if (!input.envelope.committed_record) {
    return "not_possible";
  }

  if (!input.schemaResult) {
    return "not_checkable";
  }

  if (input.schemaResult.schemaStatus === "valid") {
    return "successful";
  }

  if (input.schemaResult.schemaStatus === "valid_with_missing_fields") {
    return "partial";
  }

  if (input.schemaResult.schemaStatus === "invalid") {
    return "not_possible";
  }

  return "not_checkable";
}

/**
 * MVP hash status.
 *
 * Full cryptographic hash validation is not enabled in v0.1.
 */
export function getHashStatus(input: GenerateResultInput): HashStatus {
  if (!input.envelope) {
    return "not_checkable";
  }

  if (!input.envelope.committed_hash) {
    return "missing";
  }

  if (!input.envelope.hash_algorithm) {
    return "missing";
  }

  if (input.envelope.hash_algorithm !== "SHA-256") {
    return "unsupported_algorithm";
  }

  return "demo_placeholder_not_fully_checked";
}

/**
 * MVP signature status.
 *
 * Full signature validation is not enabled in v0.1.
 */
export function getSignatureStatus(
  envelope: DemoAdapEnvelope | null
): SignatureStatus {
  if (!envelope) {
    return "not_checkable";
  }

  if (!envelope.signature) {
    return "missing";
  }

  if (envelope.signature.status === "missing") {
    return "missing";
  }

  if (!envelope.signature.public_key_reference) {
    return "public_key_missing";
  }

  return "present_not_fully_checked";
}

/**
 * MVP timestamp status.
 *
 * Full external timestamp validation is not enabled in v0.1.
 */
export function getTimestampStatus(
  envelope: DemoAdapEnvelope | null
): TimestampStatus {
  if (!envelope) {
    return "not_checkable";
  }

  if (!envelope.timestamp) {
    return "missing";
  }

  if (envelope.timestamp.status === "missing") {
    return "missing";
  }

  if (envelope.timestamp.independently_verifiable === true) {
    return "externally_verifiable";
  }

  return "present_not_independently_verified";
}

/**
 * Convert comparison result to final explanation status.
 */
export function getExplanationMatchStatus(
  comparisonResult: CompareExplanationResult | null
): ExplanationMatchStatus {
  return comparisonResult?.explanationMatchStatus ?? "not_checkable";
}

/**
 * Merge missing schema fields and missing explanation fields.
 */
export function getMissingFields(
  schemaResult: ValidateSchemaResult | null,
  comparisonResult: CompareExplanationResult | null
): string[] {
  const fields = [
    ...(schemaResult?.missingRequiredFields ?? []),
    ...(schemaResult?.missingRecommendedFields ?? []),
    ...(comparisonResult?.missingExplanationFields ?? [])
  ];

  return dedupeStrings(fields);
}

/**
 * Extract mismatches from comparison.
 */
export function getMismatches(
  comparisonResult: CompareExplanationResult | null
): FieldMismatch[] {
  return comparisonResult?.mismatches ?? [];
}

/**
 * Extract dependency warning codes.
 */
export function getDependencyWarnings(
  dependencyResult: AnalyzeDependenciesResult | null
): DependencyWarning[] {
  return dependencyResult?.dependencyWarnings ?? [];
}

/**
 * Modules that ran for the MVP result.
 *
 * In Gray/no-envelope mode, only the final result is generated.
 * Substantive verification modules are not exercisable.
 */
export function getModulesRun(input: GenerateResultInput): ModuleName[] {
  if (!input.envelope) {
    return dedupeModules([
      "generate_result"
    ]);
  }

  const modules: ModuleName[] = [];

  modules.push("check_envelope_presence");
  modules.push("parse_envelope");

  if (input.schemaResult) {
    modules.push("validate_schema");
  }

  if (input.comparisonResult) {
    modules.push("compare_explanation");
  }

  if (input.dependencyResult) {
    modules.push("analyze_dependencies");
  }

  modules.push("generate_result");

  return dedupeModules(modules);
}

/**
 * Modules skipped in MVP.
 *
 * In Gray/no-envelope mode, the verification path is not exercisable.
 * Therefore all substantive checks are listed as skipped.
 */
export function getModulesSkipped(input: GenerateResultInput): ModuleName[] {
  if (!input.envelope) {
    return dedupeModules([
      "parse_envelope",
      "validate_schema",
      "compare_explanation",
      "analyze_dependencies",
      "full_hash_validation",
      "full_signature_validation",
      "external_timestamp_validation"
    ]);
  }

  const modules: ModuleName[] = [
    "full_hash_validation",
    "full_signature_validation",
    "external_timestamp_validation"
  ];

  if (!input.comparisonResult) {
    modules.push("compare_explanation");
  }

  return dedupeModules(modules);
}

/**
 * does_not_prove list.
 */
export function getDoesNotProve(resultLevel: ResultLevel): DoesNotProve[] {
  if (resultLevel === "gray") {
    return [
      ...DEFAULT_DOES_NOT_PROVE,
      "manipulation"
    ];
  }

  return [...DEFAULT_DOES_NOT_PROVE];
}

/**
 * Recommended next steps by result level and detected issues.
 */
export function getRecommendedNextSteps(
  resultLevel: ResultLevel,
  missingFields: string[],
  dependencyWarnings: DependencyWarning[]
): RecommendedNextStep[] {
  const steps: RecommendedNextStep[] = ["download_report"];

  if (resultLevel === "green") {
    steps.push("request_human_review_if_needed");
    return dedupeNextSteps(steps);
  }

  if (resultLevel === "yellow") {
    if (missingFields.includes("policy_version")) {
      steps.push("request_missing_policy_version");
    }

    if (dependencyWarnings.includes("public_key_hosted_only_by_operator")) {
      steps.push("request_independent_public_key_anchor");
    }

    if (dependencyWarnings.includes("reconstruction_rules_hosted_only_by_operator")) {
      steps.push("request_reconstruction_rules");
    }

    steps.push("request_human_review_if_needed");
    return dedupeNextSteps(steps);
  }

  if (resultLevel === "red") {
    steps.push(
      "request_human_review",
      "ask_institution_to_explain_mismatch",
      "share_report_with_lawyer_regulator_auditor_or_advocate"
    );

    return dedupeNextSteps(steps);
  }

  if (resultLevel === "gray") {
    steps.push(
      "request_adap_envelope",
      "request_reconstruction_rules",
      "request_public_key",
      "request_timestamp_evidence",
      "request_downloadable_verification_package",
      "request_human_review"
    );

    return dedupeNextSteps(steps);
  }

  return dedupeNextSteps(steps);
}

/**
 * Wrap final result into the exported JSON object.
 */
export function toExportableResult(result: VerificationResult) {
  return {
    adap_citizen_verification_result: result
  };
}

/**
 * Small utility helpers.
 */
export function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function dedupeModules(values: ModuleName[]): ModuleName[] {
  return Array.from(new Set(values));
}

export function dedupeNextSteps(
  values: RecommendedNextStep[]
): RecommendedNextStep[] {
  return Array.from(new Set(values));
}
