# P1 较弱证据升级：`c-sensemaking`

**日期：** 2026-09-16  
**节点产物：** `content/revised/p1-weak-sensemaking.nodes.json`  
**新增来源：** `research/p1-weak-sensemaking-source-2026-09-16.json`

## 结果

新增 Q347：Weick、Sutcliffe 与 Obstfeld 的 *Organizing and the Process of Sensemaking* 出版社排版全文。可访问 PDF 共 13 页，题名、作者、卷期页码和 DOI 与正式记录一致。本轮实际核读正文印刷页 409–410，并继续核对印刷页 413–416 的 `Sensemaking Is About Organizing Through Communication`、描述性总结、可行性与行动讨论。

Q347 将原来只由 Q301 摘要支撑的两条 `direct` 主张升级为正文定位：

- `sm-p1`：印刷页 409 的开篇正文把 sensemaking 描述为从持续情境中提取线索、形成可行的回顾性解释，并以语言把组织情境转成可明确理解且可导向行动的 situation。
- `sm-p2`：同页正文明确称 sensemaking 是 meanings materialize 的主要场所，这些意义影响并约束身份与行动；作者随后把这种形成说明为语言、谈话和传播问题。
- 学习资源由 Q301 的 `Abstract` 切换到 Q347 全文，并把印刷页 409–410 作为入门核读范围。

## 访问层级与定位

| 来源 | 访问层级 | 已核范围 | 可支持 | 不能支持 |
|---|---|---|---|---|
| Q347 | 可访问的出版社排版全文 | 印刷页 409–410；另核印刷页 413–416 的传播、总结、可行性与行动讨论 | 组织意义建构中的情境语言化、线索提取、回顾性可行解释、身份与行动、交流与组织过程 | 把所有理解、解释、信息接收或个人认知统称为 sensemaking；由单篇概念论文推出特定组织结果或因果效果 |
| Q301 | 出版社摘要 | Abstract | 两条核心定义的摘要级概括 | 正文限定、章节论证及页码定位 |

## 概念边界

正文不是把 sensemaking 写成没有条件的“理解”。它讨论的是持续组织过程中的一种行动—解释联动：当现实与预期不一致、行动路径不明显或经验流变得难以理解时，行动者在社会情境中注意并截取线索，以回顾性但可行的方式组织这些线索，通过语言、谈话和交流形成足以继续行动的暂时情境。因而，本节点不把普通的信息接收、孤立的认知加工、准确复述事实或任何主观解释自动归入意义建构。

Q347 的开篇定义引用并综合了 Taylor and Van Every、Mills 等既有研究，但全文是 Weick 等对组织意义建构概念的原始综述论文；本轮只登记这一份新来源，不把它误写为所有组成命题的最早提出文本。

## 变更边界

- 只新增 Q347，并把 `sm-p1`、`sm-p2` 及对应学习资源中的 Q301 摘要引用替换为 Q347 正文定位。
- 为消除“原始著作尚未补读”的过时提示，更新 `controversy_note`，明确不泛化为任何理解活动；主张文本、节点结构、区域归属和学习链接不变。
- 仅更新 `last_evidence_check` 与 `updated_at` 为 2026-09-16；`review_status` 保持 `ready_for_review`，未新增或修改关系。
- 未修改正式数据、`research/source-inputs.json` 或 override manifest。

## 校验

- 新增来源文件与节点覆盖文件均须通过 JSON 解析及各自 schema。
- 节点覆盖文件只含 `c-sensemaking` 一条完整记录；Q347 是唯一新增来源，且被两条 `direct` 主张和学习资源实际引用。
- 与原覆盖记录比较时，除 Q301→Q347 的证据／学习资源升级、概念边界及日期外，其余字段应保持一致；`review_status` 和 `learning_links` 必须保持不变。
