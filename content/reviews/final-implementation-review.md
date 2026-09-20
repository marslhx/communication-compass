# COMMPASS 第一版独立实现审查

审查日期及定点复审日期：2026-09-11。审查者：独立 Astra 审查代理。已在主代理修复后对最终候选版完成定点复审；以下“最终裁决”和状态表替代初审裁决。未修改主代码；实际执行了项目内容流水线，重建生成数据和 dist。

## 最终裁决：可本地 v1 交付

**建议交付第一版本地可运行版本。当前无未关闭的 blocker 或 high。** 80 个入口、15 个完整样本、八区导航、知识阅读、证据分层、搜索、教学路径、桌面聚焦图谱与手机列表路径已具备；公开关系数据与 UI 均排除 pending 关系。初审三项 high 的实际原因均已修复并核验。

允许的交付措辞是“本地可运行、可探索的第一版”，不包含“学术事实全部已核实”“全部信息架构细节均完成”“正式学生测试通过”或“公网部署完成”。仍有下述 medium/low 的局部体验和维护强化项，建议纳入下一版本；它们没有使当前受核验内容错误升格，也没有阻断当前手机/桌面的核心阅读与导航任务。

### 初审问题关闭情况

| 编号 | 最终状态 | 定点复核证据及剩余范围 |
|---|---|---|
| H1 图谱布局/关系图 | 已关闭 | 浏览器读到 8 个节点为两行四列有效坐标；议程设置可聚焦，URL 保存 focus；点击放大显示 110%；关系页有 3 条 SVG 线及 markerEnd，中心状态正确。代码支持方向平移/重置，比较层独立虚线。 |
| H2 手机文档/导航 | 已关闭 | HTML 已有 lang、UTF-8、viewport；窄屏移动导航可见，已存在列表路径。末次定点复核确认移动导航扩展到 <=900px，top=76px；<=600px 切换为 top=64px，601—900px 空档已关闭。 |
| H3 候选日期 | 已关闭 | 重跑 normalize/assemble 后全部 13 个 evolving candidate 的三日期均为 null；Dates 显示“尚未记录”，并区分候选来源线索检查和完整节点证据核查；as_of 已改“内容截至”。 |
| M1 内容解释字段 | 核心证据问题关闭；局部展示余项保留 medium | interpretive 的证据默认 open，浏览器确认归纳依据、访问日期和支持限制可见；Status 显示复核日期，关系中心有真实状态；NodeCard 展示带 note 的别名。详情页 aliases.note、rationale、controversy_note 仍未全部接入，摘要来源 ID 仍可进一步优化。 |
| M2 查询和路由状态 | 核心错误关闭；非法参数提示保留 low | 浏览器复现原步骤后输入、URL、结果均同步为“文化研究”；空组合筛选及清除行为已分开；非法导览 step 回第一站。区域目录和 guides 的非法参数处理、fromArea 校验及文案尚可统一。 |
| M3 标题/锚点 | 核心错误关闭；滚动恢复保留 low | 返回首页 title 为“首页”，activeElement 为 home-title；`#source-G17` 只有 1 个，跳转后来源自身及外层全部引用来源均 open。精确返回滚动位置尚无独立恢复实现。 |
| M4 审核锁定 | 层级升格与公共副本完整性已关闭；版本绑定为后续强化 | 白名单层级已同时用于装配和校验；实际对 interpretive → direct 做只在内存中的变异，装配器明确拒绝。build 已执行内容校验。末次复核确认 validator 对每条 public 记录执行全文等值比较，内存修改公开 statement 后实际返回校验失败。审核内容版本 hash 仍可后续补充。 |
| M5 安装依赖 | 说明缺项已关闭 | 新增 requirements.txt，README 写明 venv、pip install 和 npm ci；当前校验和构建通过。此次未重装依赖，不把已有环境通过表述为全新机器安装测试。 |
| M6 待核关系打包 | 已关闭 | src/data.ts 改读 public-relations.json；该表 21 条均为获准关系；生产 JS 搜索没有 `rel-cultural-studies-has-hegemony`。 |
| L1 / L2 | 后续增强，保留 low | 页面拆分、行为回归测试、外部字体失联布局，以及正式学生可用性测试留给后续。 |

### 复审新增执行证据

重新执行 normalize → assemble → validate、typecheck、lint、6 项测试、build 全部退出码 0。build 自动内容校验通过；最终候选构建 JS 480.27 kB / gzip 137.48 kB。重新执行 npm audit：0 vulnerabilities。

独立浏览器检查使用 Chrome：有效地图坐标、议程设置聚焦及状态、110% 缩放、3 条一跳关系 SVG 线、窄屏导航、原查询同步缺陷、首页标题/焦点、来源锚点唯一与自动展开、编辑归纳默认公开依据。窄屏工具请求为 320px，但该 Chrome 实际返回 innerWidth=355、clientWidth=scrollWidth=338（存在浏览器缩放）；本审查据此确认该次窄屏没有横向溢出，不把它冒称严格 320 CSS px 验证。主代理提供的严格 320px 验证属于主代理证据，本轮没有独立重做真实手机或完整 WCAG 审计。

当前生产包不含待核关系 ID；13 个 evolving 骨架日期已逐条程序检查为 null；21 条 public-relations 与内部审核关系逐条相同。层级变异测试在内存替换读取结果并禁用写入，实际返回：`changed evidence layer after review: expected interpretive, got direct`，没有污染任何内容文件。

末次追加定点复核：读取 CSS 确认移动导航覆盖到 900px，并根据 600px 断点使用与页头一致的 sticky top；重新运行内容校验 PASS。对公开关系 statement 做仅在内存中的变异，validator 实际报 `differs from its reviewed editorial record` 并返回 1，证明公共副本全文等值检查生效；没有改动内容文件。本次仅核这两项，未重复全部工程检查。

### 非阻断后续项

1. **Medium：详情展示仍有未接字段。** NodeCard 已显示别名 note，独立详情尚未直接渲染 aliases.note、归属理由和 controversy_note；应补齐，尤其让直接深链进入的学生也读到精确命名限定。当前详情保留完整 summary、naming_boundary 和主张边界，未发现因此发生具体错误状态升格。
2. **Low：审核内容版本绑定。** 公开副本全文等值与批准层级已受到程序保护；未来可为内部审核正文的每次修订绑定新的复核版本/hash，进一步减少仅凭稳定 ID 沿用旧审核日期的维护风险。
3. **Low：非法参数与精确滚动恢复、摘要引用链接、页面模块化和行为回归测试**尚可继续完善。当前已提供有效路由、错误页、hash 展开和默认回退；这些余项不再按初审的已修复错误重复阻断。

最终受核验快照：

| 文件 | SHA-256 |
|---|---|
| src/main.tsx | aa9903fd70f260cf85b11f3ea0436eb2f1e6753a546383d4cd68e816aa243981 |
| src/style.css | 6e4e6cfb929135ca3dc5e16cbc5d2050bc91f76618d05fe0514cc7609d561ae5 |
| content/data/nodes.json | c9078193f4c92b9cefe44f8303562b6abbb11b5f23f047f343891d0a5b29e36f |
| content/data/public-relations.json | 845b9276e5ee85bc1ec4954cf1a89b3fe6788d573ffd347812fe7560539d1245 |
| scripts/validate_content.py | 2991e95d8e22de795ff3554398bd2df281cd48c72188616a0ca97846c94d8eb2 |
| package-lock.json | 1f56c1b5ab2247aa1d99b7fd974ebe1e2118c456c132ed44330edc7ba0b85294 |

## 初审历史记录（问题状态以上表为准）

以下保留问题初次发现时的具体复现和建议，便于追踪，不表示全部问题仍未修复。初审裁决为暂缓交付；本轮定点复审已将其替换为上面的本地 v1 通过。

本结论针对实现和当前数据装配一致性，不是重新独立核验全部 87 条外部来源，也不是学生可用性研究。当前子任务读取 Goal 工具返回 null，因此以父任务明确审查范围、AGENTS、PROJECT_PLAN 与信息架构作为目标基线。

## 已完成检查

完整阅读 AGENTS.md、README.md、PROJECT_PLAN.md、design/INFORMATION_ARCHITECTURE.md、content/STATUS_RULES.md、content/MAINTENANCE.md，以及 src 下前端、选择器、类型、样式和测试；检查 normalize、assemble、validate 三个脚本、Schema 和复核白名单，并阅读最终内容闸门审计。

| 检查 | 结果 |
|---|---|
| normalize → assemble → validate | PASS；80 节点、15 complete、22 关系、87 来源、8 区、7 类型 |
| npm run typecheck | PASS |
| npm run lint | PASS |
| npm test | PASS；2 文件、6 测试 |
| npm run build | PASS；Vite 6.4.3，JS 476.73 kB / gzip 136.12 kB |
| npm audit | PASS；0 vulnerabilities。首次受 DNS 沙箱限制失败，获准联网后实际成功 |
| 本地浏览器 | 成功启动 127.0.0.1:5179；检查区域地图、关系页、320px 关系页、别名搜索、搜索页内再次搜索与返回首页 |

本机环境：Node 20.11.1、npm 10.9.2、Python 3.10.11；jsonschema 4.17.3 来自用户级 Python 目录。Playwright CLI 初次因执行权限、继而注册表 DNS 失败，浏览器检查改用可用的内置浏览器与只读 DOM 检查，不声称 CLI 已成功。

确认的正确行为：所有六类主张集合参与 pending 判断；6 个含待核样本没有升格成已复核；65 个骨架条目仍走候选正文；默认关系筛出 10 条 direct，比较层筛出 11 条 interpretive，pending 关系不进入两层选择结果；学习链接没有转成学术边；别名“议题设置”能够找到议程设置；文化研究仍为骨架条目。未发现前端读取未入选完整草案。

## High

### H1 — 地图定位失败，且承诺的关系探索图尚未实现完整

位置：`src/style.css` 的 `.map-node`；`src/relations.css` 的 `.orbit-relation`；`src/main.tsx` 的 `Map` / `Relations`。

复现：打开 `/map?area=effects`。浏览器实际计算 8 个地图节点的 left 均为 `0px`，top 分别为 52.8、107.8、162.8、217.8、272.8、327.8、382.8、437.8px。原因是 CSS `calc()` 中的 `%` 被当成取模运算使用，left 声明无效；top 按连续分数增加，没有按行取整。最后一项被 440px 高的 `overflow:hidden` 容器裁切。该节点也不属于“其余 4 个”链接所描述的剩余集。

独立关系页只绘制装饰圆环和若干按钮，没有表示具体关系的线、箭头及两层不同线型；桌面区域图也没有缩放、平移或焦点选择。图层开关在地图页只改变全站计数，不改变可探索关系。与已确认“电脑完整图谱、独立关系探索”目标有实质差距。

修复：用 JS 明确计算位置或使用有效布局；为一跳关系绘制带方向、语义和图层差异的连线，并保留完整文字列表；实现已承诺的桌面缩放/平移/重置，或先由主代理明确缩减验收范围。验收须覆盖八区以及 0、1、多关系节点，检查末项没有被裁掉。

### H2 — 手机视口和持续导航缺失

位置：`index.html:1`；`src/style.css` 的 `@media(max-width:900px)`；`src/main.tsx` 的 `Header`。

入口 HTML 仅包含 root 和 script，没有 viewport、字符集声明或 `lang="zh-CN"`。真实手机可能采用约 980px 布局视口，导致 600px 手机列表规则不触发。即使人工设置为 320px，浏览器实际确认主导航 `display:none`，所有内页失去“学科图谱”“主题导览”的直接入口；没有替代菜单或移动导航。人工把桌面视口缩到 320px 不能证明缺失 viewport 的真实手机行为通过。

修复：补齐标准 HTML 文档、中文语言和 viewport，并提供持续可达的手机主导航；使用手机模拟或真实手机验证自然布局视口，再验 320px、375px、200% 缩放和键盘路径。

### H3 — 机械生成的候选日期被显示为逐项证据核查

位置：初审版 `scripts/normalize_research_data.py` 的 `normalize_candidates`；`src/main.tsx` 的 `Dates`。

初审时所有 evolving 骨架节点都被固定赋予 `last_evidence_check=2026-09-11`，Dates 无条件显示“证据核查：2026-09-11”。这与内容闸门“候选机械日期不能冒充逐条原文核验”明确冲突。`as_of` 被译作“适用至”也容易使记录截至日期变成有效期承诺。

修复：无逐项核查记录的候选日期保留 null，前端明确“尚未记录”；`as_of` 显示“内容截至”或准确范围说明。审查末段看到规范化脚本已经将候选日期改为 null，须运行装配并检查动态骨架实际页面后才能关闭此项。

## Medium

### M1 — 编辑归纳理由、别名限定与复核信息没有在要求的位置展示

位置：`src/main.tsx` 的 `Evidence`、`SourceDetail`、`NodePage`、`NodeCard`、`Search`。

`Evidence` 对 interpretive 只显示徽标；归纳支持说明藏在默认折叠的证据中，违反 STATUS_RULES 的“紧邻显示归纳理由”。别名能检索，但结果和详情没有渲染 aliases.note；搜索“传播学去西方化”因此丢失“不作严格同义词”的专门限定。节点 `reviewed_at`、归属 rationale、controversy_note 未渲染；关系页中心节点没有自身成熟度标签。SourceDetail 没有访问日期或“访问范围不等于主张支持”提示。摘要内来源 ID 仍为纯文本，无法就地查证。

修复：归纳理由常显；匹配别名与 note 同屏显示；已复核节点显示独立复核日期；解释主次区域及其理由；中心和相邻节点均有状态；每个就地证据卡补访问范围、日期与限制。不要仅把这些字段加到全站说明页。

### M2 — 查询参数与输入状态不同步，空筛选结果不完整

位置：`src/main.tsx` 的 `Search` / `Guide` / `Guides` / `NodePage`。

实际复现：先开 `/search?q=议题设置`，再用页头搜索“文化研究”；URL 和结果变为文化研究，但页面搜索框仍为议题设置。原因是 input 只在初次 useState 时读取 q。浏览器前后退有同样风险。q 为空但组合筛选为零时，无结果提示被 `q ? ... : null` 隐藏，并继续宣称“可搜索全部 80 个入口”。“清除筛选”会连查询也清掉，和文案不符。

非法 area/type/level 未统一忽略并提示；Guide 的 step 允许使用任意全站 node.id，能把非路径节点作为“当前站”；fromArea 未校验且返回文字仍取主区。修复须统一校验参数、同步 URL 与表单、区分清除筛选和清除查询，并为前后退和非法 step 添加行为测试。

### M3 — 首页及锚点导航没有满足焦点和标题恢复

位置：`src/main.tsx` 的 `Home` / `Page` / `Resources`。

实际复现：从搜索点击品牌返回首页，title 仍是“搜索 · COMMPASS｜传播罗盘”，焦点仍停留在品牌链接。Home 没用 useTitle 或新页标题焦点逻辑。代码也没有实现跨路由 hash 定位或返回滚动恢复；首次加载时 React 挂载与原生 hash 行为的时序不能当作可靠机制。多个学习材料和“全部引用来源”重复生成同一个 `source-ID`，来源锚点不唯一。

修复：统一路由标题、焦点和 hash 定位；来源锚点唯一且能打开所属折叠区；浏览器返回恢复已选查询及阅读位置。用真实跳转验 `#learning`、`#pending`、`#source-*`，而非只查 DOM 中有 id。

### M4 — 复核白名单没有锁定已经批准的证据层级或版本

位置：`scripts/assemble_content.py:63`；`scripts/validate_content.py`；`src/selectors.ts:20`；`package.json`。

关系白名单有 `layer`，装配和校验仅使用 id，不核对当前 evidence_status 与批准的层级。原 interpretive 关系若改成 direct，会仍被装配为 reviewed，校验通过后进入默认学术层，绕过新的独立学术复核。节点/关系的正文改变也自动沿用同一 id 的旧复核日期。选择器没有端点类型及证据来源有效性检查，依赖独立手动运行内容校验；`npm run build` 不运行该校验。

修复：至少验证白名单层级与当前记录一致；为已审核内容保存审核版本/hash，修改后失去发布资格；把内容校验接入交付构建或统一 check 脚本。增加变异测试：interpretive → direct 后必须失败或降回待审核。当前数据本身没有发现这一升格，问题是下一次维护容易静默引入。

### M5 — Python 校验依赖未声明，安装说明不可独立复现

位置：`README.md`、`content/MAINTENANCE.md`、`scripts/validate_content.py:11`。

README 仅要求 Python 3，但校验使用第三方 jsonschema；本机依赖恰好已存在于用户目录，没有 requirements 或安装说明。新机器照做 npm install 以后运行完整检查，会在 Python import 处失败。现有 node_modules 通过不等于干净安装通过。

修复：声明 Python 依赖和版本范围/锁定方式，给出隔离环境安装步骤，并推荐 npm ci 使用锁文件。用新的临时环境实际运行安装与校验；无需在用户全局 Python 装包。

### M6 — 运行时产物仍包含未公开关系全文

位置：`src/data.ts`；`content/data/relations.json`；生产 JS bundle。

UI 选择器正确排除 pending，但全部 relations JSON 被静态导入生产包，`rel-cultural-studies-has-hegemony` 及其待核 statement 仍随 bundle 交付。若“不公开，只保留编辑审查记录”包括数据分发边界，单纯 UI 过滤不能满足它。

修复：在构建公共数据时剔除不允许公开的关系，编辑数据继续保存在 content 中；测试生产包/公开 JSON 不含待核关系 ID。详情页获准展示的 pending 节点主张不受此规则牵连。

## Low

### L1 — 页面结构与布局缺乏可维护拆分

`src/main.tsx` 把所有页面、选择逻辑和部分词表写成几十行极长 JSX；CSS 也基本单行。当前 6 测试仅覆盖数据计数/选择器和首页挂载，没有关系页面、URL 恢复、证据展开或移动导航回归。修复高优先级问题时宜按页面/公共证据组件拆分，并为实际暴露的行为缺陷补必要回归测试，不需要为纯样式机械造测试。

### L2 — 外部字体与真实使用验收边界

样式直接导入 Google Fonts；已提供通用后备字体，但尚未验证中国大陆网络或完全离线时的版式。建议为本地交付测试字体请求失败的页面，之后再决定是否自托管合法字体。未发现学生可用性记录，不应宣称“学生测试通过”或正式公网交付完成。

## 复核入口

优先修复 H1—H3 和直接影响学术解释的 M1，再完成 M2—M6 的关键边界。随后重跑内容流水线、typecheck、lint、tests、build，并用浏览器检查：八区、已复核/含待核/骨架各一页、两种关系层、非法关系 ID、搜索 URL 同步、404、手机导航与自然视口。

初审代码快照（修改后需更新本报告）：

| 文件 | SHA-256 |
|---|---|
| src/main.tsx | 09ac5a4846fb82557f6365a097822635a84f216b90dc3646a4da975c9cf11f7a |
| src/style.css | 010631cd2658b3fa381dee483f5e05ad16b9526a19c573cec6c0ea4fd3e9958d |
| src/relations.css | b98223eb295be224f2088de50ad9a1a11ead60cb77758316c8e7b241eef6f5c1 |
| src/selectors.ts | a595fdc7a58972a0b5aa3136ecf23e46f8343c96cda3a55dd2ec3dee4c317ab8 |
| content/data/nodes.json | bb8731f778fd7ee807e13435f2951da269ffa5b11e62e99273f93259b9b29947 |
| content/data/relations.json | 1fbf61c87151cb8393188bf4684b7fdddfb0335ca229f866e655429631b88a6e |
