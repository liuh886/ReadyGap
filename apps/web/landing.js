// ReadyGap homepage: intentionally no analytics, network calls or scoring logic.
// This is a conceptual interactive explainer, not a readiness measurement.
const choices = {
  context: { title: "CONTEXT ACCESS", message: "建立经过授权、可追溯的任务知识入口，让 AI 获得完成工作所需的真实背景。" },
  tools: { title: "TOOL & SYSTEM ACCESS", message: "提供最小授权、可审计的系统接口，或者明确的人工作业交接路径。" },
  control: { title: "VERIFICATION & CONTROL", message: "设定可执行的验收标准、人工审核与错误恢复路径，再进行代表性试运行。" }
};
const buttons = document.querySelectorAll("[data-scenario]");
const label = document.getElementById("scenario-label");
const insight = document.getElementById("scenario-insight");
if (label && insight) {
  buttons.forEach(button => button.addEventListener("click", () => {
    const candidate = choices[button.dataset.scenario];
    if (!candidate) return;
    buttons.forEach(b => b.setAttribute("aria-pressed", String(b === button)));
    label.textContent = candidate.title;
    insight.textContent = candidate.message;
  }));
}
