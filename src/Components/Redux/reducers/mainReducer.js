import { combineReducers } from "redux";
import citiesReducer from "./citiesReducers";
import itinerariesReducers from "./itinerariesReducers";

const mainReducer = combineReducers({
  Data: citiesReducer,
  itinerariesReducers,
});

export default mainReducer;
