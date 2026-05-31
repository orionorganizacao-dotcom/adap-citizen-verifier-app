export {
  analyzeDependencies,
  compareExplanation,
  generateResult,
  parseEnvelope,
  runFixtureVerification,
  runVerification,
  validateSchema
} from "./verifier";

export type {
  DependencyWarning,
  DoesNotProve,
  ExportableVerificationResult,
  FieldMismatch,
  RecommendedNextStep,
  ResultLevel,
  RunVerificationInput,
  RunVerificationOutput,
  VerificationResult
} from "./verifier";

export {
  buildResultCard,
  formatMarkdownReport,
  formatPlainTextReport,
  formatShortReport,
  getMarkdownReportFilename,
  getPlainTextReportFilename,
  getResultAriaLabel,
  getResultBadge,
  getResultHeadline,
  getResultTone,
  getResultTitle,
  isCriticalResult,
  shouldShowEscalationHint
} from "./ui";

export {
  allDemoCasesPassed,
  createDemoCaseInput,
  findDemoOutput,
  formatDemoSuiteSummary,
  getDemoCaseDescription,
  getDemoCaseOrder,
  getDemoCaseTitle,
  getDemoOutputSummary,
  getExpectedLevelForDemoCase,
  runDemoCase,
  runDemoCases,
  runDemoSuite,
  summarizeDemoResults
} from "./app";

export type {
  DemoCaseInput,
  DemoCaseName,
  DemoCaseOutput,
  DemoRunnerSummary
} from "./app";
