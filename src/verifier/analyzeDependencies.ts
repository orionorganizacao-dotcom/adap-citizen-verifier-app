import type {
  CheckStatus,
  DemoAdapEnvelope,
  DependencyMetadata,
  DependencyWarning
} from "./types";

/**
 * Result returned by analyzeDependencies.
 *
 * This module turns envelope dependency metadata into explicit dependency warnings.
 *
 * It does not prove manipulation.
 * It does not prove fraud.
 * It does not compute full NDC.
 * It does not decide whether verification is institutionally independent.
 *
 * It only identifies dependency signals that should be shown to the user.
 */
export type AnalyzeDependenciesResult = {
  ok: boolean;
  checkStatus: CheckStatus;
  dependencyWarnings: DependencyWarning[];
  warnings: string[];
  summary: string;
};

/**
 * Analyze dependency metadata from a parsed A-DAP demo envelope.
 *
 * The MVP focuses on simple dependency indicators:
 * - operator-hosted public key
 * - operator-hosted reconstruction rules
 * - missing external anchor
 * - operator-controlled verifier interface
 * - unreachable timestamp evidence
 * - missing downloadable receipt
 * - operator-controlled schema
 */
export function analyzeDependencies(
  envelope: DemoAdapEnvelope | null | undefined
): AnalyzeDependenciesResult {
  if (!envelope) {
    return {
      ok: false,
      checkStatus: "not_checkable",
      dependencyWarnings: ["verification_path_not_exercisable"],
      warnings: ["No envelope was provided, so dependency analysis is not fully exercisable."],
      summary:
        "Verification is not exercisable because no A-DAP envelope was provided."
    };
  }

  const dependencies = envelope.dependencies;

  if (!dependencies) {
    return {
      ok: true,
      checkStatus: "passed",
      dependencyWarnings: ["operator_controlled_resource_detected"],
      warnings: [
        "Dependency metadata is missing. The app cannot determine whether verification materials are independent of the operator."
      ],
      summary:
        "Dependency metadata is missing, so the verification path may still depend on the operator."
    };
  }

  const dependencyWarnings = collectDependencyWarnings(dependencies);
  const warnings = dependencyWarnings.map(getDependencyWarningMessage);

  if (dependencyWarnings.length === 0) {
    return {
      ok: true,
      checkStatus: "passed",
      dependencyWarnings,
      warnings,
      summary:
        "No operator-controlled dependency warning was detected in the provided MVP metadata."
    };
  }

  return {
    ok: true,
    checkStatus: "passed",
    dependencyWarnings,
    warnings,
    summary:
      "One or more verification materials may still depend on the organization whose decision is being reviewed."
  };
}

/**
 * Convert dependency metadata into structured warning codes.
 */
export function collectDependencyWarnings(
  dependencies: DependencyMetadata
): DependencyWarning[] {
  const warnings: DependencyWarning[] = [];

  if (dependencies.public_key_hosted_by_operator === true) {
    warnings.push("public_key_hosted_only_by_operator");
  }

  if (dependencies.reconstruction_rules_hosted_by_operator === true) {
    warnings.push("reconstruction_rules_hosted_only_by_operator");
  }

  if (dependencies.external_anchor_available === false) {
    warnings.push("no_external_anchor_available");
  }

  if (dependencies.verifier_interface_controlled_by_operator === true) {
    warnings.push("verifier_interface_controlled_by_operator");
  }

  if (dependencies.timestamp_evidence_independently_reachable === false) {
    warnings.push("timestamp_evidence_not_independently_reachable");
  }

  if (dependencies.downloadable_receipt_provided === false) {
    warnings.push("no_downloadable_receipt_provided");
  }

  if (dependencies.schema_controlled_only_by_operator === true) {
    warnings.push("schema_controlled_only_by_operator");
  }

  if (shouldMarkPathNotExercisable(dependencies)) {
    warnings.push("verification_path_not_exercisable");
  }

  return dedupeWarnings(warnings);
}

/**
 * Determine whether the verification path should be flagged as not exercisable.
 *
 * This is intentionally conservative.
 * A path may be treated as not exercisable when several key verification materials
 * are absent, operator-controlled, or not externally reachable.
 */
export function shouldMarkPathNotExercisable(
  dependencies: DependencyMetadata
): boolean {
  const hasOperatorHostedKey =
    dependencies.public_key_hosted_by_operator === true;

  const hasOperatorHostedRules =
    dependencies.reconstruction_rules_hosted_by_operator === true;

  const hasNoExternalAnchor =
    dependencies.external_anchor_available === false;

  const hasNoDownloadableReceipt =
    dependencies.downloadable_receipt_provided === false;

  const hasOperatorControlledVerifier =
    dependencies.verifier_interface_controlled_by_operator === true;

  const hasUnreachableTimestamp =
    dependencies.timestamp_evidence_independently_reachable === false;

  const hardSignals = [
    hasOperatorHostedKey,
    hasOperatorHostedRules,
    hasNoExternalAnchor,
    hasNoDownloadableReceipt,
    hasOperatorControlledVerifier,
    hasUnreachableTimestamp
  ].filter(Boolean).length;

  return hardSignals >= 3;
}

/**
 * Convert a warning code into plain-language UI copy.
 */
export function getDependencyWarningMessage(
  warning: DependencyWarning
): string {
  switch (warning) {
    case "public_key_hosted_only_by_operator":
      return "The public key is hosted only by the operator.";

    case "reconstruction_rules_hosted_only_by_operator":
      return "The reconstruction rules are hosted only by the operator.";

    case "timestamp_evidence_not_independently_reachable":
      return "The timestamp evidence is not independently reachable.";

    case "verifier_interface_controlled_by_operator":
      return "The verifier interface is controlled by the same organization that made the decision.";

    case "no_downloadable_receipt_provided":
      return "No downloadable receipt was provided.";

    case "no_external_anchor_available":
      return "No external anchor is available in the provided materials.";

    case "schema_controlled_only_by_operator":
      return "The schema appears to be controlled only by the operator.";

    case "verification_path_not_exercisable":
      return "The verification path is not exercisable with the materials provided.";

    case "operator_controlled_resource_detected":
      return "One or more verification resources may still be operator-controlled.";

    default:
      return "A dependency warning was detected.";
  }
}

/**
 * General plain-language dependency warning.
 */
export function getGeneralDependencyWarning(): string {
  return "This does not prove manipulation. It means the verification path may still depend on the organization whose decision is being reviewed.";
}

/**
 * Remove duplicate dependency warnings while preserving order.
 */
export function dedupeWarnings(
  warnings: DependencyWarning[]
): DependencyWarning[] {
  return Array.from(new Set(warnings));
}

/**
 * Return true when any dependency warning should be shown in the UI.
 */
export function hasDependencyWarnings(
  result: AnalyzeDependenciesResult
): boolean {
  return result.dependencyWarnings.length > 0;
}

/**
 * Convert dependency analysis result to a UI-ready list of messages.
 */
export function getDependencyWarningMessages(
  result: AnalyzeDependenciesResult
): string[] {
  return result.dependencyWarnings.map(getDependencyWarningMessage);
}
