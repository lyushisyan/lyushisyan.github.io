# Academic Website (Jekyll + GitHub Pages)

[English](#english-version) | [中文](#中文版)

## English Version

This repository is a personal academic website built with Jekyll and deployed on GitHub Pages.

### Page Structure Files

- Home: `/` (`index.md`)
- About: `/about/` (`about.md`)
- News: `/news/` (`news.md`)
- Blog (English): `/blog/` (`blog.md`)
- Blog (Chinese): `/zh/blog/` (`zh-blog.md`)
- Publications: `/publications/` (`publications.md`)
- Software: `/software/` (`software.md`)
- Teaching: `/teaching/` (`teaching.md`)

### Files To Edit (Content and Data)

- `_config.yml`
- `_data/about.yml`
- `_data/news.yml`
- `_data/software.yml`
- `_data/teaching.yml`
- `assets/bibliography/publications.bib`
- `_data/publications.json` (generated from BibTeX)
- `_data/featured_research.yml`
- `_posts/*.md`
- `_posts/zh/*.md`

### CSS Structure

- `assets/css/style.css`: site-wide foundations, navigation, buttons, and utilities
- `assets/css/about.css`: Home and About profile sections
- `assets/css/components/listing.css`: shared page-header component
- `assets/css/components/blog.css`: Blog index pages
- `assets/css/components/post.css`: Blog article pages
- `assets/css/components/publications.css`: Publications page
- `assets/css/components/news.css`: News page
- `assets/css/components/software.css`: Software page
- `assets/css/components/teaching.css`: Teaching page
- `assets/css/components/error.css`: 404 page

Page-specific stylesheets are declared through the `extra_css` front-matter field.

CSS organization follows three layers:

1. `assets/css/style.css` defines design tokens, base elements, site layout, shared components, and utilities.
2. `assets/css/components/` contains styles owned by one page or reusable page component.
3. Page-specific responsive rules stay with their component instead of being collected in a separate mobile file.

Reuse the custom properties in `:root` for shared colors, typography, radii, motion, shadows, and layout widths. Add a new token when a visual value is repeated across components; keep one-off decorative values local.

### Local Preview

After editing `assets/bibliography/publications.bib`, regenerate the static publication data:

```bash
node scripts/sync-publications.mjs
```

This also regenerates the citation-only BibTeX download at `assets/bibliography/publications-download.bib`.

1. Install Ruby and Bundler.
2. Install dependencies:

```bash
bundle install
```

3. Start local server:

```bash
bundle exec jekyll serve
```

4. Open:

- `http://127.0.0.1:4000`

### GitHub Pages Deployment

1. Push repository to GitHub.
2. Open repository `Settings -> Pages`.
3. Set:
- Source: `Deploy from a branch`
- Branch: `main` (or your default branch), folder: `/ (root)`
4. Save and wait for the first deployment.

### How To Push To GitHub

Run in project root:

```bash
git status
git add .
git commit -m "Update website content"
git push
```

If this is the first push of a new branch:

```bash
git push -u origin <your-branch-name>
```

## 中文版

这个仓库是一个基于 Jekyll 的个人学术主页，并部署在 GitHub Pages。

### 页面结构文件

- 首页：`/`（`index.md`）
- About：`/about/`（`about.md`）
- News：`/news/`（`news.md`）
- 英文博客：`/blog/`（`blog.md`）
- 中文博客：`/zh/blog/`（`zh-blog.md`）
- Publications：`/publications/`（`publications.md`）
- Software：`/software/`（`software.md`）
- Teaching：`/teaching/`（`teaching.md`）

### 需要修改的内容与数据文件

- `_config.yml`
- `_data/about.yml`
- `_data/news.yml`
- `_data/software.yml`
- `_data/teaching.yml`
- `assets/bibliography/publications.bib`
- `_data/publications.json`（由 BibTeX 自动生成）
- `_data/featured_research.yml`
- `_posts/*.md`
- `_posts/zh/*.md`

### CSS 结构

- `assets/css/style.css`：全站基础、导航、按钮和通用工具样式
- `assets/css/about.css`：Home 与 About 页面
- `assets/css/components/listing.css`：页面顶部标题框组件
- `assets/css/components/blog.css`：Blog 列表页
- `assets/css/components/post.css`：Blog 文章页
- `assets/css/components/publications.css`：Publications 页面
- `assets/css/components/news.css`：News 页面
- `assets/css/components/software.css`：Software 页面
- `assets/css/components/teaching.css`：Teaching 页面
- `assets/css/components/error.css`：404 页面

页面通过 front matter 中的 `extra_css` 字段声明所需组件样式。

CSS 按三层组织：

1. `assets/css/style.css` 定义设计变量、基础元素、全站布局、共享组件和工具类。
2. `assets/css/components/` 保存单个页面或可复用页面组件负责的样式。
3. 各页面的响应式规则与对应组件放在一起，不再集中到单独的移动端文件中。

全站共用的颜色、字体、圆角、动画、阴影和布局宽度应复用 `:root` 中的自定义属性。某个视觉值在多个组件中重复时再新增设计变量；一次性的装饰值保留在组件内部。

### 本地预览

修改 `assets/bibliography/publications.bib` 后，先重新生成静态论文数据：

```bash
node scripts/sync-publications.mjs
```

该命令也会重新生成仅包含引用字段的下载文件 `assets/bibliography/publications-download.bib`。

1. 安装 Ruby 和 Bundler。
2. 安装依赖：

```bash
bundle install
```

3. 启动本地服务：

```bash
bundle exec jekyll serve
```

4. 打开：

- `http://127.0.0.1:4000`

### GitHub Pages 部署

1. 把仓库推送到 GitHub。
2. 打开仓库 `Settings -> Pages`。
3. 设置：
- Source: `Deploy from a branch`
- Branch: `main`（或你的默认分支），folder: `/ (root)`
4. 保存并等待首次部署完成。

### 如何推送到 GitHub

在项目根目录执行：

```bash
git status
git add .
git commit -m "更新网站内容"
git push
```

如果是新分支第一次推送：

```bash
git push -u origin <你的分支名>
```
