/**
 * ReadyGap v0.1 experimental scoring core.
 * Inputs are self-reports until independently audited; no safety certification.
 * No external dependencies; shared by the website and Node unit tests.
 */
export const MIN_APPLICABLE_INDICATORS = 9;
export const VALID_EVIDENCE = ["self_report", "documented", "observed"];
export const VALID_GATE_STATES = ["pass", "fail", "unknown"];
export const VALID_ELIGIBILITY = ["eligible", "ineligible", "unknown"];
export const VALID_RISK = ["routine", "high"];
export const VALID_TRIAL = ["passed", "failed", "untested"];

const avg = values => values.reduce((a, b) => a + b, 0) / values.length;
const rounded = value => Math.round(value * 10) / 10;

function oneOf(value, allowed, description) {
  if (!allowed.includes(value)) throw new Error("Invalid " + description + ": " + value);
}

export function scoreIndicators(registry, responses = {}) {
  if (!registry || !Array.isArray(registry.domains) || !Array.isArray(registry.indicators)) {
    throw new Error("Invalid indicator registry");
  }
  const values = [];
  const evidence = { self_report: 0, documented: 0, observed: 0 };
  for (const indicator of registry.indicators) {
    const response = responses[indicator.id];
    if (response == null || response.numerator === "" || response.denominator === "" ||
        response.numerator == null || response.denominator == null) {
      values.push({ id: indicator.id, domain_id: indicator.domain_id, state: "unknown", value: null });
      continue;
    }
    const { numerator, denominator } = response;
    if (!Number.isSafeInteger(numerator) || !Number.isSafeInteger(denominator) ||
        numerator < 0 || denominator < 0 || numerator > denominator) {
      throw new Error(indicator.id + ": expected integer counts with 0 ≤ numerator ≤ denominator");
    }
    const evidenceType = response.evidence || "self_report";
    oneOf(evidenceType, VALID_EVIDENCE, "evidence type");
    if (denominator === 0) {
      values.push({ id: indicator.id, domain_id: indicator.domain_id, state: "not_applicable", value: null });
    } else {
      evidence[evidenceType]++;
      values.push({
        id: indicator.id, domain_id: indicator.domain_id, state: "scored",
        value: rounded(100 * numerator / denominator),
        numerator, denominator, evidence: evidenceType
      });
    }
  }
  const domains = registry.domains.map(domain => {
    const scoped = values.filter(v => v.domain_id === domain.id);
    const scored = scoped.filter(v => v.state === "scored");
    return { id: domain.id, title_zh: domain.title_zh,
      value: scored.length ? rounded(avg(scored.map(v => v.value))) : null,
      scored: scored.length, total: scoped.length,
      unknown: scoped.filter(v => v.state === "unknown").length,
      notApplicable: scoped.filter(v => v.state === "not_applicable").length };
  });
  const scoredCount = values.filter(v => v.state === "scored").length;
  const reportable = scoredCount >= MIN_APPLICABLE_INDICATORS &&
    domains.length === 6 && domains.every(d => d.value !== null);
  const reasons = [];
  if (scoredCount < MIN_APPLICABLE_INDICATORS) reasons.push("Less than 9/12 applicable measured indicators");
  if (domains.some(d => d.value === null)) reasons.push("At least one domain has no applicable measurement");
  if (registry.domains.length !== 6 || registry.indicators.length !== 12) {
    reasons.push("Unexpected questionnaire structure");
  }
  return {
    schemaVersion: registry.schema_version, reportable,
    readyScore: reportable ? rounded(avg(domains.map(d => d.value))) : null,
    domains, indicators: values, evidence,
    scoredCount, unknownCount: values.filter(v => v.state === "unknown").length,
    notApplicableCount: values.filter(v => v.state === "not_applicable").length,
    reasons
  };
}

export function scoreTasks(tasks, gateRegistry) {
  if (!Array.isArray(tasks) || !gateRegistry || !Array.isArray(gateRegistry.gates)) {
    throw new Error("Invalid workflow assessment inputs");
  }
  const ids = gateRegistry.gates.map(g => g.id);
  if (ids.length !== 6 || new Set(ids).size !== ids.length) throw new Error("Invalid gate registry");
  const gateCounts = Object.fromEntries(ids.map(id => [id, { fail: 0, unknown: 0 }]));
  const unlock = Object.fromEntries(ids.map(id => [id, 0]));
  let eligible = 0, ineligible = 0, unknownEligibility = 0, confirmedReady = 0, highRisk = 0;
  let hoursEligible = 0, hoursReady = 0, allHoursSupplied = true;
  const assessed = tasks.map((task, i) => {
    oneOf(task.eligibility, VALID_ELIGIBILITY, "eligibility");
    if (task.eligibility === "ineligible" && !String(task.exclusionReason || "").trim()) {
      throw new Error("Activity " + (i + 1) + " requires exclusion reason");
    }
    if (task.hours !== "" && task.hours != null &&
      (!Number.isFinite(task.hours) || task.hours < 0)) {
      throw new Error("Activity " + (i + 1) + ": hours must be nonnegative");
    }
    if (task.eligibility !== "eligible") {
      if (task.eligibility === "unknown") unknownEligibility++; else ineligible++;
      return { name: task.name || "Activity " + (i + 1), status: "out_of_scope", eligibility: task.eligibility };
    }
    eligible++;
    oneOf(task.risk, VALID_RISK, "risk level");
    oneOf(task.trial, VALID_TRIAL, "trial");
    if (task.risk === "high") highRisk++;
    const gates = task.gates || {};
    const failing = [], missing = [];
    for (const id of ids) {
      oneOf(gates[id], VALID_GATE_STATES, "gate " + id);
      if (gates[id] === "fail") failing.push(id);
      if (gates[id] === "unknown") missing.push(id);
    }
    const allPass = failing.length === 0 && missing.length === 0;
    const ready = task.risk === "routine" && allPass && task.trial === "passed";
    if (ready) confirmedReady++;
    for (const id of failing) gateCounts[id].fail++;
    for (const id of missing) gateCounts[id].unknown++;
    if (task.risk === "routine" && task.trial === "untested" &&
        failing.length === 1 && missing.length === 0) {
      unlock[failing[0]]++;
    }
    if (task.hours == null || task.hours === "") allHoursSupplied = false;
    else {
      hoursEligible += task.hours;
      if (ready) hoursReady += task.hours;
    }
    let status = "blocked";
    if (task.risk === "high") status = "needs_specialist_review";
    else if (ready) status = "pilot_ready";
    else if (failing.length) status = "blocked";
    else if (missing.length) status = "unverified";
    else if (task.trial === "failed") status = "trial_failed";
    else status = "preflight_complete";
    return { name: task.name || "Activity " + (i + 1), status,
      ready, failing, missing, trial: task.trial, risk: task.risk };
  });
  const reasons = [];
  if (eligible === 0) reasons.push("No screened eligible activities");
  if (eligible > 0 && eligible < 3) reasons.push("Small eligible sample; not representative");
  if (unknownEligibility) reasons.push("Some activities have unknown AI eligibility");
  if (highRisk) reasons.push("High-risk activities require external specialist approval, not auto-certification");
  const readyCoverage = eligible ? rounded(100 * confirmedReady / eligible) : null;
  const effortCoverage = eligible && allHoursSupplied && hoursEligible > 0
    ? rounded(100 * hoursReady / hoursEligible) : null;
  return { schemaVersion: gateRegistry.schema_version, eligible, ineligible, unknownEligibility,
    confirmedReady, highRisk, readyCoverage, effortCoverage,
    effortDenominatorHours: effortCoverage === null ? null : hoursEligible,
    gateCounts, unlock, activities: assessed, reasons };
}
