import { FETCH_PHENOTYPES } from "../types";

const initialState = {
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PHENOTYPES:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
