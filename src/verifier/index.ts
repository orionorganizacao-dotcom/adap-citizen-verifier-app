export {
  parseEnvelope
} from "./parseEnvelope";

export {
  validateSchema
} from "./validateSchema";

export {
  compareExplanation
} from "./compareExplanation";

export {
  analyzeDependencies
} from "./analyzeDependencies";

export {
  generateResult
} from "./generateResult";

export {
  runFixtureVerification,
  runVerification
} from "./runVerification";

export type {
  VerificationResult,
  ExportableVerificationResult,
  RunVerificationInput,
  RunVerificationOutput,
  ResultLevel,
  FieldMismatch,
  DependencyWarning,
  RecommendedNextStep,
  DoesNotProve
} from "./types";
