# replace-stack-traces changelog

## Next

### Patch

- Updated dev dependencies.
- Use the `node:` URL scheme for Node.js builtin module imports in tests.

## 2.0.0

### Major

- Updated Node.js support to `^14.17.0 || ^16.0.0 || >= 18.0.0`.
- ANSI escape sequences at the end of stack traces are no longer replaced.

### Patch

- Updated dev dependencies.
- Updated `jsconfig.json`:
  - Set `compilerOptions.maxNodeModuleJsDepth` to `10`.
  - Set `compilerOptions.module` to `nodenext`.
- Updated ESLint config.
- Updated GitHub Actions CI config:
  - Run tests with Node.js v14, v16, v18.
  - Updated `actions/checkout` to v3.
  - Updated `actions/setup-node` to v3.
- Revamped the readme:
  - Removed the badges.
  - Added a “Requirements” section.
  - Added information about Deno, import maps, TypeScript config and [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).

## 1.0.0

Initial release.
