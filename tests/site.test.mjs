import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const root = new URL("../", import.meta.url);
const file = path => readFileSync(new URL(path, root), "utf8");

test("landing page is concept-first, distinct from the assessment", () => {
  const html = file("apps/web/index.html");
  assert.match(html, /AI is getting/);
  assert.match(html, /Are we getting/);
  for (const label of ["Context", "Human Rescue Rate", "Cold-start Transfer",
    "Model Upgrade Capture", "Recovery Cost", "ReadyScore", "Ready Coverage"]) {
    assert.ok(html.includes(label), label);
  }
  assert.ok(!html.includes('id="indicator-list"'));
  assert.ok(html.includes('href="./assessment.html"'));
  assert.ok(html.includes('src="./landing.js"'));
  assert.ok(html.includes('href="./landing.css"'));
  assert.ok(html.includes('href="./favicon.svg"'));
  assert.ok(html.includes("NOT MEASURED DATA") && html.includes("CONCEPTUAL"));
});

test("local assets resolve relative to both pages", () => {
  for (const document of ["apps/web/index.html", "apps/web/assessment.html"]) {
    const html = file(document);
    const dirname = new URL("./", new URL(document, root));
    const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
    for (const link of links) {
      if (/^(https?:|mailto:|#)/.test(link)) continue;
      const filePart = link.split("#")[0].split("?")[0];
      if (!filePart || filePart === "./") continue;
      const target = new URL(filePart, dirname);
      assert.ok(existsSync(target), document + " => " + filePart + " missing");
    }
  }
});

test("interactive concepts have no scoring or external API calls", () => {
  const script = file("apps/web/landing.js");
  assert.ok(script.includes("aria-pressed"));
  for (const phrase of ["context", "tools", "control"]) assert.ok(script.includes(phrase));
  assert.ok(!script.includes("fetch("));
  assert.ok(!script.includes("scoreIndicators"));
  const css = file("apps/web/landing.css");
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.ok(!css.includes("@import"));
});

test("deployment workflow is main-only and uses official Pages actions", () => {
  const workflow = file(".github/workflows/pages.yml");
  for (const p of ["branches: [main]", "actions/configure-pages@v5",
    "actions/upload-pages-artifact@v4", "actions/deploy-pages@v4",
    "pages: write", "id-token: write", "node --test tests/*.test.mjs"]) {
    assert.ok(workflow.includes(p), "missing: " + p);
  }
  assert.ok(!workflow.includes("pull_request:"), "no automatic PR deployment");
});
