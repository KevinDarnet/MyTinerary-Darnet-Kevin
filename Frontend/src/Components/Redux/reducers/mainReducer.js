import { combineReducers } from "redux";
import citiesReducer from "./citiesReducers";
import itinerariesReducers from "./itinerariesReducers";
import userReducer from "./userReducer";
import activitiesReducer from "./activitiesReducer";

const mainReducer = combineReducers({
  Data: citiesReducer,
  itinerariesReducers,
  userReducer,
  activitiesReducer,
});

export default mainReducer;
