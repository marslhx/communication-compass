# GitHub Pages 预览准备

状态：**仅完成本地工程准备，尚未创建 Git 仓库、上传代码、启用 Pages 或发布网址。** 当前 CI 只检查，不含部署/上传步骤，也没有 Pages 写权限。

## 本地验证

先按 README 安装 Python 依赖并运行 `npm ci`。普通本地开发仍用 `npm run dev`，默认路径为 `/`。

如果未来仓库 URL 为 `https://OWNER.github.io/REPO/`，用实际仓库名称替换以下示例：

```bash
VITE_BASE_PATH=/commpass-preview/ npm run build
VITE_BASE_PATH=/commpass-preview/ npm run pages:check
npm run preview:pages
```

最后一条命令只监听本机，默认打开 `http://127.0.0.1:4174/commpass-preview/`。预览服务从构建的 HTML 自动读取路径前缀，不需要再次设置环境变量。可直接打开：

- `/commpass-preview/nodes/agenda-setting`
- `/commpass-preview/nodes/agenda-setting/relations?layer=evidence`
- `/commpass-preview/search?q=议题设置`

`pages:check` 校验根入口、资源路径、HTTP 404 自定义页面和深链 URL 保留；Vitest 另检验 React 在项目路径下实际渲染知识页、搜索及正确的内部链接。`npm run preview` 是普通 Vite 预览，可能把深链返回为 200，不能代替 Pages 404 行为检查。

多人同时验证时，可隔离构建目录，避免正在预览的子路径构建被另一次根路径构建替换：

```bash
VITE_BASE_PATH=/commpass-preview/ npm run build -- --outDir tmp/pages-preview-dist
VITE_BASE_PATH=/commpass-preview/ npm run pages:check -- tmp/pages-preview-dist
PORT=4175 npm run preview:pages -- tmp/pages-preview-dist
```

用户/组织主页（`OWNER.github.io` 仓库）及使用根路径的自定义域名应采用 `VITE_BASE_PATH=/`，项目站点采用 `/REPO/`。本配置要求前后都有 `/`；不接受 `./`、外部 URL、查询串或点目录。

## 直接路由机制与限制

构建同时生成 `dist/index.html`、内容相同的 `dist/404.html` 和 `.nojekyll`。Vite 为 JS、CSS、图标和 CSS 图片加前缀；BrowserRouter 用同一 BASE_URL；来自内容 JSON 的本地人物照片通过 `assetUrl` 加前缀。

GitHub Pages 找不到实际文件时会返回自定义 404 页面，同一 SPA 从原路径启动，因此不会丢掉查询或 hash，也没有跳转循环。但是**深链的首个 HTTP 响应仍为 404**；适合交互预览，不宣称解决搜索引擎索引或分享抓取器问题。若后续要求这些 URL 首次请求为 200，应静态生成路由 HTML 或改用支持 SPA rewrite 的托管服务。

不使用登录、API 或服务端秘密。公开站点会发送构建内包含的所有数据；今后发布前应再次审核内容/图片权利、公开数据边界及中国大陆可访问性。构建的公共关系仍由既有审核规则生成，工程配置不会改变学术成熟度。

## 持续检查

`.github/workflows/ci.yml` 在未来仓库的 push、pull request 或手动触发时运行，只请求 contents:read。根路径和示例项目路径两个构建均检查：隔离内容重建与逐字段一致性、Python 回归测试、当前内容校验、类型、lint、前端测试、生产构建和 Pages 模拟检查。

来源重建链已在2026-09-14第二批修复：当时旧87条输入、注明旧输出来源的92条登记迁移及定点补证形成185条；后续人物与节点补强均沿同一显式输入链接入，截至2026-09-16为264条。详见 [来源重建与迁移边界](../research/SOURCE_REBUILD.md)。CI 的`check_content_rebuild.py`在临时目录重建并校验五份输出与正式数据逐字段一致，不覆盖正式数据；重复ID、隐式覆盖、缺失输入或未提交的装配变化都会使检查失败。正式规范化／装配仅在编辑者审查隔离差异后运行。迁移不是新来源核验，审核状态不因工程修复升级；P01–P03对应关系已另经独立复核，来源登记本身仍不构成关系批准。

未来正式启用 Pages 时，需单独确认目标仓库、可见性、实际 base 和发布范围，再增加具有部署权限的工作流。当前没有自动发布配置。

`.gitignore` 排除 tmp、研究下载缓存、浏览器快照/日志、QA 截图、dist、依赖、环境变量与本地代理状态；保留 public 中真正使用的图像与 design-concepts 参考材料。已有文件不会因为忽略规则而被删除；正式首次上传前仍须检查将要入库的清单及第三方材料授权。

参考：[Vite 的 GitHub Pages base 说明](https://vite.dev/guide/static-deploy#github-pages)、[GitHub 自定义 404 说明](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)（核对日期：2026-09-14）。

## 本次准备验证记录（2026-09-14）

- typecheck、lint、13 项 Vitest 测试通过；项目子路径生产构建通过。
- `/` 与 `/commpass-preview/` 两种构建均通过 `pages:check`：入口和资源 200，知识页/关系页/搜索直接路由返回 404 SPA 文档，路径和查询不经过重定向。
- Chrome 实际加载子路径生产构建，议程设置深链正确显示；人物页面照片请求 `/commpass-preview/portraits/mccombs.jpg` 且加载成功；直接搜索“议题设置”命中议程设置。CSS 背景资源也已带项目前缀。
- 忽略规则检查确认 tmp、浏览器快照、artifacts、output、dist、环境变量被排除；public、design-concepts、内容 JSON 和 CI 配置保留。
- CI 文件仅完成本地语法/配置核对，尚未在 GitHub 执行。2026-09-14 最终根路径构建的单一 JS 约 868 kB（gzip 约 254 kB），Vite 有分包建议；本轮没有扩大到性能重构。
