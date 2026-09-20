# COMMPASS｜传播学指南针 Beta

> 在线访问：[https://marslhx.github.io/communication-compass/](https://marslhx.github.io/communication-compass/)

面向传播学专业大学生的中文学科地图。Beta版以八个核心问题组织传播学全貌，通过指南针首页、主题导览、可检索目录、阅读优先知识页和独立关系探索，让学生先找到方向，再逐层理解理论、人物、概念、方法与应用。

作者：[刘合翔](https://faculty.hdu.edu.cn/rwys/lhx/main.htm)；联系邮箱：[lohoso@qq.com](mailto:lohoso@qq.com)。内容纠错、使用体验与补充建议请提交至本仓库的 [GitHub Discussions](https://github.com/marslhx/communication-compass/discussions)。

## 当前内容

数据核对日期：2026-09-19。完整统计与发布检查见[当前内容版本基线](./docs/CONTENT_BASELINE.md)。

- 8 个问题区域、7 种节点类型，135 个可检索知识点，均已具备完整记录字段；
- 15 个知识点已完成基础校核，120 个处于开放校订；当前没有 pending 主张，字段齐全仍不代表内容定稿；
- 43 个人物节点：30 位国外核心人物、2 位国外专题扩展人物和 11 位中国核心学者；核心名单用于本科全景入门，不是客观排名；
- 58 条内部关系，其中 54 条已复核并进入公开数据：44 条 direct、10 条 interpretive；另有 3 条待审 interpretive 和 1 条 pending 不进入公开图层；
- 268 条来源记录，保留访问范围、访问日期、证据定位和支持说明；
- 583 项主张：384 direct、199 interpretive、0 pending；主张支持类型不等于整知识点校核状态；
- 内容深度排队结果为 A 30、B 105、C 0，属于数量与缺口检查，不是学术质量或审核等级；C级清零不等于全部内容定稿；
- 24 个动态知识点均显示有日期的“当前证据边界”，明示既有来源能支持什么、不能推出什么；这不等于完成实时平台、政策或效果核验；
- 两条教学导览，以及桌面图谱与手机列表化浏览。

这不是把所有传播知识塞进一张巨图的百科全书。八区是教学导航，不是互斥分类；节点可以跨区，教学顺序也不会被伪装成学术因果关系。

## 本地运行

要求 Node.js 20 或更新的 LTS 版本，以及 Python 3。建议在独立 Python 环境中安装内容校验依赖：

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
npm ci
npm run dev
```

Vite 会打印本地地址，通常为 `http://localhost:5173`。

默认检查（校验当前已装配数据，不重写来源或节点）：

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

`npm run build` 会先执行内容校验，避免在只检查前端时漏过内容状态或引用错误。

来源重建链已修复：明确的研究输入可重建当前268条来源，隔离检查逐字段比较五份生成JSON并校验引用及校核规则，不写正式数据。旧流程缺失的92条已作一次性、注明旧输出来源的登记迁移；这不是新证据核验。来源登记本身不授予关系校核状态；Q301–Q307、Q321–Q325服务9个原C级知识点补强，Q341–Q343、Q345、Q347–Q350用于八个核心理论／方法知识点的全文定位升级；R401–R427分三组补12位核心人物的教育经历并核查肖像权利；Q351–Q354支持发展传播与参与式传播的受控扩展。完整批次和边界见[来源重建与迁移说明](./research/SOURCE_REBUILD.md)。修改研究输入后应先检查隔离差异，再运行正式规范化／装配，勿直接编辑生成来源表。

生产构建输出在 `dist/`。`main` 分支更新后由 GitHub Actions 验证并部署至 GitHub Pages。

“关于本站”与反馈页已公开作者、邮箱与 GitHub Discussions 入口；也可通过 `.env` 覆盖，字段见 [`.env.example`](./.env.example)。`/feedback` 在浏览器本地保存草稿，只有访问者主动前往 GitHub 并确认发布后才会公开提交。

2026-09-16 的界面、反馈、可访问性、分包与图片优化结果见 [界面、反馈与工程优化验收](./docs/UX_ENGINEERING_QA_2026-09-16.md)。

## 目录

- `content/data/`：网站运行时读取的区域、节点、关系和来源数据；
- `content/revised/`：经内容修订的完整节点与关系输入；
- `content/schema/`：JSON Schema；
- `content/reviews/`：内容闸门、节点和关系独立复核记录；
- `research/`：竞品、课程框架、来源登记及覆盖审计；
- `design/`：信息架构；
- `design-concepts/`：已确认的版式示意图；
- `scripts/`：规范化、装配与跨记录校验；
- `src/`：前端应用。

2026-09-11 的本地验收历史见 [第一版本地验收记录](./docs/QA.md) 与 [最终实现审查](./content/reviews/final-implementation-review.md)；这些历史结论不自动覆盖后续扩充的全部内容或当前界面。

2026-09-14 已完成本批 P0 交互与发布工程准备验证；主代理另在真实浏览器的 390×844 视口验证首页、搜索与移动列表。更广泛手机设备、微信内置浏览器和 Safari 仍待测试，详见[当前执行清单](./docs/EXECUTION_PLAN_2026-09-14.md)。首页三节点本批 7 项待核中闭环 3 项，未提升整节点审核状态。

第二批非首页 5 项待核闭环 3 项；文化研究（限当前英国／伯明翰范围）与方汉奇另经[独立整节点复核](./content/reviews/non-home-pending-independent-review-2026-09-14.md)升级为已审核，不是因 pending 清零自动升级。“本站整理的比较”已采用独立视图，与文献直接支持关系分开呈现。

## 内容状态

`record_level=complete` 只表示字段齐全。团队统一使用“资料整理中”“开放校订”“已完成基础校核”“已发布”说明内容进度，避免把旧称“完整样本”读成内容完备，也避免把编辑检查误解为正式同行评审。A/B/C、主张的 `direct/interpretive/pending`、来源访问范围与校核状态分别记录。详见 [内容维护说明](./content/MAINTENANCE.md) 与 [状态规则](./content/STATUS_RULES.md)。

用户提供的 Twente 教学 PDF 用于核对和撰写可追溯的入门说明；上传行为不构成整本再发布授权。原 PDF、全文提取和页面图不纳入公开构建，详见[来源使用与再发布边界](./content/SOURCE_USE.md)。

## 部署边界

当前构建是无后端的静态前端，技术上适合 GitHub Pages、Cloudflare Pages、Vercel 或国内对象存储/CDN。正式部署前仍需确定域名、备案与中国大陆访问目标，并按所选平台配置单页应用回退；本阶段未替用户创建远端仓库或部署。

已加入 GitHub Pages 项目子路径、404 深链回退和只检查不发布的 CI。详见 [GitHub 预览准备](./docs/GITHUB_PREVIEW.md)；这不表示已有在线预览网址。
