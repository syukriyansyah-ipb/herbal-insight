import { POPULATE_HISTORY } from "../types";

export const populateHistory = (history = {}) => ({
    type: POPULATE_HISTORY,
    payload: history,
})