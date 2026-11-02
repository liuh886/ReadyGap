import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const read = file => readFileSync(new URL(file, root), "utf8");
const publicFiles = [
  "index.html",
  "apps/web/index.html",
  "apps/web/assessment.html",
  "apps/web/app.mjs",
  "apps/web/landing.js",
  "apps/web/landing.css",
  "apps/web/styles.css",
  "apps/web/assessment-dark.css"
];

test("public-facing webpages and executable UI are English-only", () => {
  for (const file of publicFiles) {
    const source = read(file);
    assert.ok(!/[\u3400-\u9fff]/u.test(source), file + ": Chinese copy found");
  }
  for (const file of ["index.html", "apps/web/index.html", "apps/web/assessment.html"]) {
    assert.match(read(file), /<html lang="en">/, file + ": should declare English");
  }
});

test("all public indicators and workflow gates provide complete English labels", () => {
  const indicatorData = JSON.parse(read("items/indicators.json"));
  const gateData = JSON.parse(read("items/gates.json"));
  for (const domain of indicatorData.domains) {
    assert.ok(domain.title_en?.trim(), domain.id + " missing English domain label");
  }
  for (const item of indicatorData.indicators) {
    for (const field of [
      "title_en", "what_en", "why_en", "numerator_en", "denominator_en",
      "evidence_en", "action_en", "caveat_en"
    ]) {
      assert.ok(item[field]?.trim(), item.id + ": missing " + field);
      assert.ok(!/[\u3400-\u9fff]/u.test(item[field]), item.id + "." + field + " not English");
    }
  }
  for (const gate of gateData.gates) {
    for (const field of ["title_en", "requirement_en", "action_en"]) {
      assert.ok(gate[field]?.trim(), gate.id + ": missing " + field);
      assert.ok(!/[\u3400-\u9fff]/u.test(gate[field]), gate.id + "." + field + " not English");
    }
  }
});

test("browser scripts remain valid JavaScript", () => {
  for (const script of ["apps/web/app.mjs", "apps/web/landing.js", "scoring/engine.mjs"]) {
    execFileSync(process.execPath, ["--check", new URL(script, root).pathname], { stdio: "pipe" });
  }
});

test("assessment UI binds to the English contract and preserves the two-score engine", () => {
  const ui = read("apps/web/app.mjs");
  for (const field of ["title_en", "what_en", "why_en", "numerator_en",
    "denominator_en", "evidence_en", "action_en", "caveat_en",
    "requirement_en"]) {
    assert.ok(ui.includes(field), "UI doesn't use " + field);
  }
  assert.ok(ui.includes('from "../../scoring/engine.mjs"'));
  assert.ok(ui.includes("scoreIndicators("));
  assert.ok(ui.includes("scoreTasks("));
  assert.ok(ui.includes("ReadyScore") && ui.includes("Ready Coverage"));
  assert.ok(!ui.includes("title_zh") && !ui.includes("requirement_zh"));
});
