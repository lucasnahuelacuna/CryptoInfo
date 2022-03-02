import { combineReducers } from "redux";
import newsReducer from "./news";
import coinsReducer from "./coins";

export default combineReducers({
    coins: coinsReducer,
    news: newsReducer
})