import test from "node:test";
import assert from "node:assert/strict";
import { scoreIndicators, scoreTasks } from "../scoring/engine.mjs";

const domains = Array.from({length:6}, (_,i)=>({id:"D"+(i+1),title_zh:"domain "+(i+1)}));
const indicators = domains.flatMap(d=>[1,2].map(k=>({id:d.id+"-"+k,domain_id:d.id})));
const registry = {schema_version:"0.1.0",domains,indicators};
const gates = {schema_version:"0.1.0", gates:["objective","context","access","handoff","verification","oversight"].map(id=>({id}))};
const all = (n,d,evidence="self_report") => Object.fromEntries(indicators.map(i=>[i.id,{numerator:n,denominator:d,evidence}]));
const task = (overrides={}) => ({
  name:"Activity", eligibility:"eligible", risk:"routine", trial:"passed", hours:10,
  gates:Object.fromEntries(gates.gates.map(g=>[g.id,"pass"])), ...overrides
});

test("six equal domains produce transparent 0-100 ready score", ()=>{
  const r=scoreIndicators(registry,all(3,4));
  assert.equal(r.readyScore,75);
  assert.equal(r.scoredCount,12);
  assert.equal(r.evidence.self_report,12);
  assert.equal(r.reportable,true);
});
test("missing is not zero and N/A is not zero", ()=>{
  const answers=all(2,2);
  delete answers["D1-1"];
  answers["D1-2"]={numerator:0,denominator:0};
  const r=scoreIndicators(registry,answers);
  assert.equal(r.reportable,false);
  assert.equal(r.domains[0].value,null);
  assert.equal(r.unknownCount,1);
  assert.equal(r.notApplicableCount,1);
});
test("report score requires at least 9/12 and each domain represented", ()=>{
  const a=all(1,2);
  delete a["D1-1"];delete a["D2-1"];delete a["D3-1"];
  assert.equal(scoreIndicators(registry,a).reportable,true);
  delete a["D4-1"];
  assert.equal(scoreIndicators(registry,a).reportable,false);
});
test("invalid count and unsupported evidence are rejected", ()=>{
  const a=all(1,2);a["D2-1"].numerator=3;
  assert.throws(()=>scoreIndicators(registry,a),/integer counts/);
  a["D2-1"].numerator=1;a["D2-1"].evidence="fake";
  assert.throws(()=>scoreIndicators(registry,a),/evidence type/);
});
test("coverage requires all gates plus passed trial; not averaged gate count", ()=>{
  const oneFail=task({gates:{...task().gates,context:"fail"}});
  const r=scoreTasks([oneFail,task({trial:"untested"}),task()],gates);
  assert.equal(r.readyCoverage,33.3);
  assert.equal(r.confirmedReady,1);
  assert.equal(r.gateCounts.context.fail,1);
});
test("one change unlock means access to trial, not automatic coverage", ()=>{
  const t=task({trial:"untested",gates:{...task().gates,access:"fail"}});
  const r=scoreTasks([t],gates);
  assert.equal(r.unlock.access,1);
  assert.equal(r.readyCoverage,0);
});
test("unknown eligibility, small samples and high risk are disclosed", ()=>{
  const r=scoreTasks([task(),task({eligibility:"unknown"}),task({risk:"high"})],gates);
  assert.equal(r.readyCoverage,50);
  assert.equal(r.unknownEligibility,1);
  assert.equal(r.highRisk,1);
  assert.equal(r.reasons.length,3);
});
test("weighted coverage only with complete positive effort denominator", ()=>{
  let r=scoreTasks([task({hours:9}),task({trial:"untested",hours:1}),task({trial:"failed",hours:0})],gates);
  assert.equal(r.readyCoverage,33.3); assert.equal(r.effortCoverage,90);
  r=scoreTasks([task({hours:null}),task()],gates);
  assert.equal(r.effortCoverage,null);
});
test("zero eligible is not equivalent to zero percent readiness", ()=>{
  const r=scoreTasks([task({eligibility:"ineligible",exclusionReason:"physical task"})],gates);
  assert.equal(r.readyCoverage,null);
  assert.ok(r.reasons.some(t=>t.includes("No screened")));
});
test("invalid statuses and missing exclusion reason are rejected", ()=>{
  assert.throws(()=>scoreTasks([task({eligibility:"ineligible"})],gates),/exclusion reason/);
  assert.throws(()=>scoreTasks([task({gates:{...task().gates,objective:"whatever"}})],gates),/Invalid gate/);
});
