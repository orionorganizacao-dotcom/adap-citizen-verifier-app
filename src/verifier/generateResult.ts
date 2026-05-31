export function generateResult(input: GenerateResultInput): VerificationResult {
  const resultLevel = determineResultLevel(input);
  const decisionId = getDecisionId(input.envelope);

  const dependencyWarnings: DependencyWarning[] = input.envelope
    ? getDependencyWarnings(input.dependencyResult)
    : ["verification_path_not_exercisable"];

  const missingFields = getMissingFields(input.schemaResult, input.comparisonResult);
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
