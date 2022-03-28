import { ITINERARIES_GET } from "../actions/types";

const initialState = {
  itineraries: [],
  aux: [],
};

const itinerariesReducers = (state = initialState, action) => {
  switch (action.type) {
    case ITINERARIES_GET:
      return {
        ...state,
        itineraries: action.payload,
      };
    default:
      return state;
  }
};

export default itinerariesReducers;
