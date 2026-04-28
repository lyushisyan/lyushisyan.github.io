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
- `_posts/*.md`
- `_posts/zh/*.md`

### Local Preview

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
- `_posts/*.md`
- `_posts/zh/*.md`

### 本地预览

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
