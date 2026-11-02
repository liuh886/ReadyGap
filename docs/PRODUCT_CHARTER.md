# Product Charter — ReadyGap v0.1

## Strategic positioning

**ReadyGap** is the public, propagation-first brand for an open, model-independent AI Readiness assessment. **Universal AI Readiness Index (U-ARI)** is the proposed underlying measurement framework, **not yet** a validated global index.

**Core proposition:** As foundation models become increasingly capable and accessible, an organization's ability to absorb, operationalize, and govern AI becomes a critical determinant of realized value. The construct is extended to persons and other entities through functionally equivalent activity-based conditions.

The AI model capability frontier and the adopting entity's preparedness are **distinct improvement levers**, not asserted statistically independent quantities.

**Slogan:** *Know your readiness. Unlock your potential.*  
**Research maxim:** *Measure the readiness of the entity, not the intelligence of the model.*

**Project thesis:** [framework/THESIS.md](../framework/THESIS.md). This charter must be interpreted together with it.

## Primary audience and question

A person, team, department, company, group, university, public service or other bounded actor should be able to ask:

> If an adequately capable AI agent were available today, what could we **appropriately** allow it to do in our real activities, and exactly what would stop it?

An Agent is a **diagnostic stress test**, not a product mandate or recommendation for unrestricted autonomy. The analysis also applies to AI-assisted human work.

**Primary actionable question:** What conditions exist, which relevant tasks can reach a reliable trial, and which controllable change should be made next?

## Product outputs

1. **ReadyScore:** six-domain entity-capability profile with provisional composite and evidence/missingness.
2. **Ready Coverage:** screened, eligible *activity-level* confirmed pilot-ready fraction after all necessary gates and a passed representative trial. High-risk activity approval is out of scope.
3. **Bottlenecks / Unlock Next:** which known gate failures block progress, which need further evidence, and which single fixes could enable the *next trial* (not automatically success).
4. **Later:** measured net time, quality, cost, adverse outcomes and other realized value, kept outside the readiness scores.

**AI Adoption ≠ AI Readiness ≠ AI Value Realization.** An API purchase, tool usage, or one-off demo is not by itself proof of readiness. Realized return must never be part of a readiness numerator.

## Three positioning judgments

1. **The adopting entity is the research object:** build on absorptive capacity, organizational learning and digital transformation, not solely foundation-model performance.
2. **Highest scores are not the objective:** readiness must fit task needs, economics and risk. Do not prescribe large data stacks or autonomous systems to those who do not need them.
3. **Actionable gaps outperform vanity labels:** report the most relevant repairable condition, the activities it affects and how to verify improvement.

## Core design commitments

- **Activity-centered:** reverse the typical top-down capability-inventory orientation; retain entity-level scores but ground diagnosis in actual activities.
- **Universal concept, appropriate local evidence:** a person does not need a corporate IT department; different types cannot be ranked globally without scale validation.
- **Five-question contract:** every indicator must specify What / Why / Numeric / Evidence / Action.
- **Two measurement units:** collect entity-level capabilities and activity-level gate results independently in code; do not calculate both scores from one set of inputs.
- **Non-compensatory gates:** a missing permission, verification or oversight condition cannot be erased by other high scores.
- **Evidence and calibration:** self-report is not third-party validation; unknown is neither fail nor N/A.
- **Versioned and privacy-first:** no forced login, personal data collection, telemetry or default publication in v0.1.

## Explicit non-goals

No foundation-model ranking; no assumption AI autonomy is desirable for every task; no global percentile, international league table, certification, causal conclusion, ROI promise, business-safety approval or automatic high-risk clearance.

## Product boundary

The first release proves that the framework can be **expressed and calculated**, not that the chosen constructs are yet psychometrically valid or predict future outcomes. Real comparative superiority must be established with prospective evidence. See [validation plan](../validation/VALIDATION_PLAN.md).
