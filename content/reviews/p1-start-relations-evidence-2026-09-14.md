# P1 首页起点关系候选与证据核验

日期：2026-09-14。范围：`r3-medium-theory`、`r6-decolonial`、`r7-platform-governance`。本记录是候选撰写侧的证据核验，不是独立终审。

结论：提交 **3项 direct 候选**，其中 **1项替换既有关系、2项新关系**。三个起点各1项，不为达到数量上限补边。正式数据、reviewed名单与公开图层均未改动。

## 候选决定

| 起点 | 关系 | 操作与教学价值 | 决定性原文位置 |
|---|---|---|---|
| 媒介理论 | `p-mcluhan` → `associated_with` → `r3-medium-theory` | 申请以同ID的direct候选替换现有已复核interpretive关系；让人物入口与传统入口形成可解释联系，不制造重复边 | P01 pp.8–10、20；作者明确把medium theory联系到McLuhan，同时主张超越他 |
| 后殖民与去殖民传播 | `r6-decolonial` → `addresses` → `r6-race` | 新候选；从抽象知识批判进入具体媒介表征与声音分配问题 | P02 p.142、p.151、pp.153–154；殖民种族化叙事、后殖民批判与肯尼亚受众案例相互衔接 |
| 平台治理 | `r3-political-economy` → `addresses` → `r7-platform-governance` | 新候选；把平台治理接到国家、资本、劳动及制度分析 | P03 pp.4–5、7；作者明确采用政治经济取向讨论中国平台治理 |

`direct`仅意味着原文支持关系文字，不表示该研究的全部观点已被证实。所有候选保留`ready_for_review`和空`reviewed_at`；只有独立复核者能决定是否进入正式数据。

## 来源与访问边界

- **P01**：[Meyrowitz，MEA官方原文](https://www.media-ecology.net/publications/MEA_proceedings/v2/Meyrowitz02.pdf)。实际打开15页PDF，核读指定片段。用`associated_with`而非`proposed`，避免把明确思想关联扩大为独创归属；不能把结语中的未来综合建议自动建成`builds_on`。
- **P02**：[Nothias与Cheruiyot，IJoC官方原文](https://ijoc.org/index.php/ijoc/article/download/8847/2526/35595)。实际打开24页PDF。p.151直接使用“postcolonial critique”定位声音与权力问题；关系限于后殖民表征批判这一支与所研究的肯尼亚情境，不把后殖民、去殖民和去西方化压成同义词。
- **P03**：[Yuan与Zhang，SAGE官方原文](https://journals.sagepub.com/doi/pdf/10.1177/20563051251323030)。实际打开9页PDF，作者副本也可读。这是传播领域的特刊导论及研究问题建构，可证明政治经济路径确实用于分析平台治理；不以导论转述证明具体治理成效或现行法律状态。

三条来源均以`excerpt`登记本轮实际核读范围，未保存或镜像PDF。P01保留版权限制；P02标注CC BY-NC-ND；P03标注CC BY-NC 4.0。项目只写书目、定位及自行概述。

## 未提交为direct的路线

1. **媒介理论—平台化的“承接”**：当前材料不足以明确证明思想承继；保持教学迁移，不创建`builds_on`。
2. **后殖民—文化研究的整体承继**：伞形入口不能据作者或关键词重叠形成单一谱系。
3. **Nothias 2020新闻生产研究**：搜索索引呈现正文，但本轮正式页进入最小页面，未成功核到可定位原文；作者页及ResearchGate只确认书目／摘要，因此不采用它新建新闻生产关系。改用真正打开的2019文章，不把两篇混为一篇。
4. **平台治理—算法推荐“解释”边**：两端都是research_topic，不能套用`addresses`的理论／概念／传统→研究主题规则。法规义务也不等于理论关系或治理效果。
5. **Gorwa治理三角形—传播政治经济学**：官方2019全文可读，但其明确借用的是跨国公司治理、国际关系与国际政治经济文献；不单凭这一点等同为现有传播政治经济传统。平台候选改依P03明确的传播领域政治经济研究。

## 交接与装配边界

机器候选：`research/p1-start-relations-2026-09-14.json`。该文件显式`assembly_allowed=false`，且不位于`content/revised`自动装配目录。首项复核通过后必须替换原ID `rel-mcluhan-associated-medium-theory`，不得额外增加一条同端点同动词边；新候选共2条。

新来源完整对象：`research/relation-source-additions-2026-09-14.json`（P01–P03）。已按主代理指定来源管线路径保存；主代理／工程线负责将此文件登记进`research/source-inputs.json`并重建。本代理不直接写`sources.json`、历史迁移输入或source-inputs清单，也不运行normalize／assemble以免与修复线冲突。

候选独立结构校验通过：3来源schema、3关系schema、端点类型、来源引用、ID去重及1替换／2新增规则均通过；不存在reviewed候选。`validate_content.py`对正式数据检查也通过：107节点／44关系／181来源。正式数据检查仅用于确认现状，不把候选计入公开关系或成熟度统计；未重跑会改写全局报告的两个审计，以免与并行线冲突。
