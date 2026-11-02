import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const read = path => readFileSync(new URL(path, root), "utf8");

test("the public homepage remains English-only", () => {
  for (const file of ["index.html","apps/web/index.html","apps/web/landing.js"]) {
    const source = read(file);
    assert.ok(!/[\u3400-\u9fff]/u.test(source), file + ": unexpected Chinese homepage copy");
  }
  assert.match(read("apps/web/index.html"), /<html lang="en">/);
});

test("the assessment offers an English / Simplified Chinese toggle without separate scoring", () => {
  const html = read("apps/web/assessment.html");
  const js = read("apps/web/app.mjs");
  assert.match(html, /data-language="en"/);
  assert.match(html, /data-language="zh"/);
  assert.ok(js.includes('from "./assessment-i18n.mjs"'));
  assert.ok(js.includes('from "../../scoring/engine.mjs"'));
  assert.ok(js.includes("scoreIndicators(") && js.includes("scoreTasks("));
  assert.ok(js.includes("replaceState("), "language toggling should not reload the page");
  assert.ok(!js.includes("localStorage") && !js.includes("sessionStorage"));
});

test("all 12 core indicators and six workflow gates have complete bilingual contracts", () => {
  const registry=JSON.parse(read("items/indicators.json"));
  const gates=JSON.parse(read("items/gates.json"));
  assert.equal(registry.indicators.length,12);
  assert.equal(gates.gates.length,6);
  for(const d of registry.domains) {
    assert.ok(d.title_en?.trim() && d.title_zh?.trim(),d.id);
  }
  for(const item of registry.indicators) {
    assert.ok(item.title_en?.trim() && item.title_zh?.trim(),item.id);
    for(const field of ["what","why","numerator","denominator","evidence","action","caveat"]) {
      assert.ok(item[field+"_en"]?.trim(),item.id+" "+field+"_en");
      assert.ok(item[field]?.trim(),item.id+" "+field+" (Chinese)");
    }
  }
  for(const g of gates.gates){
    for(const field of ["title","requirement","action"]) {
      assert.ok(g[field+"_en"]?.trim() && g[field+"_zh"]?.trim(),g.id+" "+field);
    }
  }
});

test("browser modules parse and all public routes exist", () => {
  for(const file of ["apps/web/app.mjs","apps/web/landing.js","apps/web/assessment-i18n.mjs","scoring/engine.mjs"]) {
    assert.ok(existsSync(new URL(file,root)));
    execFileSync(process.execPath,["--check",new URL(file,root).pathname],{stdio:"pipe"});
  }
});
