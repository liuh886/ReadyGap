import { scoreIndicators, scoreTasks } from "../../scoring/engine.mjs";
import { applyAssessmentLocale, buildDictionary, normalizeLanguage } from "./assessment-i18n.mjs";

// Bilingual assessment using the same numeric scoring engine and questionnaire definitions.
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[c]);

let registry;
let gates;
let taskNumber = 0;
let shareText = "";
let language = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
let lastReport = null;
const subjectNames = {individual:"Individual",team:"Team",department:"Department",
  company:"Company",group:"Group",other:"Other entity"};
function localize() { applyAssessmentLocale(document, language, buildDictionary(registry,gates)); }
function summaryText(cap, cov, entity) {
  const score = cap.reportable ? cap.readyScore.toFixed(1)+"/100" : (language==="zh"?"无法报告":"Not reportable");
  const coverage = cov.readyCoverage===null ? (language==="zh"?"无法报告":"Not reportable") : cov.readyCoverage.toFixed(1)+"%";
  return language==="zh" ? [
    "ReadyGap · 实验性测评 v0.1",
    "主体类别："+entity,
    "ReadyScore："+score, "Ready Coverage："+coverage,
    "适用任务数："+cov.eligible, "已确认具备试点条件："+cov.confirmedReady,
    "自报、未经科学校准；不构成认证或全球百分位。",
    "https://liuh886.github.io/ReadyGap/"
  ].join("\n") : [
    "ReadyGap · Experimental v0.1",
    "Entity type: "+entity,
    "ReadyScore: "+score, "Ready Coverage: "+coverage,
    "Eligible activities: "+cov.eligible,
    "Confirmed pilot-ready: "+cov.confirmedReady,
    "Self-reported, unvalidated; no certification or global percentile.",
    "https://liuh886.github.io/ReadyGap/"
  ].join("\n");
}
function changeLanguage(next) {
  language=normalizeLanguage(next);
  const url=new URL(window.location.href);
  url.searchParams.set("lang",language);
  window.history.replaceState(null,"",url);
  localize();
  if(lastReport) {
    shareText=summaryText(lastReport.capability,lastReport.coverage,
      $("#subject").selectedOptions[0].textContent);
  }
}

const evidenceOptions = [
  ["self_report", "Self-reported"],
  ["documented", "Documented (self-reported)"],
  ["observed", "Observed (self-reported)"]
];
const checkOptions = [["unknown", "Unknown"], ["pass", "Pass"], ["fail", "Fail"]];

function options(entries) {
  return entries.map(([value, text]) => '<option value="' + esc(value) + '">' + esc(text) + '</option>').join("");
}

function renderIndicators() {
  $("#indicator-list").innerHTML = registry.domains.map(domain => {
    const items = registry.indicators.filter(item => item.domain_id === domain.id);
    return '<section class="domain"><div class="domain-title"><h3>' +
      esc(domain.id + " · " + domain.title_en) + '</h3><span>2 indicators</span></div>' +
      items.map(item => '<div class="indicator" data-indicator="' + esc(item.id) + '">' +
        '<div class="indicator-text"><strong>' + esc(item.id + " · " + item.title_en) + '</strong>' +
        '<p>' + esc(item.what_en) + '</p>' +
        '<details><summary>Definition, evidence and improvement</summary>' +
        '<p><b>Why it matters:</b> ' + esc(item.why_en) + '</p>' +
        '<p><b>Numerator:</b> ' + esc(item.numerator_en) + '</p>' +
        '<p><b>Denominator:</b> ' + esc(item.denominator_en) + '</p>' +
        '<p><b>Evidence:</b> ' + esc(item.evidence_en) + '</p>' +
        '<p><b>Action to improve:</b> ' + esc(item.action_en) + '</p>' +
        '<p><b>Limits:</b> ' + esc(item.caveat_en) + '</p></details></div>' +
        '<label class="num-label">Activities meeting the criterion<input class="num" type="number" min="0" step="1" inputmode="numeric" placeholder="Blank = unknown" aria-label="' +
        esc(item.id) + ' numerator"/></label>' +
        '<label class="num-label">Applicable activities in scope<input class="den" type="number" min="0" step="1" inputmode="numeric" placeholder="0 = N/A" aria-label="' +
        esc(item.id) + ' denominator"/></label>' +
        '<label class="num-label evidence">Evidence status<select class="evidence-input" aria-label="' +
        esc(item.id) + ' evidence status">' + options(evidenceOptions) +
        '</select></label></div>').join("") +
      '</section>';
  }).join("");
  localize();
}

function addTask() {
  const id = ++taskNumber;
  const el = document.createElement("section");
  el.className = "task-card";
  el.dataset.task = String(id);
  const gateRows = gates.gates.map(gate =>
    '<div class="gate-row"><label for="gate-' + id + "-" + esc(gate.id) +
    '" title="' + esc(gate.requirement_en) + '">' + esc(gate.title_en) +
    '</label><select id="gate-' + id + "-" + esc(gate.id) +
    '" data-gate="' + esc(gate.id) + '">' + options(checkOptions) + '</select></div>'
  ).join("");
  el.innerHTML =
    '<div class="task-top">' +
      '<label>Activity name<input class="task-name" maxlength="120" placeholder="e.g., Weekly technical report"/></label>' +
      '<label>AI suitability<select class="task-eligibility">' +
        '<option value="unknown">Not screened</option><option value="eligible">Eligible</option>' +
        '<option value="ineligible">Not AI-suitable</option></select></label>' +
      '<label>Risk category<select class="task-risk"><option value="routine">Routine</option>' +
        '<option value="high">High risk / regulated</option></select></label>' +
    '</div>' +
    '<div class="task-meta">' +
      '<label>Monthly hours (optional)<input class="task-hours" type="number" min="0" step="0.1" placeholder="Hours"/></label>' +
      '<label class="exclusion">Exclusion reason (if ineligible)<input class="task-reason" placeholder="Brief reason"/></label>' +
      '<label>Reference window<span class="muted">Past 30 days</span></label>' +
    '</div>' +
    '<div class="gate-grid">' + gateRows + '</div>' +
    '<div class="task-footer">' +
      '<label>Representative trial<select class="task-trial">' +
      '<option value="untested">Not tested</option><option value="passed">Passed</option>' +
      '<option value="failed">Failed</option></select></label>' +
      '<button type="button" class="remove-btn">Remove activity</button>' +
    '</div>';
  el.querySelector(".remove-btn").addEventListener("click", () => el.remove());
  $("#task-list").append(el);
  el.querySelector(".task-name").focus();
  localize();
}

function collectIndicatorResponses() {
  const responses = {};
  for (const row of document.querySelectorAll("[data-indicator]")) {
    const id = row.dataset.indicator;
    const num = row.querySelector(".num").value.trim();
    const den = row.querySelector(".den").value.trim();
    if (!num && !den) continue;
    if (!num || !den) {
      throw new Error(id + ": enter both numerator and denominator, or leave both blank if unknown.");
    }
    responses[id] = {
      numerator: Number(num), denominator: Number(den),
      evidence: row.querySelector(".evidence-input").value
    };
  }
  return responses;
}

function collectTasks() {
  return [...document.querySelectorAll("[data-task]")].map(row => {
    const gateStates = Object.fromEntries([...row.querySelectorAll("[data-gate]")].map(select => [
      select.dataset.gate, select.value
    ]));
    const hours = row.querySelector(".task-hours").value.trim();
    return {
      name: row.querySelector(".task-name").value.trim(),
      eligibility: row.querySelector(".task-eligibility").value,
      exclusionReason: row.querySelector(".task-reason").value.trim(),
      risk: row.querySelector(".task-risk").value,
      trial: row.querySelector(".task-trial").value,
      hours: hours === "" ? null : Number(hours),
      gates: gateStates
    };
  });
}

function activityLines(coverage) {
  if (!coverage.activities.length) return '<p class="muted">No activities added. Ready Coverage cannot be calculated.</p>';
  const status = {
    pilot_ready: "Passed trial · pilot-ready (routine risk)",
    preflight_complete: "All preflight checks met · trial pending",
    blocked: "Known blocking conditions",
    unverified: "Necessary conditions not verified",
    trial_failed: "Representative trial failed",
    needs_specialist_review: "High-risk · specialist review required",
    out_of_scope: "Not included in eligible activity denominator"
  };
  return coverage.activities.map(activity =>
    '<div class="outcome"><span>' + esc(activity.name) + '</span>' +
    '<span class="muted">' + esc(status[activity.status]) + '</span></div>'
  ).join("");
}

function nextActions(coverage) {
  const byId = Object.fromEntries(gates.gates.map(g => [g.id, g]));
  const singleFix = Object.entries(coverage.unlock).filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (singleFix.length) {
    return singleFix.map(([id, count]) =>
      '<div class="outcome"><span><strong>' + esc(byId[id].title_en) +
      '</strong><span class="muted">' + esc(byId[id].action_en) +
      '</span></span><span>' + count + ' potential trial unlock(s)</span></div>'
    ).join("");
  }
  const failed = Object.entries(coverage.gateCounts).filter(([, s]) => s.fail > 0)
    .sort((a, b) => b[1].fail - a[1].fail);
  const unknown = Object.entries(coverage.gateCounts).filter(([, s]) => s.unknown > 0)
    .sort((a, b) => b[1].unknown - a[1].unknown);
  const entries = failed.length ? failed : unknown;
  const countField = failed.length ? "fail" : "unknown";
  return entries.slice(0, 3).map(([id, counts]) =>
    '<div class="outcome"><span><strong>' + esc(byId[id].title_en) +
    '</strong><span class="muted">' + esc(byId[id].action_en) +
    '</span></span><span>' + counts[countField] +
    (failed.length ? ' failed check(s)' : ' unverified check(s)') + '</span></div>'
  ).join("") || '<p class="muted">No one-change unlock identified. Verify missing conditions or conduct a representative trial.</p>';
}

function renderReport(capability, coverage) {
  const entityType = subjectNames[$("#subject").value] || "Other entity";
  const score = capability.reportable ? capability.readyScore.toFixed(1) : "—";
  const coverageText = coverage.readyCoverage === null ? "—" : coverage.readyCoverage.toFixed(1) + "%";
  const domainLabels = Object.fromEntries(registry.domains.map(d => [d.id, d.title_en]));
  $("#results").innerHTML =
    '<div class="report-head"><span class="section-tag">YOUR READYGAP REPORT · V0.1</span>' +
      '<h2>' + esc(entityType) + ' · AI Readiness Profile</h2>' +
      '<div class="results-cards">' +
        '<div class="metric-result"><small>ReadyScore · Entity capability</small>' +
          '<div class="huge">' + score + '</div>' +
          '<p>' + (capability.reportable ? 'Experimental 0–100 score, not a global percentile' :
          'Insufficient information for a composite score') + '</p></div>' +
        '<div class="metric-result"><small>Ready Coverage · Pilot readiness</small>' +
          '<div class="huge">' + coverageText + '</div><p>' +
          coverage.confirmedReady + ' of ' + coverage.eligible +
          ' eligible activities passed all checks and a representative trial</p></div>' +
      '</div></div>' +
    '<div class="result-panel"><h3>Six-domain capability profile</h3>' +
      capability.domains.map(d =>
        '<div class="bar-row"><span>' + esc(domainLabels[d.id] || d.id) + '</span>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + (d.value ?? 0) + '%"></div></div>' +
        '<strong>' + (d.value === null ? "Unknown" : d.value.toFixed(1)) + '</strong></div>'
      ).join("") +
      '<p class="note">Scored ' + capability.scoredCount + '/12 · Unknown ' + capability.unknownCount +
      ' · N/A ' + capability.notApplicableCount + '. Evidence: self-reported ' +
      capability.evidence.self_report + ', documented (self-reported) ' + capability.evidence.documented +
      ', observed (self-reported) ' + capability.evidence.observed +
      '. Evidence is not independently verified by this website.</p>' +
      capability.reasons.map(reason => '<div class="alert">' + esc(reason) + '</div>').join("") +
    '</div>' +
    '<div class="result-panel"><h3>Workflow coverage and constraints</h3>' +
      activityLines(coverage) +
      '<p class="note">Eligible ' + coverage.eligible + ' · Ineligible ' + coverage.ineligible +
      ' · Eligibility unknown ' + coverage.unknownEligibility + ' · High risk ' + coverage.highRisk +
      (coverage.effortCoverage === null ? "" :
        ' · Hours-weighted coverage ' + coverage.effortCoverage.toFixed(1) + '%') + '.</p>' +
      coverage.reasons.map(reason => '<div class="alert">' + esc(reason) + '</div>').join("") +
    '</div>' +
    '<div class="result-panel"><h3>Unlock Next · Recommended next actions</h3>' +
      nextActions(coverage) +
      '<p class="note">An unlock only means the last known pre-trial blocker may be removed. ' +
      'It does not imply a successful trial. Outcomes, risks, and implementation costs are not included.</p></div>' +
    '<button type="button" id="share-results" class="share-btn">Copy aggregate summary (no activity names) ↗</button>';

  lastReport={capability,coverage};
  shareText=summaryText(capability,coverage,$("#subject").selectedOptions[0].textContent);

  $("#share-results").addEventListener("click", async event => {
    try {
      await navigator.clipboard.writeText(shareText);
      event.currentTarget.textContent = "Summary copied ✓";
      localize();
    } catch {
      event.currentTarget.textContent = "Clipboard unavailable. Use HTTPS or localhost.";
      localize();
    }
  });
  localize();
  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function initialize() {
  for(const btn of document.querySelectorAll("[data-language]")){
    btn.addEventListener("click",()=>changeLanguage(btn.dataset.language));
  }
  localize();
  try {
    const responses = await Promise.all([
      fetch("../../items/indicators.json"), fetch("../../items/gates.json")
    ]);
    if (!responses.every(r => r.ok)) throw new Error("Unable to load the assessment definitions");
    [registry, gates] = await Promise.all(responses.map(r => r.json()));
    // Prevent a silent mixed-language form when English contract fields are unavailable.
    for (const item of registry.indicators) {
      for (const field of ["title_en", "what_en", "why_en", "numerator_en",
        "denominator_en", "evidence_en", "action_en", "caveat_en"]) {
        if (!item[field]) throw new Error("Missing English indicator field: " + item.id + "." + field);
      }
    }
    for (const gate of gates.gates) {
      if (!gate.title_en || !gate.requirement_en || !gate.action_en) {
        throw new Error("Incomplete English gate definition: " + gate.id);
      }
    }
    renderIndicators();
    $("#add-task").addEventListener("click", addTask);
    $("#assessment").addEventListener("submit", event => {
      event.preventDefault();
      try {
        renderReport(scoreIndicators(registry, collectIndicatorResponses()),
          scoreTasks(collectTasks(), gates));
      } catch (error) {
        $("#results").innerHTML = '<div class="error">Please check your inputs: ' +
          esc(error.message) + '</div>';
        localize();
        $("#results").scrollIntoView({ behavior: "smooth" });
      }
    });
  } catch (error) {
    $("#indicator-list").innerHTML =
      '<div class="error">Could not load the assessment: ' + esc(error.message) +
      '. Serve this site over HTTP rather than opening file://.</div>';
    localize();
  }
}
initialize();
