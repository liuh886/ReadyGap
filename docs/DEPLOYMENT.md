# Deploying ReadyGap / 发布说明

## Published route map

- Root: the small launcher redirects to the branded homepage.
- /apps/web/ — manifesto-first homepage (not the questionnaire).
- /apps/web/assessment.html — experimental numeric assessment.
- /scoring/engine.mjs and /items/*.json — canonical scoring and candidate item contracts.

A typical project Pages URL is https://liuh886.github.io/ReadyGap/. The URL is only considered live after Pages reports success AND the URL is verified.

## CI/CD

.github/workflows/pages.yml runs on pushes to main and via workflow_dispatch. It runs Node tests, packages static files in _site, uploads the Pages artifact and deploys using official GitHub Actions. No Node build framework, third-party hosting, analytics, fonts or private token required.

Permissions: contents: read, pages: write, id-token: write. GitHub Pages environment is github-pages. Hosted content is public, so do not add secrets, private company task samples or user data.

## First-time Pages setup

GitHub Pages can be disabled in a new repo. Official configure-pages@v5 does not enable Pages with the standard GITHUB_TOKEN automatically.

If the first workflow reports Pages disabled or no site:
1. Open repository Settings → Pages.
2. Under Build and deployment → Source, choose GitHub Actions.
3. Open Actions → Publish ReadyGap to GitHub Pages → Run workflow on main, or push a commit to main.

Do not add a personal access token to the workflow to work around this setting.

## Checks

1. node --test tests/*.test.mjs from the repo root.
2. Open the published root. It should land on the branded homepage. Confirm assessment link and scoring.
3. Review desktop (~1440px and 1024px), mobile (~390px and 320px), keyboard and prefers-reduced-motion.
4. Homepage visuals are conceptual, not empirical; no fabricated scores or percentages.
5. Assessment inputs stay in client page memory; no login, analytics or remote APIs.

Keep deployments sourced from main after PR validation.
