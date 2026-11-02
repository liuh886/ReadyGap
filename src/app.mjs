import { scoreIndicators, scoreTasks } from "./scoring.mjs";

const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
})[c]);
const format = value => value === null ? "—" : String(value);
let indicators, gates;
let nextTaskId = 0;
let aggregateShare = "";

const evidenceOptions = [
  ["self_report","自报"],
  ["documented","文件支持（自报）"],
  ["observed","演示/观察（自报）"]
];
const gateOptions = [["unknown","未核实"],["pass","满足"],["fail","缺失"]];

function selectOptions(options) {
  return options.map(([value,label]) => '<option value="' + escapeHTML(value) +
    '">' + escapeHTML(label) + '</option>').join("");
}
function renderIndicators() {
  $("#indicator-list").innerHTML = indicators.domains.map(domain => {
    const items = indicators.indicators.filter(item => item.domain_id === domain.id);
    return '<div class="domain"><div class="domain-title"><h3>' +
      escapeHTML(domain.id + " · " + domain.title_zh) +
      '</h3><span>' + escapeHTML(domain.title_en) + '</span></div>' +
      items.map(item => '<div class="indicator" data-indicator="' + escapeHTML(item.id) + '">' +
        '<div class="indicator-text"><strong>' + escapeHTML(item.id + " · " + item.title_zh) +
        '</strong><p>' + escapeHTML(item.what) + '</p><details><summary>查看定义、证据和行动</summary>' +
        '<p><b>为什么：</b>' + escapeHTML(item.why) + '</p>' +
        '<p><b>分子：</b>' + escapeHTML(item.numerator) + '</p>' +
        '<p><b>分母：</b>' + escapeHTML(item.denominator) + '</p>' +
        '<p><b>证据：</b>' + escapeHTML(item.evidence) + '</p>' +
        '<p><b>可改进：</b>' + escapeHTML(item.action) + '</p>' +
        '<p><b>限制：</b>' + escapeHTML(item.caveat) + '</p></details></div>' +
        '<label class="num-label">满足数（分子）<input class="num" type="number" min="0" step="1" inputmode="numeric" placeholder="未知则留空" aria-label="' + item.id + ' 分子"/></label>' +
        '<label class="num-label">适用总数（分母）<input class="den" type="number" min="0" step="1" inputmode="numeric" placeholder="0 = 不适用" aria-label="' + item.id + ' 分母"/></label>' +
        '<label class="num-label evidence">依据类型<select class="evidence-input" aria-label="' + item.id +
        ' 证据类型">' + selectOptions(evidenceOptions) + '</select></label></div>').join("") +
      '</div>';
  }).join("");
}

function addTask() {
  const id = ++nextTaskId;
  const el = document.createElement("section");
  el.className = "task-card";
  el.dataset.task = String(id);
  const controls = gates.gates.map(g =>
    '<div class="gate-row"><label for="gate-' + id + "-" + g.id + '" title="' + escapeHTML(g.requirement_zh) + '">' +
    escapeHTML(g.title_zh) + '</label><select id="gate-' + id + "-" + g.id +
    '" data-gate="' + g.id + '">' + selectOptions(gateOptions) + '</select></div>'
  ).join("");
  el.innerHTML = '<div class="task-top">' +
    '<label>活动名称<input class="task-name" placeholder="例如：每周项目技术报告" maxlength="120"/></label>' +
    '<label>AI 适用性<select class="task-eligibility"><option value="unknown">尚未筛选</option><option value="eligible">适合评估</option><option value="ineligible">不适用 AI</option></select></label>' +
    '<label>风险类别<select class="task-risk"><option value="routine">常规</option><option value="high">高风险/受监管</option></select></label>' +
    '</div><div class="task-meta"><label>每月工时（可选）<input class="task-hours" type="number" min="0" step="0.1" placeholder="小时"/></label>' +
    '<label class="exclusion">不适用原因（若排除）<input class="task-reason" placeholder="请说明"/></label>' +
    '<label>评估周期<span class="muted">最近 30 天</span></label></div>' +
    '<div class="gate-grid">' + controls + '</div>' +
    '<div class="task-footer"><label>代表性试运行<select class="task-trial"><option value="untested">尚未验证</option><option value="passed">通过</option><option value="failed">未通过</option></select></label>' +
    '<button type="button" class="remove-btn">移除活动</button></div>';
  el.querySelector(".remove-btn").addEventListener("click", () => el.remove());
  $("#task-list").append(el);
  el.querySelector(".task-name").focus();
}

function collectAnswers() {
  const answers = {};
  for (const row of document.querySelectorAll("[data-indicator]")) {
    const id = row.dataset.indicator;
    const num = row.querySelector(".num").value.trim();
    const den = row.querySelector(".den").value.trim();
    if (num === "" && den === "") continue;
    if (num === "" || den === "") throw new Error(id + "：分子和分母必须同时填写；未知请两项都留空。");
    answers[id] = {
      numerator: Number(num), denominator: Number(den),
      evidence: row.querySelector(".evidence-input").value
    };
  }
  return answers;
}

function collectTasks() {
  return Array.from(document.querySelectorAll("[data-task]")).map(el => {
    const gs = Object.fromEntries(Array.from(el.querySelectorAll("[data-gate]")).map(select => [
      select.dataset.gate, select.value
    ]));
    const hours = el.querySelector(".task-hours").value.trim();
    return {
      name: el.querySelector(".task-name").value.trim(),
      eligibility: el.querySelector(".task-eligibility").value,
      risk: el.querySelector(".task-risk").value,
      exclusionReason: el.querySelector(".task-reason").value.trim(),
      hours: hours === "" ? null : Number(hours),
      trial: el.querySelector(".task-trial").value, gates: gs
    };
  });
}

function describeTasks(coverage) {
  if (!coverage.activities.length) return '<p class="muted">尚未添加实际活动，任务覆盖率无法计算。</p>';
  const labels = {
    pilot_ready:"通过试运行 · 已确认试点准备",
    preflight_complete:"必要条件具备 · 待试运行",
    blocked:"存在阻断条件",
    unverified:"必要条件尚未核实",
    trial_failed:"试运行未通过",
    needs_specialist_review:"高风险 · 需要专门审核",
    out_of_scope:"未计入适用活动分母"
  };
  return coverage.activities.map(t =>
    '<div class="outcome"><span>' + escapeHTML(t.name) +
    '</span><span class="muted">' + escapeHTML(labels[t.status]) + '</span></div>'
  ).join("");
}

function actionItems(coverage) {
  const meta = Object.fromEntries(gates.gates.map(g => [g.id,g]));
  const sorted = Object.entries(coverage.unlock).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]);
  const lines = [];
  for (const [id,n] of sorted.slice(0,3)) {
    lines.push('<div class="outcome"><span><strong>' + escapeHTML(meta[id].title_zh) +
      '</strong><br><span class="muted">' + escapeHTML(meta[id].action_zh) +
      '</span></span><span>' + n + ' 项可进入试运行准备</span></div>');
  }
  if (!lines.length) {
    const failed = Object.entries(coverage.gateCounts).filter(([,s])=>s.fail>0).sort((a,b)=>b[1].fail-a[1].fail);
    const unknown = Object.entries(coverage.gateCounts).filter(([,s])=>s.unknown>0).sort((a,b)=>b[1].unknown-a[1].unknown);
    const src = failed.length ? failed : unknown;
    for (const [id,counts] of src.slice(0,3)) {
      const noun = failed.length ? "缺失" : "未核实";
      const n = failed.length ? counts.fail : counts.unknown;
      lines.push('<div class="outcome"><span><strong>' + escapeHTML(meta[id].title_zh) +
        '</strong><br><span class="muted">' + escapeHTML(meta[id].action_zh) +
        '</span></span><span>' + n + ' 项' + noun + '</span></div>');
    }
  }
  return lines.join("") || '<p class="muted">尚没有可量化的单项解锁机会；先补齐证据或开展试运行。</p>';
}

function renderReport(capability, coverage) {
  const subjectName = $("#subject").selectedOptions[0].textContent;
  const score = capability.reportable ? capability.readyScore.toFixed(1) : "—";
  const cov = coverage.readyCoverage === null ? "—" : coverage.readyCoverage.toFixed(1) + "%";
  const html = '<div class="report-head"><span class="section-tag">YOUR READYGAP REPORT · V0.1</span>' +
    '<h2>' + escapeHTML(subjectName) + ' · AI 就绪度画像</h2>' +
    '<div class="results-cards"><div class="metric-result"><small>ReadyScore · 主体能力</small><div class="huge">' +
    score + '</div><p>' + (capability.reportable ? '实验性 0–100 分，非全球百分位' : '信息不足，暂不计算综合分数') + '</p></div>' +
    '<div class="metric-result"><small>Ready Coverage · 试点准备</small><div class="huge">' + cov +
    '</div><p>已确认 ' + coverage.confirmedReady + ' / ' + coverage.eligible + ' 项适用活动通过全部条件与试运行</p></div></div></div>' +
    '<div class="result-panel"><h3>六维能力画像</h3>' +
    capability.domains.map(d => '<div class="bar-row"><span>' + escapeHTML(d.title_zh) +
    '</span><div class="bar-track"><div class="bar-fill" style="width:' + (d.value ?? 0) +
    '%"></div></div><strong>' + (d.value === null ? '未知' : d.value.toFixed(1)) + '</strong></div>').join("") +
    '<p class="note">已计分 ' + capability.scoredCount + '/12；未知 ' + capability.unknownCount +
    '；不适用 ' + capability.notApplicableCount + '。证据自报 ' + capability.evidence.self_report +
    '、文件支持（自报） ' + capability.evidence.documented + '、观察演示（自报） ' +
    capability.evidence.observed + '。这些证据未经平台独立核验。</p>' +
    capability.reasons.map(x=>'<div class="alert">' + escapeHTML(x) + '</div>').join("") + '</div>' +
    '<div class="result-panel"><h3>任务覆盖与已知约束</h3>' +
    describeTasks(coverage) +
    '<p class="note">适用 ' + coverage.eligible + ' 项 · 不适用 ' + coverage.ineligible +
    ' 项 · 适用性未知 ' + coverage.unknownEligibility + ' 项 · 高风险 ' + coverage.highRisk +
    ' 项' + (coverage.effortCoverage===null ? '' : ' · 按月工时加权覆盖率 ' + coverage.effortCoverage.toFixed(1) + '%') + '。</p>' +
    coverage.reasons.map(x=>'<div class="alert">' + escapeHTML(x) + '</div>').join("") +
    '</div><div class="result-panel"><h3>Unlock Next · 下一步行动</h3>' +
    actionItems(coverage) +
    '<p class="note">“解锁”指修复最后一项已知阻断条件后可以进入试运行，不等于试运行成功。实际收益、风险与实施成本不在本次评分内。</p></div>' +
    '<button type="button" id="share-results" class="share-btn">复制不含业务名称的结果摘要 ↗</button>';
  $("#results").innerHTML = html;
  aggregateShare = [
    "ReadyGap · Experimental v0.1",
    "Subject: " + subjectName,
    "ReadyScore: " + (capability.reportable ? score + "/100" : "Not reportable"),
    "Ready Coverage: " + (coverage.readyCoverage === null ? "Not reportable" : cov),
    "Eligible activities: " + coverage.eligible,
    "Confirmed pilot-ready: " + coverage.confirmedReady,
    "Self-reported; unvalidated; no certification or global percentile.",
    "https://github.com/liuh886/ReadyGap"
  ].join("\n");
  $("#share-results").addEventListener("click", async event => {
    try {
      await navigator.clipboard.writeText(aggregateShare);
      event.currentTarget.textContent = "已复制摘要 ✓";
    } catch {
      event.currentTarget.textContent = "当前浏览器不支持复制，请使用安全上下文（HTTPS / localhost）";
    }
  });
  $("#results").scrollIntoView({behavior:"smooth",block:"start"});
}

async function start() {
  try {
    const r=await Promise.all([fetch("./data/indicators.json"),fetch("./data/gates.json")]);
    if (!r.every(x=>x.ok)) throw new Error("Failed to load local definitions");
    [indicators,gates]=await Promise.all(r.map(x=>x.json()));
    renderIndicators();
    $("#add-task").addEventListener("click",addTask);
    $("#assessment").addEventListener("submit", e => {
      e.preventDefault();
      try {
        const cap=scoreIndicators(indicators,collectAnswers());
        const cov=scoreTasks(collectTasks(),gates);
        renderReport(cap,cov);
      } catch(err) {
        $("#results").innerHTML='<div class="error">输入未通过校验：'+escapeHTML(err.message)+'</div>';
        $("#results").scrollIntoView({behavior:"smooth"});
      }
    });
  } catch(err) {
    $("#indicator-list").innerHTML='<div class="error">无法载入本地量表：' +
      escapeHTML(err.message) + '。请通过本地 HTTP 服务启动站点，而不是直接打开 file:// 文件。</div>';
  }
}
start();
