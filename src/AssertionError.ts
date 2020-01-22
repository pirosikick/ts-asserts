export default class AssertionError extends Error {
  name = "AssertionError";

  constructor(message: string, ...args: string[]) {
    super(createMessage(message, ...args));
  }
}

export const createMessage = (message: string, ...args: string[]) => {
  if (!args.length) {
    return message;
  }

  return message
    .split("%s")
    .reduce((output, chunk, i) => {
      if (i === 0) {
        return [chunk];
      } else {
        return [...output, args[i - 1] || "%s", chunk];
      }
    }, [] as string[])
    .join("");
};
