# 来源注册表合并校验

- 生成文件：`research/source-register-node-drafts.csv`；未修改既有两个注册表或三份草案。
- 合并范围：`source-register.csv`、`source-register-primary.csv` 与三份草案文末“待并入来源”。

## 记录数与 ID

- 合并后记录数：**84**（既有注册表 45；草案临时来源 39）。
- ID 唯一性：**通过**；唯一 ID 84，重复 ID：无。

## 规范字段值

- `language` 实际值：en, zh-CN；允许集合 zh-CN/en/de/es/fr/other。
- `access_status` 实际值与数量：metadata 38、abstract 25、full_text 19、excerpt 2；允许集合 full_text/excerpt/abstract/metadata/unavailable。

上述为机械抽取后的研究登记值。加入 3 条去殖民传播补充来源，并根据独立原文闭环报告进行保守校正后，`content/data/sources.json` 当前共 **87** 条，展示值为：metadata 33、abstract 15、full_text 27、excerpt 12；具体升降级依据见 `pending-source-verification-global.md`、`decolonial-sources.json` 与来源的 `bibliographic_note`。
- 空 URL：0 条；记录：无。

## 疑似重复项（完全相同 URL 或 DOI）

- 完全相同 URL：无
- 完全相同 DOI：无

## 草案引用解析

- 临时来源 ID（去重后）：39；全部解析：**是**。
- 未解析临时 ID：无。
- 解析规则：标准正则提取 `GA\d+`、`NB\d+`、`N-CN-\d+`、`N-PR-\d+`，并与合并表 `id` 做集合比较。
