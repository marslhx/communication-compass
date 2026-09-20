# 全球 10 节点第二轮独立审查

审查日期：2026-09-11。审查角色：Astra；本轮未参与被审 JSON 的撰写或修改。

完整阅读范围：`AGENTS.md`、`content/ONTOLOGY.md`、三个 `content/schema/*.json`、`content/revised/global-a.nodes.json`、`content/revised/global-a.relations.json`、`content/revised/global-b.nodes.json`、`content/revised/global-b.relations.json`、`content/reviews/global-review.md`、`content/data/sources.json`、`research/candidate-nodes.normalized.csv`。本轮只做现有材料之间的证据、语义与展示边界审查；未联网、未增加事实或来源，未重新核验来源可访问性。

## 判定含义与结果

`pass_for_complete_sample` 表示可以用作完整详情结构的真实内容样本，允许明确展示尚待核验的内容；它不是学术发布通过，也不授权把节点或关系改为 `reviewed` / `published`。`needs_revision` 表示仍有局部措辞或证据标记会使学生把待核内容读成已核结论，须按下列最小修订处理。

本轮结果：6 个 `pass_for_complete_sample`，4 个 `needs_revision`。19 条保留关系中，内容资格建议为 2 条“可进入默认图”、7 条“仅证据透明层”、10 条 `hold`。**目前全部关系仍为 `ready_for_review`，`reviewed_at` 为空，因此现在实际可默认绘制的关系为 0 条。** “可进入默认图”是通过正式审核并满足端点展示条件后的资格建议，不是本文件已经执行了状态升级。

含 pending 主张的完整节点须保持未审核发布状态；节点通过完整样本审查，不使其 pending 主张、关联边或人物端点自动通过。解释型边即使后续通过审核，也应按本体第 9 节留在独立开关的证据透明层。pending 边不作为透明层中的有效学术连线，只可在待核任务/证据记录中展示。

## 逐节点判定

| 节点 | 判定 | 首轮修订落实与剩余处置 |
|---|---|---|
| `r2-encoding-decoding` | `pass_for_complete_sample` | summary 已明确核心命题待核；三种位置及代码不对称均为 pending；个人解读规则改为 interpretive。原有过程入口对照和整个符号学承继均已改学习链接，避免错误端点。保持三种位置非人格分类与原典访问限制可见，不升级 G16 主张。 |
| `r3-medium-theory` | `pass_for_complete_sample` | 删除了“媒介环境取向”的严格同义地位；不再由 Innis 个别用词证明整体非决定论；内部差异分别定位；平台化只作教学迁移。效果对照已收窄到子范围，但关系状态仍需改 interpretive，见关系表。S003/S004 访问范围登记问题属于共享来源修订，不能据现有 full_text 标签发布。 |
| `r4-agenda-setting` | `pass_for_complete_sample` | “实际接触”已改为媒介样本与选民判断的比较；方法、结果、因果限定和原创边均保留 pending，summary 明示 G17 记录冲突。`r4as-l2` 是当前节点不覆盖后续扩展的编辑范围规则，可保留 interpretive，但 support_note 应改为“本节点的范围选择”，避免写成已经核读正文所得。不要求为通过样本而取得全文。 |
| `r6-cultural-studies` | `pass_for_complete_sample` | 英国／伯明翰范围已进入 summary、学习价值及 naming_boundary；两范式正文为 pending；机构史与方法规范分开；女性主义介入移入内部差异/学习路径；种族边已有具体分析问题及限定。`controversy_note` 的“本轮明确可支持的争议集中在起点叙事”宜随 `r6cs-k1` 显示待核，不能在发布摘录中省略这一状态。复合霸权端点仍须按关系表 hold。 |
| `p-hall` | `pass_for_complete_sample` | 删除未逐项对接的出生地和全学科绝对评价；生卒与任期对接机构记录；代表性评价显式归于伯明翰大学；个人贡献与集体史分开；关系去重已完成。G21 可支持编码/解码是其代表性工作，不能代替 G16 对具体模型原创内容的待核。S007/S008 的未来访问日期仍须在来源层处理。 |
| `r1-process` | `needs_revision` | concept 发出的 has_concept、香农发展复合“反馈与噪声”、拉斯韦尔发展整个综合入口的边均已移除，端点错误解决。四个关键主张明确 pending；但 summary 对线性、互动、意义取向作肯定分类，`r1-process-l3` 又用仅书目/章节线索的 S011 作 interpretive 基础。最小修订：summary 加“这是本项目的综合导览分组，各模型正文主张仍待核”；l3 改 pending，或删去经验范围的来源归属并明确其仅是本项目提出的待检验问题。不能以“编辑限定”替代尚未读到的反馈/经验范围事实。 |
| `r5-gatekeeping` | `needs_revision` | 多层次历史叙述已收窄，网络/数字扩展对应摘要，七天单编辑外推限制明确。剩余两点：summary 仍把 pending 的 Lewin 前史写成无保留事实；与议程设置的对照边使用有访问冲突的 G17 正文而仍标 interpretive。最小修订：summary 把 Lewin 一句改为“概念前史线索仍待核读”；该对照边改 pending、hold。已核 White 个案和数字摘要内容无需重写。 |
| `r5-public-sphere` | `needs_revision` | 不再宣称“最具影响力”，概念正文、Fraser 论证及三条关系均 pending；欧洲历史对象、分层社会和理论批评后的性别展开已保留；公共舆论的错误 addresses 边已移至学习路径。summary 的定义与性别/身份限制却仍像已核概论，未同步提示正文待核。最小修订：在 summary 紧接定义加入“本节点的概念定义与排除性批评正文仍待核读，当前已确认的是书目与历史研究范围”；保持规范条件与实际参与不平等的区别。 |
| `r7-platform-governance` | `pass_for_complete_sample` | 非法发出的 addresses 与无证据 builds_on 均已移学习链接；中国义务保持 pending；欧盟明确只是 2022 年文本比较入口、版本及主体待核；不以法规存在推定实施效果。`current_evidence_state` 诚实归属 S023/S024 的登记记录，不等于本轮重新核定法律现行性。该状态说明必须与日期同时展示；as_of 不能单独变成“中欧法规已更新至当日”。 |
| `r8-content-analysis` | `needs_revision` | 摘要已纠正人工/自动化/解释型研究的分类混杂；一致性限定多人分类设计，无统一阈值；过宽用途及计算传播承继边已删除或收窄。但 `typical_procedure` 给出六步完整程序，`data_requirements` 给出代码本/单位等要求，而 k2 明言这些具体程序仍待正文核对；普通学生不会从其他字段自动知道此处是编辑建议。最小修订：在 summary 增加“下列程序为供样本验证的编辑性练习安排，具体方法出处仍待核对”，或在各字符串前显式标“编辑建议”；不要把这些步骤标成原著已核流程。G20/S021/S022 的来源角色修订见下。 |

上述四项退回均可用局部措辞、既有状态字段和删除不充分来源归属完成；不要求增搜文献、不要求增建节点，也不要求把全部 pending 改成 direct。

## 逐关系判定

端点类型已逐一对照候选 CSV：`r4-audience`、`r4-persuasion`、`r5-political`、`r5-journalism`、`r6-gender`、`r6-race` 均为 research_topic；`r4-effects` 为 tradition；`r2-representation`、`r6-hegemony` 为 concept；所列人物均为 person。类型通过不等于候选端点本身已经核定或发布。

| 关系 ID | 判定 | 理由与最小处置 |
|---|---|---|
| `rel-hall-proposed-encoding-decoding` | `hold` | G16 仅 metadata，具体模型原创归属仍 pending，状态诚实；保留待核定位，不升 direct。 |
| `rel-encoding-decoding-addresses-audience` | 仅证据透明层 | S006 摘要支持多维受众接收问题，模型→受众研究类型合规；范围和 interpretive 均适当。 |
| `rel-mcluhan-associated-medium-theory` | 仅证据透明层 | 人物→传统类型合规，代表性明确是跨文本归纳，非单一创始关系；保留 interpretive，先解决 S002/S004 登记问题。 |
| `rel-medium-theory-contrasts-effects` | 仅证据透明层 | 已按首轮要求限于效果研究中内容—态度/行为子范围，避免概括整个效果传统。但从 S002 的内容/技术区分映射到项目中 `r4-effects` 的子范围仍含编辑比较，应把 direct 改 interpretive；不能只显示“媒介理论对照传播效果”而隐藏比较维度。 |
| `rel-mccombs-proposed-agenda-setting` | `hold` | 高风险共同提出主张待 G17 访问记录闭环；pending 正确。support_note 宜改为“预定核验共同提出与初步检验”，避免把未核正文写成已经支持。 |
| `rel-shaw-proposed-agenda-setting` | `hold` | 同上；两个共同作者分别建边合理，不能在去重时合并成仅一人。 |
| `rel-agenda-setting-addresses-political` | `hold` | 端点类型、竞选语境和范围合规；证据仍 pending，不默认绘图。 |
| `rel-agenda-setting-contrasts-persuasion` | `hold` | 说服研究子范围已明示，目标类型允许 contrasts_with；G17 对比较依据未闭环，继续 pending。 |
| `rel-hall-associated-cultural-studies` | 仅证据透明层 | 单一规范实例，英国／伯明翰与集体史限定充分；interpretive 合适，不显示“霍尔独创文化研究”。 |
| `rel-cultural-studies-has-hegemony` | `hold` | pending 之外还有复合端点问题：CSV 中 `r6-hegemony` 实名是“意识形态与霸权”，并非独立“霸权”。当前 statement 只说明霸权，scope_note 只限定路线，未解决复合目标的学生读法。最小处置为保持 hold 并改学习链接；不为保边新增或拆分节点。以后若保留复合端点，须能按证据明确显示所指子概念，不能将两个概念作同义词。 |
| `rel-cultural-studies-addresses-race` | 仅证据透明层 | 已从“黑人政治进入机构”改到种族、表征、身份的分析问题，并用 S007 与机构史分项支持；英国范围清楚，interpretive 合适。 |
| `rel-hall-developed-representation` | 仅证据透明层 | 发展贡献具体，且明确二手归纳、不主张原创表征概念；人物→concept 合规。 |
| `rel-gatekeeping-addresses-journalism` | 可进入默认图 | G18 当前登记 full_text，无与“仅摘要”相冲突的注记；单编辑七日的材料采用/拒绝与理由分析符合有限 addresses。此结论只认可登记、定位和表述一致，不声称本轮重读原文。正式状态及端点发布条件满足前仍不绘图。 |
| `rel-gatekeeping-addresses-platform-governance` | 仅证据透明层 | 理论→主题合规，S014 摘要支持个人、算法和平台；迁入平台治理的“选择权”视角被明确标为 interpretive，未扩大为完整治理解释。 |
| `rel-gatekeeping-contrasts-agenda-setting` | `hold` | G18 一侧可用，G17 一侧 locator 仍指未闭环的原文结果；两源比较不能绕过较弱一侧。最小将 evidence_status 改 pending，并把 G17 support_note 写为待核，不由 G17 的 full_text 标签自动放行。 |
| `rel-habermas-developed-public-sphere` | `hold` | 排序与首次提出措辞已移除；pending、空证据和正文待核说明诚实。允许保留为样本待核关系，不允许 reviewed/published。 |
| `rel-public-sphere-addresses-political-communication` | `hold` | 目标 research_topic 合规；概念正文未核，pending 合适。 |
| `rel-public-sphere-addresses-gender` | `hold` | 已归为批评性展开并保留分层社会条件；Fraser 正文未核，pending 合适。目标还含酷儿传播，不得把这条有限女性主义关系展示为原初模型覆盖全部复合领域。 |
| `rel-content-analysis-used-in-journalism` | 可进入默认图 | 用途已从主题/框架等宽范围缩至 G18 个案材料分类、选择结果与记录理由，方法→研究主题合规。默认标签与展开说明须保留这一实例范围；不据个案证明所有新闻内容分析用途。正式状态及端点发布条件满足前仍不绘图。 |

首轮要求暂缓的其他边已不在本轮 19 条学术关系中：过程入口 has_concept、香农发展反馈/噪声、拉斯韦尔发展综合入口、编码/解码对照整个过程入口、符号学整体承继、媒介理论解释平台化、文化研究以女性主义介入史代替 addresses、公共领域 addresses 公共舆论、平台治理发出的三个 addresses 及 builds_on、计算传播整体承继内容分析、内容分析对照解释型方法及应用于信息失序。其删除或学习链接处理不应被后续合并脚本撤销。

## 共享来源记录问题：不以字段转换代替核验

以下问题会阻止正式审核发布，但不要求已经诚实保留 pending 的节点退回 candidate。它们不是本轮新增学术事实。

1. **S001—S008 的访问日期仍为 2026-09-12。** 相对于本轮日期属于未来。应按已有访问记录恢复真实日期；若现有材料不能证明，明确记录日期待核并继续阻止发布。不得批量改成 2026-09-11 来制造当天核验。A 组的 `last_evidence_check: null` 没有伪造日期，符合当前 schema 的样本用法，但不能当作完成证据复核。
2. **S003、S004 的 `full_text` 与本体 excerpt 规则冲突。** S003 注记明言 publisher_extract / p.457 开篇；S004 明言 selected_chapter_full_text / 第一章。以当前记录的整篇/整本来源对象为单位，最小均改 `excerpt`，保留原 locator 和版本信息。节点已经主动收窄阅读任务，不应让来源徽标重新承诺整篇/整本通读。
3. **G17 存在未解决的访问冲突。** `access_status=full_text`，注记却是“出版者页面已核摘要”。按当前可证明的较窄范围保留摘要访问登记并注明正文待核，或者以已经存在的正文核读证据解决冲突；当前材料不允许仅凭 status 升级。A 的 pending 处理正确，B 的对照边应同步。
4. **S009—S024 从 `table_entry` 一律转 abstract 没有逐项访问依据。** 其中既有正文/章节线索、出版社简介、法规入口，也有真正的摘要定位。应按已登记的实际读到内容分别整理；table_entry 本身不表示读过摘要。S011/S012/S021 的节点文本已经说书目或目录，来源标记应与之对应；S018—S020 不应让“abstract”暗示法规条文已核。S023/S024 只支持登记所述的状态页核对，不能扩成全部法条义务核验。
5. **G20、S021、S022 的 source_type 未落实首轮角色修订。** 当前用途是方法教材/综述，对本轮用途宜标 `scholarly_synthesis`。不要因为原作者或发表在期刊就一律视为 primary_scholarship。此项不改变任何 claim 的 direct/interpretive/pending 状态。
6. **S009 仍残留“获准重印”授权保证。** 当前材料没有独立授权依据；最小删除“获准”二字，仅描述实际 URL 指向的重印合集，并保留版本/章页待核。S010 仍把两部分合入一个来源并用注记存第二 DOI；其对应模型主张已 pending，现阶段不妨碍样本结构，但正式逐篇引用前应厘清所用部分。

本轮并未把本体或 JSON Schema 通过当作事实验证。尤其是 schema 仍可允许非 pending claim 的空 evidence，以及缺少某些按类型必填/非空约束；这些应由主代理的集合校验和状态检查继续兜底。对本批内容最关键的是：不得允许 pending 主张/关系随 `review_status` 批量升级，默认图不得仅以 evidence_status 过滤而忽略正式审核状态。

## 最小执行清单

1. 修正四个 needs_revision 节点的摘要/程序与 pending 不一致处；不重写已收窄的正文。
2. 将 `rel-medium-theory-contrasts-effects` 改 interpretive；将 `rel-gatekeeping-contrasts-agenda-setting` 改 pending；复合霸权目标关系继续 hold，必要时移现有 learning_links。
3. 统一共享来源中的真实访问日期、excerpt、G17 冲突与 table_entry 映射；未经核实不能新增访问事实。
4. 在样本验证中明确显示 pending、资源可读范围、英国／伯明翰范围、法规法域/版本，以及关系的子范围。不能仅在折叠证据区保留这些限制而让摘要或边标签独立作扩大主张。
5. 保持完整样本通过、来源核验完成、关系可发布和整个阶段闸门通过为四项独立结论。本报告不判断全项目闸门，也不授权开始正式前端开发。
