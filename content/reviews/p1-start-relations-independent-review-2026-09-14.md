# P1 首页起点关系独立复核

日期：2026-09-14。复核者未参与本批候选撰写。复核对象：`research/p1-start-relations-2026-09-14.json`、`content/reviews/p1-start-relations-evidence-2026-09-14.md`与`research/relation-source-additions-2026-09-14.json`中的3项候选。

## 结论

**3项均批准为 `direct`，可进入 `reviewed`并在默认学术关系层公开。** P02为通过前收窄：将“谁能对这些叙事提出反驳”改为“哪些声音获得可见性并参与反驳”，以匹配文章对话语可见性和声音分配的实际分析。本批不改变任何端点节点的审核状态。

## 逐项审查

### 1. `rel-mcluhan-associated-medium-theory`

- **来源与 locator：通过。** 复核打开[Media Ecology Association托管的15页原文](https://www.media-ecology.net/publications/MEA_proceedings/v2/Meyrowitz02.pdf)。印刷p.10明确说明Meyrowitz把追随McLuhan、关注媒介间差异的取向称为`medium theory`；pp.8–9及p.20同时强调应在McLuhan的贡献上继续推进、而不把领域限定于他一人。PDF页码与印刷页码的对应正确。
- **关系动词与方向：通过。** `person → associated_with → tradition`符合本体词表；不应改为`proposed`或`developed`。
- **归因和边界：通过。** 陈述依托的是Meyrowitz对McLuhan与medium theory的明示联系，而非由建议阅读推导创始权。`scope_note`和`controversy_note`明确排除“单一创始人”和“整个媒介理论谱系”的过度归因。
- **决定：批准 `direct/default`。** 以同ID替换旧的`interpretive`记录，不新增平行边。本报告对该关系的新证据分类取代`relation-publication-review.md`中依S002/S004做出的旧`interpretive`快照，不改写历史报告。

### 2. `rel-decolonial-addresses-race-representation`

- **来源与 locator：通过。** 复核打开[International Journal of Communication官方24页原文](https://ijoc.org/index.php/ijoc/article/download/8847/2526/35595)。p.142把Afro-pessimism界定为具有殖民根源的种族主义话语；p.151把“哪些声音被听到”的权力问题明确放入非洲媒介形象的后殖民批判；pp.153–154讨论#SomeoneTellCNN反叙事及其与精英可见性、国家品牌和资源不平等的纠缠。
- **关系动词与端点：通过。** `tradition → addresses → research_topic`合法。源节点是“后殖民与去殖民传播”伞形入口，关系只使用其中的“后殖民表征批判”分支；`scope_note`已把这个端点宽度限制清楚。
- **过度归因：收窄后通过。** 原“谁能提出反驳”容易读成普遍行动能力判断；改为文章实际测量和讨论的可见声音。陈述不把肯尼亚案例外推到整个非洲或全部去殖民研究。
- **决定：批准修订后的 `direct/default`。**

### 3. `rel-political-economy-addresses-platform-governance`

- **来源与 locator：通过。** 复核打开[SAGE官方9页原文](https://journals.sagepub.com/doi/pdf/10.1177/20563051251323030)。pp.4–5的“Platform Governance”专节把平台治理放入国家、平台企业、劳动、公众及制度的关系中；p.7明确说明特刊对中国平台经济采用广义政治经济路径，并以国家—资本—劳动关系加以定位。
- **关系动词与端点：通过。** `tradition → addresses → research_topic`与本体一致。`addresses`只表示此路径已被用于分析该研究主题，不宣称某一治理观点已得到因果验证。
- **过度归因：通过。** 来源性质是特刊导论，足以证明研究路径的实际使用，但不足以独立证明特定治理效果或现行政策状态。候选的`scope_note`和`controversy_note`已保留此边界。
- **决定：批准 `direct/default`。**

## 登记与装配处置

- P01–P03已通过`research/source-inputs.json`登记进入来源重建管线，未直接手改生成的`sources.json`。
- `rel-mcluhan-associated-medium-theory`在`content/revised/global-a.relations.json`中以同ID替换旧证据；另两条放入独立的`content/revised/p1-start.relations.json`。
- `content/reviewed-relations.json`将三条白名单项标为`default`，新批次使用条目级`reviewed_at: 2026-09-14`。
- 为避免把此前40条关系的历史审核日期批量改写，`assemble_content.py`和`validate_content.py`增加向后兼容的条目级日期支持：有条目日期时优先使用，旧项仍沿用根级`2026-09-11`。回归测试明确验证了旧日期不变。
- 装配后正式数据为107节点、46条关系、184条来源；其中42条已审核关系进入公开层，默认学术层32条，编辑比较层10条。

## 验证

以下均于正式重建后执行并通过：

- `python3 scripts/check_content_rebuild.py`：5个生成JSON逐字段一致，引用与审核规则保留。
- `python3 -m unittest discover -s scripts/tests -v`：8项通过，含新旧关系审核日期回归测试。
- `python3 scripts/validate_content.py`：PASS，107节点／46关系／184来源／8区／7类型。
- `python3 scripts/audit_content_depth.py --as-of 2026-09-14`：报告已重建，A=16、B=66、C=25。
- `python3 scripts/audit_release_readiness.py`：报告已重建。
- `npm run typecheck`、`npm run lint`、`npm test`：通过，前端14项测试全部通过。
- `npm run build`：通过；保留现有大于500 kB的分包警告，与本次关系内容发布无直接冲突。

