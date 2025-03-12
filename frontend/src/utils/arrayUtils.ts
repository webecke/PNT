// Yer a wizard, 'Array!

export function replaceFalsyElements<T>(arr: (T | undefined | null)[], elemToReplaceWith: T): T[] {
  return arr.map(maybeT => !!maybeT ? maybeT as T : elemToReplaceWith);
}
