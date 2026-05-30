/**
 * Core types for the A-DAP Citizen Verifier App.
 *
 * These types define the first MVP data model for parsing an A-DAP demo envelope,
 * comparing it with a later explanation, generating result levels, recording
 * dependency warnings, and exporting a reproducible verification result.
 *
 * The MVP tests record consistency.
 * It does not prove truth, fairness, legality, correctness, or accountability.
 */

export type ResultLevel = "green" | "yellow" | "red" | "gray";

export type CheckStatus =
  | "not_started"
  | "passed"
  | "failed"
  | "skipped"
  | "not_checkable"
  | "not_implemented";

export type EnvelopeStatus =
  | "present"
  | "missing"
  | "malformed"
  | "unsupported"
  | "not_accessible";

export type SchemaStatus =
  | "valid"
  | "valid_with_missing_fields"
  | "invalid"
  | "unsupported"
  | "missing"
  | "not_checkable";

export type ReconstructionStatus =
  | "successful"
  | "partial"
  | "failed"
  | "not_possible"
  | "not_checkable";

export type HashStatus =
  | "match"
  | "mismatch"
  | "missing"
  | "not_checkable"
  | "unsupported_algorithm"
  | "demo_placeholder_not_fully_checked";

export type SignatureStatus =
  | "valid"
  | "invalid"
  | "missing"
  | "public_key_missing"
  | "unsupported_signature_method"
  | "present_not_fully_checked"
  | "not_checkable"
  | "not_implemented";

export type TimestampStatus =
  | "present"
  | "missing"
  | "externally_verifiable"
  | "present_not_independently_verified"
  | "operator_controlled"
  | "not_checkable"
  | "not_implemented";

export type ExplanationMatchStatus =
  | "matched"
  | "partial"
  | "failed"
  | "missing_explanation"
  | "not_checkable";

export type DependencyWarning =
  | "public_key_hosted_only_by_operator"
  | "reconstruction_rules_hosted_only_by_operator"
  | "timestamp_evidence_not_independently_reachable"
  | "verifier_interface_controlled_by_operator"
  | "no_downloadable_receipt_provided"
  | "no_external_anchor_available"
  | "schema_controlled_only_by_operator"
  | "verification_path_not_exercisable"
  | "operator_controlled_resource_detected";

export type DoesNotProve =
  | "truth"
  | "fairness"
  | "legality"
  | "correctness"
  | "accountability"
  | "manipulation"
  | "model_quality"
  | "non_discrimination"
  | "institutional_compliance";

export type RecommendedNextStep =
  | "download_report"
  | "download_json"
  | "request_human_review"
  | "request_human_review_if_needed"
  | "request_adap_envelope"
  | "request_reconstruction_rules"
  | "request_public_key"
  | "request_timestamp_evidence"
  | "request_downloadable_verification_package"
  | "request_missing_policy_version"
  | "request_independent_public_key_anchor"
  | "ask_institution_to_explain_mismatch"
  | "share_report_with_lawyer_regulator_auditor_or_advocate";

export type ModuleName =
  | "check_envelope_presence"
  | "parse_envelope"
  | "validate_schema"
  | "reconstruct_record"
  | "check_hash"
  | "check_signature"
  | "check_timestamp"
  | "compare_explanation"
  | "analyze_dependencies"
  | "analyze_available_materials"
  | "generate_result"
  | "export_report"
  | "export_json"
  | "full_hash_validation"
  | "full_signature_validation"
  | "external_timestamp_validation";

export type VerificationModuleStatus = {
  module: ModuleName;
  status: CheckStatus;
  message?: string;
};

export type SignatureMetadata = {
  status: "present" | "missing";
  method?: string;
  public_key_reference?: string;
};

export type TimestampMetadata = {
  status: "present" | "missing";
  type?: string;
  independently_verifiable?: boolean;
};

export type DependencyMetadata = {
  public_key_hosted_by_operator?: boolean;
  reconstruction_rules_hosted_by_operator?: boolean;
  external_anchor_available?: boolean;
  verifier_interface_controlled_by_operator?: boolean;
  timestamp_evidence_independently_reachable?: boolean;
  downloadable_receipt_provided?: boolean;
  schema_controlled_only_by_operator?: boolean;
};

export type CommittedRecord = {
  decision?: string;
  reason_code?: string;
  policy_version?: string;
  model_version?: string;
  threshold?: string;
  explanation_summary?: string;
  [key: string]: unknown;
};

export type DemoAdapEnvelope = {
  schema_version?: string;
  decision_id?: string;
  committed_record?: CommittedRecord;
  committed_hash?: string;
  hash_algorithm?: string;
  signature?: SignatureMetadata;
  timestamp?: TimestampMetadata;
  dependencies?: DependencyMetadata;
  expected_result?: {
    result_level?: ResultLevel;
    plain_language_result?: string;
    missing_fields?: string[];
    mismatch?: Record<string, unknown>;
    does_not_prove?: DoesNotProve[];
  };
  [key: string]: unknown;
};

export type ExplanationRecord = {
  decision?: string;
  reason_code?: string;
  policy_version?: string;
  model_version?: string;
  threshold?: string;
  explanation_summary?: string;
  [key: string]: unknown;
};

export type StructuredExplanation = {
  decision_id?: string;
  explanation?: ExplanationRecord;
  [key: string]: unknown;
};

export type ParsedInput = {
  envelopeRaw?: string;
  explanationRaw?: string;
  envelopeParsed?: DemoAdapEnvelope | null;
  explanationParsed?: StructuredExplanation | null;
  explanationText?: string | null;
  envelopeParseError?: string | null;
  explanationParseError?: string | null;
};

export type FieldMismatch = {
  field: string;
  committed_value: unknown;
  explanation_value: unknown;
};

export type VerificationChecks = {
  envelope: CheckStatus;
  schema: CheckStatus;
  reconstruction: CheckStatus;
  hash: CheckStatus;
  signature: CheckStatus;
  timestamp: CheckStatus;
  explanationComparison: CheckStatus;
  dependencies: CheckStatus;
};

export type VerificationResult = {
  tool_name: "citizen-verifier";
  tool_version: string;
  schema_version: "citizen-ui-result-0.1";
  verification_time: string;

  decision_id: string | null;
  result_level: ResultLevel;
  plain_language_result: string;

  envelope_status: EnvelopeStatus;
  schema_status: SchemaStatus;
  reconstruction_status: ReconstructionStatus;
  hash_status: HashStatus;
  signature_status: SignatureStatus;
  timestamp_status: TimestampStatus;
  explanation_match_status: ExplanationMatchStatus;

  matched_fields?: string[];
  mismatches?: FieldMismatch[];
  missing_fields: string[];
  dependency_warnings: DependencyWarning[];

  modules_run: ModuleName[];
  modules_skipped: ModuleName[];
  module_statuses?: VerificationModuleStatus[];

  does_not_prove: DoesNotProve[];
  recommended_next_steps: RecommendedNextStep[];

  limitation_notice: string;
};

export type ExportableVerificationResult = {
  adap_citizen_verification_result: VerificationResult;
};

export type PlainLanguageReport = {
  title: string;
  generated_at: string;
  decision_id: string | null;
  result_level: ResultLevel;
  plain_language_result: string;
  what_matched: string[];
  what_failed: string[];
  what_was_missing: string[];
  what_could_not_be_checked: string[];
  dependency_warnings: string[];
  limitation_notice: string;
  recommended_next_steps: string[];
  technical_summary: VerificationResult;
};

export type VerifierConfig = {
  tool_name: "citizen-verifier";
  tool_version: string;
  result_schema_version: "citizen-ui-result-0.1";
  demo_envelope_schema_version: "adap-envelope-demo-0.1";
  enableFullHashValidation: boolean;
  enableFullSignatureValidation: boolean;
  enableExternalTimestampValidation: boolean;
};

export type VerificationContext = {
  config: VerifierConfig;
  input: ParsedInput;
  checks: VerificationChecks;
  missingFields: string[];
  matchedFields: string[];
  mismatches: FieldMismatch[];
  dependencyWarnings: DependencyWarning[];
  modulesRun: ModuleName[];
  modulesSkipped: ModuleName[];
  moduleStatuses: VerificationModuleStatus[];
};

export const DEFAULT_DOES_NOT_PROVE: DoesNotProve[] = [
  "truth",
  "fairness",
  "legality",
  "correctness",
  "accountability"
];

export const DEFAULT_LIMITATION_NOTICE =
  "This tool checks whether the materials provided allow comparison between a later explanation and a committed decision record. It does not prove truth, fairness, legality, correctness, or accountability.";

export const RESULT_LEVEL_LABELS: Record<ResultLevel, string> = {
  green: "Green: Explanation appears to match the committed record.",
  yellow: "Yellow: Record can be partly checked, but important information is missing.",
  red: "Red: Explanation does not appear to match the committed record.",
  gray: "Gray: Verification is not exercisable with the materials provided."
};

export const RESULT_LEVEL_WARNINGS: Record<ResultLevel, string> = {
  green:
    "This does not prove the decision was fair, lawful, or correct. It only means the explanation appears consistent with the committed record under the stated assumptions.",
  yellow:
    "This record may still be useful, but additional information may be needed before the decision can be meaningfully challenged.",
  red:
    "This does not automatically prove the decision was wrong. It identifies a specific inconsistency that may support review, disclosure, or escalation.",
  gray:
    "The decision may have documentation, but the verification path is not exercisable from the materials provided."
};

export const DEFAULT_VERIFIER_CONFIG: VerifierConfig = {
  tool_name: "citizen-verifier",
  tool_version: "0.1.0",
  result_schema_version: "citizen-ui-result-0.1",
  demo_envelope_schema_version: "adap-envelope-demo-0.1",
  enableFullHashValidation: false,
  enableFullSignatureValidation: false,
  enableExternalTimestampValidation: false
};

export const REQUIRED_DEMO_ENVELOPE_FIELDS: string[] = [
  "schema_version",
  "decision_id",
  "committed_record",
  "committed_hash",
  "hash_algorithm"
];

export const RECOMMENDED_COMMITTED_RECORD_FIELDS: string[] = [
  "decision",
  "reason_code",
  "policy_version",
  "model_version",
  "threshold",
  "explanation_summary"
];
