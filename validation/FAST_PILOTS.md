# ReadyGap — 快速田野实验（发散后的最小试验）

**Purpose:** Within small, consented samples, find out whether the unexpected candidate metrics in [Creative Metrics Lab](../items/CREATIVE_METRICS_LAB.md) can be understood and observed at low cost. This is **product discovery**, not formal statistical validation.

## How to run a 45–90 minute exploratory session

1. Explain the purpose and limitations. No passwords, personal secrets, internal contract details or identifying work artifacts need to be submitted.
2. Define the actor: person, small team, department or larger organization. Record the actual unit of observation.
3. Before any AI testing, list representative task families, their frequency, boundaries, suitability, risk, current tool access and intended success criteria.
4. Pre-select 3–5 eligible, routine-risk activities across *easy, typical and difficult* work. Do not cherry-pick cases where AI already succeeded.
5. For each task, run no more than two candidate mini-probes. Log timestamps/counts and evidence type; split observed results from a respondent's estimate.
6. Ask the respondent: "Did this tell you something you did not already know? What action could you take next?" Record surprise and decision utility as qualitative outcomes, not scoring bonuses.
7. Leave high-risk/regulated decision automation outside of the pilot unless the domain's responsible authority separately approves a safe study protocol.

## Four concrete mini-probes

### Probe A · AI 从零理解工作（X01 + X03）

- **Input:** one repeatable task, a pre-agreed acceptance checklist, the person's existing context bundle, a fixed available model.
- **Measure:** elapsed *human setup minutes* to first accepted result; whether a competent new operator can reproduce the task with the same bundle.
- **Intervention:** prepare a one-page context packet (purpose, data sources, constraints, output acceptance).
- **Follow-up:** rerun a matched but different sample task with the same model; compare setup burden and repeatability.
- **Caution:** the comparison is confounded by experience and task difficulty; do not infer that adding documents always helps.

### Probe B · The last mile (X07 + X20)

- **Input:** list of 3–5 legitimate AI-assisted activities, with the authorized handoff path.
- **Measure:** count work items where AI can read the information but cannot safely pass the next action; log the *single last remaining known gate* where relevant.
- **Intervention:** a controlled read-only source or an explicit human execution handoff; never create excess privileges.
- **Follow-up:** check whether the task can enter a representative trial, without treating that as successful deployment.
- **Caution:** not every task should be autonomously executed; no bypassing approvals.

### Probe C · Recovery rehearsal (X14 + optional X13)

- **Input:** low-risk and reversible workflow in a sandbox, predefined failure and rollback plan.
- **Measure:** fraction of intended actions with demonstrable rollback/human takeover; optionally the time to return to a known-good state.
- **Intervention:** add a checkpoint, version record, approval or undo path.
- **Follow-up:** repeat the identical safe rehearsal with logs.
- **Caution:** recovery time is an observed outcome; a sandbox test is not a high-risk safety certification.

### Probe D · 模型升级“漏斗”（X16）

- **Input:** same fixed set of tasks, fixed business workflow and two explicitly named/model-versioned capabilities; freeze human/operator, context access, allowed tools and evaluation.
- **Measure:** paired differences in end-to-end task success or time; record a separate constrained model-only baseline where meaningful. Keep both raw effects and assumptions; do not force an unstable ratio if denominator is zero or sign changes.
- **Interpretation:** low downstream gain *may* indicate an entity-side bottleneck, but may also indicate task irrelevance, model weaknesses or measurement noise.
- **Follow-up:** test one **entity-side intervention** with model version fixed to see if it changes business performance.
- **Caution:** X16 is a model × workflow interaction, never a pure entity readiness score.

## Pilot recording template

| Field | Example / rule |
| --- | --- |
| scope_id | Anonymous pilot identifier |
| entity_type | individual / team / department / company / other |
| assessment_date | ISO date |
| task_id | Non-sensitive pseudonym |
| task_family | e.g. report review, recurring support, scheduling |
| selection_reason | high-volume / typical / challenging |
| ai_suitability | eligible / excluded / unknown; explain |
| risk_class | routine / specialist-reviewed |
| tested_candidate_ids | e.g. X01, X03 |
| method | direct observation / voluntary self-estimate |
| model_version | record if interacting with a real model |
| baseline / observation | units and actual values, not fabricated percentages |
| action_hypothesis | smallest controllable change |
| test_after_change | what would count as an improvement? |
| limitations | selection, operator, time, privacy, confounders |

### Decision after 3 contrasting pilot sessions

For each candidate, classify: **keep as exploratory / simplify / combine with another / move to outcome validation / drop**. Explain why in prose. No numeric popularity ranking or fabricated confidence bands needed.

**Success for this stage:** at least three genuinely new, falsifiable, user-understandable signals and at least one useful, low-cost action per pilot — **not** a higher ReadyScore.
