// Yer a wizard, 'Array!

type Concatenable<T = any> = string | T[];

export function concatWithSeparator<T extends Concatenable>(arr: T[], separator: T, resultIfEmpty: T): T {
  if (arr == []) {
    return resultIfEmpty;
  }
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result += separator + arr[i];
  }
  return result;
}

export function replaceFalsyElements<T>(arr: (T | undefined | null)[], elemToReplaceWith: T): T[] {
  return arr.map(maybeT => !!maybeT ? maybeT as T : elemToReplaceWith);
}
