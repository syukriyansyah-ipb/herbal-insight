import { FETCH_COMMON_NAMES } from "../types";

export const fetchCommonNames = (commonNames) => ({
  type: FETCH_COMMON_NAMES,
  payload: commonNames,
});
