test("if process.env.DISABLE_TS_ASSERTS is truthy, the assertions are disabled", () => {
  process.env.DISABLE_TS_ASSERTS = "1";
  const asserts = require("./node");

  expect(() => asserts.assert(false)).not.toThrow();
});
