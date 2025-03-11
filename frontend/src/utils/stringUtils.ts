import { concatWithSeparator } from "@/utils/arrayUtils";

export const formatStringList = strings => concatWithSeparator(strings, " | ", "");

export const parseCommaSeparatedStringToList = (commaSeparatedString: string): string[] => {
  return commaSeparatedString
    .split(",")
    .map(s => s.trim());
};
