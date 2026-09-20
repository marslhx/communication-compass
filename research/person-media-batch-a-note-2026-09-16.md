# 国外核心人物教育经历与公开肖像受控调研 A 批

- 调研日期：2026-09-16
- 范围：克劳德·香农、斯图亚特·霍尔、唐纳德·肖、乔治·赫伯特·米德
- 仓库实际节点 ID：`p-shannon`、`p-hall`、`p-shaw`、`p-george-herbert-mead`
- 输出性质：待主代理复核的完整节点覆盖候选；未登记到 `source-inputs.json`，未写入 `revised-node-overrides.json`，未改动 `content/data/`

## 方法与边界

先核对 `content/schema/node.schema.json`、`content/schema/source.schema.json`，再检查正式数据中已有 `portrait`／`education_records` 的人物示范。肖像只有在页面同时给出可访问文件、署名链和明确许可时才写入节点。机构网页只展示照片而未声明复用许可，不等同于允许公开展示。

每人最终判断使用不超过三个主要页面。学位、专业和完成状态只按页面明示填写；未说明专业时明确保留“未注明”，未完成的博士研究不写成学位。

## 直接证据

### 克劳德·香农（`p-shannon`）

- `R401`（MIT News 官方讣闻）直接记录：1936 年在 University of Michigan 获数学与电气工程两个 B.S.；1940 年在 MIT 获电气工程 S.M. 与数学 Ph.D.。
- `R402`（Wikimedia Commons / Oberwolfach Photo Collection）直接给出 Konrad Jacobs、MFO、CC BY-SA 2.0 DE 和 Wikimedia VRT ticket #2008042410024381，并提供可直接访问原图。
- 节点新增三条 `education_records`、一条许可明确的 `portrait`，并加一条 `R401` 学习资源；其他内容不变。

### 斯图亚特·霍尔（`p-hall`）

- `R403`（Merton College, Oxford 官方讣闻）直接记录：1951 年凭 Rhodes Scholarship 到 Merton 学习 English，完成 B.A. 后开始以 Henry James 为题的博士研究，1956 或 1957 年中止。
- 节点新增 B.A. 与未完成博士研究两条 `education_records`，并加一条 `R403` 学习资源；未写入肖像。

### 唐纳德·肖（`p-shaw`）

- `R404`（The News & Observer 公开讣告）逐项记录：1957 年 Mars Hill College associate's degree；1959、1960 年 UNC-Chapel Hill bachelor's 与 master's degrees；1966 年 University of Wisconsin doctorate。
- 该页未直接说明各学位专业。节点新增三条 `education_records`，`program` 明示“专业未在所引讣告中注明”，并加一条 `R404` 学习资源；未写入肖像。
- 证据等级说明：`R404` 不是大学档案页，强度低于官方校史；但其具体年份与机构可直接读取，且与现有 `S052` 的 UNC 任职纪念记录相容。主代理可在后续找到 UNC 或 Wisconsin 原始档案时替换升级。

### 乔治·赫伯特·米德（`p-george-herbert-mead`）

- 既有 `S130`（Stanford Encyclopedia of Philosophy）直接记录：Oberlin College 1879—1883、Harvard 1887—1888，并在德国继续学习至 1891；节点只记录就学阶段，不声称 SEP 未明确给出的学位。
- `R405`（Jane Addams Digital Edition, Ramapo College）把人物图片明确标记为 Public domain，并说明图片来自 University of Chicago Centennial Catalogues；页面提供可直接访问原图。
- 节点新增三条 `education_records` 和一条 `portrait`；原 `S130` 已是学习资源，因此不重复新增同一来源。

## 许可判断

- **可接入：香农。** 文件页有作者、版权方、明确 CC BY-SA 2.0 DE、许可条件和 VRT 权利确认。使用时应保留署名与许可信息；若裁切或改编，应标注改动并以相同或兼容方式共享。
- **可接入：米德。** Jane Addams Digital Edition 的单项记录明确写明 `Public domain`，且标出图片来源。节点的许可措辞限定为“as marked by the item record”，避免把站点中其他材料的许可一并外推。
- **不接入：霍尔。** Commons 的 `Hall Stuart.jpg` 作者与日期未知，页面一方面称源站标注 public domain，另一方面结构化许可为 Free Art License，且本轮检索页显示该文件自 2026-06-14 起被提名删除。其他检索到的同名文件存在人物误识或上传者与摄影者权利链不一致问题；Merton、Open University 页面图片也没有开放复用声明。
- **不接入：肖。** UNC／BU 纪念页面和讣告图片均未见明确开放许可，Commons 未找到可确认身份及权利链的肖像。机构展示图片不推定为可复用。

## 推断与编辑决定

- 任务中的前三个长 ID 与仓库实际 ID 不一致；为避免重复节点，本批沿用正式数据中的 `p-shannon`、`p-hall`、`p-shaw`。
- Hall 的第一条 period 写作“1951 起（完成年份未注明）”，是对来源缺少 BA 完成年份的显式保留，不是年份推断。
- Shaw 的专业全部保留为未知；没有采用 Wikipedia 对 journalism 专业的陈述，也没有从其职业反推专业。
- Mead 的德国阶段用宽泛机构名 `Universities in Germany`，不声称获得学位。`S130` 支持 1888—1891 年德国学习及 Dilthey／Wundt 语境。
- 新增学习资源只用于让教育来源在人物页可见；未改变任何核心贡献、限制、关系、`review_status` 或 `reviewed_at`。

## 失败项与不得采用的信息

- MIT News 自带的 Shannon 照片仅有 `Photo: MIT Museum`，没有复用许可；未采用。
- Merton 与 Open University 的 Stuart Hall 图片没有页面级开放许可；未采用。`Hall Stuart.jpg` 因来源、作者、许可冲突及删除提名，只保留为失败候选。
- Donald Shaw 的现有纪念／讣告页面照片没有许可声明；未采用。
- Commons 的 George Herbert Mead 常见图存在“缺少来源信息／缺少作者信息”警告；未采用。改用 `R405`。
- `R405` 人物页把 Mead 出生日期误录为 1903-02-27，与页面标题 1863—1931 及权威人物资料冲突；本批只使用该记录的肖像、来源与 rights 字段，不采用其出生日期或生平字段。

## 文件与接入状态

- 新来源候选：`research/person-media-batch-a-sources-2026-09-16.json`（`R401`—`R405` 连续）
- 完整节点覆盖候选：`content/revised/person-media-batch-a.nodes.json`
- 本说明：`research/person-media-batch-a-note-2026-09-16.md`
- 三个文件均未接入正式重建链；需主代理独立复核后再登记。
