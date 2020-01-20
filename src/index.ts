import AssertionError from "./AssertionError";
export { AssertionError };

let enabled = true;

export const enable = () => {
  enabled = true;
};

export const disable = () => {
  enabled = false;
};

export function assert(condition: any): asserts condition {
  if (enabled && !condition) {
    throw new AssertionError();
  }
}

export function assertArray(value: unknown): asserts value is Array<unknown> {
  if (enabled && !Array.isArray(value)) {
    throw new AssertionError();
  }
}

export function assertBoolean(value: unknown): asserts value is boolean {
  if (enabled && typeof value !== "boolean") {
    throw new AssertionError();
  }
}

export function assertString(value: unknown): asserts value is string {
  if (enabled && typeof value !== "string") {
    throw new AssertionError();
  }
}

export function assertNumber(value: unknown): asserts value is number {
  if (enabled && typeof value !== "number") {
    throw new AssertionError();
  }
}

export function assertFinite(value: unknown): asserts value is number {
  if (enabled && !(typeof value === "number" && isFinite(value))) {
    throw new AssertionError();
  }
}

export function assertFunction(value: unknown): asserts value is Function {
  if (enabled && typeof value !== "function") {
    throw new AssertionError();
  }
}

export function assertExists<T>(value: T): asserts value is NonNullable<T> {
  if (enabled && (typeof value === "undefined" || value === null)) {
    throw new AssertionError();
  }
}

export function assertInstanceOf<
  T extends { new (...args: any[]): InstanceType<T> }
>(value: unknown, type: T): asserts value is InstanceType<T> {
  if (enabled && !(value instanceof type)) {
    throw new AssertionError();
  }
}

export function assertObject(
  value: unknown
): asserts value is { [key: string]: unknown } {
  if (enabled && !(typeof value === "object" && value !== null)) {
    throw new AssertionError();
  }
}
