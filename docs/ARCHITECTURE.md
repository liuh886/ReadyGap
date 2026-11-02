# Architecture — Concepts, Items, Scoring, Validation, Benchmarks and Web

The public homepage is a **manifesto and product introduction**, not the detailed instrument. The separate assessment route is a **consumer** of a measurement contract, not the source of truth for its questions. Avoid copying the same definitions into multiple unlinked files.

\`\`\`text
ReadyGap/
├── framework/             # why, theoretical construct, design principles
│   ├── THESIS.md
│   ├── MEASUREMENT_MODEL.md
│   └── DESIGN_PRINCIPLES.md
├── items/                 # canonical inventory and machine-readable candidate items
│   ├── INDICATOR_REGISTER.md
│   ├── indicators.json
│   └── gates.json
├── scoring/               # pure numerical engine and calculation specification
│   ├── engine.mjs
│   └── SCORING_SPEC.md
├── validation/            # empirical validity, reliability, comparability study
│   └── VALIDATION_PLAN.md
├── benchmarks/            # reference-distribution policy (no invented data)
│   └── README.md
├── apps/
│   └── web/               # static UI only; imports the scoring engine
│       ├── index.html      # concept-first homepage; no questionnaire
│       ├── landing.css     # homepage only
│       ├── assessment.html # English + Simplified Chinese; ?lang=zh
│       ├── styles.css      # questionnaire styling
│       ├── app.mjs         # assessment UI only
│       └── assessment-i18n.mjs # presentation translations, no scoring
├── docs/                  # product boundaries, architecture, roadmap
│   ├── PRODUCT_CHARTER.md
│   ├── ARCHITECTURE.md
│   └── ROADMAP.md
├── tests/                 # scoring + contract checks
├── index.html             # tiny root redirect for GitHub Pages / static hosting
└── README.md
\`\`\`

## Dependency direction

\`\`\`text
framework (human research contract)
    ↓ informs
items (canonical JSON / definitions) ─────┐
    ↓                                      │
scoring (pure, testable functions)         │
    ↓                                      │
apps/web (UI loads items, imports scoring)─┘

validation (independent tests of method and outcomes)
benchmarks (future consented and calibrated reference data)
\`\`\`

Do not move scoring weights or definitions into the UI. App-specific wording may be translated but item identity, numerical rules and schema versions must remain synchronized.

## Current run / deployment

Serve the **repository root** (not apps/web in isolation) over HTTP; the homepage links to assessment.html, whose imports to \`../../scoring/engine.mjs\` and fetches \`../../items/*.json\` are on the same origin:

\`\`\`sh
python3 -m http.server 8000
# http://localhost:8000 redirects to /apps/web/
\`\`\`

A GitHub Pages deployment sourced from the repository root can serve the root launcher. CI runs Node unit, contract and static route tests; automated browser visual QA has **not** been performed. The prototype contains no external font imports or browser analytics.

Do not create a fake global dataset: \`benchmarks/\` currently holds policy only. Future datasets must have provenance, informed consent, de-identification and documented sampling/measurement equivalence.

## Change control

1. Amend the thesis or the model before altering what counts as AI readiness.
2. Give every new item all five required definitions.
3. Bump item and scoring schema versions for breaking changes; add regression/bridging tests.
4. Keep outcome metrics separate from readiness.
5. Add domain-specific optional modules without silently changing the universal core.

## Current known limitations

The website accepts self-reported counts and gate states without independently checking artifacts; its task-sample representativeness is not yet enforced. No global benchmark, psychometric validation, digital outcome tracking or public deployment is claimed.


## Language separation

The public **landing page is English-only**. The assessment page uses one HTML route, one set of questionnaire definitions, and one numeric engine. The optional `?lang=zh` query selects Simplified Chinese. English/Chinese are **presentation variants**, not different instruments. The language switch updates text and attributes in place and preserves the current form state, without local storage, cookies or network requests. The assessment report and copied aggregate summary follow the selected language.

The `items/indicators.json` and `items/gates.json` fields retain their original Chinese text plus parallel English fields; locale logic never changes indicator IDs, gate states, denominators, weights or results. The product homepage remains unchanged.

