import { FETCH_SCIENTIFIC_NAMES } from "../types";

export const fetchScientificNames = (scientific) => ({
    type: FETCH_SCIENTIFIC_NAMES,
    payload: scientific
})