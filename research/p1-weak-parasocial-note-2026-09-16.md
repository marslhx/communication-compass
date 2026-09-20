# P1 较弱证据升级：`c-parasocial-interaction`

**日期：** 2026-09-16  
**预留来源 ID：** Q346（本轮未登记）

## 结果

本轮未获得一份能够实际打开、连续阅读并定位正文的合格新增来源，因此不创建 Q346 来源记录，也不创建节点修订 JSON。`c-parasocial-interaction` 现有证据层级保持不变：S117 仍为 metadata，Q302 仍为 abstract。

## 已核线索与停止原因

优先检索 Dibble、Hartmann 与 Rosaen 的 *Parasocial Interaction and Parasocial Relationship: Conceptual Clarification and a Critical Assessment of Measures*，因为同一篇正文若可访问，理论上可同时补强节点中 `psi-p1` 与 `psi-p2` 两条 direct 表述。

- Wiley/Oxford 的期刊记录可核对题名、作者、DOI、卷期页码和摘要，但当前可读取内容仍止于摘要，不能据此把 `access_status` 升为 `full_text`。
- CORE 检索结果显示过该论文的 PDF 记录（`https://core.ac.uk/download/pdf/43408816.pdf`），但本轮实际请求该地址返回 HTTP 404；因此没有取得 PDF，也没有正文页码或章节可供核读。
- 搜索结果中出现的摘要片段和正文索引片段不是本轮可持续打开的全文页面，不作为全文访问证据。

同时发现 Horton 与 Wohl 原始论文的出版社书目页及若干第三方转载线索。出版社页仍要求访问权限；第三方结果的来源归属或持续性不足，而且本轮未取得可完整核读的正文副本。依照“约 8 分钟内无合适材料即停止”的任务边界，没有继续扩展检索。

## 保留的证据边界

- `psi-p1` 与 `psi-p2` 继续只由 Q302 的 Abstract 支持；摘要可以支持 PSI／PSR 常被概念与方法混用、N=383 视频实验、EPSI-Scale 更适合测量观看期间相互觉知体验等摘要明示内容，但不能代表全文中的概念史、操作化细节、统计分析或全部限定条件。
- `psi-k1` 继续由 S117 的书目记录及原始论文范围说明支持，不能将其现有 locator 解释为本轮已核读 pp. 215–229 全文。
- `psi-k2` 的镜头直视、直接称呼和持续出现仍为 interpretive 归纳；本轮没有新增可定位正文，不能提升为 direct。
- `psi-l1` 关于一次观看中的互动、跨时间关系与依恋的区分继续是教学边界提示，不能声称全部来自 Horton–Wohl 原文。

## 未改项目

- 未创建 `research/p1-weak-parasocial-source-2026-09-16.json`。
- 未创建 `content/revised/p1-weak-parasocial.nodes.json`。
- 未改正式 `content/data`、`research/source-inputs.json`、override manifest、关系、主张文本或任何 `review_status`。
- 因无新增 JSON，本轮无来源／节点 schema 可运行；已人工核对本说明中的来源 ID、节点 ID、主张 ID 与现有候选文件一致。
