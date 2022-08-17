# replace-stack-traces changelog

## Next

### Major

- Updated Node.js support to `^14.17.0 || ^16.0.0 || >= 18.0.0`.

### Patch

- Updated dev dependencies.
- Updated `jsconfig.json`:
  - Set `compilerOptions.maxNodeModuleJsDepth` to `10`.
  - Set `compilerOptions.module` to `nodenext`.
- Updated GitHub Actions CI config:
  - Run tests with Node.js v14, v16, v18.
  - Updated `actions/checkout` to v3.
  - Updated `actions/setup-node` to v3.
- Revamped the readme:
  - Removed the badges.
  - Added a “Requirements” section.
  - Added information about TypeScript config and [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design).

## 1.0.0

Initial release.
