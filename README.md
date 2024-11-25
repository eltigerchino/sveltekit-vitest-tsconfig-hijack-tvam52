## Setup

```sh
pnpm install
```

## Repro

```sh
pnpm run reset
pnpm run hijack
```

### Reset

- Option A: Run Vitest from the SvelteKit package directory.
- Option B: Build SvelteKit.

Afterwards, inspect SvelteKit's internal `tsconfig.json`

Expected & actual output:

```json
{
  "paths": {
    "$myAlias": ["../src/myAlias"],
    "$myAlias/*": ["../src/myAlias/*"],
    "$lib": ["../src/lib"],
    "$lib/*": ["../src/lib/*"]
  },
  "rootDirs": ["..", "./types"]
}
```

### Hijack

- Option A: Run Vitest from the root directory.
- Option B: With the VSCode "Vitest" extension running, modify or touch e.g. the
  root `package.json`.

Afterwards, again inspect SvelteKit's internal `tsconfig.json`

Actual (unexpected) output:

```json
{
  "paths": {
    "$myAlias": ["../../z-another-app/src/myAlias"],
    "$myAlias/*": ["../../z-another-app/src/myAlias/*"],
    "$lib": ["../src/lib"],
    "$lib/*": ["../src/lib/*"]
  },
  "rootDirs": ["../../z-another-app", "./types"]
}
```

## Notes

SvelteKit's Vite is configured with an extra plugin that logs `process.cwd()`
and `server.config.root`.

During `reset`/`hijack`, check STDOUT for `[cwd-vs-config-root] ...` lines.

Logs during `reset`:

```
[cwd-vs-config-root] PROCESS CWD: /path-to-repo/packages/my-app
[cwd-vs-config-root] CONFIG ROOT: /path-to-repo/packages/my-app
```

Logs during `hijack`:

```
[cwd-vs-config-root] process.cwd: /path-to-repo/packages/z-another-app
[cwd-vs-config-root] config.root: /path-to-repo/packages/my-app
```
