export function concatWithSeparator(arr: string[], separator: string): string {
  if (arr.length == 0) {
    return "";
  }
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result += separator + arr[i];
  }
  return result;
}

export const formatStringList = (strings: string[]) => concatWithSeparator(strings, " | ");

export const parseCommaSeparatedStringToList = (commaSeparatedString: string): string[] => {
  return commaSeparatedString
    .split(",")
    .map(s => s.trim());
};
