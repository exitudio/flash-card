import {
  INIT_APP,
  TOGGLE_MODE,
  TOGGLE_STAR,
  CHANGE_VOCAB_TYPE
} from "../actionTypes";
import initialState from "../initialState";
import { toggle } from "dot-prop-immutable";

const appStatusReducer = (state = initialState.appStatus, action) => {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state
      };
    case TOGGLE_MODE:
      return {
        ...state,
        [action.payload]: !state[action.payload]
      };
    case TOGGLE_STAR:
      return toggle(state, `stars.${action.payload}`);
    case CHANGE_VOCAB_TYPE:
      return { ...state, vocabType: action.payload };
    default:
      return state;
  }
};

export default appStatusReducer;
