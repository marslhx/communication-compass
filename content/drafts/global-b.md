# COMMPASS 完整节点草案（global-b）

状态：`ready_for_review`（候选撰写，尚未完成异模型终审）  
撰写与证据复核日期：2026-09-11

说明：本文件区分“原文直接主张”与“编辑解释”。已有来源沿用 `source-register.csv` / `source-register-primary.csv` 的 ID；本轮新增材料以 `NBxx` 暂存，并在文末“待并入来源”列出完整书目。定位仅写已经核到的页码、章节、条款或稳定段落，不据记忆补页码。

---

## 1. `r1-process`

- **ID**：`r1-process`
- **slug**：`communication-process-elements`
- **record_level**：`complete`
- **type**：`concept`
- **subtype**：`null`（本体 v0.1 未为 `concept` 规定子类型；“综合入口”仅作编辑功能说明）
- **name_zh**：传播过程与基本要素
- **name_original**：Communication process and elements
- **aliases**：
  - 传播过程（`short_name`）
  - 传播的基本要素（`alternate_label`）
  - Communication models and elements（`english_alternate`，仅用于检索，不暗示存在单一统一模型）

### summary（150 字内）

传播过程是理解信息、符号与意义如何在参与者、媒介和情境之间生成、传递并被回应的入口。线性模型突出来源、信息、渠道、接收者与效果；互动模型加入编码、解码、经验范围和反馈；意义取向则追问传播如何建构并维系共同世界。三者应并列使用，不能以香农的工程模型代替全部人类传播。

### why_it_matters

它为初学者提供一张“先问什么”的检查表，同时防止把传播误解为单向发送。面对新闻、课堂对话、短视频推荐或跨文化误解，学生既要辨认过程要素，也要追问接收者如何解释、反馈如何改变下一轮互动，以及传播实践在维系何种意义秩序。这个节点是进入效果研究、意义研究和方法训练的共同起点，而不是要求学生背诵一个万能图式。

### key_points

1. **线性分析可以把传播行为拆为“谁—说什么—通过什么渠道—对谁—产生什么效果”，其价值是明确研究对象，而不是证明真实传播永远单向。**
   - evidence_status：`direct`（前半句）+ `interpretive`（边界说明）
   - source：`NB01` Harold D. Lasswell. 1948. “The Structure and Function of Communication in Society.” In *The Communication of Ideas*, edited by Lyman Bryson. New York: Institute for Religious and Social Studies. https://www.worldradiohistory.com/BOOKSHELF-ARH/Education/Mass-Communications-Schramm-1960.pdf
   - locator：章节小标题 “The Act of Communication”，开头五问及其后对 control/content/media/audience/effect analysis 的分工说明。
   - support_note：原文明列五问，并据此区分传播研究的若干分析门类；“不能代表全部传播”是根据本节点多模型并置原则作出的编辑限定。

2. **香农把工程通信系统表述为信息源、发射器、信道、接收器与目的地，并专门处理噪声、信道容量和信息选择；他同时明确把语义问题排除在该工程问题之外。**
   - evidence_status：`direct`
   - source：`NB02` Claude E. Shannon. 1948. “A Mathematical Theory of Communication.” *Bell System Technical Journal* 27(3): 379–423; 27(4): 623–656. https://doi.org/10.1002/j.1538-7305.1948.tb01338.x ; https://doi.org/10.1002/j.1538-7305.1948.tb00917.x
   - locator：Introduction；Figure 1 “Schematic diagram of a general communication system” 及其后五部分说明。
   - support_note：原文直接规定工程问题的范围并列出系统组件，因此本节点将其用于技术传输层，而不把它外推为对人类意义、文化和权力的完整解释。

3. **互动取向把参与者理解为可轮换的编码者、解码者和解释者，经验范围影响理解，反馈使传播成为可修正的循环。**
   - evidence_status：`direct`
   - source：`NB03` Wilbur Schramm. 1954. “How Communication Works.” In *The Process and Effects of Mass Communication*, edited by Wilbur Schramm, 3–26. Urbana: University of Illinois Press. https://books.google.com/books?id=9VpiAAAAMAAJ
   - locator：章节 “How Communication Works”，尤其是 source/message/destination、field of experience、feedback 图示与说明；Google Books 目录确认该章始于第 3 页。
   - support_note：该章直接讨论编码、解码、解释、经验范围、反馈和多重渠道；“互动取向”是编辑用于并置模型的分类标签。

4. **意义取向不把传播只看作信息跨距离移动，还把它看作借助符号建构、维系和转换共同文化世界的实践。**
   - evidence_status：`direct`
   - source：`NB04` James W. Carey. 2009. *Communication as Culture: Essays on Media and Society*, Revised Edition. New York: Routledge. https://www.routledge.com/Communication-as-Culture-Revised-Edition-Essays-on-Media-and-Society/Carey/p/book/9780415989763
   - locator：Part I, chapter “A Cultural Approach to Communication”，其中对 transmission view 与 ritual view 的并置。
   - support_note：Carey 明确反对只把传播理解为信息传递，并把 ritual view 指向共同意义世界的生成与维系。

### limits_or_debates

- **模型是选择性工具，不是现实的缩小复制品。** 五问、工程系统、互动循环与仪式观各自凸显不同问题；把它们拼成单一“标准传播模型”会抹去适用条件。依据：`NB01`—`NB04` 的对象与问题范围；此句为编辑比较。
- **“信息”不等于“意义”。** `NB02` 的信息度量服务于工程传输问题，不能据此断言人的解释、情感、身份和权力已经被测量。
- **反馈并不自动意味着平等或理解。** 互动中可能存在权力不对称、延迟、噪声和经验差异；`NB03` 支持反馈与经验范围，权力限定为编辑提醒，需在后续节点以专门研究展开。
- **意义取向也不能替代过程分析。** `NB04` 扩展了问题，但在研究具体传输失真、渠道容量或效果链条时，线性分析仍有用途。

### area_memberships

- `communication`（**primary**）：直接回答“传播如何发生”，并提供学科入口框架。
- `meaning`（secondary）：意义取向强调符号解释与共同世界的建构，不能被传输问题吸收。
- `effects`（secondary）：Lasswell 五问包含效果端，但本节点只提供入口，不替代具体效果理论。
- `research_application`（secondary）：过程要素可转化为研究问题、变量或观察维度；方法选择仍需进入专门方法节点。

### learning_resources（3 项）

1. `NB01` Lasswell，“The Structure and Function of Communication in Society”——先学会用五问拆解研究对象，同时记录它的线性边界。
2. `NB03` Schramm，“How Communication Works”——观察反馈、经验范围和多重渠道如何改变单向图式。
3. `NB04` Carey，*Communication as Culture* 中 “A Cultural Approach to Communication”——把问题从“传过去了吗”推进到“共同世界如何被生成”。

### 候选关系

1. **relation_type**：`developed`  
   **source**：`p-lasswell`  
   **target**：`r1-process`  
   **statement**：拉斯韦尔发展出以五问组织传播行为分析的一种线性方案；该方案构成本节点的一条传统，而不是整个节点的唯一模型。  
   **evidence**：`NB01` 明列五问并把研究门类分别对应到各问题。  
   **locator**：“The Act of Communication” 开头及紧随其后的研究分工段落。  
   **status**：`direct_ready_for_review`

2. **relation_type**：`developed`  
   **source**：`p-shannon`  
   **target**：`r1-feedback-noise`  
   **statement**：香农在工程通信理论中形式化处理信源、信道、噪声与信道容量，为“噪声”作为技术传输概念提供原典基础。  
   **evidence**：`NB02` 的 Introduction、Figure 1 与 noisy channel 章节。  
   **locator**：Introduction；Figure 1；Part III “The Discrete Channel with Noise”。  
   **status**：`direct_ready_for_review`

3. **relation_type**：`has_concept`  
   **source**：`r1-process`  
   **target**：`r1-feedback-noise`  
   **statement**：过程模型在解释传输与互动时会分别处理噪声和反馈，但两者的理论来源与作用不可混为同一机制。  
   **evidence**：`NB02` 直接说明噪声进入传输系统；`NB03` 直接说明反馈进入互动过程。  
   **locator**：`NB02` Figure 1；`NB03` “How Communication Works” 中 feedback 图示。  
   **status**：`interpretive_ready_for_review`

4. **relation_type**：`addresses`  
   **source**：`r1-process`  
   **target**：`r1-mass`  
   **statement**：过程与要素框架可用于分析大众传播，但大众传播只是适用领域之一，不能反向定义全部传播过程。  
   **evidence**：`NB03` 先讨论一般传播过程，再转入大众传播；`NB04` 对美国研究中过度聚焦大众传播的倾向提出扩展。  
   **locator**：`NB03` “How Communication Works” 开头；`NB04` “A Cultural Approach to Communication”。  
   **status**：`interpretive_ready_for_review`

### temporal_profile

- value：`relatively_stable`
- as_of：`null`
- last_evidence_check：`2026-09-11`
- next_review_due：`null`

### controversy_status

- value：`contested`
- note：争议不在于要素是否“存在”，而在于何种模型应居于中心、模型能否处理意义与权力，以及工程信息概念能否被外推到人类传播。
- positions：线性／传输取向；互动／反馈取向；文化／意义取向。三者在本节点并列，不裁定单一胜者。

- **review_status**：`ready_for_review`
- **created_at**：`2026-09-11`
- **updated_at**：`2026-09-11`
- **reviewed_at**：`null`

---

## 2. `r5-gatekeeping`

- **ID**：`r5-gatekeeping`
- **slug**：`gatekeeping-theory`
- **record_level**：`complete`
- **type**：`theory_model`
- **subtype**：`theory`
- **name_zh**：把关理论
- **name_original**：Gatekeeping theory
- **aliases**：
  - 守门理论（`alternate_translation`）
  - 守门人理论（`alternate_translation`，较突出行动者，但可能遮蔽组织、制度和算法层次）
  - 新闻把关（`domain_specific_label`，仅指新闻研究中的应用）

### summary（150 字内）

把关理论研究信息如何经过“门”被选择、拒绝、排序、修改或获得可见性。Lewin 先以社会渠道、门和守门人解释食物流动等决策；White 将其用于报纸电讯稿选择。后续研究把分析从单个编辑扩展到新闻常规、组织、网络、用户、算法与平台，因此“把关”不是编辑个人偏好的同义词。

### why_it_matters

学生每天看到的新闻与平台信息都不是世界的完整镜像。把关理论提供一套追踪“哪些内容能进入、以何种形式进入、谁有决定权、依据什么规则”的语言，也训练学生区分个体判断、职业常规、组织压力、制度环境和技术排序。理解其谱系可避免把 1950 年的一位编辑个案直接套用到今日平台，同时也能看见选择权如何影响公共议程与知识可见性。

### questions_explained

- 哪些信息可以通过特定渠道中的“门”，哪些被挡在外面？
- 选择权由个人、组织、制度、用户、算法或平台中的哪些行动者／机制掌握？
- 选择标准和权力关系如何影响新闻与公共信息的可见性？

### propositions

- 信息流经具有入口／出口规则的渠道；“门”处的决策改变进入后续流通的信息集合。
- 新闻把关不能只归因于个人偏好；数字环境还需分析分布式用户行为、算法选择和平台架构。

### conditions

- 使用“把关”隐喻时，必须具体指出渠道、门、把关者／机制、被把关对象与选择结果。
- White 的研究是一家非都市报纸一位电讯编辑七天工作的个案，不能代表所有新闻组织或所有时代。
- 数字场景中，“进入／拒绝”之外还包括排序、推荐、降权和协作式可见性生产，需采用后续扩展而非原样套用经典模型。

### key_points

1. **“渠道—门—守门人”最初是一般社会过程的分析构想，不是为新闻编辑专门发明的成熟新闻理论。**
   - evidence_status：`direct`
   - source_id：`G22`
   - locator：文中讨论 food channels、gate sections 与 gate keepers 的段落，尤其印刷页 145–146。
   - support_note：Lewin 以家庭食物渠道等说明“门”由规则或有权作出 in/out 决定的个人／群体控制，并指出该构想也可用于新闻项目流动；因此只能支持概念前史。

2. **White 把该构想用于新闻选择，收集一家非都市报纸七天内采用和拒绝的电讯稿，并分析电讯编辑给出的取舍理由。**
   - evidence_status：`direct`
   - source_id：`G18`
   - locator：期刊摘要；全文 pp. 383–390 的研究对象、材料与拒稿理由分析。
   - support_note：来源直接支持研究设计和个案范围；不据此概括全部新闻生产。

3. **网络把关需要同时识别把关者、把关机制与“被把关者”，并考察被把关者相对于把关者的权力、生产能力、关系和替代渠道。**
   - evidence_status：`direct`
   - source：`NB05` Karine Barzilai-Nahon. 2008. “Toward a Theory of Network Gatekeeping: A Framework for Exploring Information Control.” *Journal of the American Society for Information Science and Technology* 59(9): 1493–1512. https://doi.org/10.1002/asi.20857
   - locator：Abstract；“Base Vocabulary of Network Gatekeeping Identification Theory”；“Network Gatekeeping Salience” 部分。
   - support_note：摘要和理论章节直接列出 identification/salience 两部分及四项属性，使权力关系与被把关者能见度进入分析。

4. **数字新闻中的选择者可包括个人、算法和平台；平台既可能集中控制把关机制，也可能让多种微观互动共同产生可见性。**
   - evidence_status：`direct`
   - source：`NB06` Julian Wallace. 2018. “Modelling Contemporary Gatekeeping: The Rise of Individuals, Algorithms and Platforms in Digital News Dissemination.” *Digital Journalism* 6(3): 274–293. https://doi.org/10.1080/21670811.2017.1343648
   - locator：Abstract；文中 digital gatekeeping model 的三步构造。
   - support_note：来源直接指出经典理论难以充分描述算法和用户，并提出包含四类把关者、平台机制和协作式把关的模型。

### limits_or_debates

- **个案外推问题。** `G18` 只观察一位编辑和七天材料；把其结论写成“新闻总由个人主观偏好决定”会越过证据范围。
- **层次之争。** 个人、常规、组织、制度和社会系统可能共同塑造选择；本草案用 `NB05`、`NB06` 提醒数字环境的多行动者与权力关系，尚未以单一层次模型封闭解释。
- **“把关”还是“协作可见性”。** 在信息丰裕、用户转发与算法排序共存的场景，二元 in/out 隐喻可能不足；`NB06` 主张扩展，而非宣布经典问题已经失效。
- **规范评价不能由选择事实自动推出。** 某内容被移除、推荐或降权并不能单独证明该决定正当或不正当；还需法规、伦理与权利框架。

### area_memberships

- `institutions`（**primary**）：新闻与平台中的选择规则、角色和组织权力是核心问题。
- `communication`（secondary）：理论解释信息如何进入传播渠道与后续流通。
- `media_society`（secondary）：把关机制塑造公共可见的媒介现实。
- `effects`（secondary）：选择与排序改变受众可接触的信息集合，但不等同于证明具体效果。

### learning_resources（3 项）

1. `G22` Lewin (1947)——辨认“渠道／门／守门人”的跨领域概念来源。
2. `G18` White (1950)——阅读概念如何被转化为可观察的新闻选择个案。
3. `NB06` Wallace (2018)——比较个人、算法与平台在数字新闻中的不同把关位置。

### 候选关系

1. **relation_type**：`addresses`  
   **source**：`r5-gatekeeping`  
   **target**：`r5-journalism`  
   **statement**：把关理论用于分析新闻材料如何被编辑选择或拒绝以及取舍理由。  
   **evidence**：`G18` 的电讯稿采用／拒绝个案。  
   **locator**：摘要；pp. 383–390。  
   **status**：`direct_ready_for_review`

2. **relation_type**：`addresses`  
   **source**：`r5-gatekeeping`  
   **target**：`r7-platform-governance`  
   **statement**：数字把关模型把平台、算法与用户纳入信息控制和传播分析，可为平台治理中的可见性权力提供一个分析角度。  
   **evidence**：`NB06` 明确提出个人、算法、平台与协作式把关机制；“为平台治理提供角度”为编辑归纳。  
   **locator**：Abstract；digital gatekeeping model 三步构造。  
   **status**：`interpretive_ready_for_review`

3. **relation_type**：`contrasts_with`  
   **source**：`r5-gatekeeping`  
   **target**：`r4-agenda-setting`  
   **statement**：把关首先追问信息是否以及如何进入传播流，议程设置首先追问媒介议题显著性与公众议题显著性的关系；两者可连续研究，但不能互作同义词。  
   **evidence**：`G18` 支持选择／拒绝；`G17` 支持 1972 年议程显著性研究。比较关系为编辑解释。  
   **locator**：`G18` 摘要与 pp. 383–390；`G17` 摘要与原文研究问题、结果部分。  
   **status**：`interpretive_ready_for_review`

### temporal_profile

- value：`relatively_stable`
- as_of：`null`
- last_evidence_check：`2026-09-11`
- next_review_due：`null`

### controversy_status

- value：`contested`
- note：争议集中于分析层次、把关权的分布，以及经典 in/out 隐喻能否充分解释排序、推荐和用户协作产生的可见性。
- positions：经典个体把关；多层次／网络把关；数字平台中的分布式与算法把关。

- **review_status**：`ready_for_review`
- **created_at**：`2026-09-11`
- **updated_at**：`2026-09-11`
- **reviewed_at**：`null`

---

## 3. `r5-public-sphere`

- **ID**：`r5-public-sphere`
- **slug**：`public-sphere`
- **record_level**：`complete`
- **type**：`theory_model`
- **subtype**：`theory`
- **name_zh**：公共领域
- **name_original**：Public sphere / Öffentlichkeit
- **aliases**：
  - 公共空间（`alternate_translation`，慎用：容易与 physical public space 混淆）
  - 公共交往领域（`explanatory_translation`）
  - 资产阶级公共领域（`historically_bounded_label`，特指 Habermas 的历史分析对象，不等于公共领域全部形态）

### summary（150 字内）

公共领域是私人个体以公众身份讨论共同事务、形成公共意见并可能影响政治决定的社会交往领域。Habermas 既把它作为民主规范来说明开放讨论、信息可得与制度影响，也追溯资产阶级公共领域的历史变迁。女性主义等批评指出，现实中的阶级、性别与身份排斥使“单一、普遍公众”不足，需关注多重公众与从属反公共。

### why_it_matters

公共领域把媒介研究与民主、公共意见、制度权力连接起来。它帮助学生追问：谁能进入讨论、什么被界定为公共问题、媒介如何组织可见性、意见怎样获得制度影响。更重要的是，这一概念本身包含规范理想与历史现实的张力；学习它不能只背“理性讨论”，还要检验开放性、资源不平等、身份排斥与多重公众之间的关系。

### questions_explained

- 公民如何围绕共同事务形成公共意见，并使其对政治制度产生影响？
- 报刊、广播电视及数字媒介为公共讨论提供了什么条件，又如何扭曲这些条件？
- 当社会不平等持续存在时，应设想一个统一公众，还是多个相互竞争、协商的公众？

### propositions

- 公共领域不是国家机关、市场交易或私人生活的同义词，而是公众围绕共同关切进行交往与意见形成的领域。
- 自由表达、结社、信息可得和公开讨论是其规范条件；现实制度能否满足这些条件需要经验检验。
- 公共领域的历史形态并非天然包容，排斥与不平等要求对“普遍公众”和单一公共领域假设进行修正。

### conditions

- 必须区分 Habermas 对资产阶级公共领域的历史社会学描述、其民主规范，以及研究者对具体媒介空间的经验判断。
- 不能把任何“公开可见”的网络空间自动称为公共领域；需检查进入、表达、信息、讨论和制度连接条件。
- “多重公众”不是只要群体分开讨论就必然民主；仍需分析公众之间的权力和相互可达性。

### key_points

1. **Habermas 将公共领域界定为社会生活中能够形成某种公共意见的领域；公民以公众身份围绕共同利益问题进行不受限制的讨论。**
   - evidence_status：`direct`
   - source_id：`G23`
   - locator：Section 1 “The Concept”，开头定义段（New German Critique 版 pp. 49–50）。
   - support_note：原文直接给出概念、进入原则和公众讨论的基本条件，并区分私人交易者、国家官僚体系成员与作为公众的公民。

2. **公共领域概念既是规范性的，也是历史社会学的：Habermas 追溯资产阶级公共领域及公共意见的结构转型，而非描述一个跨历史不变的场所。**
   - evidence_status：`direct`（研究范围）+ `interpretive`（双重性质归纳）
   - source_id：`G19`
   - locator：MIT Press 书目页对全书 “historical-sociological study” 的说明；正文按章节展开资产阶级公共领域的社会结构与功能转型。
   - support_note：书名、副标题与出版社说明支持历史社会学范围；“规范／历史双重性质”是综合 `G19` 与 `G23` 的编辑归纳。

3. **大规模公众交往依赖报刊、广播、电视等媒介，公共领域因此不是脱离传播制度的纯粹面对面谈话。**
   - evidence_status：`direct`
   - source_id：`G23`
   - locator：Section 1 “The Concept” 中 “In a large public body this kind of communication requires specific means …” 及随后对报刊、广播、电视的说明。
   - support_note：原文明确指出大规模公众需要传播媒介；这支持公共领域与媒介制度相连，但不证明特定媒介必然改善民主。

4. **Fraser 批评资产阶级公共领域的单一、普遍化设想，指出身份与社会不平等会使“仿佛平等”的讨论遮蔽支配，并主张在分层社会中承认多重公众与从属反公共。**
   - evidence_status：`direct`
   - source：`NB07` Nancy Fraser. 1990. “Rethinking the Public Sphere: A Contribution to the Critique of Actually Existing Democracy.” *Social Text* 25/26: 56–80. https://doi.org/10.2307/466240
   - locator：pp. 60–67 对 revisionist historiography、participatory parity、single/multiple publics 与 subaltern counterpublics 的讨论；结论 p. 77。
   - support_note：原文直接反驳括置社会不平等和单一公共领域的若干假设，并提出多重公众更可取；“女性主义批评”来自作者在文中的明确定位。

### limits_or_debates

- **历史排斥。** 资产阶级公共领域的开放理想与妇女、劳动阶级及种族化群体被排除的历史事实之间存在张力；`NB07` 要求把排斥置于理论中心。
- **单一公众与多重公众。** `NB07` 主张分层社会中多重公众优于单一公共领域，但公众分化也可能带来隔绝；后半句为编辑提出的后续经验问题。
- **规范与描述易被混淆。** 某平台有大量讨论者，只能证明“有讨论”，不能证明讨论自由、信息充分、参与平等或能进入制度决策。
- **西欧历史边界。** `G19` 的资产阶级公共领域分析有特定欧洲历史对象，不能无条件当作所有社会公共传播的普遍发展阶段。

### area_memberships

- `institutions`（**primary**）：公共意见、媒介制度与政治决策之间的连接是核心。
- `power_culture`（secondary）：进入资格、话语风格、身份与资源不平等决定哪些公众能够被听见。
- `meaning`（secondary）：共同问题如何被命名、论证并获得公共意义，是公共讨论的组成部分。
- `digital_ai`（secondary）：数字平台重组公共可见性与参与条件；此归属是研究入口，不表示平台天然等于公共领域。

### learning_resources（3 项）

1. `G23` Habermas，“The Public Sphere: An Encyclopedia Article (1964)”——先读简明定义、媒介条件与制度联系。
2. `G19` Habermas，*The Structural Transformation of the Public Sphere*——把概念放回资产阶级公共领域的历史转型。
3. `NB07` Fraser，“Rethinking the Public Sphere”——用排斥、参与平等、多重公众和从属反公共检验原模型。

### 候选关系

1. **relation_type**：`developed`  
   **source**：`p-habermas`  
   **target**：`r5-public-sphere`  
   **statement**：Habermas 通过资产阶级公共领域的历史结构转型研究和简明概念论述，发展了传播与民主研究中最具影响力的一种公共领域理论。  
   **evidence**：`G19` 的英译本书目与研究范围；`G23` 的概念定义。此处使用“发展”而非“首次提出”。  
   **locator**：`G19` 出版社书目与全书结构；`G23` Section 1 “The Concept”。  
   **status**：`direct_ready_for_review`

2. **relation_type**：`addresses`  
   **source**：`r5-public-sphere`  
   **target**：`r5-public-opinion`  
   **statement**：公共领域理论分析公共意见得以形成的交往与制度条件，而不把民调结果自动等同于公共意见形成过程。  
   **evidence**：`G23` 定义公共领域为形成公共意见的领域；“不自动等同民调”为基于过程／结果区分的编辑限定。  
   **locator**：Section 1 “The Concept” 开头定义段。  
   **status**：`interpretive_ready_for_review`

3. **relation_type**：`addresses`  
   **source**：`r5-public-sphere`  
   **target**：`r5-political`  
   **statement**：公共领域理论解释公众讨论如何经由公共意见与制度化渠道对政治权力产生影响，因此是政治传播的一种规范—制度分析路径。  
   **evidence**：`G23` 关于公共信息可得、公共意见以及经立法机构对政府形成制度化影响的论述。  
   **locator**：Section 1 “The Concept” 后半部分。  
   **status**：`direct_ready_for_review`

4. **relation_type**：`addresses`  
   **source**：`r5-public-sphere`  
   **target**：`r6-gender`  
   **statement**：女性主义公共领域批评把性别化排斥、非正式不平等与从属反公共纳入对民主传播条件的分析。  
   **evidence**：`NB07` 对女性被排除、参与平等与 subaltern counterpublics 的论证。  
   **locator**：pp. 60–67；结论 p. 77。  
   **status**：`direct_ready_for_review`

### temporal_profile

- value：`relatively_stable`
- as_of：`null`
- last_evidence_check：`2026-09-11`
- next_review_due：`null`

### controversy_status

- value：`contested`
- note：概念的民主规范仍具影响力，但其欧洲中心历史叙事、单一公众假设、理性讨论规范及对结构性不平等的处理均受到持续批评。
- positions：Habermas 的资产阶级公共领域及规范条件；Fraser 的参与平等、多重公众与从属反公共修正。其他批评传统本轮未穷尽。

- **review_status**：`ready_for_review`
- **created_at**：`2026-09-11`
- **updated_at**：`2026-09-11`
- **reviewed_at**：`null`

---

## 4. `r7-platform-governance`

- **ID**：`r7-platform-governance`
- **slug**：`platform-governance`
- **record_level**：`complete`
- **type**：`research_topic`
- **subtype**：`frontier`
- **name_zh**：平台治理
- **name_original**：Platform governance
- **aliases**：
  - 数字平台治理（`alternate_label`）
  - 在线平台治理（`alternate_label`）
  - 平台规制（`narrower_label`，偏向法律与监管，不能覆盖平台自我治理、用户和民间行动者）

### summary（150 字内）

平台治理研究谁以何种规则、技术和制度安排塑造平台上的内容、交易、数据、劳动与可见性。它既包括平台制定并执行内容规则、推荐排序和申诉机制，也包括政府监管、用户行动、广告商与社会组织的介入。不同法域边界不同：中国现行制度突出平台主体责任、内容生态与算法推荐义务，需按法规更新持续复核。

### why_it_matters

平台已不是被动“渠道”：推荐、审核、账号与接口规则会分配可见性、收益与表达机会。学习平台治理能把“算法好不好”转化为可核验的问题——谁定规则、适用于谁、怎样执行、能否解释和申诉、由谁监督。对中国学生尤其重要的是区分一般学术概念、企业规则与中国现行制度文本，避免把欧美法规当全球通则，也避免用政策目标替代理论解释或效果证据。

### core_questions

- 平台公司、政府、用户、广告商、内容生产者与社会组织之间如何分配制定规则、执行和监督的权力？
- 内容审核、推荐系统、账号管理、数据访问和申诉机制如何影响表达、可见性与公共风险？
- 不同法域如何界定平台责任、用户权利、透明度与监管边界？

### current_evidence_state

截至 2026-09-11，本草案已核对平台治理的跨主体学术定义、内容审核研究、中国《网络信息内容生态治理规定》和《互联网信息服务算法推荐管理规定》的公开文本；商务部全球法规网在本次复核时将两项部门规章均标为“现行有效”（`NB15`、`NB16`）。本草案并以欧盟《数字服务法》作法域比较样本。它不穷尽中国平台治理法规，也不把法规存在等同于执行效果。企业规则、执法案例及后续制度变化需要下一轮单独采集。

### key_points

1. **平台治理不是单一主体的“管理”，而是平台公司、用户、广告商、政府及其他政治行动者之间多层治理关系的集合。**
   - evidence_status：`direct`
   - source：`NB08` Robert Gorwa. 2019. “What Is Platform Governance?” *Information, Communication & Society* 22(6): 854–871. https://doi.org/10.1080/1369118X.2019.1573914
   - locator：Abstract；文章对 platform governance research agenda 与 governance relationships 的界定。
   - support_note：摘要直接列出平台公司、用户、广告商、政府及其他政治行动者，支持把平台治理视为关系结构而非单向监管。

2. **内容审核是平台治理的核心组成：平台对用户内容的删除、保留、分类与提升会塑造公共话语和文化生产，却长期缺乏与其影响相称的公共审视。**
   - evidence_status：`direct`
   - source：`NB09` Tarleton Gillespie. 2018. *Custodians of the Internet: Platforms, Content Moderation, and the Hidden Decisions That Shape Social Media*. New Haven: Yale University Press. https://yalebooks.yale.edu/book/9780300235029/custodians-of-the-internet/
   - locator：出版社内容简介；全书 chapters 1–2 对 moderation 的中心性与平台角色的论述。
   - support_note：出版社页面直接概括内容审核实践及其对公共话语、文化生产与社会规范的后果；具体机制仍应回到章节核读。

3. **在中国制度情境中，网络信息内容服务平台被要求承担信息内容管理主体责任，建立用户注册、账号管理、信息发布与评论审核、页面生态、巡查和应急处置等机制。**
   - evidence_status：`direct`
   - source：`NB10` 国家互联网信息办公室：《网络信息内容生态治理规定》，国家互联网信息办公室令第 5 号，2019 年 12 月 15 日公布，2020 年 3 月 1 日施行。https://www.cac.gov.cn/2019-12/20/c_1578375159509309.htm
   - locator：第三章“网络信息内容服务平台”，第八条至第十七条，重点为第八、九、十一条。
   - support_note：条文直接规定平台主体责任及内部治理制度；不据此推断所有平台的实际执行成效。

4. **中国的算法推荐规定覆盖生成合成、个性化推送、排序精选、检索过滤与调度决策等技术，并要求告知、公示基本原理、提供非个性化或关闭选项以及用户标签管理等权利安排。**
   - evidence_status：`direct`
   - source：`NB11` 国家互联网信息办公室、工业和信息化部、公安部、国家市场监督管理总局：《互联网信息服务算法推荐管理规定》，国家互联网信息办公室令第 9 号，2021 年 12 月 31 日公布，2022 年 3 月 1 日施行。https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm
   - locator：第二条（适用范围与算法类型）、第十二条（透明度与可解释性）、第十六至十八条（用户与未成年人权益）、第二十四条（备案）。
   - support_note：条文直接支持适用范围、平台义务与用户选项；“权利安排”是对多个条款的编辑归纳，不等于效果评价。

### limits_or_debates

- **概念范围很宽。** `NB08` 所说的治理关系可涵盖内容、数据、市场与劳动；本节点首版以传播相关的内容审核、推荐与公共风险为主，不能冒充平台经济治理全景。
- **合法性与正当性不相同。** 公司规则、国家法规与用户规范可能相互冲突；某措施合法不自动证明其透明、公平或有效。
- **法规文本不等于执行结果。** `NB10`、`NB11` 直接证明制度要求，不能单独支持“平台已经做到”或“风险已经下降”。执法、合规报告与用户经验需另找证据。
- **法域不可互换。** 中国制度强调内容生态、平台主体责任和算法推荐义务；欧盟 DSA 以分级义务、基本权利、透明度、系统性风险和问责为重要框架。比较是为了显示不同制度问题设置，不把任何一方写成普遍模板（比较证据：`NB10`—`NB12`）。
- **动态复核风险。** 法规、主管机关规则、平台政策和技术实践都会更新；超过下一复核日后，本条目不得继续显示“当前”。

### area_memberships

- `digital_ai`（**primary**）：平台规则、算法推荐、内容审核与数据基础设施直接塑造数字传播。
- `media_society`（secondary）：平台已成为影响信息流通、文化生产和社会关系的重要媒介制度。
- `institutions`（secondary）：研究对象包括平台公司内部制度、国家监管和跨主体问责。
- `power_culture`（secondary）：审核、推荐与申诉机制分配表达、可见性和文化正当性。

### learning_resources（3 项）

1. `NB08` Gorwa，“What Is Platform Governance?”——先建立跨主体、跨层次的概念地图。
2. `NB09` Gillespie，*Custodians of the Internet*——进入内容审核的规则、劳动与公共后果。
3. `NB10` + `NB11` 中国两项现行规定——逐条核对中国平台主体责任、内容生态和算法推荐义务；阅读时注明复核日期。

### 候选关系

1. **relation_type**：`builds_on`  
   **source**：`r7-platform-governance`  
   **target**：`r3-platformization`  
   **statement**：平台治理以平台化社会中公司、用户、广告商与政府之间的结构性关系为对象，承接“平台如何重组社会领域”的问题，并进一步追问规则制定、执行和问责。  
   **evidence**：`NB08` 对平台社会中的多层治理关系与研究议程的界定；“承接”是编辑归纳。  
   **locator**：Abstract；platform governance research agenda 部分。  
   **status**：`interpretive_ready_for_review`

2. **relation_type**：`addresses`  
   **source**：`r7-platform-governance`  
   **target**：`r7-algorithm`  
   **statement**：平台治理分析推荐、排序、过滤、调度与生成合成等算法如何被规则化、解释、关闭、备案和监督。  
   **evidence**：`NB11` 对算法类型、透明度、用户选择和备案的条文。  
   **locator**：第二、十二、十六、十七、二十四条。  
   **status**：`direct_ready_for_review`

3. **relation_type**：`addresses`  
   **source**：`r7-platform-governance`  
   **target**：`r4-info-disorder`  
   **statement**：内容生态规则、内容审核与大型平台风险义务为研究虚假信息、违法有害内容及其放大机制提供制度对象，但法规本身不证明治理效果。  
   **evidence**：`NB10` 第三章的平台内容治理机制；`NB12` DSA 第 34–35 条关于系统性风险评估与减缓。  
   **locator**：`NB10` 第八至十一条；`NB12` Articles 34–35。  
   **status**：`direct_with_scope_limit_ready_for_review`

4. **relation_type**：`addresses`  
   **source**：`r7-platform-governance`  
   **target**：`r7-privacy`  
   **statement**：算法推荐治理涉及用户画像、标签选择／删除和个性化推荐控制，因此与隐私、监视和用户自主问题交叉，但不能代替个人信息保护法的完整分析。  
   **evidence**：`NB11` 第十六、十七条。  
   **locator**：第三章“用户权益保护”，第十六至十七条。  
   **status**：`direct_with_scope_limit_ready_for_review`

### temporal_profile

- value：`evolving`
- as_of：`2026-09-11`
- last_evidence_check：`2026-09-11`
- next_review_due：`2027-03-11`
- review_trigger：若中国有关平台、算法、生成式人工智能、个人信息或未成年人保护的上位法／部门规章发生修改，或主要平台审核与推荐机制出现重大变化，应提前复核。

### controversy_status

- value：`contested`
- note：核心争议包括平台私人权力的合法性、国家监管边界、表达自由与安全的权衡、算法透明度的可行程度、执行责任及跨法域规则冲突。
- positions：企业自我治理；国家法定监管；多利益相关者／共同治理；权利与程序问责取向。这里只列研究位置，不宣称互相排斥或已形成定论。

- **review_status**：`ready_for_review`
- **created_at**：`2026-09-11`
- **updated_at**：`2026-09-11`
- **reviewed_at**：`null`

---

## 5. `r8-content-analysis`

- **ID**：`r8-content-analysis`
- **slug**：`content-analysis`
- **record_level**：`complete`
- **type**：`method`
- **subtype**：`null`
- **name_zh**：内容分析
- **name_original**：Content analysis
- **aliases**：
  - 内容分析法（`alternate_label`）
  - 定量内容分析（`narrower_label`，只覆盖部分传统）
  - 质性内容分析（`method_variant`，具有系统编码框架，但不等同于所有解释型文本研究）
  - 计算内容分析（`method_variant`，依赖自动化技术与验证，不等同于“让软件代替研究设计”）

### summary（150 字内）

内容分析是依据明确研究问题，对文本、图像、声音或其他传播材料进行取样、单元化、编码与推论的方法。人工编码依靠训练过的编码者和可复核规则；计算内容分析以词典、监督或无监督方法扩大规模；解释型文本研究则常以语境化理解和细读为主。三者可组合，但质量标准与推论边界不能混用。

### why_it_matters

内容分析把“我觉得媒体经常这样说”转化为可检查的材料、单位、类别与推论。它适合比较媒体呈现、追踪议题变化、识别框架或研究平台内容，但只有在抽样、编码、可靠性与效度都能说明时，数字才有意义。理解人工、质性和计算路径的差别，还能帮助学生判断何时需要大样本复现，何时需要深入语境解释，以及自动化分类是否真的测到了研究概念。

### suitable_questions

- 某类媒体在给定时期如何呈现人物、议题、责任、情绪或立场？
- 不同媒体、平台、国家或时期的内容特征是否存在可描述、可比较的差异？
- 大规模数字文本中有哪些可验证的词汇、主题、分类或关系模式？

### data_requirements

- 与研究总体和时间范围相匹配、来源与采集规则可追溯的传播材料。
- 明确的 sampling unit、recording/coding unit 与 context unit；必要时保存版本、链接、时间戳与去重记录。
- 可执行的编码框架／代码本、训练或试编码材料；计算路径还需词典、标注集、模型版本与验证集。
- 涉及人员、平台数据或受限内容时，需说明研究伦理、使用条款与数据保护边界。

### typical_procedure

1. 将概念性问题转成可由传播材料回答的研究问题，并界定总体、时期与语境。
2. 制定抽样方案，区分抽样单位、编码单位和语境单位，保存纳入／排除规则。
3. 建立理论驱动、资料驱动或混合编码框架；明确类别定义、例子与边界。
4. 试编码并修订代码本；多人编码时报告编码者间一致性及其计算方法。
5. 完成人工编码，或训练／应用自动化方法并在独立材料上验证；保留版本和错误分析。
6. 把结果重新放回传播语境作有限推论，报告抽样、测量、可靠性、效度与可复现限制。

### limitations

- 只统计显性词项可能漏掉反讽、隐喻、视觉语法和情境意义；分析单位与语境设定会改变结论。
- 编码者间一致性是必要质量信息，但高一致性不自动证明分类有效，也不证明理论解释正确。
- 自动化可扩大规模，却会继承训练数据、词典、语言和平台采样的偏差；模型精度必须针对目标任务报告。
- 内容材料能显示表达与表征，通常不能单独证明受众效果、生产者意图或因果机制。

### key_points

1. **内容分析的对象不是脱离情境的“词频”，而是作为传播而被生产、流通、阅读和使用的文本；分析必须说明从文本向所选语境作何种推论。**
   - evidence_status：`direct`
   - source_id：`G20`
   - locator：Chapter 2，尤其 2.1 “Definition”；出版社页面关于 “interpreting communications as texts in the contexts of their social uses” 的说明。
   - support_note：Krippendorff 直接把文本—语境推论置于方法定义中心，支持本节点反对“内容分析等于数词”。

2. **规范流程至少涉及研究设计、单元化、抽样、编码／记录与结果评估；质性内容分析同样需要编码框架、分段、试编码和主分析，而不是任意印象式解读。**
   - evidence_status：`direct`
   - source_id：`G20`
   - additional_source：`NB13` Margrit Schreier. 2012. *Qualitative Content Analysis in Practice*. London: SAGE. https://us2.sagepub.com/en-us/nam/book/qualitative-content-analysis-practice
   - locator：`G20` Chapters 4–8（designs、unitizing、sampling、recording/coding）；`NB13` chapters “The Coding Frame”, “Segmentation and Units of Coding”, “Trying It Out: The Pilot Phase”, “The Main Analysis Phase”。
   - support_note：两书目录与方法说明直接列出流程组件；“不是任意印象式解读”为编辑边界判断。

3. **多人编码的研究应评估并报告编码者间一致性；不同系数的适用性、复杂性与使用状况不同，不能把某个阈值机械当作通用合格线。**
   - evidence_status：`direct`（一致性要求与系数差异）+ `interpretive`（反对单一通用阈值）
   - source_id：`G25`
   - locator：Abstract；全文关于 indices、calculation/reporting recommendations 的部分，pp. 587–604。
   - support_note：论文直接说明 intercoder agreement 在内容分析质量控制中的中心性并比较多种指标；来源表也明确该文不支持所有研究使用同一系数或阈值。

4. **计算内容分析用词典、监督学习和无监督学习等工具扩大数字内容研究的规模，但方法选择必须由问题与资料特征决定，并通过人工理解和验证建立解释边界。**
   - evidence_status：`direct`（工具分类与规模问题）+ `interpretive`（验证边界）
   - source：`NB14` Judith W. Boumans and Damian Trilling. 2016. “Taking Stock of the Toolkit: An Overview of Relevant Automated Content Analysis Approaches and Techniques for Digital Journalism Scholars.” *Digital Journalism* 4(1): 8–23. https://doi.org/10.1080/21670811.2015.1096598
   - locator：Abstract；全文对 dictionary-based、supervised machine learning、unsupervised machine learning 的分类与应用综述。
   - support_note：作者直接说明数字内容的规模和特征推动自动化，并系统列出三类工具；“人工理解和验证”是依据方法推论责任作出的编辑要求，需在计算方法节点进一步细化指标。

### 与解释型文本研究的边界

- **人工内容分析**：由编码者按明确单位和代码本作分类，可采用定量或质性设计；质量重点包括规则透明、试编码、可靠性与语境化推论（`G20`、`G25`、`NB13`）。
- **计算内容分析**：把部分分类、聚类或测量自动化，适合大规模数字材料；必须报告数据来源、预处理、词典／模型、训练和验证表现（`NB14`；后半为编辑规范）。
- **解释型文本研究**：话语、符号、叙事、视觉或档案研究常以历史语境、修辞结构、研究者位置和细读解释为中心，不一定追求固定编码类别或编码者一致性。它可与内容分析结合，但若研究质量主要依赖语境化论证，应进入 `r8-interpretive-methods`，不要只因“研究了文本”就改称内容分析（本段为基于 `G20`、`NB13` 方法边界的编辑解释）。

### limits_or_debates

- **定量／质性的边界并非非此即彼。** `G20` 把文本语境和推论置于方法中心，`NB13` 又给质性内容分析明确流程；本节点不以“有没有数字”作为唯一分类标准。
- **可靠性不等于效度。** `G25` 支持报告一致性，但类别即使能被稳定编码，也可能没有测到声称的概念。
- **规模不等于解释力。** `NB14` 支持自动化工具扩展，不能据此推断机器方法天然优于人工或细读。
- **样本可得性偏差。** 平台 API、删除机制、搜索排序和资料保存会影响可见语料；若总体不可定义，应限制概括范围。

### area_memberships

- `research_application`（**primary**）：这是把传播问题转化为系统材料分析的研究方法。
- `meaning`（secondary）：编码类别与语境推论涉及表征、框架和意义，但不替代解释型细读。
- `effects`（secondary）：内容特征可作为效果研究中的信息暴露或刺激材料描述；内容分析本身通常不能证明效果。
- `digital_ai`（secondary）：计算内容分析处理大规模数字材料并可能使用机器学习；技术更新需要在计算方法节点持续复核。

### learning_resources（3 项）

1. `G20` Krippendorff，*Content Analysis* 第四版——按“文本—语境—推论”理解完整方法逻辑。
2. `G25` Lombard, Snyder-Duch & Bracken (2002)——学习怎样选择、计算并报告编码者间一致性。
3. `NB14` Boumans & Trilling (2016)——比较词典、监督学习与无监督学习在数字新闻研究中的用途。

### 候选关系

1. **relation_type**：`used_in`  
   **source**：`r8-content-analysis`  
   **target**：`r5-journalism`  
   **statement**：内容分析可用于系统比较新闻材料的主题、来源、框架、呈现或选择结果。  
   **evidence**：`G18` 对电讯稿内容分类与拒绝理由的分析提供早期新闻研究实例；`G25` 明确把内容分析称为大众传播消息研究的基础方法。  
   **locator**：`G18` 摘要与 pp. 383–390；`G25` Abstract。  
   **status**：`direct_ready_for_review`

2. **relation_type**：`builds_on`  
   **source**：`r8-computational`  
   **target**：`r8-content-analysis`  
   **statement**：计算传播中的自动文本分类与主题发现承接内容分析的材料、分类和推论问题，同时增加模型训练、验证和规模化处理环节。  
   **evidence**：`NB14` 对自动化内容分析工具及其新闻研究应用的综述；“承接并增加环节”为编辑归纳。  
   **locator**：Abstract；dictionary-based、supervised 与 unsupervised 方法部分。  
   **status**：`interpretive_ready_for_review`

3. **relation_type**：`contrasts_with`  
   **source**：`r8-content-analysis`  
   **target**：`r8-interpretive-methods`  
   **statement**：内容分析通常要求明确材料单位、编码框架和可追踪程序；解释型文本研究通常把语境化细读和论证作为主要质量基础。二者可以组合，区别在推论逻辑而非是否研究文本。  
   **evidence**：`G20` 的定义、design/unitizing/sampling/coding 结构；`NB13` 的编码框架与试编码步骤。解释型一侧的完整边界仍待 `r8-interpretive-methods` 专门文献复核。  
   **locator**：`G20` Chapters 2、4–8；`NB13` “The Coding Frame” 至 “The Main Analysis Phase”。  
   **status**：`interpretive_pending_cross_review`

4. **relation_type**：`used_in`  
   **source**：`r8-content-analysis`  
   **target**：`r4-info-disorder`  
   **statement**：内容分析原则上可用于描述虚假信息、极化与信任相关材料的文本特征，但当前草案尚未补入一项直接应用研究，关系不进入默认图谱。  
   **evidence**：仅有方法适配的编辑判断，缺直接应用证据。  
   **locator**：待补一项经过同行评审的直接应用研究。  
   **status**：`pending_not_for_publication`

### temporal_profile

- value：`relatively_stable`
- as_of：`null`
- last_evidence_check：`2026-09-11`
- next_review_due：`null`
- note：方法核心相对稳定；其中计算工具、平台数据接口与复现规范应在 `r8-computational` 作为动态内容维护。

### controversy_status

- value：`contested`
- note：争议主要涉及定量／质性边界、显性与潜在意义、可靠性与效度的优先次序，以及自动化扩大规模是否牺牲语境解释。
- positions：规则化人工编码；质性内容分析；自动／计算内容分析；解释型文本研究。后三者存在交叉，不能排成单一路线的高低等级。

- **review_status**：`ready_for_review`
- **created_at**：`2026-09-11`
- **updated_at**：`2026-09-11`
- **reviewed_at**：`null`

---

## 待并入来源

> 以下来源本轮用于草案，但按任务约束尚未写入 `source-register*.csv`。建议正式并表前再次核对来源类型、访问状态与永久链接。

| 临时 ID | 完整书目 | URL | source_type | 本轮定位与用途 | accessed_at |
|---|---|---|---|---|---|
| `NB01` | Lasswell, Harold D. 1948. “The Structure and Function of Communication in Society.” In *The Communication of Ideas*, edited by Lyman Bryson. New York: Institute for Religious and Social Studies. | https://www.worldradiohistory.com/BOOKSHELF-ARH/Education/Mass-Communications-Schramm-1960.pdf | `primary_scholarship` | “The Act of Communication” 五问与研究分工；当前 URL 为获准重印版本合集，正式并表宜另存原书馆藏记录。 | 2026-09-11 |
| `NB02` | Shannon, Claude E. 1948. “A Mathematical Theory of Communication.” *Bell System Technical Journal* 27(3): 379–423; 27(4): 623–656. | https://doi.org/10.1002/j.1538-7305.1948.tb01338.x ; https://doi.org/10.1002/j.1538-7305.1948.tb00917.x | `primary_scholarship` | Introduction；Figure 1；noisy channel。支持工程范围、系统组件、噪声与容量。 | 2026-09-11 |
| `NB03` | Schramm, Wilbur. 1954. “How Communication Works.” In *The Process and Effects of Mass Communication*, edited by Wilbur Schramm, 3–26. Urbana: University of Illinois Press. | https://books.google.com/books?id=9VpiAAAAMAAJ | `primary_scholarship` | 章节目录及 source/message/destination、field of experience、feedback、多重渠道。 | 2026-09-11 |
| `NB04` | Carey, James W. 2009. *Communication as Culture: Essays on Media and Society*. Revised Edition. New York: Routledge. | https://www.routledge.com/Communication-as-Culture-Revised-Edition-Essays-on-Media-and-Society/Carey/p/book/9780415989763 | `primary_scholarship` | Part I, “A Cultural Approach to Communication”；transmission/ritual views。 | 2026-09-11 |
| `NB05` | Barzilai-Nahon, Karine. 2008. “Toward a Theory of Network Gatekeeping: A Framework for Exploring Information Control.” *Journal of the American Society for Information Science and Technology* 59(9): 1493–1512. | https://doi.org/10.1002/asi.20857 | `primary_scholarship` | Abstract；identification、salience、gated 与四项属性。 | 2026-09-11 |
| `NB06` | Wallace, Julian. 2018. “Modelling Contemporary Gatekeeping: The Rise of Individuals, Algorithms and Platforms in Digital News Dissemination.” *Digital Journalism* 6(3): 274–293. | https://doi.org/10.1080/21670811.2017.1343648 | `primary_scholarship` | Abstract；digital gatekeeping model 的三步构造。 | 2026-09-11 |
| `NB07` | Fraser, Nancy. 1990. “Rethinking the Public Sphere: A Contribution to the Critique of Actually Existing Democracy.” *Social Text* 25/26: 56–80. | https://doi.org/10.2307/466240 | `primary_scholarship` | pp. 60–67；结论 p. 77。支持排斥、参与平等、多重公众与从属反公共。 | 2026-09-11 |
| `NB08` | Gorwa, Robert. 2019. “What Is Platform Governance?” *Information, Communication & Society* 22(6): 854–871. | https://doi.org/10.1080/1369118X.2019.1573914 | `primary_scholarship` | Abstract；多行动者、多层治理关系和研究议程。 | 2026-09-11 |
| `NB09` | Gillespie, Tarleton. 2018. *Custodians of the Internet: Platforms, Content Moderation, and the Hidden Decisions That Shape Social Media*. New Haven: Yale University Press. | https://yalebooks.yale.edu/book/9780300235029/custodians-of-the-internet/ | `primary_scholarship` | 出版社内容简介；chapters 1–2。支持内容审核的中心性及公共后果。 | 2026-09-11 |
| `NB10` | 国家互联网信息办公室：《网络信息内容生态治理规定》，国家互联网信息办公室令第 5 号，2019 年 12 月 15 日公布，2020 年 3 月 1 日施行。 | https://www.cac.gov.cn/2019-12/20/c_1578375159509309.htm | `official_record` | 第三章，第八至十七条；重点为平台主体责任和内部治理制度。 | 2026-09-11 |
| `NB11` | 国家互联网信息办公室、工业和信息化部、公安部、国家市场监督管理总局：《互联网信息服务算法推荐管理规定》，国家互联网信息办公室令第 9 号，2021 年 12 月 31 日公布，2022 年 3 月 1 日施行。 | https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm | `official_record` | 第二、十二、十六至十八、二十四条。支持适用范围、透明度、用户权益与备案。 | 2026-09-11 |
| `NB12` | European Parliament and Council of the European Union. 2022. Regulation (EU) 2022/2065 on a Single Market for Digital Services (Digital Services Act). *Official Journal of the European Union* L 277: 1–102. | https://eur-lex.europa.eu/eli/reg/2022/2065 | `official_record` | Articles 14, 17, 27, 34–35, 40。作为平台透明、理由说明、推荐系统和系统性风险的法域比较样本。 | 2026-09-11 |
| `NB13` | Schreier, Margrit. 2012. *Qualitative Content Analysis in Practice*. London: SAGE. | https://us2.sagepub.com/en-us/nam/book/qualitative-content-analysis-practice | `primary_scholarship` | “The Coding Frame”, “Segmentation and Units of Coding”, “Trying It Out”, “The Main Analysis Phase”。 | 2026-09-11 |
| `NB14` | Boumans, Judith W., and Damian Trilling. 2016. “Taking Stock of the Toolkit: An Overview of Relevant Automated Content Analysis Approaches and Techniques for Digital Journalism Scholars.” *Digital Journalism* 4(1): 8–23. | https://doi.org/10.1080/21670811.2015.1096598 | `primary_scholarship` | Abstract；词典法、监督学习与无监督学习综述。 | 2026-09-11 |
| `NB15` | 中华人民共和国商务部全球法规网：《网络信息内容生态治理规定》法规状态页。 | https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=69871 | `official_record` | 页面在本轮复核时标注“效力级别：部门规章；时效状态：现行有效”。只支持 2026-09-11 的状态核对。 | 2026-09-11 |
| `NB16` | 中华人民共和国商务部全球法规网：《互联网信息服务算法推荐管理规定》法规状态页。 | https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=92262 | `official_record` | 页面在本轮复核时标注“效力级别：部门规章；时效状态：现行有效”。只支持 2026-09-11 的状态核对。 | 2026-09-11 |
