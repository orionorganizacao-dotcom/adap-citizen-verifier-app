import type {
  DependencyWarning,
  FieldMismatch,
  RecommendedNextStep,
  ResultLevel,
  VerificationResult
} from "../verifier";

/**
 * UI view model for rendering a citizen-facing result card.
 *
 * This file intentionally avoids framework-specific UI code.
 * It can be used by React, Vue, Svelte, plain HTML, or a future mobile app.
 *
 * Scope:
 * - converts VerificationResult into UI-ready copy
 * - preserves limitation notices
 * - exposes missing fields, mismatches, and dependency warnings
 *
 * Non-scope:
 * - does not verify records
 * - does not decide legality
 * - does not decide fairness
 * - does not replace human review
 */

export type ResultCardTone = "success" | "warning" | "danger" | "neutral";

export type ResultCardAction = {
  id: RecommendedNextStep;
  label: string;
  description: string;
};

export type ResultCardSection = {
  title: string;
  items: string[];
  emptyText: string;
};

export type ResultCardViewModel = {
  level: ResultLevel;
  tone: ResultCardTone;
  badge: string;
  title: string;
  headline: string;
  plainLanguageResult: string;
  decisionId: string;
  summary: string;
  limitationNotice: string;
  primaryAction: ResultCardAction;
  secondaryActions: ResultCardAction[];
  sections: {
    matched: ResultCardSection;
    mismatches: ResultCardSection;
    missing: ResultCardSection;
    dependencies: ResultCardSection;
    skipped: ResultCardSection;
    doesNotProve: ResultCardSection;
  };
  technical: {
    envelopeStatus: string;
    schemaStatus: string;
    reconstructionStatus: string;
    hashStatus: string;
    signatureStatus: string;
    timestampStatus: string;
    explanationMatchStatus: string;
    modulesRun: string[];
    modulesSkipped: string[];
  };
};

/**
 * Build a complete result card view model from a VerificationResult.
 */
export function buildResultCard(result: VerificationResult): ResultCardViewModel {
  const primaryAction = getPrimaryAction(result);
  const secondaryActions = getSecondaryActions(result, primaryAction.id);

  return {
    level: result.result_level,
    tone: getResultTone(result.result_level),
    badge: getResultBadge(result.result_level),
    title: getResultTitle(result.result_level),
    headline: getResultHeadline(result.result_level),
    plainLanguageResult: result.plain_language_result,
    decisionId: result.decision_id ?? "No decision ID provided",
    summary: getResultSummary(result),
    limitationNotice: result.limitation_notice,
    primaryAction,
    secondaryActions,
    sections: {
      matched: {
        title: "What matched",
        items: result.matched_fields ?? [],
        emptyText: "No matched fields were reported."
      },
      mismatches: {
        title: "What did not match",
        items: formatMismatches(result.mismatches ?? []),
        emptyText: "No mismatches were reported."
      },
      missing: {
        title: "What is missing",
        items: result.missing_fields,
        emptyText: "No missing fields were reported."
      },
      dependencies: {
        title: "Dependency warnings",
        items: formatDependencyWarnings(result.dependency_warnings),
        emptyText: "No dependency warnings were reported."
      },
      skipped: {
        title: "What was not fully checked",
        items: result.modules_skipped,
        emptyText: "No skipped modules were reported."
      },
      doesNotProve: {
        title: "What this result does not prove",
        items: result.does_not_prove,
        emptyText: "No limitation categories were reported."
      }
    },
    technical: {
      envelopeStatus: result.envelope_status,
      schemaStatus: result.schema_status,
      reconstructionStatus: result.reconstruction_status,
      hashStatus: result.hash_status,
      signatureStatus: result.signature_status,
      timestampStatus: result.timestamp_status,
      explanationMatchStatus: result.explanation_match_status,
      modulesRun: result.modules_run,
      modulesSkipped: result.modules_skipped
    }
  };
}

/**
 * Map result level to visual tone.
 */
export function getResultTone(level: ResultLevel): ResultCardTone {
  switch (level) {
    case "green":
      return "success";

    case "yellow":
      return "warning";

    case "red":
      return "danger";

    case "gray":
      return "neutral";

    default:
      return "neutral";
  }
}

/**
 * Human-readable result badge.
 */
export function getResultBadge(level: ResultLevel): string {
  switch (level) {
    case "green":
      return "Green";

    case "yellow":
      return "Yellow";

    case "red":
      return "Red";

    case "gray":
      return "Gray";

    default:
      return "Unknown";
  }
}

/**
 * Main card title.
 */
export function getResultTitle(level: ResultLevel): string {
  switch (level) {
    case "green":
      return "Explanation matches the committed record";

    case "yellow":
      return "Record is partly checkable";

    case "red":
      return "Explanation does not match the committed record";

    case "gray":
      return "Verification is not exercisable";

    default:
      return "Verification result";
  }
}

/**
 * Short headline for citizen-facing UI.
 */
export function getResultHeadline(level: ResultLevel): string {
  switch (level) {
    case "green":
      return "The explanation appears consistent with the record.";

    case "yellow":
      return "Some checks worked, but important evidence is missing.";

    case "red":
      return "A specific inconsistency was detected.";

    case "gray":
      return "The materials provided are not enough to check the decision.";

    default:
      return "The result could not be classified.";
  }
}

/**
 * Summary paragraph for the result card.
 */
export function getResultSummary(result: VerificationResult): string {
  switch (result.result_level) {
    case "green":
      return "The verifier found that the later explanation appears to match the committed decision record under the MVP assumptions. This does not prove that the decision was fair, lawful, correct, or accountable.";

    case "yellow":
      return "The verifier could check part of the record, but missing fields or dependency warnings limit the strength of the result. Additional materials or human review may be needed.";

    case "red":
      return "The verifier found that the later explanation diverges from the committed decision record. This does not automatically prove wrongdoing, but it creates a concrete inconsistency that can be reviewed.";

    case "gray":
      return "The verifier could not exercise verification with the materials provided. This does not prove manipulation. It means the decision cannot be independently checked from the available materials.";

    default:
      return "The verifier produced a result, but the result level was not recognized.";
  }
}

/**
 * Select primary action by result level.
 */
export function getPrimaryAction(result: VerificationResult): ResultCardAction {
  if (result.result_level === "green") {
    return {
      id: "download_report",
      label: "Download report",
      description: "Save a plain-language report of the verification result."
    };
  }

  if (result.result_level === "yellow") {
    return {
      id: "request_human_review_if_needed",
      label: "Request review if needed",
      description: "Use the report to ask for missing evidence or human review."
    };
  }

  if (result.result_level === "red") {
    return {
      id: "request_human_review",
      label: "Request human review",
      description: "Use the detected inconsistency to request review or escalation."
    };
  }

  return {
    id: "request_adap_envelope",
    label: "Request A-DAP envelope",
    description: "Ask the institution for a usable envelope or verification package."
  };
}

/**
 * Build secondary actions from recommended next steps.
 */
export function getSecondaryActions(
  result: VerificationResult,
  primaryActionId: RecommendedNextStep
): ResultCardAction[] {
  return result.recommended_next_steps
    .filter((step) => step !== primaryActionId)
    .map((step) => ({
      id: step,
      label: getActionLabel(step),
      description: getActionDescription(step)
    }));
}

/**
 * UI label for recommended actions.
 */
export function getActionLabel(step: RecommendedNextStep): string {
  switch (step) {
    case "download_report":
      return "Download report";

    case "download_json":
      return "Download JSON";

    case "request_human_review":
      return "Request human review";

    case "request_human_review_if_needed":
      return "Request review if needed";

    case "request_adap_envelope":
      return "Request A-DAP envelope";

    case "request_reconstruction_rules":
      return "Request reconstruction rules";

    case "request_public_key":
      return "Request public key";

    case "request_timestamp_evidence":
      return "Request timestamp evidence";

    case "request_downloadable_verification_package":
      return "Request verification package";

    case "request_missing_policy_version":
      return "Request missing policy version";

    case "request_independent_public_key_anchor":
      return "Request independent public key anchor";

    case "ask_institution_to_explain_mismatch":
      return "Ask institution to explain mismatch";

    case "share_report_with_lawyer_regulator_auditor_or_advocate":
      return "Share report with reviewer";

    default:
      return "Recommended action";
  }
}

/**
 * UI description for recommended actions.
 */
export function getActionDescription(step: RecommendedNextStep): string {
  switch (step) {
    case "download_report":
      return "Export a plain-language report for your records or for review.";

    case "download_json":
      return "Export the machine-readable verification result.";

    case "request_human_review":
      return "Ask a person or institution to review the decision.";

    case "request_human_review_if_needed":
      return "Ask for human review if the decision still affects you or remains unclear.";

    case "request_adap_envelope":
      return "Ask for the committed decision envelope needed for verification.";

    case "request_reconstruction_rules":
      return "Ask for the rules needed to reconstruct the committed record.";

    case "request_public_key":
      return "Ask for the public key needed to check signature evidence.";

    case "request_timestamp_evidence":
      return "Ask for timestamp evidence supporting when the commitment existed.";

    case "request_downloadable_verification_package":
      return "Ask for a downloadable package that can be checked outside the operator portal.";

    case "request_missing_policy_version":
      return "Ask which policy version was used for the decision.";

    case "request_independent_public_key_anchor":
      return "Ask whether the public key is anchored outside the operator’s control.";

    case "ask_institution_to_explain_mismatch":
      return "Ask the institution to explain why the later explanation differs from the committed record.";

    case "share_report_with_lawyer_regulator_auditor_or_advocate":
      return "Share the result with someone who can help review or escalate the issue.";

    default:
      return "Follow this step if the result requires more review.";
  }
}

/**
 * Format mismatches for citizen-facing UI.
 */
export function formatMismatches(mismatches: FieldMismatch[]): string[] {
  return mismatches.map((mismatch) => {
    return `${mismatch.field}: committed value "${String(
      mismatch.committed_value
    )}" does not match explanation value "${String(
      mismatch.explanation_value
    )}".`;
  });
}

/**
 * Format dependency warnings for citizen-facing UI.
 */
export function formatDependencyWarnings(
  warnings: DependencyWarning[]
): string[] {
  return warnings.map(formatDependencyWarning);
}

/**
 * Plain-language dependency warning.
 */
export function formatDependencyWarning(warning: DependencyWarning): string {
  switch (warning) {
    case "public_key_hosted_only_by_operator":
      return "The public key appears to be hosted only by the operator.";

    case "reconstruction_rules_hosted_only_by_operator":
      return "The reconstruction rules appear to be hosted only by the operator.";

    case "timestamp_evidence_not_independently_reachable":
      return "The timestamp evidence does not appear independently reachable.";

    case "verifier_interface_controlled_by_operator":
      return "The verifier interface appears controlled by the same organization being reviewed.";

    case "no_downloadable_receipt_provided":
      return "No downloadable receipt was provided.";

    case "no_external_anchor_available":
      return "No external anchor was available in the provided materials.";

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
 * Convenience helper for UI tests.
 */
export function isCriticalResult(level: ResultLevel): boolean {
  return level === "red" || level === "gray";
}

/**
 * Convenience helper for UI tests.
 */
export function shouldShowEscalationHint(level: ResultLevel): boolean {
  return level === "yellow" || level === "red" || level === "gray";
}

/**
 * Accessibility label for result cards.
 */
export function getResultAriaLabel(result: VerificationResult): string {
  return `${getResultBadge(result.result_level)} result. ${result.plain_language_result}`;
  }
