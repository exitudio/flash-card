import { INIT_APP, GOTO_QUESTION, TOGGLE_MODE } from "../actionTypes";
import initialState from "../initialState";

const appStatusReducer = (state = initialState.appStatus, action) => {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state
      };
    case GOTO_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload
      };
    case TOGGLE_MODE:
      return {
        ...state,
        [action.payload]: !state[action.payload]
      };
    default:
      return state;
  }
};

export default appStatusReducer;
