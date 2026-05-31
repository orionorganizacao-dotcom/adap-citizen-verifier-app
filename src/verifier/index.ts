export type {
  ResultCardAction,
  ResultCardSection,
  ResultCardTone,
  ResultCardViewModel
} from "./ResultCard";

export {
  buildResultCard,
  formatDependencyWarning,
  formatDependencyWarnings,
  formatMismatches,
  getActionDescription,
  getActionLabel,
  getPrimaryAction,
  getResultAriaLabel,
  getResultBadge,
  getResultHeadline,
  getResultSummary,
  getResultTitle,
  getResultTone,
  getSecondaryActions,
  isCriticalResult,
  shouldShowEscalationHint
} from "./ResultCard";

export type {
  PlainTextReportOptions
} from "./formatReport";

export {
  appendMarkdownList,
  buildSafeFilename,
  createMarkdownReportBlob,
  createTextReportBlob,
  formatCoreStatuses,
  formatDoesNotProve,
  formatEscalationText,
  formatFooter,
  formatHeader,
  formatInlineList,
  formatLimitationNotice,
  formatListSection,
  formatMachineReadableHint,
  formatMarkdownReport,
  formatMatchedFields,
  formatMismatchSection,
  formatMissingFields,
  formatOptionalIssueSummary,
  formatPlainTextReport,
  formatRecommendedNextSteps,
  formatRecommendedStep,
  formatResultSummary,
  formatShortReport,
  formatTechnicalDetails,
  getMarkdownReportFilename,
  getPlainTextReportFilename
} from "./formatReport";
