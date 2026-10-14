import { FETCH_SYMPTOMS } from "../types";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SYMPTOMS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
