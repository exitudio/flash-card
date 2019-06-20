import { combineReducers } from "redux";
import appStatus from "./appStatus/appStatusReducer";
import word from "./word/wordReducer";

const rootReducer = combineReducers({
  appStatus,
  word
});

export default rootReducer;
