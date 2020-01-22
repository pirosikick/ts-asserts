import AssertionError from "./AssertionError";
export { AssertionError };

let enabled = true;

export const enable = () => {
  enabled = true;
};

export const disable = () => {
  enabled = false;
};

export function assert(
  condition: any,
  message?: string,
  ...args: string[]
): asserts condition {
  if (enabled && !condition) {
    throwAssertionError("", [], message, args);
  }
}

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

export function fail(message?: string, ...args: string[]) {
  if (enabled) {
    throwAssertionError("Failure", [], message && `Failure: ${message}`, args);
  }
}

const typeOf = (value: unknown) => {
  if (value instanceof Function) {
    return value.name || "unknown type";
  } else if (value instanceof Object) {
    return value.constructor.name || String(value);
  }
  return value === null ? "null" : typeof value;
};

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
