# Measurement Model — Construct First

**Governing argument:** [THESIS.md](THESIS.md) · **Design contract:** [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md).

The assessment begins with **the adopting entity's actual activities**, not a catalogue of how much AI it purchases. The strong-Agent question—*what could an adequately capable agent do, and where would this entity block it?*—is a **diagnostic stress test**, not a recommendation for unrestricted autonomous execution.

**AI Adoption ≠ AI Readiness ≠ AI Value Realization.** Model capability and entity capability are different **intervention levers**, not statistically independent variables by definition. The index targets the latter and evaluates actual outcomes separately.

**Fit for purpose:** the highest score is not necessarily the right goal. Excessive tools, bureaucracy, autonomy or data infrastructure can cost more than the task warrants.

## 1. Construct definition

**Entity AI Readiness** is the degree to which a defined person or coordinated actor has **accessible capabilities, context, operating arrangements, safeguards and capacity to learn** that are necessary for **effective, responsible integration** of *available* AI into its **own eligible activities**.

This is **not** the intelligence of the foundation model, the number of AI subscriptions, current usage frequency, financial return, or an assurance of safe autonomy.

The relevant causal hypothesis is:

**AI capability frontier + entity capability + task opportunity/constraints → operational use → realized outcomes.**

The relation is not assumed linear or causal just because an index is computed. Readiness precedes outcomes in the intended model; actual efficiency/financial performance must be measured separately.

## 2. Measurement units — do not conflate

**Entity capability indicators:** twelve scoped proportions in six domains. Numerators are *capability evidence* drawn from a defined inventory and observation window. They do not reuse the task gate submission data in code.

**Activity-level necessary conditions:** six specific yes/no/unknown checks per activity plus trial status, eligibility and risk; used solely for Ready Coverage and bottleneck analysis.

The two measurements are related conceptually and may correlate. No assertion of statistical independence is made. We prohibit *mechanical* reuse of the same variable for both published numbers.

## 3. Six formative capability domains

| Domain | Definition | Why not redundant |
| --- | --- | --- |
| D1 Scope & Intent | Activities have bounded objectives, acceptance criteria and baselines | Without an observable target, relevance/benefit cannot be tested |
| D2 Context & Knowledge | Required information is accessible, authorized, attributable and current | Even strong reasoning cannot compensate for unusable context |
| D3 Access & Operability | AI and appropriate interfaces or handoffs can be used lawfully and practically | Buying a license alone does not create functional access |
| D4 Integration & Coordination | Human/AI roles and repeatable workflow are specified | Local success does not imply reliable end-to-end operation |
| D5 Quality & Control | Output quality can be evaluated and oversight/recovery arranged | Failure must be detectable, governable and reversible |
| D6 Adaptation & Learning | Outcomes can be monitored and corrective actions owned | One-time trials do not show continuing capability |

These are **provisional formative dimensions**, not empirically demonstrated factors. High internal consistency is not a prerequisite for a composite of heterogeneous necessary capabilities.

## 4. The five-question indicator design contract

Related candidate items: [Indicator Register](../items/INDICATOR_REGISTER.md). Score arithmetic is defined separately in the [Scoring Specification](../scoring/SCORING_SPEC.md).

Every indicator must document:

1. **What?** A precise observable capability and unit of analysis.
2. **Why?** Which required mechanism would be missing without this capability?
3. **How numeric?** A defensible numerator, denominator, window, eligibility and range.
4. **How verified?** Evidence artefact, observation level, confidence and falsification case.
5. **What action?** A specific controllable change that should move the numerator without manipulating the denominator.

An indicator is rejected if there is no actionable lever, if it primarily measures already realized AI value, or if it is trivially inflated by purchasing tools or selectively shrinking scope.

## 5. Distinguish prediction from measurement

**Descriptive validity:** an indicator accurately describes a condition.

**Construct validity:** those conditions actually capture a meaningful AI readiness construct across entity types.

**Criterion/predictive validity:** a higher early readiness score predicts later task deployment success, after accounting for baseline digital maturity, task difficulty, entity type, and AI adoption.

The latter two are research questions, **not claims of this prototype**.

## 6. Comparability and versioning

- Identical 0–100 scales do **not** make persons and corporations statistically interchangeable.
- Use universal functional definitions but entity-specific evidence examples.
- Preserve numerator, denominator, missingness, task selection and date to reproduce scores.
- Do not publish relative percentiles or a league table until sampling, differential item functioning, measurement invariance and scale linking have been investigated.
- Freeze item versions and maintain bridging items on future revisions; do not silently reinterpret historic scores.
- A ReadyScore with one domain entirely absent is **not reportable**. A small task sample should be explicitly labeled.

## 7. Sampling and common failure modes

Choose a reference period (initial default: last 30 days) and a clearly scoped activity inventory. Include high-volume routine work, consequential/critical work and representative non-AI activities; **do not cherry-pick past AI successes**. Decide AI-eligibility before gate scoring. Record exclusion reasons and unknown eligibility separately.

A verified, risky/regulated task may still need formal approval beyond a pilot; v0.1 does not certify such use. A small sample is illustrative rather than representative.

Threats: self-report inflation, poor documentation of denominator, denominator gaming, subjective eligibility, outcome leakage, task complexity confounding, high-risk failure modes, and responses from a single employee falsely presented as whole-company evidence.
