// @ts-check

/**
 * @typedef {{ readonly tag: "None" }} None
 */

/**
 * @template A
 * @typedef {{ readonly tag: "Some", value: A }} Some
 */

/**
 * A utility class to help handle `null` and `undefined` values in a consistent
 * way
 *
 * @template A
 */
export class Option {
  /**
   * @template A
   * @param {ReadonlyArray<Option<A>>} options
   * @return {Option<A>}
   */
  static firstSome(...options) {
    for (const option of options) {
      if (option.isSome()) return option;
    }

    return Option.none;
  }

  /**
   * @template A
   * @param {A | null  | undefined} value
   * @returns {Option<NonNullable<A>>}
   */
  static fromNilable(value) {
    if (value === null || value === undefined) {
      return Option.none;
    } else {
      return Option.some(value);
    }
  }

  /** @returns {Option<any>} */
  static none = new Option({ tag: "None" });

  /**
   * @template A
   * @param {A} value
   * @returns {Option<A>}
   */
  static of(value) {
    return Option.some(value);
  }

  /**
   * @template A
   * @param {A} value
   * @returns {Option<A>}
   */
  static some(value) {
    return new Option({ tag: "Some", value });
  }

  /** @type {Some<A> | None} */
  #value;

  /** @param {Some<A> | None} value */
  constructor(value) {
    this.#value = value;
  }

  /**
   * @template B
   * @param {(value: A)  => Option<B>} f
   * @returns {Option<B>}
   */
  chain(f) {
    switch (this.#value.tag) {
    case "Some": return f(this.#value.value);
    case "None": return /** @type {Option<any>} */(this);
    }
  }

  /**
   * @returns {A}
   * @throws {Error}
   */
  expect() {
    switch (this.#value.tag) {
    case "Some": return this.#value.value;
    case "None": throw new Error("Expected to find something in the Option");
    }
  }

  /**
   * @param {() => A} onNone
   * @returns {A}
   */
  getOrElse(onNone) {
    switch (this.#value.tag) {
    case "Some": return this.#value.value;
    case "None": return onNone();
    }
  }

  /** @returns {boolean} */
  isNone() {
    return this.#value.tag === "None";
  }

  /** @returns {boolean} */
  isSome() {
    return this.#value.tag === "Some";
  }

  /**
   * @template B
   * @param {(value: A) => B} f
   * @returns {Option<B>}
   */
  map(f) {
    switch (this.#value.tag) {
    case "Some": return Option.some(f(this.#value.value));
    case "None": return /** @type {Option<any>} */(this);
    }
  }
}

