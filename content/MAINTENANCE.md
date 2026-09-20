# COMMPASS 内容维护说明

更新日期：2026-09-14。当前数据统计、审核缺口和发布清单见 [版本基线](../docs/CONTENT_BASELINE.md)。`complete`表示字段齐全，`ready_for_review`表示待内容审核；只有独立审核白名单能够授予`reviewed`。团队不再用“完整样本”作为内容完成承诺。

## 数据流

网站只读取 `content/data/`。不要直接把草稿、复核报告或 `content/revised/` 作为前端运行时数据源。

```text
research/*.csv + source-inputs.json 声明的来源登记／补丁
  └─ normalize_research_data.py → candidate-nodes.json + sources.json
content/revised/*.json
  + complete-node-selection.json
  + reviewed-nodes.json
  + reviewed-relations.json
  └─ assemble_content.py → nodes.json + relations.json + public-relations.json
  └─ validate_content.py → Schema 与跨记录规则校验
  └─ audit_content_depth.py → 数量与深度缺口排队报告
  └─ audit_release_readiness.py → 发布准备度排队报告
```

`check_content_rebuild.py`在隔离目录重建并检查上述生成 JSON 与正式数据逐字段一致，CI 不会重写正式数据。来源输入顺序、显式覆盖规则及旧输出的92条一次性登记迁移见 [来源重建说明](../research/SOURCE_REBUILD.md)；迁移不等于重新核验。新增来源请登记在 `research/` 的明确输入中并加入 `source-inputs.json`，禁止只编辑 `content/data/sources.json`。

## 新增或修订候选入口

1. 在 `research/candidate-nodes.csv` 维护原始候选信息。
2. 按现有字段规则更新规范化表；不要用同义词替代稳定 ID。
3. 为来源线索登记可访问链接、访问日期和真实读取范围。
4. 运行三步内容管线并检查错误。

候选入口只承诺名称、类型、导航归属、入选说明与来源线索。不要为填满页面而生成未经证据支持的定义、履历或理论关系。

## 补齐详情字段并提交内容审核

1. 先在 `content/revised/` 中创建或修订完整记录。
2. 将其稳定 ID 加入 `content/complete-node-selection.json`；装配器会以该清单为完整节点的唯一边界，不再锁定固定数量。
3. 每一项主张标记 `direct`、`interpretive` 或 `pending`，并给出来源、locator、支持范围和支持角色。
4. `interpretive` 必须让编辑归纳理由可见；`pending` 不得进入摘要、搜索摘要、知识卡结论或公开关系图。
5. 交由未参与撰写的审查者复核。只有书面复核明确列入白名单，才可加入 `reviewed-nodes.json`。

完整节点含任一 pending 主张时，不得标为 `reviewed` 或 `published`。学习链接只表示教学顺序，不证明理论继承、提出或影响关系。

## 维护关系

关系必须使用 `content/ONTOLOGY.md` 中的语义词表，写明完整中文关系句、适用范围与证据。不要用模糊的“相关”“影响”替代可以核验的语义。

- `direct` 且经独立复核：进入默认学术层；
- `interpretive` 且经独立复核：进入默认关闭的编辑比较层；
- `pending`：不进入任何公开关系层。

独立复核通过后，将 ID 和层级写入 `reviewed-relations.json`。关系通过不能提升端点节点的成熟度；候选端点仍为“候选入口”，待审端点仍须保留其内容状态。

## 动态与前沿内容

`temporal_profile=evolving` 的记录必须同时维护 `as_of`、`last_evidence_check` 和 `next_review_due`。超过复核日期只显示“需要重查”，不得自动改写为失效。法规、平台政策和 AI 前沿应在正文可见位置说明法域、版本和适用主体。

## 来源登记

`access_status` 记录实际读到的范围，而不是来源品质：

- `full_text`：已核全文；
- `excerpt`：已核片段；
- `abstract`：已核摘要；
- `metadata`：仅核书目信息；
- `unavailable`：当前不可访问。

不要因为今天打开了书目页，就把此前未读正文升级为全文；也不要用 `reviewed_at` 代填 `accessed_at`。网页变化时保留原来源身份、定位和既有访问记录，再新增本次核验说明。

上传文件的可读范围和再发布授权另行判断。Twente `T001`等资料遵守 [来源使用与再发布边界](SOURCE_USE.md)，不把PDF、全文提取或页面图复制到公开目录。

## 深度审计与下一批排队

`python3 scripts/audit_content_depth.py`默认记录当前北京时间日期；复现指定快照可传入`--as-of YYYY-MM-DD`，该参数不会改写来源访问日期或审核日期。A/B/C只计已有记录数量和缺口，不能证明资源已分层、理论已核实或无需教师审阅。待核与无来源的关键主张优先，之后按专题补第二项独立学习材料、应用条件、案例和局限；无合适证据时允许零关系。

## 每次提交前

新环境先执行 `python3 -m pip install -r requirements.txt`（推荐使用 `.venv`）和 `npm ci`。随后运行：

```bash
python3 scripts/check_content_rebuild.py
python3 -m unittest discover -s scripts/tests -v
python3 scripts/validate_content.py
python3 scripts/audit_content_depth.py
python3 scripts/audit_release_readiness.py
npm run typecheck
npm run lint
npm test
npm run build
```

以上是默认检查，不重写正式来源／节点。已修改输入时，先用规范化器的`--output-dir`和装配器的`--data-dir`生成隔离文件，审查预期差异，再运行正式`normalize_research_data.py`、`assemble_content.py`、`validate_content.py`并重复检查。规范化写出会拒绝静默移除现有来源；来源更正使用明确的`replace_ids`补丁，并保留访问和证据边界。

随后至少手工检查：首页八区、一个已审核节点、一个含待核节点、一个待审核节点、两种关系图层、搜索无结果、404，以及320px宽度下无横向滚动；存在候选入口时再检查候选态。浏览器验收需写明对应数据和界面版本，不能沿用旧快照替代本次验证。
