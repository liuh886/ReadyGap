# Roadmap — Spread first, validate rigorously

**North star:** a widely shareable open AI Readiness assessment that can answer **what capabilities exist, which eligible activities are pilot-ready, why others are blocked, and what specific next action can be verified**.

The public brand is ReadyGap; the proposed general measurement framework is U-ARI. It is not a statistically calibrated global index yet.

## PR #1 / v0.1 — theoretical foundation + runnable preview

- [x] Research thesis in Chinese and English; two distinct intervention variables, adoption/readiness/value separation
- [x] Formalize three judgments: focus on adopting entity, fit-for-purpose rather than maximize score, actionable gaps rather than vanity score
- [x] Activity-first and strong-agent diagnostic thought experiment with safety caveats
- [x] Separate framework, items, scoring, validation, benchmarks, apps/web, docs and tests
- [x] Five-question contract + twelve candidate indicator definitions
- [x] Two scoring layers: ReadyScore entity capabilities; Ready Coverage operational trials
- [x] Deterministic scoring, input checks, contract/unit tests and GitHub CI
- [x] Chinese-first static website, no login or telemetry, aggregate-only manual sharing
- [ ] External qualitative review of construct and twelve metrics
- [ ] Cognitive pretests with individuals, teams, departments and organizations
- [ ] Browser accessibility, mobile and deployment verification (not yet claimed)

## Website information architecture — concept first (PR #1)

- [x] Separate a research-led public **homepage** from the detailed **assessment** route
- [x] Hero: **AI is getting smarter. Are we getting readier?** with an explicitly conceptual model-vs-entity gap visual
- [x] Explain the thesis and distinction between Readiness, Adoption and Realized Value before any questionnaire
- [x] Feature five unconventional measurement perspectives without claiming they are validated score inputs
- [x] Introduce ReadyScore / Ready Coverage as different lenses rather than publishing sample scores
- [x] Preserve independent assessment scoring, source definitions and privacy constraints
- [x] Refresh brand design to dark AI-native visual language: kinetic type, animated conceptual gap, asymmetric bento, responsive mobile treatment and accessible motion
- [x] Add interactive blocker scenario to explain knowledge, systems and verification without creating fictional scores
- [x] Harmonize the experimental assessment with the same dark-violet/mint design language
- [x] Add GitHub Pages deployment workflow and route/asset tests (requires repository Pages enabled)
- [ ] Visual/browser QA across narrow screens, desktops and keyboard-only navigation
- [ ] Verify successful Pages activation and public HTTPS URL (do not claim live before check)

## Exploration sprint — diverge before measuring harder

- [x] Establish [Creative Metrics Lab](../items/CREATIVE_METRICS_LAB.md): 25 unvalidated but observable candidate signals with proposed numeric probes and actions
- [x] Keep *precondition*, *friction*, *stress test*, *outcome* and *model interaction* measures conceptually separate
- [x] Draft [Fast Field Pilots](../validation/FAST_PILOTS.md) for context warm-up, cold start, last-mile action, safe recovery and model-upgrade capture
- [ ] Trial a small selection against pre-selected tasks for one individual, one small team and one larger coordinating entity
- [ ] Capture surprise, clarity, feasibility, gaming risk and next-action usefulness in short notes
- [ ] Converge: **keep / simplify / combine / move to outcomes / drop**, only then review the 12-item core and scoring
- [ ] Keep v0.1 published score definitions unchanged until a separately reviewed change is justified

**Principle: Diverge → Observe → Converge → Validate → Quantify.** Creativity is not a shortcut to scientific claims; scientific scrutiny should refine useful ideas rather than prevent their discovery.

## Public language policy — English homepage, bilingual assessment

- [x] Keep the brand/product homepage English-only
- [x] Offer English / Simplified Chinese on the **assessment itself**, without a duplicate scoring fork
- [x] Translate all questionnaire indicators, task checks, tooltips, reports, next actions and copyable summaries
- [x] Preserve form values, task inputs and selections when switching languages (no reload or storage)
- [x] Support direct `?lang=zh` URLs and retain language choice in the current URL only
- [x] Add bilingual indicator/locale contract and switch-state tests
- [ ] Browser-based keyboard/mobile/visual QA of both languages
- [ ] Independent bilingual terminology and cognitive pretest

## v0.2 — shareable public experience and meaningful task sampling

- [ ] Launch verified public site and add easy-to-share versioned report/card (opt-in only)
- [ ] Make a **pre-scored activity inventory** and documented AI-eligibility screening to curb cherry-picking
- [ ] Provide understandable examples of numerator, denominator and evidence for each entity type
- [ ] Shorten time-to-result using empirically tested skip logic, without inventing N/A conditions
- [ ] Add at least one concrete activity-level next-step recommendation and optional effort weighting
- [ ] Full English/Chinese localization and responsive accessibility testing
- [ ] Record assessment scope, item/scoring versions and repeat-measurement comparisons
- [ ] Optional gross opportunity calculator; keep net value **outside** readiness metrics

## v0.3 — measurement validation and differentiation

- [ ] Independently review indicator necessity and domain coverage; revise construct where evidence demands
- [ ] Test inter-rater agreement, test–retest reliability and observed-vs-reported differences
- [ ] Measure entity-type / language equivalence and sampling sensitivities
- [ ] Track 30–90 day task success, quality, safety, net time and value separately
- [ ] Compare predictive/decision utility against simpler enterprise maturity and strategy checklists
- [ ] Publish methods, version links, limitations and sensitivity reports
- [ ] Consider optional sector-specific and higher-risk modules

## Future: benchmarks, not synthetic rankings

- [ ] Only with consented, representative, reviewed data, consider peer distributions
- [ ] Do not equate percentiles across people, teams and companies absent proven measurement comparability
- [ ] Maintain item and scale linking as model capabilities and workflows evolve

**Execution principle:** build product functionality and coherent structure first. Run targeted tests for concrete changes; reserve broader validation campaigns for meaningful releases and research claims.

See [Architecture](ARCHITECTURE.md), [Measurement Model](../framework/MEASUREMENT_MODEL.md), and [Validation Plan](../validation/VALIDATION_PLAN.md).
