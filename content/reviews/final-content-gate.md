# COMMPASS 最终内容闸门审计

> 状态说明（2026-09-11）：本报告记录进入信息架构前的审计快照。其后已分别完成节点与关系的独立发布资格复核；当前机械白名单与生成数据以 `content/reviewed-nodes.json`、`content/reviewed-relations.json` 和 `content/data/` 为准。

审计及复审日期：2026-09-11。审计角色：Astra，独立于候选内容撰写。只创建及更新此报告，没有修改数据。复审仅定点回访已登记来源，没有增加文献或扩张节点事实。

## 最终裁决

**PASS：五项内容硬闸门通过，可进入使用真实内容的信息架构、低保真及高保真原型，随后按 PROJECT_PLAN 的顺序进入正式前端开发。**

首次审计的唯一覆盖阻断已经解除：r6-decolonial 经 D01—D03 支撑进入完整样本，以 r6-cultural-studies 回到候选层的方式保持 15 个上限。复审确认新样本满足本体 §10.3 所需的非西方知识生产视角及外推边界，依据是学术主张和定位，而非课程规范或作者国籍。80 个骨架节点、15 个完整样本、22 条关系和 87 个来源均通过当前流水线，未发现新的开发前内容硬缺口。

本 PASS 是内容样本与开发准入裁决，不是学术发布、前端质量或学生可用性验收。当前全部节点与关系仍未进入 reviewed/published，默认已审核学术图仍为 0 条边；不得据此批量升级状态。世界各地传播思想的详尽覆盖不是本次通过结论，地方原典与区域经验仍须持续补充。

可以继续：按真实数据完成八区导航、阅读优先详情、关系探索、搜索和移动端的信息架构与原型，再进入前端实现。下文内容状态规则属于开发和验收的必要条件，不能省略。

## 审计范围和验证方式

完整阅读：AGENTS.md、PROJECT_PLAN.md、content/ONTOLOGY.md、三个 content/schema/*.json、content/data/nodes.json、relations.json、sources.json、areas.json、两份 *second-review.md、research/pending-source-verification-global.md、scripts/normalize_research_data.py、assemble_content.py、validate_content.py。另核对现有框架综合、候选机械校验、来源合并校验、内容调研规范和完整节点短名单。

首次审计依据现有核查记录与最终数据的一致性，没有回访网页。本次复审完整阅读新节点、research/decolonial-sources.json、content/complete-node-selection.json 及调整后的 assemble/normalize 脚本，核对短名单，并定点读取 D01 作者上传全文、D02 机构仓储全文及 G09 课程页面中所引部分。D03 DOI 本轮打开失败，沿用既有摘要登记，不声称复核全文；D01/D02 足以独立承担解除覆盖阻断所需的核心论据。不宣称全部旧来源已重新核验。

为遵守“不修改数据”，实际调用 normalize 与 assemble 的 main 函数时截获写入函数，将完整序列化输出与现有文件逐字比较；assemble 读取内存中的 normalize 结果。随后实际调用 validate_content.main() 校验磁盘数据。三个脚本均实际执行，退出码 0；未用手工拼接替代流水线。

```text
IDENTICAL: content/data/sources.json
IDENTICAL: content/data/candidate-nodes.json
IDENTICAL: content/data/nodes.json
IDENTICAL: content/data/relations.json
assembled 80 nodes (15 complete) and 22 relations
PASS: 80 nodes / 15 complete / 22 relations / 87 sources / 8 areas / 7 types
```

补充只读检查：中文主名、原文名、ID 与 slug 无完全重复，80 条原文名均非空；来源 URL 和非空 DOI 无完全重复；非 pending 的 119 项主张均有 evidence；来源无未来访问日期；所有 evolving 节点三项时效字段非空。以上证明字段与当前集合的一致性，不证明词义重复、真实访问日期或学术事实正确。selection 的 15 项均唯一、可解析且与实际 complete 集合一致；文化研究草案仍保留，但当前节点为 candidate。

## 五项硬闸门

| 闸门 | 裁决 | 依据与边界 |
|---|---|---|
| 国内外课程、教材和学术组织来源清单 | PASS：来源地图成立 | 87 个可解析来源；39 official_record、29 primary_scholarship、18 scholarly_synthesis、1 teaching_resource。包含中国高校及国家标准、欧美与亚洲和非洲课程入口、QAA/NCA/ICA/IAMCR、中文教材、英文教材和方法手册。此闸门要求建立来源清单，并不等于全部原文已核。 |
| 八区及经典、中国、非西方、前沿覆盖 | PASS：最低真实样本覆盖成立 | 八区均有多源候选支持，经典与中国内容已有完整样本，平台治理有中国法域原文。新增完整 r6-decolonial 以 D01/D02 的具体论述验证知识生产位置、跨情境推论、区域内部差异与学术资源分配，不再仅靠 G02 的课程要求或 G08/G09 的课程线索。本体 §10.3 的缺口已解除；不等于各大洲理论和人物均已完整收录。 |
| 本体、关系、来源、争议与命名规则 | PASS：足以驱动下一阶段设计 | 七类节点、十种语义关系、单一主区和跨区理由、来源类型/可读范围/主张支持/审核状态四层区分、争议与时效规则已经确定。中文主名、原文名和带类别的别名可表达现有命名边界。若进入开发仍需把下文状态规则落实成统一选择器，不能让各页面自行解释。 |
| 12—15 个完整节点验证详情结构 | PASS：15 个结构样本；不等于发布通过 | 七类型齐全，八区均有完整主区样本，有人物、模型版本、规范/经验区别、动态法规、非西方伞形入口和方法程序等边界；全部有简述、学习价值、主张、边界、来源和下一站。允许 10 项显式 pending 保留。 |
| 60—80 骨架去重、命名、关系、来源校验 | PASS：当前 80 条集合 | 80 总节点＝65 candidate＋15 complete；22 条关系；87 来源。Schema、外键、端点类型、自环、对称关系重复等当前脚本检查通过；补充主名/原文名及来源精确重复检查通过。没有因新完整节点缺少学术边而补造连线。 |

八区主区分布与完整样本分布：

| 主区 | 总节点 | 完整样本 |
|---|---:|---:|
| 传播如何发生 | 12 | 2 |
| 意义如何生成 | 9 | 2 |
| 媒介如何塑造社会 | 9 | 1 |
| 信息如何影响个人与群体 | 12 | 1 |
| 新闻、组织与公共传播如何运作 | 12 | 6 |
| 权力、文化与身份如何进入传播 | 9 | 1 |
| 数字平台、算法与人工智能如何改变传播 | 8 | 1 |
| 传播如何被研究和应用 | 9 | 1 |

15 样本的类型为：concept 1、research_topic 3、theory_model 4、tradition 3、application 1、method 1、person 2。第 5 区样本明显较多，这是当前内容密度的事实，不能用相同视觉大小暗示各区已有同等内容成熟度。

## 第二轮修订闭环

中国五节点的主要阻断已经落实：C15 校正为所引 2021 版；罗喆姓名正确；C16 使用实际段落定位；C13/C15/C16/C19 按片段访问登记；方汉奇履历区分 2017 年刊载与 2009 年口述；S028 去除未定位引语，相关定位改至 102—104 页；PR 节点已删除缺乏正文支持的 G10 课程主张。三项中国 pending 被保留，没有靠状态提升掩盖缺口。

全球十节点的样本问题也已处理：过程入口明示编辑分组和未核原文；把关前史仍 pending；公共领域定义和 Fraser 批评有后续全文核查记录；方法程序在摘要中明确为编辑练习安排；媒介理论对照关系已改 interpretive。G17 已有后续原文闭环，故把关与议程设置对照恢复为 interpretive 有记录依据，并非忽略第二轮要求。

G16 的关键纠正有实质意义：最终数据按 1973 稿写四种位置，没有把该稿当作三分法证据。后续三分版本仍需另核，不能删去版本限定。`r2ed-l1` 仍谈三分法，前端必须保留其 S006 接收研究语境，并与当前 G16 四分稿分开显示。

`rel-cultural-studies-has-hegemony` 仍是 pending，且目标是复合概念“意识形态与霸权”。保留为待核任务可以验证关系证据结构，但不得在任何有效学术图层绘制，也不得以透明开关绕过复合端点问题。

## 前端必须执行的内容状态规则

以下规则是本次 PASS 的开发约束，不是本报告已经证明页面行为通过。当前没有页面实现可供本轮验收，故不能声称产品“已经”做到这些区分。

### 1. 默认导航、内容卡和审核图分开

八区与有标签的候选入口可以构成导航。每个候选卡同时显示“候选入口”及其核实情况；`candidate_evidence_status: direct` 只表示入选线索有支持，不能翻译为“该理论已核实”。未完成详情使用 candidate_note 和 source_leads，不生成占位定义或从相邻完整节点补写事实。

15 个完整样本全部仍为 ready_for_review、reviewed_at=null。卡片应显示“完整样本·尚未审核发布”，不能把 complete 显示成“已核验”。当前不存在 reviewed 或 published 节点。

### 2. 默认学术边必须同时检查审核、证据和端点

默认有效学术边至少满足：关系 review_status 为 reviewed/published、reviewed_at 非空、evidence_status=direct，且两端符合公开节点规则、存在对应记录。任何一项不满足都不绘制。不能只用 evidence_status=direct 筛选。

当前关系分布为 direct 10、interpretive 11、pending 1，但 22 条全部 ready_for_review。因此**当前默认可绘制的已审核学术边为 0 条**。零边应作为合法状态显示，不能为图形效果自动升级、补造或恢复已删关系。

解释型边只能进入独立、默认关闭的“编辑解释/比较”层；未审核的解释型记录还须明确“待审核样本”，不能被该开关授予发布资格。pending 关系只能进待核证据记录，不能作为有效学术连线。learning_links 只生成“下一步学习”，不转为 proposed、builds_on 或任何学术边。

### 3. pending 与解释性主张在当前阅读位置可见

主张读取时必须遍历 key_points、limits_or_debates、positions、propositions、limitations、internal_differences 六个集合，不能只检查 key_points。每项 pending 的标签紧邻文字，默认折叠于“待核实内容”；不进入肯定式搜索摘要、首页摘要、知识要点摘录或推荐理由。

interpretive 展示“编辑归纳/解释”，附来源和推理边界；不能只放一个难以理解的英文状态。摘要、命名边界、法域/版本限制需要在正文前可见。内容分析的 data_requirements 和 typical_procedure 必须在其分区标题或首句再次标“编辑性练习安排”，不能指望学生记住长摘要末句。

包含 pending 的完整节点保持 ready_for_review/draft，不得整体转 reviewed/published。应通过既有编辑流程处理待核内容后再做正式发布判断，不能由此报告或 UI 过滤自动升级数据状态。

### 4. 来源与时效不作过度承诺

source_type 说明材料性质；access_status 说明本轮实际可读范围；claim evidence_status 说明对该主张的支持；review_status 说明编辑流程。四者分别展示。

full_text 不能译成“所有主张已经核实”，excerpt 不译成“全文”，metadata 不译成“已读正文”。来源卡显示实际来源 URL、定位、访问日期和范围说明；核查报告里的备用 PDF/配套网页若被用于学生复核，应在后续资料整理中准确接入，不能只给 DOI 而让配套 locator 无处访问。当前 G25 的作者网页、G17/G23/S010/S015 的可读副本等在核查报告中存在，但尚非独立的结构化备用链接字段。

evolving 节点显示 as_of、last_evidence_check、next_review_due 和 current_evidence_state。候选节点经机械规范化填入的日期不能冒充逐条原文核验；`last_evidence_check: null` 显示“尚未记录”，不能回填 updated_at。平台治理必须同时显示中国/欧盟法域和版本限制，不能用一个 2026-09-11 日期暗示欧盟法全部更新到当日。

none_identified 显示“本轮未发现需新增的已定位争议”，不显示“无争议”；contested 不自动表示证据不足。

### 5. 后续验收的确定性断言

在当前数据快照上，页面至少应满足：默认已审核图谱 0 边；65 候选入口均带成熟度标签；15 完整样本均不显示为发布通过；10 pending 主张不会进入肯定式摘要；1 pending 关系不在学术图中；11 interpretive 关系不会混入默认事实层；学习链接不新增学术边；搜索结果保留候选/样本状态；手机卡不因截断而丢失 pending 或法域/版本标签。r6-decolonial 的标题同时保留伞形入口说明，“传播学去西方化”的别名必须连同“不作严格同义词”的 note 呈现；r6-cultural-studies 已为候选，不能从未选中的草案或入边恢复完整/已审核标签。

这些可验证断言使 pending 的保留与产品默认行为相容。它们必须在实现后通过代码和浏览器检查，不能把本报告的规则文字当成已实现证据。

## 已知欠账与最小续办

**当前无待解除的开发前硬阻断。**下一步完成真实内容信息架构与原型，将上述状态选择和展示断言纳入开发验收。不能跳过 PROJECT_PLAN 的原型阶段，把本报告理解为所有设计和发布工作已经完成。

以下不单独阻断完整样本，但阻止“内容全已核实”的交付说法：

- 10 项 pending：r1-process-k1/k3/l1/l2/l3、r1ci-l3、r5-gatekeeping-k1、r5mj-l3、r8-content-analysis-method-l2、p-fang-limit3。分别涉及原典访问、会议/报纸原件、方法边界和人物精细身份。原文化研究草案中的 r6cs-k2/i1 仍未闭环，只是不再计入当前 15 样本；不能视为其核查任务已完成。
- 65 个候选中 50 个 direct、15 个 pending；这些状态不能证明候选定义、人物身份和关系已经审核。来源线索可以证明课程/领域存在，但不支持未写出的理论命题。
- 87 来源的当前访问分布为 metadata 33、full_text 27、excerpt 12、abstract 15；research/source-register-validation.md 的旧汇总已落后于最终 JSON，应以数据复算值为准。
- 来源注记保留旧“partial/待核”记录与新核查说明，须按日期和具体主张读，不应直接拼成面向学生的状态文案。G24 的已核开篇与未核范式正文、公共领域 controversy_note 中残留的“待核批评线索”、S032 的卷期待核字样等属于后续局部清理项，不据此扩大或撤销已有证据结论。
- S001—S008 已无未来日期，但本轮只确认字段修正，不独立证明真实访问时刻。当前完整样本中编码与解码、媒介理论、议程设置和霍尔四节点的 last_evidence_check 仍为 null，应保留诚实状态，正式发布前完成可追溯复核。
- 现有 schema/validator 尚未全面硬编码按类型必填字段、非 pending claim 非空证据、真实日期先后、源记录精确重复和所有语义重复等约束。本轮现有数据通过附加人工/程序检查，不等于未来修改不再需要这些约束。
- 没有对全部 URL 重测可访问性、没有学生可用性证据、没有正式发布审核。这些属于后续阶段；本地构建通过不能替代它们。新增 D03 本次 DOI 回访失败仍应诚实显示只核摘要的既有登记，不因 D01/D02 可读而升级。

## 非西方样本复审证据

`r6-decolonial` 判定为 pass_for_complete_sample。不是按标题或字段通过：复审逐项对照了主张、定位和可读原文。

- D01 的 pp.363—365 直接对应研究对象与问题的知识生产位置、扩展证据和检验普遍化；pp.366—368 明确讨论本质主义和西方/非西方二分；pp.369—370 对应学术文化及专题孤立的限制。节点 k1/k2、i2/i3、l1/l2 的概括与这些论述匹配；没有把国别案例数量当作去西方化完成度。[D01 作者上传全文](https://www.researchgate.net/publication/267103499_De-westernizing_Communication_Studies_A_Reassessment)，本次访问 2026-09-11。
- D02 的 PDF pp.2—6 支持术语与历史边界；p.8 和 pp.13—14 支持内部异质性；pp.17—20 支持资源、语言、出版与引证问题及只关注新兴强国的限制。节点将三条路径的概括标为 interpretive，将直接论述和综述来源性质分开；没有给“全球南方”编造统一文化或理论。[D02 机构仓储全文](https://eprints.bournemouth.ac.uk/34139/13/De-Westernization_acrefore-9780190228613-e-898.pdf)，本次访问 2026-09-11。
- D03 只在 k1 使用已登记摘要的知识生产/非洲学科史论点，阅读材料明确全文待取得；本次 DOI 回访失败，所以这部分沿用摘要登记而不宣称亲核。删除 D03 的补充支持也不影响 D01/D02 对本体 §10.3 的独立支撑。
- G09 只位于学习资源，不进入 key_points/internal_differences/limits_or_debates 的主张证据；本次课程页确有 FAM2003S、FAM3000F、FAM3005F。可支持所列课程入口，不能支持理论命题或宣称全部非洲课程体系如此。[G09 开普敦大学课程目录](https://humanities.uct.ac.za/cfms/undergraduate-studies/undergraduate-courses)，本次访问 2026-09-11。JSON 仍保留 metadata，本审计未升级数据；前端按当前登记显示范围。

内部差异、命名边界和三条局限共同防止把后殖民、去殖民、去西方化看成同义理论，把西方/非西方看成纯粹阵营，或把地区强国代表全部社群。新节点未新增学术边，四个学习链接均解析到存在的记录。仍要以具体地方原典和经验研究持续深化，当前通过的是导航样本所需的最低真实内容覆盖。

## 审计快照

| 文件 | SHA-256 |
|---|---|
| content/data/nodes.json | be69151d5f6974258aef84a89e8586b06133769031ba6d71669fdc9a46ea48cf |
| content/data/relations.json | 3b34ca65ccd21207b22de59c5570f16127332ad348052b7ead5cf3856e734059 |
| content/data/sources.json | e673fdd59bca1f438c30ddd8d44d40c2e31ae09c987d0c917bd99e947dcfc84d |
| content/data/areas.json | 9e786912ec79c1c072342002dac7bee2c87fc09c1be0a6da725ce2d4c8122b42 |
| content/complete-node-selection.json | 0297a9b6a8671f722761332f42a6bbe7f33e9d0e18412d354daf1e844a2b6c90 |

数据修改后本结论须针对变化复核，不能继续引用旧快照作为自动放行依据。
