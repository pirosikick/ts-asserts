declare var DISABLE_TS_ASSERTS: any;

export * from "./asserts";

import { disable } from "./asserts";
if (DISABLE_TS_ASSERTS) {
  disable();
}
