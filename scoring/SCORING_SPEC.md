# Scoring Specification — ReadyGap v0.1 (experimental)

**Construct:** [Measurement Model](../framework/MEASUREMENT_MODEL.md) · **Items:** [Indicator Register](../items/INDICATOR_REGISTER.md). The scoring engine cannot access the UI or invented benchmark data.

**All arithmetic is implemented in `scoring/engine.mjs`; the app and tests call the same functions.** No reference population, calibrated thresholds or external model capability score exists.

## A. ReadyScore — entity-level inventory

Each indicator takes `numerator` (count satisfying its published criterion) and `denominator` (count to which criterion applies) in the same **30-day** window. Require nonnegative integers, `0 ≤ numerator ≤ denominator`. Blank = **unknown**. `denominator=0, numerator=0` = **not applicable**, not zero points.

Indicator value, if denominator > 0:

```
I_j = 100 × numerator_j / denominator_j
D_d = arithmetic mean of applicable I_j within domain d
ReadyScore = arithmetic mean of six reportable D_d
```

All domains must have ≥1 applicable indicator; ≥9/12 indicators must be scored (positive denominator). Otherwise show **insufficient evidence / no ReadyScore**. Counts alone do not prove independent verification. Record evidence state per item (`self_report`, `documented`, `observed`) separately; it does **not** multiply or alter the score.

Equal weighting is a simple, auditable **hypothesis** pending sensitivity and validation studies. Percentages describe the supplied scope, not a universal latent trait or international percentile. A 100% score does not guarantee every activity is AI-safe.

**Important:** indicators and gate checks are entered **separately**, not inferred from one another. Overlap may exist in the underlying concepts. Statistical discriminant validity is unproven.

## B. Ready Coverage — activity-level sample

For each activity record: name, monthly hours, AI eligibility (`eligible`, `ineligible`, `unknown`), risk (`routine`, `high`), six gate states (`pass`, `fail`, `unknown`) and trial state (`passed`, `failed`, `untested`).

Six **necessary gates**: objective, context, tool/authorization, handoff, verification, oversight/recovery. An activity is **confirmed pilot-ready** only if:

- AI eligibility = eligible; risk = routine (high-risk needs separate specialist validation);
- all six necessary conditions are `pass`;
- a representative end-to-end **trial** is `passed`.

Unknown ≠ fail ≠ not applicable. Failed conditions require repair; unknown conditions require evidence. Ineligible tasks are excluded from the denominator with reason; unknown eligibility is disclosed and not silently counted as ineligible. High-risk eligible tasks remain in the coverage denominator but never receive an automatic "pilot ready" label in v0.1.

```
Ready Coverage (%) = 100 × count(confirmed pilot-ready activities)
                       / count(screened eligible activities)
```

If no eligible activities, coverage = **not reportable**, never 0%. Report eligible N, ineligible N, unknown-eligibility N and sample warnings. If eligible count <3, use provisional small-sample label; do not infer prevalence. Optional effort-weighted coverage: total monthly hours of confirmed-ready eligible activities / total monthly hours of eligible activities with valid, strictly positive hours, only when all eligible task weights are supplied.

A task lacking a trial is **preflight-complete** if all gates pass, but **not confirmed pilot-ready**. This separation prevents an untested checklist from masquerading as deployment proof.

## C. Bottlenecks, one-change unlocks, outcomes

Aggregate failed and unknown gates among eligible not-yet-ready tasks. Present **failed** and **unverified** separately.

`oneChangeUnlock(g)` counts eligible routine tasks with **exactly one gate not passed**, that gate failed (not unknown), and the other five passed. It means fixing `g` would make the task **eligible for a trial**, not necessarily trial-successful or ready. Never increase Ready Coverage until a trial actually passes. The preview cannot rank implementation cost, risk or benefit.

**Outcomes are separate:** net minutes saved after review/maintenance, error rate, risk incidents and monetary value are not included in either readiness index. A task's estimated gross automation saving is not an observed outcome.

## D. Illustrative scenario

Four eligible tasks, four of five hypothetical checks passed each: average condition pass-rate 80%, but **0% Coverage** when no task has all requirements and a passed trial. That 80% is *not ReadyScore*; the latter is computed exclusively from its 12 separately entered entity-level indicators.

## E. Data quality and security

Validation rejects negative or fractional counts, numerator > denominator, invalid enumeration values and nonfinite hours. Blank counts remain unknown; do not silently cast to 0. Out-of-scope/invalid entries stop evaluation and surface an error. The website stores no persistent records and does not claim server-side evidence verification. A user may share only the aggregate copied summary.
