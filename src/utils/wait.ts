export const wait = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
