import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const registry = JSON.parse(readFileSync(new URL("../items/indicators.json", import.meta.url)));
const gates = JSON.parse(readFileSync(new URL("../items/gates.json", import.meta.url)));

test("12 complete indicator contracts cover six domains exactly twice", () => {
  assert.equal(registry.indicators.length, 12);
  assert.equal(registry.domains.length, 6);
  for (const domain of registry.domains) {
    assert.equal(registry.indicators.filter(x => x.domain_id === domain.id).length, 2);
  }
  for (const item of registry.indicators) {
    for (const field of ["id","domain_id","what","why","numerator","denominator","evidence","action","caveat"]) {
      assert.ok(typeof item[field] === "string" && item[field].trim(), item.id + ": missing " + field);
    }
    assert.equal(item.value_type, "integer_ratio");
  }
});

test("exactly six unique operational gates with actionable repair", () => {
  assert.equal(gates.gates.length, 6);
  assert.equal(new Set(gates.gates.map(x => x.id)).size, 6);
  for (const gate of gates.gates) {
    assert.ok(gate.title_zh && gate.requirement_zh && gate.action_zh);
  }
});
