import * as ActionTypes from "../actionTypes";

export function initializeApp() {
  return { type: ActionTypes.INIT_APP };
}

export function gotoQuestion(questionNum) {
  return { type: ActionTypes.GOTO_QUESTION, payload: questionNum };
}

export function toggleMode(mode) {
  return { type: ActionTypes.TOGGLE_MODE, payload: mode };
}
