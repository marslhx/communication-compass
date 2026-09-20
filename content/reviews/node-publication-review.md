# COMMPASS 完整节点正式复核资格审查

审查日期：2026-09-11。审查角色：Astra，独立于被审候选正文的撰写；本轮只创建本报告，没有修改数据、联网或增加学术事实。

## 裁决与适用范围

经2026-09-11增量复核，15 个完整节点中，**9 个 `reviewed_eligible`，6 个 `hold`**。6 个 hold 节点合计含 10 项显式 pending。原另三项来源与正文一致性阻断已按本报告记录的限定改动闭环。

`reviewed_eligible` 表示本报告针对当前文字、定位、证据范围及既有独立核查记录，授权将对应节点由 `ready_for_review` 机械改为 `reviewed`，并填入 `reviewed_at: 2026-09-11`。它不等于 `published`，不升级学习链接的目标，不升级关系，也不表示本轮重新访问了网页。`hold` 表示保持当前未复核状态；不得以界面隐藏待核主张或删去显示标签代替内容处理。

完整阅读范围：`AGENTS.md`、`content/ONTOLOGY.md`、`content/STATUS_RULES.md`、完整 `content/data/nodes.json` 与 `sources.json`、`content/reviews/global-second-review.md`、`china-second-review.md`、`final-content-gate.md`、`research/pending-source-verification-global.md`。为确认旧日期问题是否已有可追溯修复，另定点查看 `global-review.md` 对未来日期的记录及 `scripts/normalize_research_data.py` 的日期与来源核验注记配置。本轮审查的是节点资格，关系另行审核。

补充证据由主代理于2026-09-11定点回访并通知：S002 Wiley官方摘要可读，明确 medium theory 边界及媒介环境定义；S003 Cambridge Core 摘要/开篇摘录可读；S005 Birmingham Administrative History 可读；S006 SAGE 官方摘要可读，明确一维三分接收框架与多维模型；S008 Open University 人物页可读。随后主代理核到 S004 的 MIT 第一章 PDF 与 S007 的 Open Research Online accepted manuscript，具体范围见下文增量闭环记录。S001仍仅书目。本报告区分这些主代理亲核结果与本审查者的文件比对；不声称由本审查者联网取得。

审查没有把“完整样本通过”“开发闸门通过”或 Schema 通过当作正式复核。逐项检查包括 key_points、limits_or_debates、positions、propositions、limitations、internal_differences，以及摘要、命名边界、学习资源、时效说明和来源登记。

## 逐节点裁决

| 节点 ID | 裁决 | 决定性理由与最小后续 |
|---|---|---|
| `r1-process` | `hold` | 含 `r1-process-k1`、`r1-process-k3`、`r1-process-l1`、`r1-process-l2`、`r1-process-l3` 五项 pending。香农与 Carey 的局部闭环不能消除拉斯韦尔、Schramm 及综合边界的缺口。继续保留编辑综合入口与不同原典的范围区别；不能整节点升级。 |
| `r1-china-introduction` | `hold` | `r1ci-l3` 为 pending：1982 年会议的原始记录仍缺。C16 的实际末段/第四节定位及 excerpt 登记已经落实，C16/C17 可以支持“后出学术史如此记述”，但不替代会议原件。该缺口必须按既定内容流程处理后再审。 |
| `r2-encoding-decoding` | `reviewed_eligible` | G16 的全文核查已闭环，四种位置已正确对应 1973 稿；主代理当日回访 S006 正式摘要，闭合 r2ed-l1/l2 的三分框架批评及访问日期依据。当前正文把 G16 四分稿与 S006 的三分接收语境分开，没有 pending。S001 仅作明确标为书目的学习资源，不承担模型命题；其题名内 republished 2007 与 year 2018 的版本说明宜后续整理，但不由仅 metadata 自动否决完整节点。 |
| `r3-medium-theory` | `reviewed_eligible` | 命名边界、内部差异及 excerpt 修订已完成，无 pending；S002/S003 已回访。主代理新增 S004 第一章原文核验，PDF pp.1—2 明确支持 scale/pace/pattern 以及铁路、电灯例证，GA04 注记与 S004 映射可核，解除最后来源日期闭环缺口。仅核第一章仍按整书对象的 excerpt 登记，不扩大为整书通读。 |
| `r4-agenda-setting` | `reviewed_eligible` | G17 的全文核查记录逐项覆盖样本、操作化、相关结果及聚合因果限制，当前正文均限定于 1968 年研究/1972 年论文，没有把后续扩展写进原研究，也没有 pending。旧访问冲突由后续全文记录解决。`last_evidence_check=null` 在此相对稳定节点上不是本体规定的自动阻断；本次可记录编辑复核日期，不能把它等同于本轮新增网页访问。 |
| `r5-gatekeeping` | `hold` | `r5-gatekeeping-k1` 仍为 pending。G22 只闭环到原文片段，现文仍明确待取得版本后复核。White 的七日单编辑个案及数字扩展的摘要支持保持有效，但不能提升整个节点。 |
| `r5-public-sphere` | `reviewed_eligible` | G23/S015 的全文核查已覆盖现有概念及 Fraser 批评，无 pending。增量修订的 controversy_note 改为“本轮已核欧洲资产阶级公共领域的历史范围，以及 Fraser 关于历史排斥、参与不平等、多重公众和从属反公共的批评；其他关于理性规范或全球适用性的批评未作穷尽”，与正文和已核证据一致，未增加新事实或宣称穷尽批评。已在 revised/global-b.nodes.json 核对该文字，批准随 assemble 同步到正式数据。 |
| `r5-pr` | `reviewed_eligible` | 第二轮唯一具体阻断 G10 课程主张已删除；PRSA 职业定义、Hallahan 等人 2007 年摘要定义、IPRA/PRSA 规范、S038 摘要及 AMEC 行业框架均按各自支持范围使用。公共关系与战略传播未被写成严格同义词，规范未被写成执行效果，方法簇没有补造应用边。无 pending。 |
| `r5-marxist-journalism` | `hold` | `r5mj-l3` 仍为 pending：陆定一 1943 年原始报纸正文缺口未消除。C13/C19 已按课程/教材片段同步登记，2019 年教材及朱至刚 2020 年解释的范围限定也成立，但这些不能替代原文闭环。 |
| `r5-china-history` | `reviewed_eligible` | C15 的 2021 版本、罗喆姓名、S028 的 pp.102—103 定位均已落实；教材目录只证明课程组织，史学反思归于具体作者，地域与材料缺口以编辑范围说明呈现，没有肯定叙述尚未核实的具体史实。无 pending。S032 的卷期页码待整理字样不影响当前可访问转载全文中的署名与段落定位，不据此撤销已核的有限论述。 |
| `r6-decolonial` | `reviewed_eligible` | 最终闸门复审已直接对照 D01/D02 的全文与具体页码，支持知识生产位置、跨情境推论、内部异质性和学术资源问题。三条路径的综合为 interpretive，伞形入口及非严格同义边界可见；D03 仅使用已登记摘要，G09 只作课程学习入口。时效字段齐全、无 pending，且没有为覆盖需求补造学术边。 |
| `r7-platform-governance` | `reviewed_eligible` | S018/S019 正式文本核查已具体闭合中国法域、算法类型、鼓励性透明度措辞、用户选择及有条件备案；现文区分一般概念、规范义务和执行效果。欧盟材料明确限定为 2022 文本比较入口，不声称当前合并版本和全部主体已核；S023/S024 的现行状态只按既有登记报告。时效字段与范围说明齐全，无 pending。此次资格不把法规现行性延伸到审查日之后。 |
| `r8-content-analysis` | `hold` | `r8-content-analysis-method-l2` 为 pending，涉及平台 API、删除、排序及语料可见性的边界。G20/S021 只闭合步骤骨架，data_requirements/typical_procedure 已标为编辑练习安排；该修订有助于样本展示，但不能消除 pending。 |
| `p-hall` | `reviewed_eligible` | 个人与集体贡献、任期、评价归属及译名边界已收窄，无 pending；S005/S008 已回访。主代理随后取得 S007 的 5 页 accepted manuscript，文内 pp.1—4 覆盖当前 phall-k3/l2 的文化研究、表征、身份、种族及阶段变化，GA07 核验注记与 S007 映射可核。此前访问失败已由同源手稿成功核读取代，最后来源链闭环；不借此扩大霍尔的原创归属主张。 |
| `p-fang` | `hold` | `p-fang-limit3` 为 pending。口述与机构刊载层次、履历定位、S028 引语/页码均已修正；仍须依照硬规则处理未逐项核验的精细身份记录，不能因它位于 limitations 区而整体升级。 |

## 三项裁决说明

### 1. 日期问题阻断的是来源闭环，不是空日期字段本身

global-second-review 的“共享来源记录问题”第 1 项明确要求恢复 S001—S008 的真实访问日期，不能批量改成 2026-09-11 制造当天核验。final-content-gate 又明确只确认这些字段已修正，未独立证明真实时刻。本轮定点回访已分别闭合 S002/S003/S005/S006/S008，以及后来成功取得原文的 S004/S007。由此解除媒介理论和霍尔的阻断，依据是新增真实核读记录，不是重新填写同一个日期。

同理，`last_evidence_check=null` 不应被误作所有相对稳定节点的自动否决条件。议程设置已有 G17 的明确当日全文核查链，编码与解码已有 G16 与主代理本轮 S006 摘要核查，均能够通过。`reviewed_at` 记录本次编辑复核，`accessed_at` 记录真实来源访问，不能相互代填。

### 2. 三项增量已闭环，须同步生成数据

本轮只增量检查以下三项，其他节点裁决不变：

- S004：[MIT 第一章 PDF](https://web.mit.edu/allanmc/www/mcluhan.mediummessage.pdf)。主代理当日核读 18 页 PDF，其中 pp.1—2 的 scale/pace/pattern、铁路和电灯例证与 r3mt-i2/k3 的有限主张相符。`normalize_research_data.py` 的 GA04 核验注记已落盘，`source-id-map.csv` 明确 GA04→S004。
- S007：[Open Research Online 手稿](https://oro.open.ac.uk/50815/1/s1-ln1812106795844769-1939656818Hwf2014446968IdV-33748705918121067PDF_HI0001%20PDF%20of%20SUBMISSION%20FEB%2011.pdf)。主代理当日核读完整 5 页文件，文内 pp.1—4 覆盖当前人物节点的整体贡献和阶段变化。GA07 核验注记已落盘，映射明确 GA07→S007。
- 公共领域：已读取 `content/revised/global-b.nodes.json` 内修正后的 controversy_note，准确限于 G23/S015 已核范围，保留其他批评未穷尽的边界。其余主张未因这次修订增加或变更证据状态。

增量审查时，`content/data/nodes.json` 和 `sources.json` 尚未重新生成，仍为下表旧快照。本报告已批准上述实际落盘的输入变化；主代理应先以 normalize/assemble 将核验注记和争议说明同步到生成数据，再执行唯一白名单的状态升级。不得保留生成文件中公共领域的旧“待核批评线索”文本而只改 reviewed 状态。

### 3. 学习资源与候选入口不改变节点资格

学习链接指向 candidate 或含 pending 的完整节点，不会自动否决一个已经闭环的源节点，也不会使目标升级。书目或摘要可以直接支持限定到相应范围的书目、概念或摘要主张；不要求全部学习资源都先取得全文。未查明的具体版本矛盾、访问记录矛盾和明示 pending 仍须分别处理。

## 可机械升级的唯一名单

```json
{
  "reviewed_at": "2026-09-11",
  "reviewed_eligible": [
    "r2-encoding-decoding",
    "r3-medium-theory",
    "r4-agenda-setting",
    "r5-public-sphere",
    "r5-pr",
    "r5-china-history",
    "r6-decolonial",
    "r7-platform-governance",
    "p-hall"
  ]
}
```

保持 hold 的 6 个 ID：`r1-process`、`r1-china-introduction`、`r5-gatekeeping`、`r5-marxist-journalism`、`r8-content-analysis`、`p-fang`。这份名单不包含任何关系；不得按节点结果联动升级关系或默认图层。

## 审查快照

| 文件 | SHA-256 |
|---|---|
| `content/data/nodes.json` | `be69151d5f6974258aef84a89e8586b06133769031ba6d71669fdc9a46ea48cf` |
| `content/data/sources.json` | `e673fdd59bca1f438c30ddd8d44d40c2e31ae09c987d0c917bd99e947dcfc84d` |

两份生成数据在增量审查时仍与 final-content-gate 的审计快照一致。上述明确批准的来源核验注记、公共领域争议说明同步，以及白名单节点状态和 reviewed_at 的机械升级属于本报告授权变化；其他正文、来源或范围变更须针对变化重新核对。
