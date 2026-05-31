import {
  classifyDependency,
  RULE_ENGINE_METADATA,
} from "../src/rules/dependencyRuleEngine";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function testDetectedDependency(): void {
  const result = classifyDependency({
    operator_domain: "operator.example.com",
    public_key_source_url: "https://operator.example.com/keys/public.json",
  });

  assert(
    result.rule_engine.name === "adap-citizen-dependency-rules",
    "rule engine name should match"
  );

  assert(
    result.rule_engine.version === "0.1.1",
    "rule engine version should be 0.1.1"
  );

  assert(
    result.rule_engine.deterministic === true,
    "rule engine should declare deterministic design"
  );

  assert(
    result.rule_engine.reproducible_by_design === true,
    "rule engine should be reproducible by design"
  );

  assert(
    result.rule_engine.externally_reproduced === false,
    "rule engine must not claim external reproduction"
  );

  assert(
    result.dependency_classification.dependency_status ===
      "dependency_detected",
    "same-domain public key source should detect dependency"
  );

  assert(
    result.dependency_classification.ndc_label ===
      "ndc_1_operator_dependent",
    "detected dependency should use ndc_1_operator_dependent label"
  );

  assert(
    result.dependency_classification.external_verification === false,
    "classification must not claim external verification"
  );

  assert(
    result.dependency_classification.classification_basis.length === 1,
    "classification basis should contain one signal"
  );

  assert(
    result.dependency_classification.classification_basis[0].rule_id ===
      "ADAP-CV-DEP-001",
    "classification basis should include rule id"
  );

  assert(
    result.dependency_classification.classification_basis[0].signal ===
      "public_key_source_matches_operator_domain",
    "classification basis should include expected signal"
  );
}

function testUnresolvedDependency(): void {
  const result = classifyDependency({
    operator_domain: "operator.example.com",
    public_key_source_url: "https://cdn.example.net/keys/public.json",
  });

  assert(
    result.dependency_classification.dependency_status ===
      "dependency_unresolved",
    "different-domain hosting must not prove independence"
  );

  assert(
    result.dependency_classification.ndc_label === "not_computed",
    "unresolved dependency should not compute NDC label"
  );

  assert(
    result.dependency_classification.classification_basis.length === 0,
    "unresolved dependency should not fabricate dependency basis"
  );

  assert(
    result.dependency_classification.does_not_prove.includes("independence"),
    "unresolved dependency must not prove independence"
  );
}

function testDeterministicOutput(): void {
  const input = {
    operator_domain: "operator.example.com",
    public_key_source_url: "https://operator.example.com/keys/public.json",
  };

  const first = classifyDependency(input);
  const second = classifyDependency(input);

  assert(
    JSON.stringify(first) === JSON.stringify(second),
    "same input should produce identical output"
  );
}

function testMetadataConstant(): void {
  assert(
    RULE_ENGINE_METADATA.reproducible_by_design === true,
    "metadata should distinguish reproducible_by_design"
  );

  assert(
    RULE_ENGINE_METADATA.externally_reproduced === false,
    "metadata should not claim external reproduction"
  );

  assert(
    RULE_ENGINE_METADATA.reproduction_status ===
      "not_yet_independently_reproduced",
    "metadata should disclose Rule Reproduction Debt"
  );
}

testDetectedDependency();
testUnresolvedDependency();
testDeterministicOutput();
testMetadataConstant();

console.log("dependency-rule-engine tests passed");
