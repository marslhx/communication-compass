# 候选节点机械规范化校验

输入：`research/candidate-nodes.csv`；来源表：`research/source-register.csv`；输出：`research/candidate-nodes.normalized.csv`。

## 总数与 ID

- 候选记录总数：80
- 唯一 `node_id`：80/80
- ID 唯一性：通过

## 类型覆盖（原始 node_type）

- `application`：6
- `concept`：9
- `field`：17
- `frontier`：8
- `history`：2
- `meta`：1
- `method`：9
- `person`：10
- `theory`：9
- `tradition`：9

## 区域覆盖

稳定区域 ID 映射：1=`communication`，2=`meaning`，3=`media_society`，4=`effects`，5=`institutions`，6=`power_culture`，7=`digital_ai`，8=`research_application`。

主区域记录数：1（communication）：12；2（meaning）：9；3（media_society）：9；4（effects）：12；5（institutions）：12；6（power_culture）：9；7（digital_ai）：8；8（research_application）：9。
所有八个区域均有主区域记录：是。

## source_leads 解析

- 所有 `source_leads` 中的 source ID 均能在 `source-register.csv` 解析：是。
- 未解析项：无

## 规范化映射

- `theory`→`theory_model`/`theory`；`field`→`research_topic`/`field`；`history`→`research_topic`/`history`；`frontier`→`research_topic`/`frontier`；`meta`→`concept`/`meta`；其余规范化类型保留，`subtype` 置空。
- `stable`→`relatively_stable`；`dynamic`、`forming`→`evolving`。
- `forming` 原意已在 `editorial_note` 保留，共 3 条：r1-china-introduction、r2-huaxia、r6-decolonial。
- `direct`→`direct`；`pending_verification`→`pending`；`editorial_inference`→`interpretive`；`disputed`→`pending`。
- `disputed`→`contested`；其余→`not_assessed`；所有 `record_level` 统一为 `candidate`。

## 发现的问题

- 3 条记录的 `stability=forming` 已按要求映射为 `evolving`，并在 `editorial_note` 保留形成中含义：r1-china-introduction、r2-huaxia、r6-decolonial。
- 原始文件共 80 条候选记录，规范化未增加、删除或改写学术内容；仅进行了字段映射和区域 ID 转换。
