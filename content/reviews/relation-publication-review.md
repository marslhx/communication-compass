# COMMPASS 22 条关系正式复核资格审查

审查日期：2026-09-11。审查角色：Astra；本轮未参与这些关系的候选撰写，也未修改节点、关系或来源数据。建议通过项的 `reviewed_at` 为 `2026-09-11`。

## 结论与适用范围

22 条关系中，21 条具备从 `ready_for_review` 提升为 `reviewed` 的关系内容资格：10 条 direct 对应默认学术图层，11 条 interpretive 对应默认关闭的编辑解释／比较层。`rel-cultural-studies-has-hegemony` 继续 hold，保持 pending，不得进入任何公开关系图层。

这里的图层分配是**关系通过审核后的图层资格**，不是无条件绘图指令，也不是 `published` 裁决。关系、端点节点、证据的审核分别判断。候选端点仍是骨架条目；完整端点中的 pending 仍按待核区规则处理；关系通过不能将端点升级为已复核。实际绘图仍须执行 STATUS_RULES 与 final-content-gate 的端点公开规则、审核日期和范围可见性要求。若页面只允许已复核完整节点作为学术图端点，应继续过滤相应关系，而不降低端点门槛或否定已通过的有限关系主张。

本审查完整阅读 AGENTS.md、content/ONTOLOGY.md、content/STATUS_RULES.md、content/data/{relations,nodes,sources}.json、global-second-review.md、china-second-review.md、final-content-gate.md 及 research/pending-source-verification-global.md。逐条比对现有端点类型、中文名称、证据定位、来源实际登记范围、既有核查记录和关系限定。本轮未联网、未新增事实或来源，沿用既有访问证据；没有把2026-09-11复核日期称为本轮重新访问全部网页的日期。

## 逐关系裁决

表中的 `default` 指默认学术层资格，`interpretive` 指独立解释层资格，`hold` 指不提升。所有通过结论均针对当前 statement、scope_note 与 evidence 的完整组合，不能只截取两端名称和短关系名扩写结论。

| ID | reviewed_eligible / layer | 端点、证据与范围裁决 |
|---|---|---|
| `rel-china-introduction-contrasts-china-history` | 是 / interpretive | research_topic ↔ research_topic 合法。C17 全文的改革开放后学科史段落与 C15 已核目录支持两种导览范围；C15 年份和 excerpt 已修正。明确比较研究对象与时间尺度，不把页面任务差异解释成学理对立，也不以学习先后证明关系。 |
| `rel-marxist-journalism-addresses-journalism` | 是 / default | tradition → research_topic 合法。C19 已改为 excerpt；第二至第十讲目录直接支持所列教材问题范围。statement 明确2019年教材这一教学入口，scope 排除经验实现与全领域覆盖，因此目录证据与有限主张相称。源节点的原报纸 pending 不由本边解决。 |
| `rel-china-history-contrasts-marxist-journalism` | 是 / interpretive | research_topic ↔ tradition 合法。C15 目录第十二章第一节与 C19 简介／目录均在已核片段内；跨文本概括的是历史重建与规范／理论组织的页面任务。承认史学解释立场，不主张学术互斥，不属于凭年代推承继。 |
| `rel-hall-proposed-encoding-decoding` | 是 / default | person → theory_model 合法。G16 后续全文核查及 PDF 3—5 页支持署名者提出特定模型；当前文字没有把后来常见三分法归于1973年稿，scope 明确版本差异。原创归属被限定到该讨论稿中的具体模型表述，不扩张为相关概念的绝对首次出现。 |
| `rel-encoding-decoding-addresses-audience` | 是 / interpretive | theory_model → research_topic 合法。S006 已核摘要把意识形态解读位置放入经验受众话语研究并提出多维修正；足以支持受众研究入口的有限归纳。不能把摘要当作全文，也不能由此覆盖全部受众测量或把三分位置混入1973年四分稿。 |
| `rel-mcluhan-associated-medium-theory` | 是 / interpretive | person → tradition 合法。S002 摘要及建议阅读与 S004 第一章共同支持代表性关联，S004 已按所核章节改为 excerpt。“重要代表”属于明确的跨文本归纳，不能改为唯一创始人。人物 candidate 不因该有限关联获得完整履历审核。 |
| `rel-medium-theory-contrasts-effects` | 是 / interpretive | tradition ↔ tradition 合法。S002 摘要支持技术形式／具体内容的区分；把这一维度映射到效果研究子范围是编辑比较。当前 scope 明确仅比较内容对态度／行为影响的子范围，不代表全部传播效果传统。不能只显示无范围的“媒介理论对照传播效果”。 |
| `rel-mccombs-proposed-agenda-setting` | 是 / default | person → theory_model 合法。G17 已有完整重印核查，署名、假说及讨论定位支持与 Shaw 共同表述并初步检验。明确思想前史与相关设计限制；不把提出关系读为独自发明或因果证明。 |
| `rel-shaw-proposed-agenda-setting` | 是 / default | person → theory_model 合法。与上项使用同一共同署名原典；Shaw 的并列贡献应保留独立边。不是重复边，也不能机械合并成单一作者提出。人物端点继续保留自身成熟度。 |
| `rel-agenda-setting-addresses-political` | 是 / default | theory_model → research_topic 合法。G17 重印106—107／原刊177—178页直接支持1968年美国总统竞选新闻与选民议题排序的研究对象。范围锁定教堂山研究，不宣称涵盖政治传播所有问题。 |
| `rel-agenda-setting-contrasts-persuasion` | 是 / interpretive | theory_model ↔ research_topic 合法。G17 重印106／原刊177页支持显著性与态度方向、强度的区分；映射到“说服与态度改变”节点仍为编辑比较。不得扩张为两个领域互斥或所有后续研究都遵循这一划分。 |
| `rel-hall-associated-cultural-studies` | 是 / interpretive | person → tradition 合法。G21 的任职／协作研究段落与 S005 Administrative History 支持英国／伯明翰范围内的理论和组织关联。保留 Hoggart、Johnson、同事及研究小组的集体史，不能把关联改成独创。文化研究现为 candidate，不恢复未选草案的完整节点状态。 |
| `rel-cultural-studies-has-hegemony` | 否 / hold | tradition → concept 形式类型合法，但 G24 只核到开篇等片段，没有核到关系所需的葛兰西／霸权论述；所引66—72页明确仍待核。目标“意识形态与霸权”又是复合概念，statement 仅讨论霸权，未解决整体端点的误读。两项实质问题均未闭合，不能因存在 excerpt 或通过结构校验升级。 |
| `rel-cultural-studies-addresses-race` | 是 / interpretive | tradition → research_topic 合法。S005 关于黑人政治的机构史与 S007 已核手稿1—2页共同承担证据；后者将分析对象限定到种族、表征与身份，避免只凭机构议程建立理论关系。英国／伯明翰范围显式保留，不覆盖全球全部族群研究；两个端点的 candidate 状态独立显示。 |
| `rel-hall-developed-representation` | 是 / interpretive | person → concept 合法。S007 手稿1—2页支持霍尔推动表征政治及差异／身份研究的二手归纳；贡献内容具体，scope 明示不主张原创“表征”概念。符合 developed 的具体贡献要求，不是仅凭使用或引文建立发展边。 |
| `rel-gatekeeping-addresses-journalism` | 是 / default | theory_model → research_topic 合法。G18 全文383—390页的新闻材料采用／拒绝及理由分析直接提供研究实例，范围收窄至一位编辑、七天、一家非都市报纸。源节点 Lewin 前史 pending 与本关系使用的 White 个案证据无依赖。 |
| `rel-gatekeeping-addresses-platform-governance` | 是 / interpretive | theory_model → research_topic 合法。S014 摘要本身已研究数字新闻中的个人、算法和平台，并非把经典理论凭空迁往新对象；将选择与可见性解释为平台治理的一种视角仍为编辑归纳。当前 scope 排除治理的全部法律、市场、劳动和数据问题，故可保留解释层，但不能当作“把关理论已验证平台治理”的 direct 应用。 |
| `rel-gatekeeping-contrasts-agenda-setting` | 是 / interpretive | theory_model ↔ theory_model 合法。G18 全文承担选择过程一侧，G17 后续全文核查承担显著性比较及因果限制一侧，第二轮的 G17 访问冲突已闭合。比较经典问题、承认可连续研究，不把学习顺序当作学术承继。 |
| `rel-habermas-developed-public-sphere` | 是 / default | person → theory_model 合法。G19 metadata 仅证明著作／历史研究范围，G23 全文49—50、54—55页实际承担概念论述和历史变化证据；不是仅凭书名证明理论命题。用 developed 而非首次提出或影响力排序，贡献范围清楚。 |
| `rel-public-sphere-addresses-political-communication` | 是 / default | theory_model → research_topic 合法。G23 全文49—50页直接支持公共意见形成、公众讨论及社会与国家间中介位置。scope 明示规范／制度分析路径，未把理论条件当作民主参与已实现或覆盖政治传播全域。 |
| `rel-public-sphere-addresses-gender` | 是 / default | theory_model → research_topic 合法。S015 已核全文60—61、63—68、77页支持排斥、参与平等与从属反公共。当前 statement 明确是女性主义批评性展开；scope 排除“原初模型已解决”与复合目标中全部酷儿传播研究。图中必须同时可见该子范围，不能用宽目标名称替换实际主张。 |
| `rel-content-analysis-used-in-journalism` | 是 / default | method → research_topic 合法。G18 全文提供新闻材料分类、采用／拒绝及编辑理由的实际研究实例，满足 used_in 的实际应用依据。当前文字没有扩大到主题、来源、框架和呈现的全部用途；方法节点其他程序及 API 待核不被这一个案补证。 |

## 机械升级白名单

下面是唯一授权给合并步骤的关系内容白名单。`layer` 为报告中的展示资格，不要求向 relation Schema 添加新字段。仅可改通过项的 `review_status=reviewed` 与 `reviewed_at=2026-09-11`；不得自动把 interpretive 改 direct、把 reviewed 改 published、补写关系或升级端点。若主代理改变了关系的实质内容或证据，须对改变部分重新复核。

```json
{
  "reviewed_at": "2026-09-11",
  "reviewed_eligible": [
    {"id": "rel-china-introduction-contrasts-china-history", "layer": "interpretive"},
    {"id": "rel-marxist-journalism-addresses-journalism", "layer": "default"},
    {"id": "rel-china-history-contrasts-marxist-journalism", "layer": "interpretive"},
    {"id": "rel-hall-proposed-encoding-decoding", "layer": "default"},
    {"id": "rel-encoding-decoding-addresses-audience", "layer": "interpretive"},
    {"id": "rel-mcluhan-associated-medium-theory", "layer": "interpretive"},
    {"id": "rel-medium-theory-contrasts-effects", "layer": "interpretive"},
    {"id": "rel-mccombs-proposed-agenda-setting", "layer": "default"},
    {"id": "rel-shaw-proposed-agenda-setting", "layer": "default"},
    {"id": "rel-agenda-setting-addresses-political", "layer": "default"},
    {"id": "rel-agenda-setting-contrasts-persuasion", "layer": "interpretive"},
    {"id": "rel-hall-associated-cultural-studies", "layer": "interpretive"},
    {"id": "rel-cultural-studies-addresses-race", "layer": "interpretive"},
    {"id": "rel-hall-developed-representation", "layer": "interpretive"},
    {"id": "rel-gatekeeping-addresses-journalism", "layer": "default"},
    {"id": "rel-gatekeeping-addresses-platform-governance", "layer": "interpretive"},
    {"id": "rel-gatekeeping-contrasts-agenda-setting", "layer": "interpretive"},
    {"id": "rel-habermas-developed-public-sphere", "layer": "default"},
    {"id": "rel-public-sphere-addresses-political-communication", "layer": "default"},
    {"id": "rel-public-sphere-addresses-gender", "layer": "default"},
    {"id": "rel-content-analysis-used-in-journalism", "layer": "default"}
  ],
  "hold": [
    {"id": "rel-cultural-studies-has-hegemony", "layer": "hold", "reason": "所需正文未核，复合概念端点范围仍未解决"}
  ]
}
```

## 合并与展示注意事项

1. 本轮接受关系层的独立审查，不把“源节点另有 pending”机械等同于该节点全部关系都 pending。反过来，某边有证据也不能消除节点的 pending 或赋予完整节点公开资格。r5-marxist-journalism、r5-gatekeeping、r8-content-analysis 等必须继续遵循节点状态规则。
2. 对 candidate 端点只能展示已有骨架字段与明确成熟度；关系证据只承担该条连接的有限主张，不证明完整理论定义、人物履历或节点所有范围。四个人物 candidate 的姓名与其对应关系主张有本条所列材料支持，不由此把人物整体改为 reviewed。
3. 解释层必须默认关闭，并显示“编辑归纳／比较”、理由及 scope。两条中国页面任务比较、三条经典问题对照与平台治理视角都不能混入默认事实层；learning_links 无论与现有关系是否指向同一目标，均不得自动转换成关系。
4. G17、G23、S015 的可读副本链接在既有来源闭环报告中；S004 的章节链接在来源注记中。界面应让学生能够找到 locator 对应版本；不能只给 DOI 再暗示 DOI 页面本身包含所引全部正文。此资料呈现要求不授权本轮虚构新访问状态。
5. 第二轮审查的 hold 必须按后续证据分别处理：G16/G17/G23/S015 的原文闭环和 C15/C19 的访问修正已有记录，故相关边可以提升；G24 霸权部分仍无闭环，继续 hold。不能把最终内容闸门 PASS 当作这一逐条审查的替代。

## 审查快照

| 文件 | SHA-256 |
|---|---|
| content/data/relations.json | `3b34ca65ccd21207b22de59c5570f16127332ad348052b7ead5cf3856e734059` |
| content/data/nodes.json | `be69151d5f6974258aef84a89e8586b06133769031ba6d71669fdc9a46ea48cf` |
| content/data/sources.json | `e673fdd59bca1f438c30ddd8d44d40c2e31ae09c987d0c917bd99e947dcfc84d` |

主代理执行上述状态／日期更新会改变快照，不改变本报告对白名单内原 statement、scope 与证据组合的审查结论。本报告不宣称已修改任何数据或已发布网站。
