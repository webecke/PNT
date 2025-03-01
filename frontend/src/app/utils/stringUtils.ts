import { concatWithSeparator } from "@/app/utils/arrayUtils";

export const formatStringList = strings => concatWithSeparator(strings, " | ", "");
