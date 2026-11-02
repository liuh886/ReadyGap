# ReadyGap

**Know your readiness. Unlock your potential.**  
**Measure the readiness of the entity, not the intelligence of the model.**  
测量主体的就绪度，而不是模型的智能水平。

> **Status: experimental v0.1 · Draft PR.** ReadyGap is an open-source, model-independent **AI Readiness** assessment for individuals, teams, departments, companies and other entities. Its scores are not yet validated global benchmarks, certifications, or ROI forecasts.

## Why ReadyGap / 为什么做？

今天有那么多榜单和标准评估大模型推理能力的进步，却少有人持续追问：**我们的个人、部门与组织，是否真正准备好适应这些 AI 能力？**

我们判断，基础模型进步和主体吸收、整合、应用 AI 的能力是**两个可以分别改善的变量**。它们并非假设在统计上完全独立，但它们的约束机制不同；订阅 API 不等于业务流程已经 AI Ready。

> **As foundation models become increasingly capable and accessible, an organization's ability to absorb, operationalize, and govern AI becomes a critical determinant of realized value.**

随着基础模型能力持续增长并日益普及，组织吸收、运行和治理 AI 的能力，正成为决定 AI 能否真正创造价值的关键因素。研究对象也包括个人及其他主体。

**AI Adoption ≠ AI Readiness ≠ AI Value Realization.**

- **Readiness** — a capability and operational-condition assessment made **before** observing realized value.
- **Adoption** — actual AI usage behavior, which can be shallow, unreliable or merely experimental.
- **Value** — observed net changes in time, quality, cost, risk or other objectives; evaluated **separately**.

**Read the [Research Thesis / 核心研究命题](framework/THESIS.md)** for the argument, three positioning judgments, the strong-Agent stress test and falsifiable research questions.

## Reverse the direction of assessment / 从真实活动出发

Rather than only asking "Do you have an AI strategy, a knowledge base or staff training?", ReadyGap also asks:

> **If an adequately capable AI agent were available today, what could this entity actually let it do, and exactly where would it be blocked?**

如果今天给一个主体能力足够强的 AI Agent，它究竟能做什么，又会在哪里被卡住？

This is a **diagnostic thought experiment**, not an assumption that every task ought to be automated. The work of the entity—its actual activities, contextual knowledge, authorized tools, handoffs, evaluation and oversight—supplies the unit of diagnosis.

**More AI spending is not necessarily more readiness.** Small, low-risk actors can be appropriately ready without expensive platforms, autonomous agents or heavyweight governance. The aim is **fit-for-purpose capability** and the **next controllable improvement**, not maximizing an arbitrary number.

## Two measures, kept distinct

| Measure | Unit and meaning | Operational rule |
| --- | --- | --- |
| **ReadyScore (0–100)** | **Entity-level** capability profile: six domains, twelve proposed numerical indicators | Explicit numerator/denominator for each indicator; full score only when minimum evidence coverage is met |
| **Ready Coverage (0–100%)** | **Activity-level** confirmed pilot-readiness among sampled, screened AI-eligible activities | All six non-compensatory gates must pass **and** a representative routine-risk trial must pass |
| **Outcomes (separate)** | Future observed net time, cost, quality, risk and other value | Never included in either readiness score |

Every proposed indicator must answer **What is measured? Why necessary? How quantified? How verified? What specific action changes it?** See [design principles](framework/DESIGN_PRINCIPLES.md) and the [indicator register](items/INDICATOR_REGISTER.md).

Scores describe the **declared scope, period and evidence state**. They are not population percentiles or reliable comparisons between persons and whole companies. Report unknowns, N/A, risk exceptions and sample size. **High scores are not AI-safety approvals.**

## Creative metrics lab / 创意指标实验室

**Next step is divergent discovery, not prematurely proving the 12-item questionnaire.** We deliberately brainstorm unusual, task-observable measurements that can surprise the respondent and point toward a controllable fix.

- **[24 creative metric candidates](items/CREATIVE_METRICS_LAB.md)** — context warm-up tax, cold-start transfer, permission hops, read-to-act gaps, recovery cost, model-upgrade capture, one-change unlock and more. Candidates are labeled as *preconditions*, *friction*, *stress tests*, *outcomes* or *model interactions*, not silently inserted into ReadyScore.
- **[Four lightweight field pilots](validation/FAST_PILOTS.md)** — observe real tasks first, then review whether the metric adds clarity and changes a practical decision.
- **Convergence later:** only after exploratory feedback, apply What / Why / Numeric / Evidence / Action and formal validity checks. **The existing 12 indicators and scoring formulas remain unchanged in this round.**

## Project architecture

We intentionally separate the research logic from item definitions, numerical code and user experience.

```text
framework/       Research thesis, construct, assessment principles
items/           Canonical indicators, gate criteria, machine-readable definitions
scoring/         Pure deterministic scoring engine and calculation specification
validation/      Reliability, validity, comparability and prospective tests
benchmarks/      Data policy (no invented global reference datasets)
apps/web/        No-login, Chinese-first static assessment website
docs/            Product charter, architecture and execution roadmap
tests/           Unit and measurement-contract tests
index.html       Tiny static-site redirect to apps/web/
```

See [full architecture and dependency rules](docs/ARCHITECTURE.md).

## Experience: concept-first homepage

**The homepage is not the 12-item questionnaire.** It introduces the research thesis, a conceptual diagram of the model frontier vs entity readiness, five counterintuitive field signals, and the two-score idea. Visitors then opt into an **independent assessment page**.

- **[Landing page](apps/web/index.html)** — public-facing story and the idea behind ReadyGap.
- **[Assessment prototype](apps/web/assessment.html)** — separate, explicitly experimental numerical form, backed by the existing scoring engine.
- **[Landing CSS](apps/web/landing.css)** — presentation layer separate from the existing form CSS, not part of the measurement method.

**Featured exploratory signals:** Context Reconstruction Cost, Human Rescue Rate, Cold-start Transfer, Model Upgrade Capture and Recovery Cost. These are research candidates, **not** extra inputs or weights in ReadyScore.

## Try the website (experimental)

Serve the **repository root** (necessary for cross-directory imports):

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

No installation or backend is required. **The root page is the concept-first homepage**; the questionnaire is at `/apps/web/assessment.html`. The site makes no external API or font requests, has no telemetry, and keeps assessment inputs in page memory; only a deliberately copied **aggregate** summary may be shared. No server-side evidence verification or persistent results exist.

Run regression tests with Node.js 20+:

```sh
node --test tests/*.test.mjs
```

The code is ready for hosting from the repo root as static files, but **public deployment and browser QA must be verified separately**.

## Start here

1. [Thesis / 研究命题](framework/THESIS.md) — *why* the measurement matters.
2. [Measurement model](framework/MEASUREMENT_MODEL.md) — precisely *what* is measured, and what is excluded.
3. [Design principles](framework/DESIGN_PRINCIPLES.md) — how to turn an indicator into a meaningful action.
4. [Indicator register](items/INDICATOR_REGISTER.md) — the twelve current candidate metric contracts (not final).
5. [Creative metrics lab](items/CREATIVE_METRICS_LAB.md) — 25 unconventional candidate ideas; not in scoring.
6. [Fast field pilots](validation/FAST_PILOTS.md) — how to explore candidate value before validation.
7. [Scoring protocol](scoring/SCORING_SPEC.md) — numeric formulae, missingness and gates.
8. [Validation plan](validation/VALIDATION_PLAN.md) — how to test, falsify and improve the instrument.
9. [Roadmap](docs/ROADMAP.md) — practical release stages.

**Contribution rule:** describe the construct before creating an indicator, keep the scoring engine outside the UI, and never call an unvalidated self-reported score a global AI readiness ranking.

MIT License · Copyright 2026 Zhihao LIU.
