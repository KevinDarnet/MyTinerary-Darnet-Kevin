import { combineReducers } from "redux";
import citiesReducer from "./citiesReducers";


const mainReducer = combineReducers({

    Data:citiesReducer

})

export default mainReducer