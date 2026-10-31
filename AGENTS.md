<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

### Language

- Code comments, documentation and descriptions, and all Markdown (`.md`) files must be written in English.

### Comments

- Do not comment obvious code (e.g. a `DEFAULT_AVATAR` constant needs no comment). Comment only what the code cannot say itself: reasons, constraints, non-obvious behavior.
- The backend and the Identity server are the source of truth for contracts; the frontend adapts to them.
- Planned frontend work (placeholders, mismatches with the backend contracts) is marked with `FIXME: [StageN] <comment>`; work blocked on the backend or Identity (missing endpoints, open contract questions) with `TODO: [StageN] <comment>`. `N` is the stage of the frontend migration plan.

### Naming

- Use descriptive names; avoid vague abbreviations (e.g. `mergeClassNames`, not `cn`).

### Project structure

- See `PROJECT_STRUCTURE.md`.
