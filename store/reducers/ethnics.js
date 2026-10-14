import { FETCH_ETHNICS } from "../types";

const initialState = {
    data: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case FETCH_ETHNICS:
        return {
          ...state,
          data: action.payload,
        };
  
      default:
        return state;
    }
  }
  