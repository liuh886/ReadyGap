# Assessment Design Principles / 评估设计原则

**Authority:** [THESIS.md](THESIS.md) sets the why; [MEASUREMENT_MODEL.md](MEASUREMENT_MODEL.md) defines the measured construct. [Indicator Register](../items/INDICATOR_REGISTER.md) defines the actual candidate items. [Scoring Specification](../scoring/SCORING_SPEC.md) defines calculation rules.

## 1. From activity to decision

1. Define the **entity**, activities in scope and period before answering questions.
2. Screen the activities for **AI suitability** and record unknown or excluded cases.
3. Use entity-level observations to calculate a tentative capability profile (**ReadyScore**).
4. Independently assess **necessary activity conditions**, risk and trial result for **Ready Coverage**.
5. Explain missing vs failed gates and identify changes that could unlock a representative trial.
6. Re-assess the same scope after an intervention; collect *realized outcomes* separately.

This workflow is not a mere "AI usage survey"; prior AI use is never a substitute for readiness.

## 2. Five tests for every proposed indicator

| Test | Required answer | Rejection condition |
| --- | --- | --- |
| What? | Precise construct, unit and scope | Pure attitude without observable meaning |
| Why? | Explicit constraint on useful AI activity | Redundant proxy for software spending |
| Quantifiable? | Numerator, denominator, period and validity | No defensible, stable denominator |
| Verifiable? | Traceable artifact, observed test, or honest self-report label | Fake precision / unverifiable claims |
| Actionable? | Controllable fix tied to actual activity | Generic "improve AI culture" advice |

The checklist is a **design discipline**, not proof of construct or criterion validity.

## 3. Denominator integrity

- Inventory relevant activity families before observing which already use AI.
- Do not select only recent success stories.
- Record sampling criteria, AI eligibility and reasons for exclusion.
- The *same reference period and scope* should be used at follow-up or differences must be labeled as non-comparable.
- Prefer a second coverage statistic weighted by documented work hours **when complete**, but keep low-volume high-risk activities visible.

For a natural person without corporate processes, adapt evidence (personal notes, tracked tasks, manual handoffs). Do not penalize for lacking a board, centralized IT or complex formal governance when these are not needed.

## 4. Avoid double counting and construct leakage

Capability indicators and activity gate outcomes are collected in separate input structures. This does not eliminate conceptual overlap; validation must test whether the two indices add independent predictive information. Post-adoption savings or ROI must **never** enter the readiness numerator.

## 5. Minimum viable constraints before autonomy

An AI agent is used as a hypothetical stress test: *which entity-controlled conditions would block it?* The method never assumes that advanced autonomous behavior is necessary, beneficial or safe for every activity.

Safety gates, authorization, verifiability and human recovery are non-compensatory. High-risk settings require extra domain-specific review; v0.1 cannot certify them.

## 6. A good result is a better next action

"Improve data maturity" is not sufficient advice. Prefer:

- **Known blocker:** "Project reports are inaccessible to the approved tool; create a permissioned read-only indexed source."
- **One-change test opportunity:** "After source authorization, this routine task has no other known preflight blocker; run an end-to-end trial and measure errors."
- **Feedback check:** "Did access improve? Did the trial pass? Did net time/quality improve?"

Prioritization should eventually incorporate expected value, remediation cost, risk and confidence; don't invent a numerical ROI by multiplying arbitrary questionnaire scores.

## 7. Fairness, humility, learning

The universal *concept* does not guarantee that person vs company scores are statistically comparable. Scores are experimental until validated across entity types and languages. Publish changes to the construct, items and scoring version; no global percentile without verified representative data.
