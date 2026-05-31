import type {
  DependencyWarning,
  DoesNotProve,
  FieldMismatch,
  RecommendedNextStep,
  VerificationResult
} from "../verifier";

import {
  buildResultCard,
  formatDependencyWarning,
  formatMismatches,
  getActionDescription,
  getActionLabel
} from "./ResultCard";

/**
 * Plain-language report formatter for the A-DAP Citizen Verifier App.
 *
 * This module converts a VerificationResult into a human-readable text report.
 *
 * Scope:
 * - creates a report that a citizen, advocate, auditor, regulator, lawyer,
 *   journalist, or court can read
 * - preserves limitation notices
 * - exposes missing fields, mismatches, dependency warnings, skipped modules,
 *   and recommended next steps
 *
 * Non-scope:
 * - does not verify records
 * - does not prove fairness
 * - does not prove legality
 * - does not provide legal advice
 * - does not replace human review
 */

export type PlainTextReportOptions = {
  includeTechnicalDetails?: boolean;
  includeMachineReadableHint?: boolean;
  includeEscalationText?: boolean;
};

const DEFAULT_REPORT_OPTIONS: Required<PlainTextReportOptions> = {
  includeTechnicalDetails: true,
  includeMachineReadableHint: true,
  includeEscalationText: true
};

/**
 * Generate a plain-language verification report.
 */
export function formatPlainTextReport(
  result: VerificationResult,
  options: PlainTextReportOptions = {}
): string {
  const mergedOptions = {
    ...DEFAULT_REPORT_OPTIONS,
    ...options
  };

  const sections: string[] = [];

  sections.push(formatHeader());
  sections.push(formatResultSummary(result));
  sections.push(formatCoreStatuses(result));
  sections.push(formatMatchedFields(result.matched_fields ?? []));
  sections.push(formatMismatchSection(result.mismatches ?? []));
  sections.push(formatMissingFields(result.missing_fields ?? []));
  sections.push(formatDependencyWarnings(result.dependency_warnings ?? []));
  sections.push(formatRecommendedNextSteps(result.recommended_next_steps ?? []));
  sections.push(formatDoesNotProve(result.does_not_prove ?? []));
  sections.push(formatLimitationNotice(result.limitation_notice));

  if (mergedOptions.includeEscalationText) {
    sections.push(formatEscalationText(result));
  }

  if (mergedOptions.includeTechnicalDetails) {
    sections.push(formatTechnicalDetails(result));
  }

  if (mergedOptions.includeMachineReadableHint) {
    sections.push(formatMachineReadableHint());
  }

  sections.push(formatFooter());

  return sections
    .filter((section) => section.trim().length > 0)
    .join("\n\n");
}

/**
 * Generate a shorter report for mobile display or quick copy.
 */
export function formatShortReport(result: VerificationResult): string {
  const lines: string[] = [];

  lines.push("A-DAP Citizen Verification Result");
  lines.push("");
  lines.push(`Result level: ${result.result_level.toUpperCase()}`);
  lines.push(`Decision ID: ${result.decision_id ?? "Not provided"}`);
  lines.push("");
  lines.push(result.plain_language_result);
  lines.push("");
  lines.push("Important limitation:");
  lines.push(result.limitation_notice);

  if ((result.mismatches ?? []).length > 0) {
    lines.push("");
    lines.push("Mismatches detected:");
    lines.push(...formatMismatches(result.mismatches ?? []).map((item) => `- ${item}`));
  }

  if ((result.missing_fields ?? []).length > 0) {
    lines.push("");
    lines.push("Missing fields:");
    lines.push(...(result.missing_fields ?? []).map((field) => `- ${field}`));
  }

  if ((result.dependency_warnings ?? []).length > 0) {
    lines.push("");
    lines.push("Dependency warnings:");
    lines.push(
      ...(result.dependency_warnings ?? []).map(
        (warning) => `- ${formatDependencyWarning(warning)}`
      )
    );
  }

  lines.push("");
  lines.push(
    "This report does not prove truth, fairness, legality, correctness, or accountability."
  );

  return lines.join("\n");
}

/**
 * Generate a markdown report.
 */
export function formatMarkdownReport(
  result: VerificationResult,
  options: PlainTextReportOptions = {}
): string {
  const mergedOptions = {
    ...DEFAULT_REPORT_OPTIONS,
    ...options
  };

  const lines: string[] = [];

  lines.push("# A-DAP Citizen Verification Report");
  lines.push("");
  lines.push("## Result");
  lines.push("");
  lines.push(`**Result level:** ${result.result_level.toUpperCase()}`);
  lines.push("");
  lines.push(`**Decision ID:** ${result.decision_id ?? "Not provided"}`);
  lines.push("");
  lines.push(`**Plain-language result:** ${result.plain_language_result}`);
  lines.push("");
  lines.push(`**Generated at:** ${result.verification_time}`);
  lines.push("");
  lines.push("## Core Statuses");
  lines.push("");
  lines.push(`- Envelope: ${result.envelope_status}`);
  lines.push(`- Schema: ${result.schema_status}`);
  lines.push(`- Reconstruction: ${result.reconstruction_status}`);
  lines.push(`- Hash: ${result.hash_status}`);
  lines.push(`- Signature: ${result.signature_status}`);
  lines.push(`- Timestamp: ${result.timestamp_status}`);
  lines.push(`- Explanation match: ${result.explanation_match_status}`);

  appendMarkdownList(lines, "Matched Fields", result.matched_fields ?? []);
  appendMarkdownList(lines, "Mismatches", formatMismatches(result.mismatches ?? []));
  appendMarkdownList(lines, "Missing Fields", result.missing_fields ?? []);
  appendMarkdownList(
    lines,
    "Dependency Warnings",
    (result.dependency_warnings ?? []).map(formatDependencyWarning)
  );
  appendMarkdownList(
    lines,
    "Recommended Next Steps",
    (result.recommended_next_steps ?? []).map(formatRecommendedStep)
  );
  appendMarkdownList(
    lines,
    "What This Result Does Not Prove",
    result.does_not_prove ?? []
  );

  lines.push("");
  lines.push("## Limitation Notice");
  lines.push("");
  lines.push(result.limitation_notice);

  if (mergedOptions.includeEscalationText) {
    lines.push("");
    lines.push("## Suggested Escalation Text");
    lines.push("");
    lines.push(formatEscalationText(result));
  }

  if (mergedOptions.includeTechnicalDetails) {
    lines.push("");
    lines.push("## Technical Details");
    lines.push("");
    lines.push(`- Tool name: ${result.tool_name}`);
    lines.push(`- Tool version: ${result.tool_version}`);
    lines.push(`- Schema version: ${result.schema_version}`);
    lines.push(`- Modules run: ${formatInlineList(result.modules_run ?? [])}`);
    lines.push(`- Modules skipped: ${formatInlineList(result.modules_skipped ?? [])}`);
  }

  if (mergedOptions.includeMachineReadableHint) {
    lines.push("");
    lines.push("## Machine-Readable Export");
    lines.push("");
    lines.push(
      "A machine-readable JSON result should be exported separately from this report."
    );
  }

  lines.push("");
  lines.push("## Final Note");
  lines.push("");
  lines.push(
    "This report helps test the record. It is not a legal, fairness, or accountability determination."
  );

  return lines.join("\n");
}

/**
 * Format header.
 */
export function formatHeader(): string {
  return [
    "A-DAP Citizen Verification Report",
    "================================="
  ].join("\n");
}

/**
 * Format top result summary.
 */
export function formatResultSummary(result: VerificationResult): string {
  const card = buildResultCard(result);

  return [
    "Result Summary",
    "--------------",
    `Result level: ${result.result_level.toUpperCase()}`,
    `Decision ID: ${result.decision_id ?? "Not provided"}`,
    `Generated at: ${result.verification_time}`,
    "",
    card.headline,
    "",
    result.plain_language_result,
    "",
    card.summary
  ].join("\n");
}

/**
 * Format core status block.
 */
export function formatCoreStatuses(result: VerificationResult): string {
  return [
    "Core Statuses",
    "-------------",
    `Envelope: ${result.envelope_status}`,
    `Schema: ${result.schema_status}`,
    `Reconstruction: ${result.reconstruction_status}`,
    `Hash: ${result.hash_status}`,
    `Signature: ${result.signature_status}`,
    `Timestamp: ${result.timestamp_status}`,
    `Explanation match: ${result.explanation_match_status}`
  ].join("\n");
}

/**
 * Format matched fields.
 */
export function formatMatchedFields(fields: string[]): string {
  return formatListSection(
    "Matched Fields",
    fields,
    "No matched fields were reported."
  );
}

/**
 * Format mismatch section.
 */
export function formatMismatchSection(mismatches: FieldMismatch[]): string {
  return formatListSection(
    "Mismatches",
    formatMismatches(mismatches),
    "No mismatches were reported."
  );
}

/**
 * Format missing fields.
 */
export function formatMissingFields(fields: string[]): string {
  return formatListSection(
    "Missing Fields",
    fields,
    "No missing fields were reported."
  );
}

/**
 * Format dependency warning section.
 */
export function formatDependencyWarnings(warnings: DependencyWarning[]): string {
  return formatListSection(
    "Dependency Warnings",
    warnings.map(formatDependencyWarning),
    "No dependency warnings were reported."
  );
}

/**
 * Format recommended next steps.
 */
export function formatRecommendedNextSteps(
  steps: RecommendedNextStep[]
): string {
  return formatListSection(
    "Recommended Next Steps",
    steps.map(formatRecommendedStep),
    "No recommended next steps were reported."
  );
}

/**
 * Format one recommended next step.
 */
export function formatRecommendedStep(step: RecommendedNextStep): string {
  return `${getActionLabel(step)} — ${getActionDescription(step)}`;
}

/**
 * Format does-not-prove section.
 */
export function formatDoesNotProve(items: DoesNotProve[]): string {
  return formatListSection(
    "What This Result Does Not Prove",
    items,
    "No limitation categories were reported."
  );
}

/**
 * Format limitation notice.
 */
export function formatLimitationNotice(notice: string): string {
  return [
    "Limitation Notice",
    "-----------------",
    notice
  ].join("\n");
}

/**
 * Format technical details.
 */
export function formatTechnicalDetails(result: VerificationResult): string {
  return [
    "Technical Details",
    "-----------------",
    `Tool name: ${result.tool_name}`,
    `Tool version: ${result.tool_version}`,
    `Schema version: ${result.schema_version}`,
    `Modules run: ${formatInlineList(result.modules_run ?? [])}`,
    `Modules skipped: ${formatInlineList(result.modules_skipped ?? [])}`
  ].join("\n");
}

/**
 * Format machine-readable export hint.
 */
export function formatMachineReadableHint(): string {
  return [
    "Machine-Readable Export",
    "-----------------------",
    "A machine-readable JSON result should be exported separately from this plain-language report."
  ].join("\n");
}

/**
 * Format footer.
 */
export function formatFooter(): string {
  return [
    "Final Note",
    "----------",
    "This report helps test the record. It is not a legal, fairness, correctness, or accountability determination."
  ].join("\n");
}

/**
 * Generate suggested escalation text based on the result level.
 */
export function formatEscalationText(result: VerificationResult): string {
  if (result.result_level === "green") {
    return [
      "Suggested Escalation Text",
      "-------------------------",
      "The verification result indicates that the explanation appears to match the committed decision record under the stated assumptions.",
      "",
      "This does not prove that the decision was fair, lawful, correct, or accountable.",
      "",
      "If I still believe the decision affected me incorrectly, I request human review of the decision and any additional materials needed to understand the basis for it."
    ].join("\n");
  }

  if (result.result_level === "yellow") {
    return [
      "Suggested Escalation Text",
      "-------------------------",
      "I am requesting review of this automated decision because the record can only be partly checked with the materials provided.",
      "",
      "The A-DAP verification result indicates that some fields are missing, incomplete, or dependent on operator-controlled resources.",
      "",
      formatOptionalIssueSummary(result),
      "",
      "This does not prove that the decision was wrong, unlawful, or unfair, but it limits my ability to contest the decision effectively."
    ].join("\n");
  }

  if (result.result_level === "red") {
    return [
      "Suggested Escalation Text",
      "-------------------------",
      "I am requesting review of this automated decision because the explanation provided to me does not appear to match the committed decision record.",
      "",
      "The A-DAP verification result indicates a specific inconsistency between the later explanation and the committed record.",
      "",
      formatOptionalIssueSummary(result),
      "",
      "This does not by itself prove that the decision was unlawful, unfair, or incorrect, but it identifies a concrete inconsistency that should be reviewed."
    ].join("\n");
  }

  return [
    "Suggested Escalation Text",
    "-------------------------",
    "I am requesting review of this automated decision because the materials provided do not allow independent reconstruction of the decision state.",
    "",
    "The A-DAP verification result indicates that verification is not exercisable with the materials provided.",
    "",
    formatOptionalIssueSummary(result),
    "",
    "This does not prove manipulation, but it limits my ability to contest the decision effectively."
  ].join("\n");
}

/**
 * Format a compact issue summary for escalation text.
 */
export function formatOptionalIssueSummary(result: VerificationResult): string {
  const lines: string[] = [];

  if ((result.missing_fields ?? []).length > 0) {
    lines.push("Missing fields:");
    lines.push(...(result.missing_fields ?? []).map((field) => `- ${field}`));
  }

  if ((result.mismatches ?? []).length > 0) {
    if (lines.length > 0) {
      lines.push("");
    }

    lines.push("Mismatches:");
    lines.push(...formatMismatches(result.mismatches ?? []).map((item) => `- ${item}`));
  }

  if ((result.dependency_warnings ?? []).length > 0) {
    if (lines.length > 0) {
      lines.push("");
    }

    lines.push("Dependency warnings:");
    lines.push(
      ...(result.dependency_warnings ?? []).map(
        (warning) => `- ${formatDependencyWarning(warning)}`
      )
    );
  }

  if (lines.length === 0) {
    return "No specific missing fields, mismatches, or dependency warnings were reported.";
  }

  return lines.join("\n");
}

/**
 * Generic plain-text list section.
 */
export function formatListSection(
  title: string,
  items: string[],
  emptyText: string
): string {
  const lines: string[] = [];

  lines.push(title);
  lines.push("-".repeat(title.length));

  if (items.length === 0) {
    lines.push(emptyText);
    return lines.join("\n");
  }

  lines.push(...items.map((item) => `- ${item}`));

  return lines.join("\n");
}

/**
 * Format inline arrays.
 */
export function formatInlineList(items: string[]): string {
  if (items.length === 0) {
    return "None reported";
  }

  return items.join(", ");
}

/**
 * Append a markdown list section.
 */
export function appendMarkdownList(
  lines: string[],
  title: string,
  items: string[]
): void {
  lines.push("");
  lines.push(`## ${title}`);
  lines.push("");

  if (items.length === 0) {
    lines.push("None reported.");
    return;
  }

  for (const item of items) {
    lines.push(`- ${item}`);
  }
}

/**
 * Convert a report to a downloadable text blob in browser environments.
 */
export function createTextReportBlob(result: VerificationResult): Blob {
  return new Blob([formatPlainTextReport(result)], {
    type: "text/plain;charset=utf-8"
  });
}

/**
 * Convert a markdown report to a downloadable markdown blob in browser environments.
 */
export function createMarkdownReportBlob(result: VerificationResult): Blob {
  return new Blob([formatMarkdownReport(result)], {
    type: "text/markdown;charset=utf-8"
  });
}

/**
 * Suggested filename for plain text export.
 */
export function getPlainTextReportFilename(result: VerificationResult): string {
  return buildSafeFilename(result, "adap-verification-report", "txt");
}

/**
 * Suggested filename for markdown export.
 */
export function getMarkdownReportFilename(result: VerificationResult): string {
  return buildSafeFilename(result, "adap-verification-report", "md");
}

/**
 * Build a safe filename.
 */
export function buildSafeFilename(
  result: VerificationResult,
  prefix: string,
  extension: string
): string {
  const decisionId = result.decision_id ?? "unknown-decision";
  const safeDecisionId = decisionId
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${prefix}-${safeDecisionId}-${result.result_level}.${extension}`;
}
