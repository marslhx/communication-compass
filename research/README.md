# 内容调研证据规范

本目录保存进入“传播罗盘”知识本体之前的来源、候选节点和范围判断。研究材料必须先经过证据登记，再进入网站内容数据。

当前数据与治理状态以 [2026-09-15版本基线](../docs/CONTENT_BASELINE.md) 和运行时 `content/data/` 为准：131个字段齐全节点不等于131个已审核节点。带日期的调研、短名单和审计报告保留历史统计，不覆盖后续新增批次。

## 来源等级

- `A-primary`：理论原始文献、官方培养方案、学术组织正式文件、作者或机构发布的原始资料。
- `A-reference`：权威 handbook、学术百科、经过编辑审校的参考工具。
- `B-synthesis`：主流教材、高质量综述、大学正式课程材料。
- `C-context`：研究机构介绍、学者主页、出版社简介等背景材料。
- `D-lead`：搜索结果、博客、聚合网页等线索，只能帮助寻找更高等级来源，不能独立支持知识节点。

## 证据状态

- `verified`：已经打开并核对支持当前主张的具体页面或原文。
- `partial`：来源真实，但只支持主张的一部分或仅能看到摘要、目录。
- `lead`：尚未核对原文，只是待追踪线索。
- `unavailable`：来源暂时不可访问，不能作为当前发布依据。

这里的 `verified/partial` 只记录“本轮是否打开并核对了这项来源”，不是内容主张的统一可信度。正式节点中，每条主张与关系另按 `direct/interpretive/pending` 记录证据支持状态，详见 `content/ONTOLOGY.md`。

## 纳入原则

1. 不根据标题推断文献内容。
2. 培养方案用于判断教学覆盖，不直接证明理论命题。
3. 教材和 handbook 用于建立学科范围；理论定义与提出关系尽量回到原始文献。
4. 人物身份、教育经历和“传播学专业毕业生”必须有机构或本人资料支持。
5. 争议归类必须记录替代观点，不能把单一教材的分类写成学界共识。
6. 每条关系都要说明来源支持的是事实关系、概念邻近，还是项目的教学编排。

## 文件用途

- `source-inputs.json`：在旧 CSV 规范化结果之后按顺序追加／显式覆盖的来源输入清单；流程与一次性迁移边界见 [SOURCE_REBUILD.md](SOURCE_REBUILD.md)。
- `migrated-expansion-sources-2026-09-14.json` 与 `source-migration-provenance-2026-09-14.json`：缺失上游登记的92条既有书目迁移及逐ID校验，不是新核验；后续修订以有依据的补丁追加。
- `home-start-source-updates-2026-09-14.json`：首页起点定点核验的S010更新及H01/H02新增来源。
- `relation-source-additions-2026-09-14.json`：P01–P03来源登记，关联候选侧证据报告；不等于关系已审核或公开。

- `source-register.csv`：用于学科范围、课程覆盖和竞品范围判断的来源登记。
- `source-register-primary.csv`：用于完整节点的原始学术文献、机构档案和规范性材料。两表的 `source_id` 在合并后必须全局唯一。
- `candidate-nodes.csv`：原始候选节点池。
- `candidate-nodes.normalized.csv`：原首版候选入口的规范化输入；候选来源线索不代表对应运行时记录的最新成熟度。新增批次与详情选择由装配管线合并。
- `candidate-validation.md`：数量、ID、类型、八区和来源线索的机械校验。
- `full-node-shortlist.md`：原15节点详情结构试填短名单，属于历史闸门材料；当前字段齐全记录由 `content/complete-node-selection.json` 决定。
- `coverage-audit.*`：待完整节点实填后生成的经典传统、中国经验、区域多样性与前沿覆盖审计。

用户上传教学PDF及其提取材料的引用、证据和再发布范围遵守 [来源使用边界](../content/SOURCE_USE.md)。研究登记中的来源等级与内容深度审计的A/B/C不是同一套标记。
