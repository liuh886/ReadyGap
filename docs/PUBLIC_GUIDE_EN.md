# ReadyGap — Public Guide (English)

**ReadyGap** is an experimental, open-source way to assess how prepared an individual, team, department, or organization is to use available AI effectively. It measures the **adopting entity**, not the model's intelligence.

> **AI is getting smarter. Are we getting readier?**

## Why ReadyGap exists

Foundation-model benchmarks show how model capabilities advance, but a stronger model does not make internal knowledge accessible, clarify responsibilities, authorize system actions, or establish reliable verification by itself.

**Core research proposition:** As foundation models become more capable and accessible, the adopting entity's ability to absorb, operationalize, and govern AI becomes a critical factor in realizing value.

**Three different concepts:** AI Readiness ≠ AI Adoption ≠ AI Value Realization.

- **Readiness:** capabilities and operating conditions that make AI integration possible.
- **Adoption:** whether AI is actually used, regardless of reliability or realized benefit.
- **Value realization:** observed net changes in time, quality, cost, risk, or mission outcomes.

The most useful diagnostic question is: **If a sufficiently capable AI system were available today, what could this entity appropriately allow it to do, and where would its real workflow break?** This is a thought experiment, not an argument for universal autonomous automation.

## What the two ReadyGap measures mean

**ReadyScore (0–100):** a provisional descriptive composite of six entity-capability domains using twelve count-based indicators. Each indicator has a numerator, denominator, 30-day reference period, and declared evidence state. A score is withheld when coverage is too sparse.

**Ready Coverage (0–100%):** the share of screened, AI-eligible activities with all six necessary workflow checks passed **and** a representative trial passed. High-risk activities require separate specialist review; an untested task is not counted as pilot-ready.

These two measures have different units of analysis. Neither includes realized ROI or constitutes a professional safety certification. Currently, the assessment is self-reported, experimental, and **not** a validated global ranking.

## The six capability domains

1. **Scope & Intent** — clear objectives, acceptance criteria, and baseline measurement.
2. **Context & Knowledge** — authorized, reliable access to relevant task information.
3. **Access & Operability** — approved AI tools and controlled action/handoff paths.
4. **Integration & Coordination** — clear human–AI roles and repeatable workflows.
5. **Quality & Control** — executable evaluation and reliable oversight/recovery.
6. **Adaptation & Learning** — feedback collection and accountable improvement.

## Unexpected signals worth exploring

These are **experimental research candidates, not additional ReadyScore inputs**:

- **Context Reconstruction Cost:** human time spent explaining and assembling task context before an acceptable AI result.
- **Human Rescue Rate:** proportion of AI attempts requiring *unplanned* intervention. Planned safety checks are not failures.
- **Cold-start Transfer:** can a new operator use the same knowledge and model to complete the task?
- **Model Upgrade Capture:** how much of a model improvement appears in the same real-world workflow? This is a model × workflow interaction, not a pure entity score.
- **Recovery Cost:** how much additional effort is needed to detect, correct, and recover from errors?

A good indicator must answer five questions: **What does it measure? Why does it matter? How is it quantified? How can it be checked? What actionable improvement does it suggest?**

## Interpreting your results

Your numerical output applies to **the activities, reference period, scope, and evidence you entered**. Avoid cherry-picking only AI-success cases. If an item is unknown, leave both count fields blank. Use 0/0 only when the criterion does not apply. More AI spending and higher tool complexity do not necessarily mean better readiness; readiness should match the value and risk of the work.

Readiness is a research hypothesis and a decision aid, not a certification. We will evaluate whether task-centered assessment predicts future reliable AI adoption and helps choose better interventions than simpler checklists. We will change the method if evidence contradicts it.

## Project

- [ReadyGap website](https://liuh886.github.io/ReadyGap/)
- [Try the experimental assessment](https://liuh886.github.io/ReadyGap/apps/web/assessment.html)
- [Open-source repository](https://github.com/liuh886/ReadyGap)
- [Technical scoring specification](https://github.com/liuh886/ReadyGap/blob/main/scoring/SCORING_SPEC.md)
- [Validation plan](https://github.com/liuh886/ReadyGap/blob/main/validation/VALIDATION_PLAN.md)

**License:** MIT. **Data:** This prototype runs its assessment entirely in your browser and does not require an account, upload responses, or run analytics.
