import { combineReducers } from "redux";
import citiesReducer from "./citiesReducers";
import itinerariesReducers from "./itinerariesReducers";
import userReducer from "./userReducer";
const mainReducer = combineReducers({
  Data: citiesReducer,
  itinerariesReducers,
  userReducer,
});

export default mainReducer;
