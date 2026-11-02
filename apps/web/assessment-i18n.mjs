/**
 * ReadyGap questionnaire localization; homepage remains English.
 * Presentation-only. No data storage, no network calls, and no alteration of input values.
 */
const pairs = [
["Back to ReadyGap home","返回 ReadyGap 首页"],
["Assessment navigation","测评导航"],["← Home","← 首页"],["How it works","测评方法"],["Capability inventory","能力量表"],["Workflow checks","任务检查"],
["EXPERIMENTAL ASSESSMENT · V0.1","实验性测评 · V0.1"],
["AI is advancing.","AI 正在进步。"],["Are you ready?","你准备好了吗？"],
["As foundation models advance, how ready are you, your team, or your organization to put AI to work? Measure what you have, identify what blocks real workflows, and find your next practical improvement.","随着基础模型不断进步，你、你的团队或组织是否真正准备好将 AI 用于实际工作？衡量已有能力，发现工作流程的阻碍，找到下一步可采取的改进行动。"],
["Measure the entity, not the model","测量主体，而非模型"],["Individuals · Teams · Organizations","个人 · 团队 · 组织"],["Two distinct metrics","两个独立指标"],["No account · No upload","无需登录 · 无需上传"],["Start assessment","开始测评"],["Two core measures","两个核心指标"],
["The entity's underlying AI-enabling capabilities, measured through 12 numerical indicators in six domains.","通过六个维度、12 项量化指标，衡量主体将 AI 用于实际活动的基础能力。"],
["The share of AI-eligible activities that pass all necessary checks and a representative trial.","在适合 AI 参与的活动中，满足全部必要条件并通过代表性试运行的比例。"],
["MEASURE","测量"],["VERIFY","核验"],["IMPROVE","改进"],["Define observable capabilities","定义可观察的能力"],["Record counts and evidence","记录数量与证据"],["Find an actionable constraint","找到可行动的瓶颈"],["What / Why","测什么 / 为什么"],["Number / Evidence","数量 / 证据"],["Action","行动"],
["PART 01 · CAPABILITY","第一部分 · 主体能力"],["Entity capability assessment","主体能力测评"],
["Use a clearly defined scope and the past 30 days. For each indicator, enter the number of activities meeting the criterion and the eligible total. Leave both fields blank when unknown; enter 0 / 0 only when not applicable.","请以明确的评估范围和最近 30 天为依据。每项填写满足标准的活动数量（分子）与适用活动总数（分母）。未知时两栏均留空；仅在确实不适用时填 0 / 0。"],
["Entity type","评估主体"],["Individual","个人"],["Team","团队"],["Department","部门"],["Company","企业"],["Group","集团"],["Other entity","其他主体"],
["Assessment scope (optional; excluded from the copied summary)","评估范围（可选，不包含在分享摘要中）"],
["e.g., My weekly work / A department's recurring activities","例如：我的每周工作／某部门日常重复任务"],
["Do not select only AI success stories. A single respondent's self-report does not represent an entire organization.","不要只选择已经成功使用 AI 的活动。个人自报不能自动代表整个组织。"],
["Loading indicator definitions…","正在载入指标定义……"],
["PART 02 · WORKFLOW","第二部分 · 任务运行条件"],["Workflow readiness checks","任务运行条件检查"],
["Select representative activities from a pre-defined list; at least three are recommended. Screen AI suitability before reviewing each necessary condition.","请从事先确定的活动清单中选择有代表性的任务（建议至少三项），先判断是否适合 AI，再检查各项必要条件。"],
["An activity counts toward","某项任务计入"],
["only if all necessary checks pass, the task is routine risk, and a representative trial passed. This website does not certify high-risk activities.","的前提是：全部必要条件通过、属于常规风险，并通过代表性试运行。本站不能对高风险活动提供安全认证。"],
["+ Add activity","+ 添加任务"],
["All calculations happen in your browser. Do not enter sensitive information; this page does not store assessment responses.","全部计算均在浏览器内完成。请勿填写敏感资料；本页面不会保存测评回答。"],
["Calculate ReadyGap report","生成 ReadyGap 测评报告"],["YOUR RESULTS","你的测评结果"],["Ready to measure your gap?","准备发现你的 AI 就绪度缺口了吗？"],
["Complete the numerical indicators and workflow checks above to generate a report. Missing scores and peer rankings are never fabricated.","完成上方量化指标与任务检查即可生成报告。缺失分数和未经验证的同类排名不会被虚构。"],
["← Back to homepage","← 返回官网首页"],["Measure the readiness of the entity, not the intelligence of the model.","测量主体的就绪度，而不是模型的智能水平。"],
["Measurement model","测量模型"],["Indicator definitions","指标定义"],["Scoring method","计分规则"],
["Experimental and self-reported. No certification, percentile, ROI forecast or evidence verification. MIT licensed.","实验性自评。本站不提供认证、全球百分位、ROI 预测或独立证据核验。MIT 许可。"],
["2 indicators","2 项指标"],["Definition, evidence and improvement","查看定义、证据和改进行动"],
["Why it matters:","为什么重要："],["Numerator:","分子："],["Denominator:","分母："],["Evidence:","证据："],["Action to improve:","改进行动："],["Limits:","边界与限制："],
["Activities meeting the criterion","符合标准的活动数（分子）"],["Applicable activities in scope","范围内适用活动数（分母）"],["Blank = unknown","未知则留空"],["0 = N/A","0 = 不适用"],["Evidence status","证据类型"],
["Self-reported","自行填报"],["Documented (self-reported)","文件支持（自报）"],["Observed (self-reported)","观察／演示（自报）"],
["Activity name","任务名称"],["e.g., Weekly technical report","例如：每周项目技术报告"],["AI suitability","AI 适用性"],["Not screened","尚未判断"],["Eligible","适用"],["Not AI-suitable","不适用 AI"],["Risk category","风险类别"],["Routine","常规风险"],["High risk / regulated","高风险／受监管"],
["Monthly hours (optional)","每月工时（可选）"],["Hours","小时"],["Exclusion reason (if ineligible)","排除原因（若不适用 AI）"],["Brief reason","请简要说明"],
["Reference window","参考周期"],["Past 30 days","最近 30 天"],["Representative trial","代表性试运行"],
["Not tested","尚未测试"],["Passed","通过"],["Failed","未通过"],["Remove activity","移除任务"],["Unknown","未知／待核实"],["Pass","满足"],["Fail","缺失"],
["YOUR READYGAP REPORT · V0.1","你的 ReadyGap 报告 · V0.1"],["AI Readiness Profile","AI 就绪度画像"],
["ReadyScore · Entity capability","ReadyScore · 主体能力"],["Ready Coverage · Pilot readiness","Ready Coverage · 试点准备覆盖率"],
["Experimental 0–100 score, not a global percentile","实验性 0–100 分；不是全球百分位"],["Insufficient information for a composite score","信息不足，暂无法计算综合分数"],
["Six-domain capability profile","六维能力画像"],["Workflow coverage and constraints","任务覆盖情况与已知约束"],["Unlock Next · Recommended next actions","Unlock Next · 下一步改进行动"],
["Copy aggregate summary (no activity names) ↗","复制汇总摘要（不含任务名称） ↗"],["Summary copied ✓","摘要已复制 ✓"],["Clipboard unavailable. Use HTTPS or localhost.","无法访问剪贴板。请使用 HTTPS 或 localhost。"],
["No activities added. Ready Coverage cannot be calculated.","尚未添加活动，无法计算任务覆盖率。"],
["Passed trial · pilot-ready (routine risk)","试运行通过 · 常规风险任务已具备试点条件"],
["All preflight checks met · trial pending","前置条件已满足 · 等待试运行"],
["Known blocking conditions","存在明确的阻断条件"],["Necessary conditions not verified","必要条件尚未核实"],
["Representative trial failed","代表性试运行未通过"],["High-risk · specialist review required","高风险 · 需要专业审核"],
["Not included in eligible activity denominator","未计入适用活动分母"],
["No one-change unlock identified. Verify missing conditions or conduct a representative trial.","暂未发现仅需修复一项条件即可进入试运行的任务；建议先核实缺失条件或开展试运行。"],
["An unlock only means the last known pre-trial blocker may be removed. It does not imply a successful trial. Outcomes, risks, and implementation costs are not included.","“解锁”仅表示可能移除最后一项已知的试运行前阻碍，不代表试运行成功。实际收益、风险和实施成本不计入本次评分。"],
["Please check your inputs:","请检查输入："],["Could not load the assessment:","无法加载测评："],
[". Serve this site over HTTP rather than opening file://.","。请通过 HTTP 服务打开网站，不要直接用 file:// 打开。"],
["Unknown","未知／待核实"],
["Less than 9/12 applicable measured indicators","有效指标少于 9/12，暂不计算综合分数"],
["At least one domain has no applicable measurement","至少一个维度没有可用的计量指标"],
["Unexpected questionnaire structure","量表结构与预期不一致"],
["No screened eligible activities","尚无经过筛选的 AI 适用任务"],
["Small eligible sample; not representative","适用任务样本较小，不能视为具有代表性"],
["Some activities have unknown AI eligibility","部分任务的 AI 适用性尚未判断"],
["High-risk activities require external specialist approval, not auto-certification","高风险活动需要独立专业审批，不能自动认定为安全"],
["Unable to load the assessment definitions","无法载入测评定义"],
["numerator","分子"],["denominator","分母"],["evidence status","证据类型"],
["0 / 0","0 / 0"]
];
const originalText=new WeakMap(), originalAttributes=new WeakMap();
const attributes=["placeholder","aria-label","title"];
export function normalizeLanguage(value){return value==="zh"||value==="zh-CN"?"zh":"en";}
export function buildDictionary(indicators,gates){
  const d=new Map(pairs);
  for(const item of indicators?.domains||[]){if(item.title_en&&item.title_zh)d.set(item.title_en,item.title_zh);}
  for(const item of indicators?.indicators||[]){
    for(const f of ["title","what","why","numerator","denominator","evidence","action","caveat"]){
      const en=item[f+"_en"],zh=f==="title"?item.title_zh:item[f];
      if(en&&zh)d.set(en,zh);
    }
  }
  for(const gate of gates?.gates||[]){
    for(const f of ["title","requirement","action"]){
      if(gate[f+"_en"]&&gate[f+"_zh"])d.set(gate[f+"_en"],gate[f+"_zh"]);
    }
  }
  return d;
}
export function translateText(english,d){
  if(d.has(english))return d.get(english);
  let m;
  if((m=/^((?:D[1-6]|I[0-9]{2})) · (.+)$/.exec(english)))
    return m[1]+" · "+(d.get(m[2])||m[2]);
  if((m=/^(.+) · AI Readiness Profile$/.exec(english)))
    return (d.get(m[1])||m[1])+" · AI 就绪度画像";
  if((m=/^(.+): enter both numerator and denominator, or leave both blank if unknown\.$/.exec(english)))
    return m[1]+"：请同时填写分子和分母；如果未知，请两项都留空。";
  if((m=/^(.+): expected integer counts with 0 ≤ numerator ≤ denominator$/.exec(english)))
    return m[1]+"：应填写整数，且 0 ≤ 分子 ≤ 分母。";
  if((m=/^Activity (\d+) requires exclusion reason$/.exec(english)))
    return "任务 "+m[1]+"：请填写不适用 AI 的原因";
  if((m=/^Activity (\d+): hours must be nonnegative$/.exec(english)))
    return "任务 "+m[1]+"：工时不能为负数";
  if((m=/^(I[0-9]{2}) (numerator|denominator|evidence status)$/.exec(english)))
    return m[1]+" "+(d.get(m[2])||m[2]);
  if((m=/^(\d+) of (\d+) eligible activities passed all checks and a representative trial$/.exec(english)))
    return m[2]+" 项适用活动中，有 "+m[1]+" 项通过全部检查和试运行";
  if((m=/^(\d+) potential trial unlock\(s\)$/.exec(english)))return m[1]+" 项任务可解锁试运行";
  if((m=/^(\d+) failed check\(s\)$/.exec(english)))return m[1]+" 项检查未通过";
  if((m=/^(\d+) unverified check\(s\)$/.exec(english)))return m[1]+" 项检查尚未核实";
  if(english.startsWith("Scored ")&&english.includes("Evidence: self-reported")){
    return english.replace("Scored ","已计分 ").replace(" · Unknown "," · 未知 ")
      .replace(" · N/A "," · 不适用 ").replace("Evidence: self-reported ","证据：自行填报 ")
      .replace(", documented (self-reported) ","、文件支持（自报） ")
      .replace(", observed (self-reported) ","、观察／演示（自报） ")
      .replace("Evidence is not independently verified by this website.","本站未独立核实这些证据。");
  }
  if(english.startsWith("Eligible ")&&english.includes(" · Ineligible ")){
    return english.replace(/^Eligible /,"适用 ").replace(" · Ineligible "," · 不适用 ")
      .replace(" · Eligibility unknown "," · 适用性未知 ")
      .replace(" · High risk "," · 高风险 ").replace(" · Hours-weighted coverage "," · 按工时加权覆盖率 ");
  }
  // Compound text nodes, including "D1 · Scope & Intent" and "I01 · Indicator".
  for(const [from,to] of [...d.entries()].sort((a,b)=>b[0].length-a[0].length)){
    if(from.length>=15&&english.includes(from))return english.replaceAll(from,to);
  }
  return english;
}
export function applyAssessmentLocale(doc,language,dictionary=new Map(pairs)){
  const lang=normalizeLanguage(language);
  doc.documentElement.lang=lang==="zh"?"zh-CN":"en";
  const walker=doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
    if(!node.parentElement||["SCRIPT","STYLE"].includes(node.parentElement.tagName))continue;
    if(!originalText.has(node))originalText.set(node,node.nodeValue);
    const orig=originalText.get(node),t=orig.trim();
    if(!t||lang==="en"){node.nodeValue=orig;continue;}
    node.nodeValue=orig.slice(0,orig.indexOf(t))+translateText(t,dictionary)+orig.slice(orig.indexOf(t)+t.length);
  }
  for(const element of doc.querySelectorAll("[placeholder], [aria-label], [title]")){
    if(!originalAttributes.has(element)){
      const attrs={};for(const attr of attributes)if(element.hasAttribute(attr))attrs[attr]=element.getAttribute(attr);
      originalAttributes.set(element,attrs);
    }
    for(const [attr,original] of Object.entries(originalAttributes.get(element))){
      element.setAttribute(attr,lang==="zh"?translateText(original,dictionary):original);
    }
  }
  for(const btn of doc.querySelectorAll("[data-language]")){
    btn.setAttribute("aria-pressed",String(btn.dataset.language===lang));
  }
  return lang;
}
