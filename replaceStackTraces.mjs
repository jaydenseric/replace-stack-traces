// @ts-check

/**
 * Replaces error stack traces and following Node.js versions at any indent in a
 * multiline string.
 * @param {string} string Multiline string.
 * @param {string} [replacer] String match replacer. Use `$1` at the start of a
 *   string replacer to preserve the original indentation. Defaults to
 *   `"$1<stack trace>"`.
 * @returns {string} The input string with stack traces replaced.
 */
export default function replaceStackTraces(
  string,
  replacer = "$1<stack trace>"
) {
  if (typeof string !== "string")
    throw new TypeError("Argument 1 `string` must be a string.");

  if (typeof replacer !== "string")
    throw new TypeError("Argument 2 `replacer` must be a string.");

  return string.replace(
    // eslint-disable-next-line no-control-regex
    /(^ {2,})at (?:(?!\u001b| \{$).)+(?:\r?\n\1at (?:(?!\u001b| \{$).)+)*(?:\r?\n\r?\n *Node\.js v(?:(?!\u001b|$).)+)?/gmu,
    replacer
  );
}
