import { ChangeEvent } from "react";
import { parseCommaSeparatedStringToList } from "@/utils/stringUtils";

export const getOnChangeFunc_ForStringListFormElement = (setStateVariableFunction) => (e: ChangeEvent<HTMLInputElement>) => {
  const newState = parseCommaSeparatedStringToList(e.target.value);
  setStateVariableFunction(newState);
}
