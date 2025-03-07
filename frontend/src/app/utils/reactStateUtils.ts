import { ChangeEvent } from "react";
import { parseCommaSeparatedStringToList } from "@/app/utils/stringUtils";

export const getOnChangeFunc_ForStringListFormElement = (setStateVariableFunction) => (e: ChangeEvent<HTMLInputElement>) => {
  const newState = parseCommaSeparatedStringToList(e.target.value);
  setStateVariableFunction(newState);
}
