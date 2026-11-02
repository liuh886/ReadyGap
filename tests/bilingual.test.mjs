import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { buildDictionary, translateText, normalizeLanguage, applyAssessmentLocale } from "../apps/web/assessment-i18n.mjs";

const indicatorData=JSON.parse(readFileSync(new URL("../items/indicators.json",import.meta.url)));
const gateData=JSON.parse(readFileSync(new URL("../items/gates.json",import.meta.url)));
const dict=buildDictionary(indicatorData,gateData);

test("normalizes language while keeping English as the default",()=>{
  assert.equal(normalizeLanguage("zh"),"zh");
  assert.equal(normalizeLanguage("zh-CN"),"zh");
  assert.equal(normalizeLanguage("en"),"en");
  assert.equal(normalizeLanguage("fr"),"en");
  assert.equal(normalizeLanguage(null),"en");
});

test("Chinese indicator and workflow descriptions are drawn from the canonical item data",()=>{
  const item=indicatorData.indicators[0];
  assert.equal(translateText(item.what_en,dict),item.what);
  assert.equal(translateText("I01 · "+item.title_en,dict),"I01 · "+item.title_zh);
  const gate=gateData.gates[0];
  assert.equal(translateText(gate.requirement_en,dict),gate.requirement_zh);
  assert.equal(translateText(gate.action_en,dict),gate.action_zh);
});

test("translates numeric results, warnings and tasks without changing values",()=>{
  assert.equal(translateText("2 of 5 eligible activities passed all checks and a representative trial",dict),
    "5 项适用活动中，有 2 项通过全部检查和试运行");
  assert.match(translateText("Scored 9/12 · Unknown 2 · N/A 1. Evidence: self-reported 5, documented (self-reported) 3, observed (self-reported) 1. Evidence is not independently verified by this website.",dict),/已计分 9\/12/);
  assert.match(translateText("Eligible 5 · Ineligible 1 · Eligibility unknown 2 · High risk 1.",dict),/适用 5/);
  assert.match(translateText("I02: expected integer counts with 0 ≤ numerator ≤ denominator",dict),/分子/);
});

test("in-place switching preserves pre-filled numeric answers and user task names",()=>{
  const previousNodeFilter=globalThis.NodeFilter;
  globalThis.NodeFilter={SHOW_TEXT:4};
  try{
    const label={nodeValue:"Entity type",parentElement:{tagName:"LABEL"}};
    const textNodes=[label];
    const input={
      value:"8",
      attrs:{placeholder:"Blank = unknown"},
      hasAttribute(name){return Object.hasOwn(this.attrs,name);},
      getAttribute(name){return this.attrs[name];},
      setAttribute(name,value){this.attrs[name]=value;}
    };
    const taskName={value:"My actual business task",attrs:{},hasAttribute:()=>false};
    const enButton={dataset:{language:"en"},attrs:{},setAttribute(k,v){this.attrs[k]=v;}};
    const zhButton={dataset:{language:"zh"},attrs:{},setAttribute(k,v){this.attrs[k]=v;}};
    const document={
      documentElement:{lang:"en"},body:{},
      createTreeWalker(){let i=0;return {nextNode(){return textNodes[i++]||null;}};},
      querySelectorAll(selector){
        if(selector==="[data-language]")return [enButton,zhButton];
        return [input,taskName];
      }
    };
    applyAssessmentLocale(document,"zh",dict);
    assert.equal(label.nodeValue,"评估主体");
    assert.equal(input.attrs.placeholder,"未知则留空");
    assert.equal(input.value,"8");
    assert.equal(taskName.value,"My actual business task");
    assert.equal(zhButton.attrs["aria-pressed"],"true");
    assert.equal(document.documentElement.lang,"zh-CN");
    applyAssessmentLocale(document,"en",dict);
    assert.equal(label.nodeValue,"Entity type");
    assert.equal(input.attrs.placeholder,"Blank = unknown");
    assert.equal(input.value,"8");
    assert.equal(enButton.attrs["aria-pressed"],"true");
    assert.equal(document.documentElement.lang,"en");
  }finally{
    if(previousNodeFilter===undefined)delete globalThis.NodeFilter;
    else globalThis.NodeFilter=previousNodeFilter;
  }
});
