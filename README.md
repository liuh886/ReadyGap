# ReadyGap

**Measure your readiness. Close the gap.**  
An open, model-independent assessment of how well a person, team, department, company or other entity is prepared to put AI to work.

> **Status: v0.1 experimental prototype.** This is not a validated psychometric scale, an official certification, a prediction of ROI, or an AI-safety approval.

## Why

Improving foundation-model capability does not automatically make people and organizations better at integrating AI into real activities. ReadyGap separates:

- **ReadyScore (0–100):** self-reported, numerically specified *entity capabilities* across six domains.
- **Ready Coverage (0–100%):** the fraction of screened, AI-eligible activities meeting all non-compensatory readiness gates **and** passing a documented trial. The denominator and sample caveats are shown.
- **Outcomes:** measured changes in time, quality, cost and risk. **Not** included in either readiness score.

Unlike a procurement checklist or a general maturity label, ReadyGap asks what is missing, for which activity, and what change would unlock a meaningful next test.

## Start the experimental website

No install or build required. Serve the repository root over HTTP:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

The scoring core requires only JavaScript. Run offline tests with Node.js 20+:

```sh
node --test tests/*.test.mjs
```

The page makes no external requests. No account, analytics, or back-end storage are included. Evaluation inputs remain in browser memory unless a user explicitly copies an aggregate result. GitHub Pages can host this static prototype when deployment is explicitly configured.

## Start with the measurement contract

1. [Product charter](docs/PRODUCT_CHARTER.md) — what this project is and is not.
2. [Measurement model](docs/MEASUREMENT_MODEL.md) — construct, logical chain, and the five tests for every indicator.
3. [Indicator register](docs/INDICATOR_REGISTER.md) — twelve proposed measurable indicators: what, why, quantification, evidence, action.
4. [Scoring protocol](docs/SCORING_SPEC.md) — denominators, unknowns, eligibility, gates and formulae.
5. [Validation plan](docs/VALIDATION_PLAN.md) — how we will test whether this beats simpler assessment.
6. [Roadmap](docs/ROADMAP.md) — fast product execution without premature certification claims.

Machine-readable definitions live in [data/indicators.json](data/indicators.json) and [data/gates.json](data/gates.json). The pure scoring engine lives in [src/scoring.mjs](src/scoring.mjs).

## Contribution principles

- Describe the **construct** before writing questions or choosing weights.
- Each proposed indicator must answer: *what is measured, why necessary, numerical rule, verification, action resulting from a change*.
- Do not equate paying for an API with readiness, or readiness with realized value.
- Never treat missing evidence as a score of zero. Separate **unknown**, **not applicable**, **failed**, and **verified**.
- Do not rank people against groups or companies on an uncalibrated scale. Current scores are descriptive, exploratory summaries.
- Do not publish raw responses, organizational workflows or benchmark data by default.

MIT License; see [LICENSE](LICENSE).
