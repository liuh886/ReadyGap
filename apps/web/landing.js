// ReadyGap homepage: intentionally no analytics, network calls or scoring logic.
// This is a conceptual interactive explainer, not a readiness measurement.
const choices = {
  context: { title: "CONTEXT ACCESS", message: "Create an authorized, traceable knowledge source so the AI can access the context required for the task." },
  tools: { title: "TOOL & SYSTEM ACCESS", message: "Provide a minimally privileged, auditable system interface—or an explicit human handoff for the next action." },
  control: { title: "VERIFICATION & CONTROL", message: "Define executable acceptance checks, human oversight, and recovery paths before conducting a representative trial." }
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
