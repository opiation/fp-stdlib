interface None {
  readonly tag: "None";
}

interface Some<A> {
  readonly tag: "Some";
  readonly value: A;
}

type Option<A> = None | Some<A>;

function some<A>(value: A): Some<A> {
  return Object.freeze({
    tag: "Some",
    value,
  });
}

const none: None = Object.freeze({
  tag: "None",
});

/**
 * Map function `f` onto an {@link Option} of type `A` to produce an `Option` of
 * type `B`, where `f` is a function that given a value of type `A`, produces a
 * value of type `B`.
 *
 * @param f
 * @returns
 */
function map<A, B>(f: (value: A) => B) {
  return (o: Option<A>): Option<B> =>
    o.tag === "Some" ? some(f(o.value)) : none;
}

export { map, none, some };
export type { None, Option, Some };
