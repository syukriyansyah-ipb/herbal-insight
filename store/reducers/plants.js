import { FETCH_PLANTS, FETCH_LIMIT_PLANTS } from "../types";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PLANTS:
      return {
        data: action.payload,
      };

    case FETCH_LIMIT_PLANTS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
