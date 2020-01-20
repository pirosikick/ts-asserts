import * as asserts from "./";

beforeEach(() => {
  asserts.enable();
});

test("assert", () => {
  expect(() => asserts.assert(true)).not.toThrow();
  expect(() => asserts.assert(false)).toThrow(asserts.AssertionError);
});

test("assertArray", () => {
  expect(() => asserts.assertArray([])).not.toThrow();
  expect(() => asserts.assertArray("not array")).toThrow(
    asserts.AssertionError
  );
});

test("assertBoolean", () => {
  expect(() => asserts.assertBoolean(true)).not.toThrow();
  expect(() => asserts.assertBoolean(false)).not.toThrow();
  expect(() => asserts.assertBoolean("not boolean")).toThrow(
    asserts.AssertionError
  );
});

test("assertString", () => {
  expect(() => asserts.assertString("")).not.toThrow();
  expect(() => asserts.assertString(true)).toThrow(asserts.AssertionError);
});

test("assertNumber", () => {
  expect(() => asserts.assertNumber(0)).not.toThrow();
  expect(() => asserts.assertNumber(NaN)).not.toThrow();
  expect(() => asserts.assertNumber(Infinity)).not.toThrow();
  expect(() => asserts.assertNumber(-Infinity)).not.toThrow();
  expect(() => asserts.assertNumber(true)).toThrow(asserts.AssertionError);
});

test("assertFinite", () => {
  expect(() => asserts.assertFinite(0)).not.toThrow();
  expect(() => asserts.assertFinite(NaN)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertFinite(Infinity)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertFinite(-Infinity)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertFinite(true)).toThrow(asserts.AssertionError);
});

test("assertFunction", () => {
  expect(() => asserts.assertFunction(() => {})).not.toThrow();
  expect(() => asserts.assertFunction(function() {})).not.toThrow();
  expect(() => asserts.assertFunction(true)).toThrow(asserts.AssertionError);
});

test("assertExists", () => {
  expect(() => asserts.assertExists(true)).not.toThrow();
  expect(() => asserts.assertExists(undefined)).toThrow(asserts.AssertionError);
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
    asserts.AssertionError
  );
});

test("assertObject", () => {
  expect(() => asserts.assertObject({})).not.toThrow();
  expect(() => asserts.assertObject(null)).toThrow(asserts.AssertionError);
  expect(() => asserts.assertObject(true)).toThrow(asserts.AssertionError);
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
  });
});
