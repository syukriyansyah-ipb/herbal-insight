import { FETCH_PHARMACOLOGY, MESSAGE_PHARMACOLOGY } from "../types";

export const messagePharmacology = (message) => ({
  type: MESSAGE_PHARMACOLOGY,
  payload: message,
});

export const fetchPharmacology = (pharmacology) => ({
  type: FETCH_PHARMACOLOGY,
  payload: pharmacology,
});
