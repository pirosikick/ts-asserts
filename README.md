# @cybozu/ts-asserts

[![npm version](https://badge.fury.io/js/%40cybozu%2Fts-asserts.svg)](https://badge.fury.io/js/%40cybozu%2Fts-asserts)
[![CI](https://github.com/cybozu/ts-asserts/workflows/CI/badge.svg)](https://github.com/cybozu/ts-asserts/actions)
[![codecov](https://codecov.io/gh/cybozu/ts-asserts/branch/master/graph/badge.svg)](https://codecov.io/gh/cybozu/ts-asserts)

Assertion Library with [TS 3.7 Assertion Function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)

## Motivation

- Wanted an alternative to [goog.asserts](https://google.github.io/closure-library/api/goog.asserts.html) in TypeScript

## Installation

```console
# npm
$ npm install @cybozu/ts-asserts

# yarn
$ yarn add @cybozu/ts-asserts
```

## Usage

In bellow example, if `typeof value === number` is true, TypeScript assumes `value` is number type after `assert` is called. If not, `assert` throws `AssertionError`.

```ts
import { assert } from "@cybozu/ts-asserts";

function unknownToNumber(value: unknown): number {
  assert(typeof value === "number");
  return value;
}
```

If you want to use a custom error message, you can provide the message to 2nd argument of `assert`. `%s` in a custom error message is replaced to 3rd and subsequent arguments.

```ts
assert(type value === 'number', "value isn't number");
assert(type value === 'number', "value isn't %s: %s", "number", String(value));
```

Besides `assert`, `@cybozu/ts-asserts` has several assertion functions:

- `assertArray(value: unknown, message?: string, ...args: string[])`
- `assertBoolean(value: unknown, message?: string, ...args: string[])`
- `assertNumber(value: unknown, message?: string, ...args: string[])`
- `assertFinite(value: unknown, message?: string, ...args: string[])`
- `assertFunction(value: unknown, message?: string, ...args: string[])`
- `assertExists(value: unknown, message?: string, ...args: string[])`
- `assertInstanceOf(value: unknown, type: T, message?: string, ...string[])`
- `assetObject(value: unknown, message?: string, ...args: string[])`
- `fail(message?: string, ...args: string[])`

### Disable the assertions

To disable the assertions, you can use the `DISABLE_TS_ASSERTS` environment variable.

The below command line is the example which disables the assertions of ts-asserts in Node.js:

```console
$ DISABLE_TS_ASSERT=1 node something.js
```

In webpack, [`DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) is suitable:

```js
new webpack.DefinePlugin({
  DISABLE_TS_ASSERTS: true
});
```

If you want to disable/enable assertion programmatically, you can use `disable()` or `enable()`.

```ts
import { disable, enable } from "@cybozu/ts-asserts";

disable();

// ...Assertion functions never throw an error.

enable();

// ...Assertion functions throw an error.
```

## License

[MIT](./LICENSE)
