import * as asserts from "./";

export const unknownToNumber1 = (value: unknown): number => {
  asserts.assert(typeof value === "number");
  return value;
};

export const unknownToArray = (value: unknown): Array<unknown> => {
  asserts.assertArray(value);
  return value;
};

export const unknownToBoolean = (value: unknown): boolean => {
  asserts.assertBoolean(value);
  return value;
};

export const unknownToString = (value: unknown): string => {
  asserts.assertString(value);
  return value;
};

export const unknownToNumber2 = (value: unknown): number => {
  asserts.assertNumber(value);
  return value;
};

export const unknownToFinite = (value: unknown): number => {
  asserts.assertFinite(value);
  return value;
};

export const unknownToFunction = (value: unknown): Function => {
  asserts.assertFunction(value);
  return value;
};

// test for assertExists
export const optionalStringToRequired = (
  value: string | undefined | null
): string => {
  asserts.assertExists(value);
  return value;
};

// test for assertInstanceOf
class Hoge {}

export const unknownToHogeInstance = (value: unknown): Hoge => {
  asserts.assertInstanceOf(value, Hoge);
  return value;
};
