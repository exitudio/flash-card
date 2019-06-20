import * as ActionTypes from "../actionTypes";

export function initializeApp() {
  return { type: ActionTypes.INIT_APP };
}

export function toggleMode(mode) {
  return { type: ActionTypes.TOGGLE_MODE, payload: mode };
}

export function toggleStar(star) {
  return { type: ActionTypes.TOGGLE_STAR, payload: star };
}