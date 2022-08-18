# replace-stack-traces

A JavaScript function to replace error stack traces and following Node.js versions at any indent in a multiline string.

Useful for snapshot testing CLI stderr output containing error stack traces, because:

- Different Node.js versions generate different error stack traces, and v17.0.0+ appends the Node.js version if the error caused the process to exit.
- Editing modules that affect the line and column numbers, etc. in the error stack traces requires the snapshots to be updated annoyingly often.

## Installation

For [Node.js](https://nodejs.org), to install [`replace-stack-traces`](https://npm.im/replace-stack-traces) with [npm](https://npmjs.com/get-npm), run:

```sh
npm install replace-stack-traces
```

For [Deno](https://deno.land), an example import map:

```json
{
  "imports": {
    "replace-stack-traces": "https://unpkg.com/replace-stack-traces@2.0.0/replaceStackTraces.mjs"
  }
}
```

Then, import and use the function [`replaceStackTraces`](./replaceStackTraces.mjs).

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `^14.17.0 || ^16.0.0 || >= 18.0.0`.
- [Deno](https://deno.land).

Non [Deno](https://deno.land) projects must configure [TypeScript](https://typescriptlang.org) to use types from the ECMAScript modules that have a `// @ts-check` comment:

- [`compilerOptions.allowJs`](https://typescriptlang.org/tsconfig#allowJs) should be `true`.
- [`compilerOptions.maxNodeModuleJsDepth`](https://typescriptlang.org/tsconfig#maxNodeModuleJsDepth) should be reasonably large, e.g. `10`.
- [`compilerOptions.module`](https://typescriptlang.org/tsconfig#module) should be `"node16"` or `"nodenext"`.

## Exports

The [npm](https://npmjs.com) package [`replace-stack-traces`](https://npm.im/replace-stack-traces) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). These ECMAScript modules are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`replaceStackTraces.mjs`](./replaceStackTraces.mjs)
