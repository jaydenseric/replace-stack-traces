// @ts-check

import { strictEqual, throws } from "node:assert";
import TestDirector from "test-director";

import replaceStackTraces from "./replaceStackTraces.mjs";

const tests = new TestDirector();

tests.add("`replaceStackTraces` with argument 1 `string` not a string.", () => {
  throws(() => {
    replaceStackTraces(
      // @ts-expect-error Testing invalid.
      true
    );
  }, new TypeError("Argument 1 `string` must be a string."));
});

tests.add(
  "`replaceStackTraces` with argument 2 `replacer` not a string.",
  () => {
    throws(() => {
      replaceStackTraces(
        "",
        // @ts-expect-error Testing invalid.
        true
      );
    }, new TypeError("Argument 2 `replacer` must be a string."));
  }
);

tests.add("`replaceStackTraces` without an error stack trace.", () => {
  const value = `Unrelated.
at Unrelated.
at Unrelated.
Unrelated.`;

  strictEqual(replaceStackTraces(value), value);
});

tests.add(
  "`replaceStackTraces` with an error stack trace, no trailing Node.js version, not extra indented, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

Uncaught Error: Message.
  at Foo (<anonymous>:1:24)
  at <anonymous>:1:50

Unrelated.`),
      `Unrelated.

Uncaught Error: Message.
  <stack trace>

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, no trailing Node.js version, not extra indented, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

\u001b[31mUncaught Error: Message.
  at Foo (<anonymous>:1:24)
  at <anonymous>:1:50\u001b[39m

Unrelated.`),
      `Unrelated.

\u001b[31mUncaught Error: Message.
  <stack trace>\u001b[39m

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, no trailing Node.js version, extra indented, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

Uncaught Error: Message.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50

Unrelated.`),
      `Unrelated.

Uncaught Error: Message.
    <stack trace>

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, no trailing Node.js version, extra indented, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

\u001b[31mUncaught Error: Message.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50\u001b[39m

Unrelated.`),
      `Unrelated.

\u001b[31mUncaught Error: Message.
    <stack trace>\u001b[39m

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, trailing Node.js version, not extra indented, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

Uncaught Error: Message.
  at Foo (<anonymous>:1:24)
  at <anonymous>:1:50

Node.js v17.4.0

Unrelated.`),
      `Unrelated.

Uncaught Error: Message.
  <stack trace>

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, trailing Node.js version, not extra indented, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

\u001b[31mUncaught Error: Message.
  at Foo (<anonymous>:1:24)
  at <anonymous>:1:50

Node.js v17.4.0\u001b[39m

Unrelated.`),
      `Unrelated.

\u001b[31mUncaught Error: Message.
  <stack trace>\u001b[39m

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, trailing Node.js version, extra indented, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

Uncaught Error: Message.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50

Node.js v17.4.0

Unrelated.`),
      `Unrelated.

Uncaught Error: Message.
    <stack trace>

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, trailing Node.js version, extra indented, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated.

\u001b[31mUncaught Error: Message.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50

Node.js v17.4.0\u001b[39m

Unrelated.`),
      `Unrelated.

\u001b[31mUncaught Error: Message.
    <stack trace>\u001b[39m

Unrelated.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, Node.js `MODULE_NOT_FOUND` error, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Error: Cannot find module '<file path>'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:919:15)
    at Function.Module._load (node:internal/modules/cjs/loader:763:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}`),
      `Error: Cannot find module '<file path>'
    <stack trace> {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, Node.js `MODULE_NOT_FOUND` error, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`\u001b[31mError: Cannot find module '<file path>'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:919:15)
    at Function.Module._load (node:internal/modules/cjs/loader:763:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:76:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}\u001b[39m`),
      `\u001b[31mError: Cannot find module '<file path>'
    <stack trace> {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}\u001b[39m`
    );
  }
);

tests.add(
  "`replaceStackTraces` with multiple error stack traces, different indents, no ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated 1.

Uncaught Error: Message 1.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50

Unrelated 2.

    Uncaught Error: Message 2.
        at Foo (<anonymous>:1:24)
        at <anonymous>:1:50

    Unrelated 3.`),
      `Unrelated 1.

Uncaught Error: Message 1.
    <stack trace>

Unrelated 2.

    Uncaught Error: Message 2.
        <stack trace>

    Unrelated 3.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with multiple error stack traces, different indents, ANSI escape sequences.",
  () => {
    strictEqual(
      replaceStackTraces(`Unrelated 1.

\u001b[31mUncaught Error: Message 1.
    at Foo (<anonymous>:1:24)
    at <anonymous>:1:50\u001b[39m

Unrelated 2.

    \u001b[31mUncaught Error: Message 2.
        at Foo (<anonymous>:1:24)
        at <anonymous>:1:50\u001b[39m

    Unrelated 3.`),
      `Unrelated 1.

\u001b[31mUncaught Error: Message 1.
    <stack trace>\u001b[39m

Unrelated 2.

    \u001b[31mUncaught Error: Message 2.
        <stack trace>\u001b[39m

    Unrelated 3.`
    );
  }
);

tests.add(
  "`replaceStackTraces` with an error stack trace, custom replacer.",
  () => {
    strictEqual(
      replaceStackTraces(
        `Unrelated.

Uncaught Error: Message.
  at Foo (<anonymous>:1:24)
  at <anonymous>:1:50

Unrelated.`,
        "$1custom\n$1replacement"
      ),
      `Unrelated.

Uncaught Error: Message.
  custom
  replacement

Unrelated.`
    );
  }
);

tests.run();
