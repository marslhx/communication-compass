# P1 八区核心入口关系缺口审计

**审计日期：** 2026-09-15

**范围：** 仅审计 `content/data/nodes.json`、`content/data/relations.json`、`content/data/sources.json` 与现有 `research/`、`content/reviews/` 中的登记材料；未访问外网、未新增来源、未改动数据。
**计数口径：** 与起点相接且同时为 `evidence_status=direct`、`review_status=reviewed` 的关系记录，入边和出边均计。学习链接和 `interpretive` 关系不计入。

## 总表

| 区域／起点 | 当前 direct | 最低需求 | 结果 | 现有合格锚点 |
|---|---:|---:|---|---|
| 1 `r1-process` 传播过程与基本要素 | 1 | 1 | 达到最低；不宜因复合入口补边 | `p-lasswell → developed → r1-process`（S048） |
| 2 `r2-encoding-decoding` 编码与解码 | 1 | 1 | 达到最低 | `p-hall → proposed → r2-encoding-decoding`（G16） |
| 3 `r3-medium-theory` 媒介理论 | 1 | 1 | 达到最低 | `p-mcluhan → associated_with → r3-medium-theory`（P01） |
| 4 `r4-agenda-setting` 议程设置 | 3 | 1 | 达到最低；已有两类非冗余锚点 | McCombs、Shaw 提出（G17）；理论研究政治传播（G17） |
| 5 `r5-gatekeeping` 把关理论 | 1 | 1 | 达到最低；Lewin 前史不可冒进 | `r5-gatekeeping → addresses → r5-journalism`（G18） |
| 6 `r6-decolonial` 后殖民与去殖民传播 | 1 | 1 | 达到最低 | `r6-decolonial → addresses → r6-race`（P02） |
| 7 `r7-platform-governance` 平台治理 | 1 | 1 | 达到最低 | `r3-political-economy → addresses → r7-platform-governance`（P03） |
| 8 `r8-content-analysis` 内容分析 | 1 | 1 | 达到最低 | `r8-content-analysis → used_in → r5-journalism`（G18） |

“达到最低”不等于节点已可发布：`r1-process`、`r5-gatekeeping`、`r8-content-analysis` 仍是 `ready_for_review`。它们当前没有 `pending` 主张，但关系通过也不能替代整节点的基础校核。

## 各入口：现有边、候选与缺口

表中“可直接建候选”仅表示现有来源足以进入下一次**独立关系复核**，并非本次已新增关系。`interpretive` 和 learning path 均不应计入 direct。

### 1. `r1-process`（1 / 最低 1）

现有 direct：`rel-lasswell-developed-process`，`p-lasswell → developed → r1-process`，S048，已复核。它只应读作拉斯韦尔“五问”对这个综合入口的贡献，不能读成一人提出整个入口。

| 优先候选（最多 8） | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `p-shannon → developed → r1-process`（限定“工程通信模型”） | 可直接建候选，但须缩窄关系说明 | S010 | S010 直接支持工程问题、系统部件和噪声；不能把它升级为关于人类传播意义、身份或权力的总模型。 |
| `p-james-carey → contrasts_with → r1-process` | interpretive | S012；缺精确的“与综合入口”端点 | Carey 的传输／仪式对照可作为学习比较，不直接针对这个项目的复合入口。 |
| `r1-process → r1-feedback-noise` | 留空 | S010 只支持噪声；目标合并“反馈与噪声” | 不可由香农或工程图式归属整个复合节点；先拆端点或取得反馈机制的独立来源。 |
| `r1-process → r2-encoding-decoding` | learning path／interpretive | G16 | 可导向“线性过程与编码—解码回路的不同问题”，但不是已证实的思想承继。 |
| `r1-process → r1-mass` | learning path | 现有仅节点学习链接；缺直接关系来源 | 场景化学习顺序合理，不能以共同使用“传播”计入学术边。 |

### 2. `r2-encoding-decoding`（1 / 最低 1）

现有 direct：`rel-hall-proposed-encoding-decoding`，`p-hall → proposed → r2-encoding-decoding`，G16，已复核。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `r2-encoding-decoding → r4-audience` | 维持 interpretive | S006（摘要） | 已有解释边；摘要支持经验受众研究中的多维接收讨论，映射到“受众与接受研究”仍是编辑归纳。 |
| `r2-encoding-decoding → r2-semiotics` | 留空或 learning path | G16 讲代码；缺将模型明确置于“符号学传统”的原典／综述 | “代码”同现不足以建立传统归属。 |
| `r2-encoding-decoding ↔ r1-process` | interpretive／learning path | G16 | 可比较模型对生产、流通、解码的不同设问；`r1-process` 是综合入口，不是霍尔直接批评的单一理论。 |
| `r2-encoding-decoding → r6-cultural-studies` | 留空 | 缺可定位学术史或传统归属来源 | 不以霍尔的学术身份或课程并列替代该关系的直接证据。 |

### 3. `r3-medium-theory`（1 / 最低 1）

现有 direct：`rel-mcluhan-associated-medium-theory`，`p-mcluhan → associated_with → r3-medium-theory`，P01，已复核；动词为 `associated_with`，避免把传统归为一人独创。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `p-harold-innis → associated_with → r3-medium-theory` | 可直接建候选 | S002、S003 | S002 以传统问题界定媒介理论，S003 直接呈现 Innis 的媒介、时空与文化环境问题；应复核人物端点和 locator 后再入库。 |
| `r3-medium-theory → r3-platformization` | learning path | 当前节点明确为教学迁移；缺思想承继文本 | 不能称经典媒介理论已经直接提出或发展了平台化。 |
| `r3-medium-theory ↔ r4-effects` | 维持 interpretive | S002 | 已有 `contrasts_with`；内容与媒介形式的区分可支持比较一侧，不能断言两个领域互斥。 |
| `r3-medium-theory → r7-platform-governance` | 留空 | 缺直接平台治理研究连接文本 | 共享“媒介环境／技术”不足。 |

### 4. `r4-agenda-setting`（3 / 最低 1）

现有 direct：`p-mccombs → proposed → r4-agenda-setting`（G17）、`p-shaw → proposed → r4-agenda-setting`（G17）、`r4-agenda-setting → addresses → r5-political`（G17），均已复核。共同署名原典分别保留两位作者的贡献边，不应压缩为一条。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `r8-content-analysis → used_in → r4-agenda-setting`（限 1968 教堂山研究） | 可直接建候选 | G17 | 原研究同步对新闻样本进行内容分析；边应是“方法用于该具体研究”，不是“内容分析证明理论”。 |
| `r4-agenda-setting → addresses → r5-journalism`（限竞选新闻样本） | 可直接建候选，但优先级低 | G17 | 原文直接使用报纸、杂志和电视新闻材料；若建边必须锁定该研究语境，不能声称议程设置涵盖全部新闻研究。 |
| `r4-agenda-setting ↔ r4-persuasion` | 维持 interpretive | G17 | 已有比较边。原文区分显著性与态度方向／强度，映射到完整说服领域仍是教学比较。 |
| `r4-agenda-setting → r4-effects` | 留空 | 缺明确的理论分类或综述来源 | 不能仅因入口位于效果区就建“属于效果传统”边。 |

### 5. `r5-gatekeeping`（1 / 最低 1）

现有 direct：`rel-gatekeeping-addresses-journalism`，`r5-gatekeeping → addresses → r5-journalism`，G18，已复核，范围为 White 的一家非都市报、七日、单编辑个案。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `p-kurt-lewin → developed → r5-gatekeeping`（限概念前史） | 暂不 direct | G22（仅 excerpt，支持一般概念前史） | 可支持渠道、门与守门人的一般概念线索，不能把它写成成熟新闻把关理论；须先完成原文核读与独立复核。 |
| `r5-gatekeeping → r7-platform-governance` | 维持 interpretive | S014（摘要） | 数字新闻研究纳入个人、算法和平台；“平台治理的一种视角”仍是编辑归纳，且不覆盖法律、劳动、市场与数据治理。 |
| `r5-gatekeeping ↔ r4-agenda-setting` | 维持 interpretive | G18、G17 | 已有比较边，分别是选择过程与议题显著性；不代表理论承继或互斥。 |
| `r5-gatekeeping → r7-algorithm` | 留空 | S014 仅摘要且当前无精确关系说明 | 不将“算法参与数字新闻把关”直接扩大为对一般算法系统的理论解释。 |

### 6. `r6-decolonial`（1 / 最低 1）

现有 direct：`rel-decolonial-addresses-race-representation`，`r6-decolonial → addresses → r6-race`，P02，已复核，限定于殖民根源的种族化话语、非洲媒介形象、声音与权力的具体分析。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `r6-decolonial → r8-interpretive-methods` | 暂不 direct；可保留 learning path | D02；缺把该伞形传统与此复合方法节点逐项连结的定位 | D02 支持研究资源、语言、出版与引证权力的反思；不能自动证明所有文本、话语、视觉与档案方法都“去殖民”。 |
| `r6-decolonial → r6-social-change` | learning path | D01、D02；缺针对该节点的直接研究关系 | 可把知识批判带进发展、参与和全球权力讨论；这是一条课程导览，不是已证实谱系。 |
| `r6-decolonial ↔ r6-cultural-studies` | interpretive／learning path | D01、D02；缺精确的两个传统比较来源 | 可以比较表征、霸权与殖民性，但不得把二者视为同义或必然继承。 |
| `r6-decolonial → r6-china-global` | 留空 | 缺直接经验研究来源 | 中国国际传播实践不能因“非西方”标签自动成为去殖民传播的实例。 |

### 7. `r7-platform-governance`（1 / 最低 1）

现有 direct：`rel-political-economy-addresses-platform-governance`，`r3-political-economy → addresses → r7-platform-governance`，P03，已复核，范围是国家—资本—劳动关系与中国平台治理制度分析。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `r7-platform-governance → addresses → r7-algorithm`（限中国算法推荐规章） | 可直接建候选，须标法域 | S019 | 条文直接覆盖推荐等算法技术及告知、选择与特定备案条件；边只能说治理议程涵盖该法域的算法推荐安排，不推断实施效果。 |
| `r7-platform-governance → r7-privacy` | interpretive／learning path | S019；缺隐私、监视、偏见与信任的完整直接来源 | 个性化选项不足以支持整个复合目标。 |
| `r7-platform-governance → r4-info-disorder` | learning path | S018、S019；缺实际效果或直接机制研究 | 规章可作为问题的制度背景，不能由义务推导风险下降。 |
| `r5-gatekeeping → r7-platform-governance` | 维持 interpretive | S014 | 已有解释边，不能冒充经典把关理论已验证全部平台治理。 |

### 8. `r8-content-analysis`（1 / 最低 1）

现有 direct：`rel-content-analysis-used-in-journalism`，`r8-content-analysis → used_in → r5-journalism`，G18，已复核，限新闻材料分类、采用／拒绝结果及编辑理由分析这一实例。

| 优先候选 | 应处层级 | 现有来源 ID／缺口 | 审计判断 |
|---|---|---|---|
| `r8-content-analysis → used_in → r4-agenda-setting`（限 1968 教堂山研究） | 可直接建候选 | G17 | 与上文同一具体研究设计相符；可作为第二个不重复的应用锚点，仍需独立关系复核。 |
| `r8-content-analysis → r8-computational` | interpretive／learning path | S022 | 摘要支持词典、监督与无监督自动内容分析；“内容分析属于整个计算传播”的本体关系过宽。 |
| `r8-content-analysis ↔ r8-interpretive-methods` | learning path／interpretive | G20、S021；缺比较两类项目复合节点的直接来源 | 可比较规则化编码和语境化细读的推论逻辑，不宣称它们互斥或同属一种方法。 |
| `r8-content-analysis → r4-effects` | 留空 | G20、S022只支持方法对象；缺效果研究设计来源 | 内容材料通常不能单独证明受众效果、生产者意图或因果机制。 |

## 本轮结论与下一步顺序

1. 目前没有入口因 direct 数量低于最低 1 而需要“补边”。
2. 如需为教学导航增加连接，优先使用现有 `learning_links` 或明确标为 `interpretive`，而非改变关系状态。
3. 唯一可在不新增来源的前提下优先送交独立复核的候选是：Shannon（严格限工程模型）、Innis（传统关联）、内容分析—议程设置（限原研究）、议程设置—新闻研究（限样本）、平台治理—算法推荐（限中国规章）。每一条仍需检查端点、动词、locator 和展示范围。
4. Lewin—把关、编码／解码—符号学、去殖民—方法、平台治理—隐私等仍有明确证据或端点缺口，应留空或停在非 direct 层。
