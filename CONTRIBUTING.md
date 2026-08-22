# Contributing

Thanks for your interest in improving this learning repository! This repo is
documentation-first, so most contributions are content contributions: clearer
explanations, better examples, fixed links, and new topics backed by evidence.

## Ways to contribute

- Fix typos, broken links, or unclear explanations (open a [Documentation issue](https://github.com/kefyusuf/tdd-project/issues/new/choose))
- Improve code snippets in TypeScript or Python
- Propose new topics that map to real job-market demand ([Content request](https://github.com/kefyusuf/tdd-project/issues/new/choose))
- Extend the glossary, kata catalog, or reading list

## Documentation standards

Every guide in `docs/` follows the same anatomy:

1. **H1 title** - one per file
2. **TL;DR** - at most 5 bullets summarizing the page
3. **Body** - concept → why it matters → example → common mistakes
4. **References** - links to authoritative sources (books, canonical articles, official docs)

Additional rules:

- Terminology must match [`docs/00-getting-started/glossary.md`](docs/00-getting-started/glossary.md). Add new terms there first.
- Where code helps understanding, provide snippets for **both TypeScript (Vitest) and Python (pytest)**.
- Use Mermaid fenced blocks (` ```mermaid `) for diagrams.
- Only link to sources you have actually verified.
- English only; keep sentences short and direct.

## Local setup

No application code lives here - you only need Node.js 18+ to lint, format,
and preview the documentation site.

```bash
npx prettier --write "**/*.md"
npx markdownlint-cli2 "**/*.md"
```

Both commands run automatically in CI on every pull request.

### Documentation site

The site is built with VitePress from the same Markdown files:

```bash
npm install        # once
npm run docs:dev   # local dev server with hot reload
npm run docs:build # production build (must pass before merging site changes)
```

## Pull request process

1. Fork or create a feature branch from `main`.
2. Make your changes following the documentation standards above.
3. Run Prettier and markdownlint locally; keep both green.
4. Open a PR using the provided template and link any related issue.
5. One maintainer review is required before merge.

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE).
