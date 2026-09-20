# P1 第二批：非首页待核主张补证

日期：2026-09-14（Asia/Shanghai）。范围严格限定5项pending。本报告为补证与修订记录，**不是独立终审**；不修改节点或关系审核白名单，不授予reviewed。

> 阶段快照提示：下文保留补证提交时9 reviewed／98 ready的状态。后续文化研究与方汉奇经[独立整节点复核](non-home-pending-independent-review-2026-09-14.md)升级，当前为11 reviewed／96 ready；该升级不由本报告自行授予。主张、来源及深度统计不变。

## 逐条结果

| 节点／主张 | 本批结果 | 决定性依据与边界 |
|---|---|---|
| `r1-china-introduction:r1ci-l3` | 保留pending | 再次实际打开C17，仍是后出学术史。未取得1982年会议原始纪要、正式名称及十六字表述的一手文本；更新缺口说明。 |
| `r5-marxist-journalism:r5mj-l3` | 保留pending | S027期刊索引仍仅给摘要及参考文献。原报的日期与版次线索不能替代1943年9月1日《解放日报》第4版原文；实际页面打开失败。 |
| `r6-cultural-studies:r6cs-i1` | pending → direct，收窄措辞 | N01连续片段可核。区分文化主义、结构主义及阿尔都塞的具体重心，删去笼统的“主体形成”概括。 |
| `r6-cultural-studies:r6cs-k2` | pending → direct，补充边界 | N01直接支持两范式的重要性与不足；补明两者不是领域全部路线，不写成全球当代共识。 |
| `p-fang:p-fang-limit3` | pending → direct，限于已核历史记录 | C20文末“人物简介”明确列出原名、两项校方称号和曾任会长；改为报告该页记录，不收录其余未逐项核验身份，也不推断当前任职。 |

本批闭环3/5，保留2/5。方汉奇项是**限定具体已核项目后的范围修订**，不意味着其所有荣誉、职务和身份均已闭环。

## 证据与实际访问

### N01：霍尔重印文本，而非原刊页码复用

[Michigan Technological University机构电子保留读物](https://pages.mtu.edu/~rlstrick/rsvtxt/hall1.htm)头部标明选自1991年Longman读本，编者Robert Con Davis、Ronald Schleifer。本轮实际打开并连续读取比较段落：网页页码标记[616]—[619]、620后的局限段、[622]相关段落和[625]结论。每条claim的locator使用该重印页码标记；此处不是1980年G24的pp.57–72。

页面存在OCR误字及省略符号，未与原刊逐字校勘，N01保守登记`excerpt`。G24保留原来的1980版记录、访问日期与范围；N01与G24是同一作品的不同版本，不作为两项独立研究。

[1980期刊高校托管PDF](https://pages.mtu.edu/~jdslack/readings/CSReadings/Hall_Cultural_Studies_2_Paradigms.pdf)本轮能打开并确认16页，但网页解析无正文、截图调用没有实际返回可阅读图像，本地限时下载亦超时。因此没有宣称完成PDF逐页核验。PDF阅读流程在此回退到上面的可读机构HTML片段；未导入或再发布任何全文、PDF、提取文本或页面图。

### C20：校方人物简介与口述正文分层

[中国人民大学2017年刊载页](https://news.ruc.edu.cn/703146243790278.html)实际可读。定位为末尾“人物简介”第一、二段；本批仅采用原名、2005/2009称号与曾任会长。该校方编辑简介区别于页面内2009年口述正文；不采用“最高水平”等评价，也不外推2026年在职状态。显式来源补丁更新此次访问日期和限定说明。

### 两项仍缺原件

- [C17实际刊载页](https://www.nopss.gov.cn/n1/2020/0221/c219470-31598110.html)“与时代同行的中国新闻传播学”记述1982年座谈会，但文献本身发表于2020年。检索更多会议史、教材与《传播学（简介）》线索仍未取得原始记录，不据后出重复记述关闭pending。
- [S027期刊页](https://journal.scu.edu.cn/info/1109/29940.htm)本轮实际打开失败，搜索索引显示摘要及参考文献第一项；[清华大学出版社选本目录](https://www.tup.tsinghua.edu.cn/booksCenter/bookcatalog?id=02812501)只提供选文线索，实际页面亦未成功打开。下一步需要合法可读的原报影印件，或有清楚版源的可靠全文重印，再核版本差异；不能用目录、网友转录或后人引用替代。

## 附带纠错及输入治理

C17实际页面署名为**刘义昆、雷雪晴**，不是旧登记的胡正荣；页面注明来源《中国社会科学报》。已在本批独立来源补丁中据实更正，未改历史登记CSV或迁移快照。

- 新增`research/non-home-pending-source-updates-2026-09-14.json`：N01新增，C17/C20完整对象显式替换。
- 由`research/source-inputs.json`登记，`replace_ids`仅C17、C20；不手改生成的`sources.json`。
- 节点修订限于本批四节点的claim、对应学习入口／既有定位说明及`updated_at`；不批量刷新整节点`last_evidence_check`、来源日期或任何审核日期。
- 不借本次看到的其他片段关闭`rel-cultural-studies-has-hegemony`；该关系不在任务范围内，且复合端点语义问题仍需单独处理。

## 重建与审计

隔离重建先核对了完整差异：来源仅新增N01、更新C17/C20；节点仅上述四个目标的预期字段变化。逐ID确认全部节点审核状态和审核日期不变；内部／公开关系文件逐字节不变，之后才运行正式重建。

以下于2026-09-14执行并通过：

- `normalize_research_data.py` → `assemble_content.py` → `validate_content.py`：107节点／107字段齐全／46关系／185来源／8区／7类型。
- `check_content_rebuild.py`：五份生成JSON逐字段一致，引用和审核规则保留。
- `python3 -m unittest discover -s scripts/tests -v`：9项通过，包含N01版本区分及C17署名更正回归检查。
- `audit_content_depth.py --as-of 2026-09-14`：A17／B67／C23。
- `audit_release_readiness.py`：已按正式数据重新生成。

本批后的主张为484项（303 direct、175 interpretive、6 pending），pending分布4节点；节点仍为9 reviewed、98 ready_for_review，未新增已审核节点。内部关系46条、公开42条（32 direct／10 interpretive），未公开4条均未改变。新增来源总量为185，T001等历史迁移记录与来源边界保持不变。

剩余6项：`r1-process-k3/l1/l3`、`r5-gatekeeping-k1`、`r1ci-l3`、`r5mj-l3`。本批不修改前端，也未重跑浏览器或生产构建；内容校验不能替代这些工程验收。
