import AssertionError from "./AssertionError";
export { AssertionError };

let enabled = true;

/**
 * Enables assertion
 */
export const enable = () => {
  enabled = true;
};

/**
 * Disables assertion
 */
export const disable = () => {
  enabled = false;
};

/**
 * Checks if `condition` is truthy.
 *
 * @param {any} condition - The condition to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assert(
  condition: any,
  message?: string,
  ...args: string[]
): asserts condition {
  if (enabled && !condition) {
    throwAssertionError("", [], message, args);
  }
}

/**
 * Checks if `value` is an array of something.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertArray(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is Array<unknown> {
  if (enabled && !Array.isArray(value)) {
    throwAssertionError(
      "Expected array but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is a boolean.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertBoolean(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is boolean {
  if (enabled && typeof value !== "boolean") {
    throwAssertionError(
      "Expected boolean but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is a string.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertString(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is string {
  if (enabled && typeof value !== "string") {
    throwAssertionError(
      "Expected string but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is a number.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertNumber(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is number {
  if (enabled && typeof value !== "number") {
    throwAssertionError(
      "Expected number but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is a finite number.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertFinite(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is number {
  if (enabled && !(typeof value === "number" && isFinite(value))) {
    throwAssertionError(
      "Expected finite number but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is a function.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertFunction(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is Function {
  if (enabled && typeof value !== "function") {
    throwAssertionError(
      "Expected function but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` isn't undefined or null.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertExists<T>(
  value: T,
  message?: string,
  ...args: string[]
): asserts value is NonNullable<T> {
  if (enabled && (typeof value === "undefined" || value === null)) {
    throwAssertionError(
      "Expected to exist: %s",
      [String(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is an instance of `type`.
 *
 * @param {unknown} value - The value to check
 * @param {any} type - The class to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertInstanceOf<
  T extends { new (...args: any[]): InstanceType<T> }
>(
  value: unknown,
  type: T,
  message?: string,
  ...args: string[]
): asserts value is InstanceType<T> {
  if (enabled && !(value instanceof type)) {
    throwAssertionError(
      "Expected instance of %s but got %s",
      [typeOf(type), typeOf(value)],
      message,
      args
    );
  }
}

/**
 * Checks if `value` is an object.
 *
 * @param {unknown} value - The value to check
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function assertObject(
  value: unknown,
  message?: string,
  ...args: string[]
): asserts value is { [key: string]: unknown } {
  if (enabled && !(typeof value === "object" && value !== null)) {
    throwAssertionError(
      "Expected object but got %s: %s",
      [typeOf(value), String(value)],
      message,
      args
    );
  }
}

/**
 * Throws `AssertionError`.
 *
 * @param {string=} message - Error message
 * @param {..string} args - Strings to replace "%s" in `message`
 */
export function fail(message?: string, ...args: string[]) {
  if (enabled) {
    throwAssertionError("Failure", [], message && `Failure: ${message}`, args);
  }
}

/**
 * Gets `value`'s type as string
 *
 * @private
 * @param {unknown} value
 * @returns {string}
 */
const typeOf = (value: unknown) => {
  if (value instanceof Function) {
    return value.name || "unknown type";
  } else if (value instanceof Object) {
    return value.constructor.name || String(value);
  }
  return value === null ? "null" : typeof value;
};

/**
 * Throws `AssertionError` with `message` and `args`.
 * If `message` isn't set, `defaultMessage` and `defaultArgs` is used.
 *
 * @private
 * @param {string} defaultMessage
 * @param {Array<string>} defaultArgs
 * @param {string=} message
 * @param {Array<string>=} args
 */
const throwAssertionError = (
  defaultMessage: string,
  defaultArgs: string[],
  message?: string,
  args?: string[]
) => {
  if (message) {
    throw new AssertionError(message, ...(args || []));
  } else {
    throw new AssertionError(defaultMessage, ...defaultArgs);
  }
};
