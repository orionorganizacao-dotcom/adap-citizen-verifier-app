if (!envelopeParse.ok) {
  const result = generateResult({
    envelope: null,
    schemaResult: null,
    comparisonResult: null,
    dependencyResult: analyzeDependencies(null),
    verificationTime
  });

  const grayResult: VerificationResult = {
    ...result,
    modules_run: [
      "generate_result"
    ],
    modules_skipped: [
      "parse_envelope",
      "validate_schema",
      "compare_explanation",
      "analyze_dependencies",
      "full_hash_validation",
      "full_signature_validation",
      "external_timestamp_validation"
    ]
  };

  return {
    ok: false,
    result: grayResult,
    exportable: toExportableResult(grayResult),
    diagnostics: {
      envelopeParseOk: false,
      envelopeParseError: envelopeParse.error,
      explanationProvided: hasText(explanationRaw),
      explanationCompared: false,
      schemaWarnings: [],
      comparisonWarnings: [],
      dependencyWarnings: [
        "No usable envelope was provided, so the verification path is not exercisable."
      ],
      notes: [
        envelopeParse.error,
        "Verification returned Gray because the envelope could not be parsed."
      ]
    }
  };
}
