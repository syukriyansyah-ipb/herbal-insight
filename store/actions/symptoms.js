import { FETCH_SYMPTOMS } from "../types";

export const fetchSymptoms = (symptoms) => ({
  type: FETCH_SYMPTOMS,
  payload: symptoms,
});
