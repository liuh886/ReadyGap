import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const root = new URL("../", import.meta.url);
const load = path => readFileSync(new URL(path, root), "utf8");
test("the project is divided into independent research, items, scoring, validation, benchmarks, and web layers", () => {
  for (const path of [
    "framework/THESIS.md","framework/MEASUREMENT_MODEL.md","framework/DESIGN_PRINCIPLES.md",
    "items/INDICATOR_REGISTER.md","items/indicators.json","items/gates.json",
    "scoring/engine.mjs","scoring/SCORING_SPEC.md",
    "validation/VALIDATION_PLAN.md","benchmarks/README.md","apps/web/index.html","apps/web/landing.css","apps/web/landing.js","apps/web/favicon.svg","apps/web/assessment.html","apps/web/assessment-dark.css","apps/web/app.mjs",
    "docs/ARCHITECTURE.md"
  ]) assert.ok(existsSync(new URL(path, root)), "missing "+path);
});
test("web references canonical scoring and item files, not duplicates or backend services", () => {
  const js = load("apps/web/app.mjs");
  const html = load("apps/web/assessment.html");
  const home = load("apps/web/index.html");
  assert.ok(js.includes('from "../../scoring/engine.mjs"'));
  assert.ok(js.includes('fetch("../../items/indicators.json")'));
  assert.ok(js.includes('fetch("../../items/gates.json")'));
  assert.ok(html.includes('src="./app.mjs"'));
  assert.ok(html.includes('href="../../framework/MEASUREMENT_MODEL.md"'));
  assert.ok(home.includes('href="./assessment.html"'));
  assert.ok(!home.includes('id="indicator-list"'), "do not embed questionnaire in homepage");
  assert.ok(!home.includes('src="./app.mjs"'), "assessment engine should not load on homepage");
  assert.ok(home.includes("AI is getting"));
  assert.ok(home.includes("Context Reconstruction Cost"));
  assert.ok(home.includes("Human Rescue Rate"));
  assert.ok(home.includes("Cold-start Transfer"));
  assert.ok(home.includes("Model Upgrade Capture"));
  assert.ok(home.includes("Recovery Cost"));
  assert.ok(home.includes("ReadyScore") && home.includes("Ready Coverage"));
  assert.ok(!load("apps/web/landing.css").includes("@import"), "no remote font requests");
  assert.ok(load("index.html").includes("./apps/web/"));
});
test("the public thesis explicitly separates readiness from adoption and value", () => {
  const s=load("framework/THESIS.md");
  for (const phrase of [
    "Measure the readiness of the entity",
    "AI Adoption ≠ AI Readiness ≠ AI Value Realization",
    "As foundation models become increasingly capable",
    "what could this entity actually let it do"
  ]) assert.ok(s.includes(phrase), "missing research principle: "+phrase);
});
