# replace-stack-traces

[![npm version](https://badgen.net/npm/v/replace-stack-traces)](https://npm.im/replace-stack-traces) [![CI status](https://github.com/jaydenseric/replace-stack-traces/workflows/CI/badge.svg)](https://github.com/jaydenseric/replace-stack-traces/actions)

A JavaScript function to replace error stack traces and following Node.js versions at any indent in a multiline string.

Useful for snapshot testing CLI stderr output containing error stack traces, because:

- Different Node.js versions generate different error stack traces, and v17.0.0+ appends the Node.js version if the error caused the process to exit.
- Editing modules that affect the line and column numbers, etc. in the error stack traces requires the snapshots to be updated annoyingly often.

## Installation

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install replace-stack-traces
```

## Exports

These ECMAScript modules are published to [npm](https://npmjs.com) and exported via the [`package.json`](./package.json) `exports` field:

- [`replaceStackTraces.mjs`](./replaceStackTraces.mjs)
