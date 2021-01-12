/* eslint-disable @typescript-eslint/no-empty-function */
import * as asserts from "./asserts";

beforeEach(() => {
  asserts.enable();
});

test("assert", () => {
  expect(() => asserts.assert(true)).not.toThrow();
  expect(() => asserts.assert(false)).toThrow(new asserts.AssertionError(""));
});

test("assertArray", () => {
  expect(() => asserts.assertArray([])).not.toThrow();
  expect(() => asserts.assertArray("not array")).toThrow(
    new asserts.AssertionError(
      "Expected array but got %s: %s",
      "string",
      "not array"
    )
  );
});

test("assertBoolean", () => {
  expect(() => asserts.assertBoolean(true)).not.toThrow();
  expect(() => asserts.assertBoolean(false)).not.toThrow();
  expect(() => asserts.assertBoolean("not boolean")).toThrow(
    new asserts.AssertionError(
      "Expected boolean but got %s: %s",
      "string",
      "not boolean"
    )
  );
});

test("assertString", () => {
  expect(() => asserts.assertString("")).not.toThrow();
  expect(() => asserts.assertString(true)).toThrow(
    new asserts.AssertionError(
      "Expected string but got %s: %s",
      "boolean",
      "true"
    )
  );
});

test("assertNumber", () => {
  expect(() => asserts.assertNumber(0)).not.toThrow();
  expect(() => asserts.assertNumber(NaN)).not.toThrow();
  expect(() => asserts.assertNumber(Infinity)).not.toThrow();
  expect(() => asserts.assertNumber(-Infinity)).not.toThrow();
  expect(() => asserts.assertNumber(true)).toThrow(
    new asserts.AssertionError(
      "Expected number but got %s: %s",
      "boolean",
      "true"
    )
  );
});

test("assertFinite", () => {
  expect(() => asserts.assertFinite(0)).not.toThrow();
  expect(() => asserts.assertFinite(NaN)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertFinite(Infinity)).toThrow(
    new asserts.AssertionError(
      "Expected finite number but got %s: %s",
      "number",
      "Infinity"
    )
  );
  expect(() => asserts.assertFinite(-Infinity)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertFinite(true)).toThrow(asserts.AssertionError);
});

test("assertFunction", () => {
  expect(() => asserts.assertFunction(() => {})).not.toThrow();
  expect(() => asserts.assertFunction(function() {})).not.toThrow();
  expect(() => asserts.assertFunction(true)).toThrow(
    new asserts.AssertionError(
      "Expected function but got %s: %s",
      "boolean",
      "true"
    )
  );
});

test("assertExists", () => {
  expect(() => asserts.assertExists(true)).not.toThrow();
  expect(() => asserts.assertExists(undefined)).toThrow(
    new asserts.AssertionError("Expected to exist: %s", "undefined")
  );
  expect(() => asserts.assertExists(null)).toThrow(asserts.AssertionError);
});

test("assertInstanceOf", () => {
  class Parent {}
  class Child extends Parent {}
  const p = new Parent();
  const c = new Child();

  expect(() => asserts.assertInstanceOf(c, Child)).not.toThrow();
  expect(() => asserts.assertInstanceOf(c, Parent)).not.toThrow();
  expect(() => asserts.assertInstanceOf(p, Child)).toThrow(
    new asserts.AssertionError(
      "Expected instance of %s but got %s",
      "Child",
      "Parent"
    )
  );
});

test("assertObject", () => {
  expect(() => asserts.assertObject({})).not.toThrow();
  expect(() => asserts.assertObject(null)).toThrow(
    new asserts.AssertionError("Expected object but got %s: %s", "null", "null")
  );
  expect(() => asserts.assertObject(true)).toThrow(asserts.AssertionError);
});

test("fail", () => {
  expect(() => asserts.fail()).toThrow(new asserts.AssertionError("Failure"));
});

describe("disable", () => {
  beforeEach(() => {
    asserts.disable();
  });

  describe("After disable() called, assert functions don't throw an error", () => {
    test("assert", () => {
      expect(() => asserts.assert(false)).not.toThrow();
    });

    test("assertArray", () => {
      expect(() => asserts.assertArray("not array")).not.toThrow();
    });

    test("assertBoolean", () => {
      expect(() => asserts.assertBoolean("not boolean")).not.toThrow();
    });

    test("assertString", () => {
      expect(() => asserts.assertString(true)).not.toThrow();
    });

    test("assertNumber", () => {
      expect(() => asserts.assertNumber(true)).not.toThrow();
    });

    test("assertFinite", () => {
      expect(() => asserts.assertFinite(NaN)).not.toThrow();
    });

    test("assertFunction", () => {
      expect(() => asserts.assertFunction(true)).not.toThrow();
    });

    test("assertExists", () => {
      expect(() => asserts.assertExists(undefined)).not.toThrow();
    });

    test("assertInstanceOf", () => {
      expect(() => asserts.assertInstanceOf({}, Function)).not.toThrow();
    });

    test("assetObject", () => {
      expect(() => asserts.assertObject(true)).not.toThrow();
    });

    test("fail", () => {
      expect(() => asserts.fail()).not.toThrow();
    });
  });
});

describe("custom error message", () => {
  expect(() => asserts.assert(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertArray(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertBoolean("", "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertString(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertNumber(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertFinite(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertFunction(false, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.assertExists(undefined, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() =>
    asserts.assertInstanceOf("", Object, "hello, %s", "world")
  ).toThrow("hello, world");
  expect(() => asserts.assertObject(null, "hello, %s", "world")).toThrow(
    "hello, world"
  );
  expect(() => asserts.fail("hello, %s", "world")).toThrow(
    "Failure: hello, world"
  );
});
