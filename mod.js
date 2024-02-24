// @ts-check

console.debug(
  `You've loaded there main entrypoint for the fp-stdlib library which ` +
    `exports every utlity of this library in a single place. Consider using ` +
    `specific modules to minimize or delay this kind of code loading.`);

export { Option } from "./option.js";
