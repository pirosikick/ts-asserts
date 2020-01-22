import AssertionError, { createMessage } from "./AssertionError";

describe("AssetionError", () => {
  let err;
  beforeEach(() => {
    err = new AssertionError("hello, %s", "world");
  });

  test("err.name === 'AssertionError'", () => {
    expect(err.name).toBe("AssertionError");
  });

  test("err.message", () => {
    expect(err.message).toBe("hello, world");
  });
});

describe("createMessage", () => {
  test.each([
    // [testcase title, message, args, expected]
    ["message only", "hello", [], "hello"],
    ["message & args", "hello, %s", ["world"], "hello, world"],
    [
      "message & not enough args",
      "hello, %s and %s",
      ["world"],
      "hello, world and %s"
    ],
    [
      "message & too many args",
      "hello, %s",
      ["world", "1", "2"],
      "hello, world"
    ]
  ])(
    "%s",
    (title: string, message: string, args: string[], expected: string) => {
      expect(createMessage(message, ...args)).toBe(expected);
    }
  );
});
