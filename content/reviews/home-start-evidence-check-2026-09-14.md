# 首页起点第二批证据补强记录

核验日期：2026-09-14。范围仅为 `r1-process`、`r5-gatekeeping`、`r8-content-analysis` 的原有 7 条 pending。此为撰写侧证据补强记录，不是独立学术终审；三个节点均保持 `ready_for_review`，不更动审核白名单。

## 逐条决定

| Claim ID | 本轮决定 | 决定性依据或尚缺材料 |
|---|---|---|
| `r1-process-k1` | pending → direct | H01 重印选载印刷 p.216 明示五问及五类分析，同时保留研究目标限定。不是1948原版核读。 |
| `r1-process-k3` | 保留 pending | S011 1954章节仍仅书目；未核得经验范围、反馈与编码/解码图示的可定位原章。 |
| `r1-process-l1` | 保留 pending | 综合比较还涉及未核的互动循环；不因五问闭环就把四种取向的边界全部视为已核。 |
| `r1-process-l2` | pending → interpretive | S010 Introduction 支持工程范围和消息选择集合；收窄到信息量与语义的区别，删除未由该页支持的情感、身份与权力测量判断。 |
| `r1-process-l3` | 保留 pending | 反馈成效与互动权力尚无匹配证据；提问本身不等于已证结论。 |
| `r5-gatekeeping-k1` | 保留 pending | Lewin 1947 官方PDF及所找到档案页面本轮打开失败；后人转引和搜索索引不能代替已核原文pp.145–146。 |
| `r8-content-analysis-method-l2` | pending → interpretive | H02 正文涵盖总体、时间流失、获取限制及查询偏差；限制概括范围是明确标出的编辑建议。 |

实质闭环 3/7，仍待核 4/7。`r1-process` 仍有 3 条 pending，`r5-gatekeeping` 仍有 1 条；`r8-content-analysis` 本次消除最后 1 条 pending，但不等于整个节点已通过独立审核。

## 已实际打开的证据与版本

- H01：[KUL大学托管 Lasswell 原文选载](https://pracownik.kul.pl/files/37108/public/Lasswell.pdf)。14页PDF；定点核读第1–2页。刊物为 *İletişim kuram ve araştırma dergisi* 24 (2007):215–228。首页明示1948原作及1971重印来源；定位使用实际选载页码，不混用三个版本。
- S010：[哈佛大学托管 Shannon 校正版重印](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)。55页PDF可打开；本轮新增判断依据第1页 Introduction。保留原有全文访问记录，注记本轮只定点重核，不冒称再次通读。
- H02：[Olteanu 等官方开放文章](https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2019.00013/full)。核读§3.2、§3.6、§5.1、§5.2；来源类型为学术综述。一般方法警告不等于2026年任何平台的具体接口规则。

只保存书目、链接、定位与自行概述；不下载入库或镜像任何PDF。H01的机构托管不被视为再发布许可；H02页面标明CC BY，仍保留作者与原刊出处。

## 未闭环来源检查

- [Schramm 1954 Google Books书目](https://books.google.com/books/about/The_Process_and_Effects_of_Mass_Communic.html?id=bFpiAAAAMAAJ)仅用于确认版本线索。1971年修订本、后来的教学页与论文转述未被替换成1954原章证据。
- [Lewin 官方原文PDF](https://journals.sagepub.com/doi/pdf/10.1177/001872674700100201)及 epdf 本轮未成功打开；Internet Archive所找到扫描文件与项目页也未成功打开。搜索片段和二手引述已看到，但不据此升级 G22 访问状态或关闭 claim。
- 原 S009 所指 World Radio History 合集本轮返回403；新建 H01 区分实际可读选载，未覆盖S009为原版全文。

## 装配与复核

本次局部更新 `content/revised/global-b.nodes.json` 与来源登记；新增 H01、H02，更新S010定点访问注记。完整的三条来源更新保存在 `research/home-start-source-updates-2026-09-14.json`，供主代理合入可重建来源输入。

遵守发布工程线警告：不运行尚未确认安全的 normalizer；只运行不改sources的 assemble。

2026-09-14 执行结果：

- `assemble_content.py`：107节点（107 complete）、44关系；未回退节点或关系数量。
- `validate_content.py`：PASS，107节点／44关系／181来源／8区／7类型。首次检查发现新ID不符合单字母前缀规范，已机械改为H01/H02并重新装配，通过复验。
- `audit_content_depth.py`：A15／B67／C25；该分层仅反映字段与证据覆盖，不代表内容终审。
- `audit_release_readiness.py`：正常生成；待核表述9条、6节点（本批前12条、7节点），已审核节点仍为9。

本批未改关系记录、已审核白名单或任何前端文件。来源更新侧车仍须由主代理纳入修复后的统一可重建链；只保存侧车不等于该链已经完成修复。
