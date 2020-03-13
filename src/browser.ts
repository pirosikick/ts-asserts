declare var DISABLE_TS_ASSERTS: any;

export * from "./asserts";

import { disable } from "./asserts";
if (typeof DISABLE_TS_ASSERTS !== "undefined" && !!DISABLE_TS_ASSERTS) {
  disable();
}
