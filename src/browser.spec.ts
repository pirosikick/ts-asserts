test("if process.env.DISABLE_TS_ASSERTS is truthy, the assertions are disabled", () => {
  globalThis.DISABLE_TS_ASSERTS = true;
  const asserts = require("./browser");

  expect(() => asserts.assert(false)).not.toThrow();
});
