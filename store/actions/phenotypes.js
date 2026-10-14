import { FETCH_PHENOTYPES } from "../types";

export const fetchPhenotypes = (phenotypes) => ({
    type: FETCH_PHENOTYPES,
    payload: phenotypes,
  });