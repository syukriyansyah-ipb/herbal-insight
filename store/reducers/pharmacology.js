import { FETCH_PHARMACOLOGY, MESSAGE_PHARMACOLOGY } from "../types";

const initialState = {
  data: {},
  message: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PHARMACOLOGY:
      return {
        ...state,
        data: action.payload,
      };

    case MESSAGE_PHARMACOLOGY:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
}
