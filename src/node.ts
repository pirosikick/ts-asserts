export * from "./asserts";

import { disable } from "./asserts";
if (process.env.DISABLE_TS_ASSERTS) {
  disable();
}
