# COMMPASS 知识本体与证据规范 v0.1

状态：样本验证中  
更新日期：2026-09-11  
版本：v0.2（根据首轮 15 节点独立审查作最小修订）

## 1. 建模原则

COMMPASS 记录的不是“看起来彼此相关”的节点和连线，而是对本科生有导航价值、有材料支持且可以解释的知识主张。

- 八个问题区域是 COMMPASS 的教学导航，不是学界公认的分类法。
- 节点、导航归属、学术关系、学习推荐和来源互相独立，不得互相充当证据。
- 每条关系都是一项需要审核的学术主张，不做自动传递推理。
- 来源品质、它对某个主张的支持程度、以及内容的编辑审核状态是三个不同维度。
- 没有可定位的证据时，允许节点暂时不连边。

## 2. 八个导航区域

| ID | 区域问题 |
|---|---|
| `communication` | 传播如何发生 |
| `meaning` | 意义如何生成 |
| `media_society` | 媒介如何塑造社会 |
| `effects` | 信息如何影响个人与群体 |
| `institutions` | 新闻、组织与公共传播如何运作 |
| `power_culture` | 权力、文化与身份如何进入传播 |
| `digital_ai` | 数字平台、算法与人工智能如何改变传播 |
| `research_application` | 传播如何被研究和应用 |

一个节点只存一份，可归入多区。每项归属必须附一句编辑理由，并且指定一个默认展示区以保持布局稳定。

## 3. 节点类型

| `type` | 中文名 | 收录边界 |
|---|---|---|
| `tradition` | 学派与思想传统 | 有可追溯的问题意识、思想谱系或研究传统；不将临时编辑分组写成学派 |
| `person` | 人物 | 重要学者；或已独立核验传播学相关专业教育经历的知名毕业生 |
| `theory_model` | 理论与模型 | 可辨认的解释框架或分析模型；用 `subtype` 区分 `theory` 和 `model` |
| `concept` | 核心概念 | 能独立解释且反复使用的分析概念 |
| `research_topic` | 研究主题与方向 | 围绕对象或问题形成的研究集合；可用 `subtype` 记录 `field`、`history` 或 `frontier` |
| `method` | 研究方法 | 能说明适用问题、资料需求、实施方式和局限的方法 |
| `application` | 应用领域 | 传播知识被实际运用的领域 |

首版不将机构、课程、著作、案例和阅读材料做成节点。它们先作为来源或学习资源保存，只有在后续版本中成为反复探索的核心对象时才升级。

## 4. 节点字段

所有完整节点的必填字段：

```yaml
id: stable-id
slug: stable-route-slug
record_level: complete
type: theory_model
subtype: theory
name_zh: 中文主名
name_original: Original name
aliases:
  - name: 其他译名
    kind: alternate_translation
summary: 简明定义
why_it_matters: 对本科生的学习价值
key_points:
  - id: claim-id
    statement: 可核验的关键主张
    evidence: []
limits_or_debates: []
area_memberships:
  - area_id: effects
    is_primary: true
    rationale: 为什么在这个区域
learning_resources: []
learning_links: []
temporal_profile: relatively_stable
review_status: draft
created_at: YYYY-MM-DD
updated_at: YYYY-MM-DD
reviewed_at: null
```

候选节点可以只有名称、类型、导航归属、入选理由和来源线索，但必须显式标记 `record_level: candidate`，并用 `candidate_note`、`candidate_evidence_status`、`source_leads` 保留这些信息，不用空字段伪装成完整节点。

按类型增加的字段：

- 人物：`roles`、`communication_relevance`；毕业生另存学校、项目或专业、学位、时间和专门身份证据。
- 理论与模型：`questions_explained`、`propositions`、`conditions`。
- 方法：`suitable_questions`、`data_requirements`、`typical_procedure`、`limitations`。
- 传统：`central_questions`、`internal_differences`、`naming_boundary`。
- 研究主题：`core_questions`、`current_evidence_state`；动态主题必填时效字段。

## 5. 学术关系词表

关系只保存一个方向，界面按词表生成逆向表达。

| `relation_type` | 正向表达 | 使用限制 |
|---|---|---|
| `proposed` | 人物 → 提出 → 理论/模型/概念 | 必须区分原创提出、后续发展和普及 |
| `developed` | 人物 → 发展 → 理论/模型/概念 | 说明具体贡献，不以引用或使用代替 |
| `associated_with` | 人物 → 与……传统相关联 → 传统 | 必须解释关联性质，不自动显示为“成员” |
| `builds_on` | 节点 → 承接或发展自 → 节点 | 明确承接内容，不凭年代先后建边 |
| `criticizes` | 人物/理论/传统 → 批评 → 理论/概念/传统 | 说明被批评的具体命题 |
| `has_concept` | 理论/模型/传统 → 包含核心概念 → 概念 | 不得因术语同时出现即建边 |
| `addresses` | 理论/模型/概念/传统 → 解释或分析 → 研究主题 | 表达适用范围，不暗示解释已被证实 |
| `used_in` | 方法 → 用于研究 → 主题/应用领域 | 有方法文献或实际研究支持，说明适用问题 |
| `applied_to` | 理论/模型/概念 → 应用于 → 应用领域 | 要有具体应用证据，不写可能有用 |
| `contrasts_with` | 节点 ↔ 与……形成对照 ↔ 节点 | 唯一对称关系；必须说明比较维度 |

首版不使用模糊的“相关于”“影响了”“属于”。多个理论的“共同解释”作为教学组合卡保存，不自动生成理论之间的学术关系。

## 6. 关系与证据记录

```yaml
id: relation-id
source_id: source-node-id
target_id: target-node-id
relation_type: developed
statement_zh: 这条边具体声称什么
scope_note: 适用对象、时期、版本或限制
evidence_status: direct
evidence:
  - source_id: bibliographic-source-id
    locator: 页码、章节、段落标题或稳定位置
    support_note: 该材料如何支持这条关系主张
    support_role: supports
controversy_note: null
review_status: draft
reviewed_at: null
```

每条已审核关系至少有一项可定位、与关系主张匹配的证据。原创归属、人物身份、思想承继和直接批评属高风险主张，优先核查原始材料，并尽可能获得可靠研究的交叉说明。

## 7. 来源、证据与审核

### 7.1 来源记录

```yaml
id: source-id
source_type: primary_scholarship
title: 题名
authors_or_organization: []
year: 1972
publisher_or_venue: 出版者或刊物
doi: null
url: https://example.org
language: en
accessed_at: YYYY-MM-DD
access_status: full_text
bibliographic_note: null
```

`source_type` 允许：

- `primary_scholarship`：原始学术文献；
- `scholarly_synthesis`：可靠学术综述、手册或教材；
- `official_record`：机构档案、培养方案、官方人物资料或规范文件；
- `teaching_resource`：课程、教学指南或入门资源；
- `other_material`：只可作为线索或背景的其他材料。

`access_status` 记录本轮实际可读范围：`full_text`、`excerpt`、`abstract`、`metadata` 或 `unavailable`。其中 `excerpt` 表示只核到章节、出版社摘录或其他可定位片段，不得显示成整篇/整本已通读。学习资源可另存 `locator`，告诉学生从哪个章节、页码或稳定段落开始。

来源是否适合支持某类主张比统一的“权威分数”更重要。例如，大学官网适合证明培养方案或人物履历，但不必然足以裁定理论争议。

### 7.2 证据状态

- `direct`：材料明确表达该主张；
- `interpretive`：由材料作出的解释性归纳，必须说明推理理由；
- `pending`：尚缺足够支持，不进入默认公开图谱。

背景材料不得冒充主张证据；“存在争议”不等于“证据不足”。

### 7.3 内容审核状态

`draft` → `ready_for_review` → `reviewed` → `published`

任何阶段可转为 `needs_revision`。发布至少要求名称、主要主张、关系和来源定位都经过审核。候选撰写与最终审核由不同模型完成并留下日期记录；模型审核本身不是学术证据。

`reviewed` 与 `published` 必须有非空 `reviewed_at`，且公开主张与关系不得仍为 `pending`。来源访问状态、主张证据状态与编辑审核状态仍分别判断。

## 8. 争议与时效

```yaml
controversy_status: not_assessed
controversy_note: null
positions: []
temporal_profile: relatively_stable
as_of: null
last_evidence_check: YYYY-MM-DD
next_review_due: null
```

`controversy_status` 允许 `none_identified`、`contested`、`not_assessed`。`none_identified` 只表示本轮检索未发现必须提示的争议，不得展示为“学界没有争议”。

`temporal_profile` 允许 `relatively_stable` 和 `evolving`。动态主题必填 `as_of`、`last_evidence_check` 和 `next_review_due`。超过复核日期意味着需要重查，不自动意味着内容失效。

## 9. 学习推荐与展示减负

- `learning_links` 记录“下一步学什么”、先后顺序和编辑理由，不进入默认学术关系图。
- 首屏只展示八区、核心问题和少量代表节点；进入区域后再展开节点。
- 聚焦单节点时默认展示 4—6 条经编辑挑选、语义清楚的关系，并提供“查看全部”。
- 连线必须显示关系名；点击后可查看主张、来源和争议。
- 默认只绘制经审核的学术关系；教学推荐、待核实关系和编辑推断必须独立开关、清楚标识。
- 不用节点尺寸表示未经论证的“学术重要性”，不把连接数量解释为理论更重要，不用线条粗细暗示证据强弱。

## 10. 样本验证门槛

本规范在 15 个完整节点试填前只是 v0.1。通过门槛：

1. 七种节点类型均至少有一个真实样本；
2. 包含跨区节点、译名差异、争议条目、动态主题和需限定范围的关系；
3. 中国经验、非西方视角和当代前沿都由直接来源支撑，不为完成配额拼接关系；
4. 至少形成一条能回答“为什么先学这个、下一步看什么”的短学习路径；
5. 真实样本不需要依赖未规定的自由文本才能表达关键内容。

## 11. 首版暂不建模的内容

学术重要性分数、通用置信度百分比、前沿指数、自动生成的思想谱系树、关系传递、每个术语独立建节点、复杂多级类别继承，以及为图形漂亮而补写的无证据连线。
