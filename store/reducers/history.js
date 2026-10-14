import { POPULATE_HISTORY } from "../types";

const getHistory = () => {
  if (typeof window !== "undefined") {
    const storedHistory = localStorage.getItem("history");
    return storedHistory ? JSON.parse(storedHistory) : [];
  }
  return [];
};

const initialState = getHistory();

export default function (state = initialState, action) {
  switch (action.type) {
    case POPULATE_HISTORY:
      return action.payload;

    default:
      return state;
  }
}
