# Indicator Register — 12 candidate quantitative metrics v0.1

This is a **proposed** measurement instrument, not a validated scale. Every indicator covers the same stated 30-day period and a clearly documented scope. Counts are supplied separately from task-gate records. A zero denominator means N/A, never zero readiness; missing is Unknown. Self-reported numbers do not equal externally verified evidence.

**Scope rule:** pre-screen a representative activity inventory; no selecting only AI success stories. Relevant tasks for each item are defined by its denominator. An item's numerator counts only those satisfying **all** its stated conditions. Changes cannot be scored by quietly deleting difficult activities from scope.

**Five necessary questions:** What does this measure? Why is it necessary? What exact count/denominator makes it numeric? What could independently verify it? What controllable intervention improves it?

## I01 · 任务定义覆盖率 (Task specification coverage) · D1

- **测量对象 What:** 评估范围内具备明确输入、输出、成功标准的活动占比。
- **必要性 Why:** 没有可检验的成功条件，AI 结果无法客观验收。
- **量化 Numerator:** 符合输入、输出、验收标准三项均成文的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 样本活动清单、任务契约或流程卡。
- **改进行动 Action:** 为缺失活动制作一页任务契约与验收标准。
- **边界/失效 Caveat:** 避免只收录容易定义的成功案例。

## I02 · 基线可测率 (Baseline measurability) · D1

- **测量对象 What:** 相关活动在介入 AI 前具有可重复采集的时间或质量基线的占比。
- **必要性 Why:** 没有基线就无法验证改善幅度与副作用。
- **量化 Numerator:** 有时间或质量基线且标注采集方式的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 带日期的工时记录、错误率或质量审查记录。
- **改进行动 Action:** 先在目标活动上记录至少一次可复核基线。
- **边界/失效 Caveat:** 一次性主观估计不等于稳定基线。

## I03 · 授权情境可获得率 (Authorized context accessibility) · D2

- **测量对象 What:** 需要外部情境的活动中所需材料在授权范围内可取得的占比。
- **必要性 Why:** 模型无法凭空获得任务所依赖的私有情境。
- **量化 Numerator:** 必要材料可访问且获使用授权的活动数。
- **分母 Denominator:** 评估范围内需要外部资料的 AI 适用活动数。
- **核验证据 Evidence:** 资料目录、访问权限截图、授权说明。
- **改进行动 Action:** 统一整理所需资料并修复访问/授权缺口。
- **边界/失效 Caveat:** 必须同时满足可访问与授权；没有情境需求则 N/A。

## I04 · 来源与时效可核查率 (Provenance and freshness coverage) · D2

- **测量对象 What:** 需要外部情境的活动，其关键信息具备可核查来源与更新机制的占比。
- **必要性 Why:** 知识可用但不可追溯、过期时仍会导致错误。
- **量化 Numerator:** 来源可追溯且有更新责任/日期的活动数。
- **分母 Denominator:** 评估范围内需要外部资料的 AI 适用活动数。
- **核验证据 Evidence:** 来源链接、版本、资料所有者与更新日期。
- **改进行动 Action:** 为高频资料补齐版本、来源与更新责任人。
- **边界/失效 Caveat:** 仅有文件名而无可信来源不满足要求。

## I05 · 合规 AI 工具可达率 (Authorized AI tool access) · D3

- **测量对象 What:** 适用活动中至少有一条获准、稳定可用的 AI 使用路径的占比。
- **必要性 Why:** 订阅与采购不等于具体任务可使用。
- **量化 Numerator:** 至少有一条获准工具路径的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 获准工具清单、权限记录、访问试验。
- **改进行动 Action:** 明确任务对应工具与使用边界，修复授权/访问。
- **边界/失效 Caveat:** 未经允许上传数据不算合规可达。

## I06 · 可控操作接口覆盖率 (Controlled action/handoff coverage) · D3

- **测量对象 What:** 需要对外部系统采取行动的活动，具备受控接口或明确人工执行交接的占比。
- **必要性 Why:** 只生成文本无法完成需执行的闭环任务。
- **量化 Numerator:** 具备授权 API/工具接口或可验证人工交接的活动数。
- **分母 Denominator:** 适用且需要外部动作的活动数。
- **核验证据 Evidence:** API 权限记录、工具清单或人工交接作业卡。
- **改进行动 Action:** 构建最小授权接口或标准化人工接单协议。
- **边界/失效 Caveat:** 纯阅读任务无需接口：分母为零时 N/A。

## I07 · 人机角色清晰率 (Human–AI role clarity) · D4

- **测量对象 What:** 适用活动中明确 AI 负责内容、人工责任与关键交接点的占比。
- **必要性 Why:** 权责不清容易造成流程断裂和错误传播。
- **量化 Numerator:** AI/人工责任与交接点均明确的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 工作流图、责任矩阵、交接记录。
- **改进行动 Action:** 制定包含异常接管点的责任与交接图。
- **边界/失效 Caveat:** 只写“人机协同”而无角色划分不算。

## I08 · 流程可复现率 (Workflow reproducibility) · D4

- **测量对象 What:** 适用活动中具备可重复执行的工作步骤与输入输出接口的占比。
- **必要性 Why:** 一次性演示不代表可以在日常业务重复。
- **量化 Numerator:** 第三方按说明可复现主要步骤的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 执行手册、流程模板、重复执行记录。
- **改进行动 Action:** 沉淀可复现 SOP 或简单工作流。
- **边界/失效 Caveat:** 本指标测流程规范，不替代端到端运行试验。

## I09 · 结果验证可实施率 (Executable evaluation criteria) · D5

- **测量对象 What:** 适用活动中有可操作结果检查步骤及失败标准的占比。
- **必要性 Why:** 高质量 AI 应用必须能够发现错误。
- **量化 Numerator:** 存在可执行验收/校验规则的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 检查清单、测试用例、审查标准。
- **改进行动 Action:** 为关键结果建立样例与可重复核验规则。
- **边界/失效 Caveat:** “看着差不多”不算可执行评估。

## I10 · 监督恢复准备率 (Oversight and recovery coverage) · D5

- **测量对象 What:** 适用活动具备适当权限、人工监督、异常上报与恢复路径的占比。
- **必要性 Why:** 无法接管和纠错的流程不适合持续运行。
- **量化 Numerator:** 同时具备权限监督、异常处理与恢复路径的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 审批/撤销权限、应急流程、责任人。
- **改进行动 Action:** 增加审批、人工接管或回滚设计。
- **边界/失效 Caveat:** 高风险活动另需专业审查，不能用高分替代。

## I11 · 改进数据可采集率 (Learning instrumentation coverage) · D6

- **测量对象 What:** 适用活动中已定义并能够采集质量、时间或错误等反馈信号的占比。
- **必要性 Why:** 没有反馈，组织无法判断 AI 应用是否恶化或改善。
- **量化 Numerator:** 具有反馈记录方案与可采集信号的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 日志字段、记录模板、监控指标定义。
- **改进行动 Action:** 为运行活动增加轻量反馈记录。
- **边界/失效 Caveat:** 本项是记录能力，不是既有收益或成功率。

## I12 · 反馈闭环责任覆盖率 (Feedback ownership coverage) · D6

- **测量对象 What:** 适用活动中明确反馈责任人及复测/纠正触发条件的占比。
- **必要性 Why:** 错误记录不自动转化为系统性改进。
- **量化 Numerator:** 明确责任人及复测或纠正触发规则的活动数。
- **分母 Denominator:** 评估范围内已筛选为 AI 适用的活动数。
- **核验证据 Evidence:** 变更责任矩阵、复测流程、纠正触发规则。
- **改进行动 Action:** 设置迭代责任人和最小复测机制。
- **边界/失效 Caveat:** 不要用已节省工时或已实现 ROI 作为本项分子。

## Why these are not arbitrary Likert items

The 12 metrics use reproducible counts in explicit populations rather than personal sentiments ("we value AI"). This improves transparency but does **not** prove content validity, comparability, or prediction. The same underlying activity might inform an entity indicator and a task gate; the **scoring engine requires separate inputs**, and prospective research must test double counting/construct overlap.

## What is deliberately excluded from ReadyScore

Actual AI adoption frequency, prompt counts, productivity growth, revenue, savings, model subscriptions, GPU budget, AI vendor choice and international percentile. They may be useful context, predictors, or outcomes, but including them as readiness would obscure the construct.

## Change control

New indicators must include all five contract fields and a falsifiable failure case. Changes to denominator, eligibility or thresholds require a schema-version change and a migration/calibration note.
