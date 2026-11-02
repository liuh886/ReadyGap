# ReadyGap — Research Thesis / 核心研究命题

**Status:** Foundational hypothesis, not yet an empirically demonstrated causal claim.  
**Project:** ReadyGap (public brand) · Universal AI Readiness Index / U-ARI (proposed measurement framework).

> **Measure the readiness of the entity, not the intelligence of the model.**  
> 测量主体的就绪度，而不是模型的智能水平。

## 1. Why another kind of measurement? / 为什么测量主体？

今天，人们可以通过大量基准测试、排行榜和技术报告观察基础模型的推理、编码、多模态和工具使用能力如何进步。相较之下，**个人、团队、部门、企业和各类组织是否真正准备好利用这些能力**，同样值得持续、公开和可检验地测量。

Today's AI ecosystem closely tracks the advancing capability frontier. Yet the capacity of the *adopting entity*—an individual, team, department or organization—to absorb and operationalize available AI is a distinct locus of intervention.

我们的判断是：

**AI 技术能力的增长，与主体吸收、整合和利用 AI 的能力，是两个可以分别改善的变量。**

They are not assumed statistically independent. Rather, model makers and adopting entities can improve different constraints through different actions. A better model does not by itself repair an inaccessible knowledge base, an undefined business process, a missing authorization, or an absent human handoff.

对很多传统行业和组织而言，后者可能是眼前更直接的约束；这是一项需要分行业、分活动检验的研究假设，而非普遍定律。

## 2. Central proposition / 核心命题

> **As foundation models become increasingly capable and accessible, an organization's ability to absorb, operationalize, and govern AI becomes a critical determinant of realized value.**

随着基础模型能力持续增长并日益普及，组织吸收、运行和治理 AI 的能力，正成为决定 AI 能否真正创造价值的关键因素。

The same proposition is intended to be generalized—with a suitable definition of agency, scope, and accountability—to people, teams, departments, enterprises and other entities.

一家公司并不一定需要最先进的模型才可以创造显著价值：如果它能整理知识、明确流程、建立受控接口与可验证的质量规则，现有模型就可能胜任一些有意义的工作。反过来，购买最先进的模型 API 并不自动建立这些条件。它可能仍停留在聊天助手和孤立试点阶段。

**AI Adoption ≠ AI Readiness ≠ AI Value Realization.**

- **Readiness / 就绪度：** 在特定范围内，主体拥有或可获得的可用能力和运行条件（我们试图测量的前置状态）。
- **Adoption / 采用行为：** 是否、何时以及在什么工作中实际使用了 AI（不自动说明运行质量）。
- **Value Realization / 价值实现：** 经对照或基线验证的净时间、质量、成本、风险或其他目标上的实际变化（独立结果变量）。

The distinction prevents circular logic: we should not define readiness by already having achieved positive AI outcomes and later claim readiness predicts those same outcomes.

## 3. Reverse the direction of assessment / 从活动而不是资源清单出发

典型的组织成熟度评估常从战略、制度、技术资源、人才等要素出发。它们有价值，但高分未必指出哪个实际工作已具备运行条件。

ReadyGap 的差异化方向是以**主体真实开展的活动**为入口：

1. 这个主体实际开展什么活动，活动的目标和验收标准是什么？
2. 哪些活动在合理的风险、成本和权限条件下适合 AI 参与？
3. 对每项适用活动，AI 是否能获得必要知识、使用受控工具、完成明确交接、接受结果验证和人工监督？
4. 哪些必要条件缺失？哪些只是尚未核实？
5. 修复哪一项具体条件会首先使哪些活动进入试点验证？
6. 一段时间后，实际任务表现与收益是否改变？

> **AI Readiness 的核心并不是主体拥有多少 AI 资源，而是其现有活动在多大程度上能够被 AI 理解、调用、参与执行，并得到适当监督。**

这里的“执行”不意味着每项活动都应该由自主 Agent 接管。对很多个人和低风险任务，使用 AI 辅助分析、由人执行即可构成适当的整合模式。

### The strong-Agent thought experiment / Agent 压力测试

> **If an adequately capable AI agent were available today, what could this entity actually let it do, and exactly where would it be blocked?**

如果今天给一个主体能力足够强的 AI Agent，它究竟能做什么，又会在哪里被卡住？

This is a **diagnostic thought experiment** to expose entity-side constraints, not an assumption that sufficiently capable agents exist for every task or should receive unrestricted autonomy. Model limitations, task suitability and independent safety reviews remain real and separate.

## 4. Three principles / 项目的三个关键判断

### A. Research the adopting entity, not only the model

研究对象是主体的 **AI 吸收能力（AI absorptive capacity）**：可借鉴组织学习、吸收能力、技术扩散和数字化转型研究，但不能预先把个人能力与企业治理强行套用相同的具体组织结构。

### B. Optimization, not maximal scoring

**得分越高不必然越好。** 对于任务少、风险低的小主体，庞大的 IT 平台、多级治理或自主 Agent 系统可能是过度建设。合理就绪度应当**匹配任务价值、成本和风险**。一个总分不能替代是否值得投入的判断。未来应评估过度投入或不必要自动化的机会成本。

### C. Actionable gaps, not vanity scores

最有价值的输出不是排行榜数字，而是找到阻碍 AI 参与实际活动的**最小可行动缺口**，说明如何缩小缺口，并在后续重新检验。随着模型进步，可重新筛查哪些活动技术上变得可行，而主体端的能力变化必须有版本可比的度量。

## 5. Two scores, two units / 双指标及边界

- **ReadyScore (0–100)** — candidate composite of **entity-level capabilities** across six domains. It is an unvalidated, scope-bound, exploratory inventory score and must display its evidence state.
- **Ready Coverage (0–100%)** — fraction of a defined and screened set of AI-eligible activities satisfying **all required operational gates**, plus a passed representative trial (routine-risk scope only in v0.1). Unknown, untested and high-risk conditions are disclosed, not silently counted as successes.

These are conceptually distinct, not proven statistically independent. The same answers must not mechanically calculate both indices.

**Outcomes** (net saving, quality, errors, risk and value) are recorded **separately** for later validation. High score or high coverage is never an AI safety certification.

## 6. What would validate or falsify the thesis? / 如何验证、证伪？

ReadyGap should be able to test whether baseline readiness and coverage forecast later reliable AI use **beyond** a simpler strategy/resources checklist, controlling for prior adoption, digital maturity, task difficulty, sector and entity type.

A useful empirical test has two groups or timepoints: baseline readiness and task conditions are recorded first; actual deployment, quality, risk and net value are measured later. Interventions targeted at identified blockers should be compared with more generic improvement advice.

**Failure cases we must accept:**

- No added predictive value over simpler assessments after adequate adjustment;
- Low agreement on gate classification or numerator/denominator definitions;
- Big score movements caused solely by cherry-picked activities or changing the denominator;
- Systematically unfair comparisons across individuals, departments and companies;
- High risk of users optimizing scores instead of useful, responsible work.

If these occur, we must revise the construct or limit claims—not market numerical precision as scientific validity.

## 7. The public proposition / 面向公众

**ReadyGap — Know your readiness. Unlock your potential.**

一个不依赖特定模型厂商、可以让任何主体参与的开放测评：它试图告诉你**你已经具备什么条件、什么实际活动可以安全而有效地进入试点、以及下一步最值得修复什么约束**。

Formal research framework: **Universal AI Readiness Index (U-ARI)**. Its global cross-type comparability is a research objective, **not yet an achieved property** of this experimental prototype.
