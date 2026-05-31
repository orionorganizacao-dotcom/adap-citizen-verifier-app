import type {
  ExportableVerificationResult,
  ResultLevel,
  RunVerificationOutput,
  VerificationResult
} from "../verifier";

import { runVerification, stringifyExportableResult } from "../verifier";

import type { ResultCardViewModel } from "../ui";

import {
  buildResultCard,
  formatMarkdownReport,
  formatPlainTextReport,
  formatShortReport
} from "../ui";

/**
 * Demo runner for the A-DAP Citizen Verifier App.
 *
 * This module is intentionally framework-neutral.
 * It can be used by a future React UI, CLI demo, documentation example,
 * or browser-based playground.
 *
 * Scope:
 * - runs the verifier against demo inputs
 * - prepares UI-ready result cards
 * - prepares plain-language reports
 * - prepares exportable JSON
 *
 * Non-scope:
 * - does not load files from disk
 * - does not fetch remote fixtures
 * - does not verify real cryptographic signatures
 * - does not provide legal, fairness, or accountability conclusions
 */

export type DemoCaseName = "green" | "yellow" | "red" | "gray";

export type DemoCaseInput = {
  name: DemoCaseName;
  title: string;
  description: string;
  envelopeRaw?: string;
  explanationRaw?: string;
  expectedLevel: ResultLevel;
};

export type DemoCaseOutput = {
  name: DemoCaseName;
  title: string;
  description: string;
  expectedLevel: ResultLevel;
  actualLevel: ResultLevel;
  passedExpectedLevel: boolean;
  verification: VerificationResult;
  exportable: ExportableVerificationResult;
  resultCard: ResultCardViewModel;
  reports: {
    shortText: string;
    plainText: string;
    markdown: string;
    json: string;
  };
  diagnostics: RunVerificationOutput["diagnostics"];
};

export type DemoRunnerSummary = {
  total: number;
  passed: number;
  failed: number;
  results: Array<{
    name: DemoCaseName;
    expectedLevel: ResultLevel;
    actualLevel: ResultLevel;
    passed: boolean;
  }>;
};

/**
 * Run one demo case.
 */
export function runDemoCase(input: DemoCaseInput): DemoCaseOutput {
  const verificationOutput = runVerification({
    envelopeRaw: input.envelopeRaw ?? "",
    explanationRaw: input.explanationRaw ?? "",
    verificationTime: "2026-05-30T00:00:00Z"
  });

  const verification = verificationOutput.result;
  const resultCard = buildResultCard(verification);

  return {
    name: input.name,
    title: input.title,
    description: input.description,
    expectedLevel: input.expectedLevel,
    actualLevel: verification.result_level,
    passedExpectedLevel: verification.result_level === input.expectedLevel,
    verification,
    exportable: verificationOutput.exportable,
    resultCard,
    reports: {
      shortText: formatShortReport(verification),
      plainText: formatPlainTextReport(verification),
      markdown: formatMarkdownReport(verification),
      json: stringifyExportableResult(verificationOutput.exportable)
    },
    diagnostics: verificationOutput.diagnostics
  };
}

/**
 * Run multiple demo cases.
 */
export function runDemoCases(cases: DemoCaseInput[]): DemoCaseOutput[] {
  return cases.map(runDemoCase);
}

/**
 * Summarize demo results.
 */
export function summarizeDemoResults(
  outputs: DemoCaseOutput[]
): DemoRunnerSummary {
  const results = outputs.map((output) => ({
    name: output.name,
    expectedLevel: output.expectedLevel,
    actualLevel: output.actualLevel,
    passed: output.passedExpectedLevel
  }));

  const passed = results.filter((result) => result.passed).length;
  const failed = results.length - passed;

  return {
    total: results.length,
    passed,
    failed,
    results
  };
}

/**
 * Run demo cases and return both outputs and summary.
 */
export function runDemoSuite(cases: DemoCaseInput[]): {
  outputs: DemoCaseOutput[];
  summary: DemoRunnerSummary;
} {
  const outputs = runDemoCases(cases);

  return {
    outputs,
    summary: summarizeDemoResults(outputs)
  };
}

/**
 * Build a minimal demo case input.
 *
 * Useful for UI screens where fixtures are loaded elsewhere.
 */
export function createDemoCaseInput(params: {
  name: DemoCaseName;
  envelopeRaw?: string;
  explanationRaw?: string;
}): DemoCaseInput {
  return {
    name: params.name,
    title: getDemoCaseTitle(params.name),
    description: getDemoCaseDescription(params.name),
    envelopeRaw: params.envelopeRaw ?? "",
    explanationRaw: params.explanationRaw ?? "",
    expectedLevel: getExpectedLevelForDemoCase(params.name)
  };
}

/**
 * Human-readable title for each demo case.
 */
export function getDemoCaseTitle(name: DemoCaseName): string {
  switch (name) {
    case "green":
      return "Green Case — Explanation matches";

    case "yellow":
      return "Yellow Case — Partly checkable";

    case "red":
      return "Red Case — Explanation mismatch";

    case "gray":
      return "Gray Case — Not exercisable";

    default:
      return "Unknown demo case";
  }
}

/**
 * Human-readable description for each demo case.
 */
export function getDemoCaseDescription(name: DemoCaseName): string {
  switch (name) {
    case "green":
      return "The envelope is present and the later explanation appears to match the committed record.";

    case "yellow":
      return "The record can be partly checked, but important fields or independent verification materials are missing.";

    case "red":
      return "The envelope is present, but the later explanation conflicts with the committed decision record.";

    case "gray":
      return "No usable A-DAP envelope is provided, so verification is not exercisable with the available materials.";

    default:
      return "The demo case could not be described.";
  }
}

/**
 * Expected result level for each built-in demo case.
 */
export function getExpectedLevelForDemoCase(name: DemoCaseName): ResultLevel {
  switch (name) {
    case "green":
      return "green";

    case "yellow":
      return "yellow";

    case "red":
      return "red";

    case "gray":
      return "gray";

    default:
      return "gray";
  }
}

/**
 * Return a short one-line summary suitable for demo lists.
 */
export function getDemoOutputSummary(output: DemoCaseOutput): string {
  const status = output.passedExpectedLevel ? "passed" : "failed";

  return `${output.name}: expected ${output.expectedLevel}, got ${output.actualLevel} — ${status}`;
}

/**
 * Format the full demo suite summary as plain text.
 */
export function formatDemoSuiteSummary(summary: DemoRunnerSummary): string {
  const lines: string[] = [];

  lines.push("A-DAP Citizen Verifier Demo Suite");
  lines.push("=================================");
  lines.push("");
  lines.push(`Total cases: ${summary.total}`);
  lines.push(`Passed: ${summary.passed}`);
  lines.push(`Failed: ${summary.failed}`);
  lines.push("");
  lines.push("Results:");

  for (const result of summary.results) {
    const status = result.passed ? "passed" : "failed";
    lines.push(
      `- ${result.name}: expected ${result.expectedLevel}, got ${result.actualLevel} — ${status}`
    );
  }

  lines.push("");
  lines.push(
    "This demo suite tests simplified MVP behavior. It does not prove truth, fairness, legality, correctness, or accountability."
  );

  return lines.join("\n");
}

/**
 * Pick a demo output by case name.
 */
export function findDemoOutput(
  outputs: DemoCaseOutput[],
  name: DemoCaseName
): DemoCaseOutput | null {
  return outputs.find((output) => output.name === name) ?? null;
}

/**
 * Check whether all demo cases passed their expected result level.
 */
export function allDemoCasesPassed(outputs: DemoCaseOutput[]): boolean {
  return outputs.every((output) => output.passedExpectedLevel);
}

/**
 * Return demo case names in intended display order.
 */
export function getDemoCaseOrder(): DemoCaseName[] {
  return ["green", "yellow", "red", "gray"];
  }
