import { FETCH_ETHNICS } from "../types";

export const fetchEthnics = (ethnics) => ({
    type: FETCH_ETHNICS,
    payload: ethnics,
  });