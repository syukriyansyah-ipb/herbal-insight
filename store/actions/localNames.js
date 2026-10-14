import { FETCH_LOCAL_NAMES } from "../types";

export const fetchLocalNames = (localNames) => ({
  type: FETCH_LOCAL_NAMES,
  payload: localNames,
});
