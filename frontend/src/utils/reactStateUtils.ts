import { ChangeEvent } from "react";
import { parseCommaSeparatedStringToList } from "@/utils/stringUtils";

export function getOnChangeFunc_ForStringListFormElement(setStateVariableFunction: (strList: string[]) => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const newState = parseCommaSeparatedStringToList(e.target.value);
    setStateVariableFunction(newState);
  };
}
