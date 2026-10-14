import { FETCH_PLANTS, FETCH_LIMIT_PLANTS } from "../types";

export const fetchPlants = (plants) => ({
  type: FETCH_PLANTS,
  payload: plants,
});

export const fetchLimitPlants = (plants) => ({
  type: FETCH_LIMIT_PLANTS,
  payload: plants,
});
