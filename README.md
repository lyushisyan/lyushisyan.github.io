# Academic Website Template (Jekyll + GitHub Pages)

This repository is a minimal academic website template designed for:

- Easy content editing
- Static HTML generation
- GitHub Pages deployment

## Pages Included

- About
- News
- Blog
- Publications
- Software
- Teaching
- Contact

## Content Editing

- Profile and narrative text: `about.md`, `contact.md`, etc.
- News entries: `_data/news.yml`
  - Suggested fields: `date`, `title` (one-line long text), optional `link` (web URL or local file path such as `/assets/files/xxx.pdf`)
- Publications list (BibTeX): `assets/bibliography/publications.bib`
  - Buttons supported per entry: `link/website/paper/url/doi` (Link), `abstract` (Abstract), `pdf` (PDF), raw entry (BIB auto-generated)
  - Optional preview image per entry: `preview = {your-preview.png}` (resolved from `assets/img/publication_preview/`)
  - Optional metrics display: `if = {...}` (or `impact_factor/jif`) and `scopus_quartile = {Q1}` (or `scopus/quartile/q`)
- Software list: `_data/software.yml`
- Teaching list: `_data/teaching.yml`
- Blog posts: `_posts/*.md`

## Local Preview

1. Install Ruby and Bundler.
2. Install dependencies:

   ```bash
   bundle install
   ```

3. Start local server:

   ```bash
   bundle exec jekyll serve
   ```

4. Open `http://127.0.0.1:4000`.

## GitHub Pages Deployment

1. Push this repository to GitHub.
2. Open repository settings -> Pages.
3. Under "Build and deployment", choose:
   - Source: "Deploy from a branch"
   - Branch: `main` (or your default branch), folder `/ (root)`
4. Save and wait for the first build.
5. Your site will be available at:
   - `https://<your-github-username>.github.io/<repo-name>/`
   - If repo name is `<your-github-username>.github.io`, then:
     `https://<your-github-username>.github.io/`

## Optional Personalization

- Update `_config.yml` for `title`, `description`, `url`, and navigation labels.
- Replace placeholders with your own links and biography.
