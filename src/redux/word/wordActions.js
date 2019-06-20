import * as ActionTypes from "../actionTypes";

export function addWords(words) {
  return { type: ActionTypes.ADD_WORDS, payload: words };
}

export function setQuestions(questions) {
  return { type: ActionTypes.SET_QUESTIONS, payload: questions };
}

export function setAnswer(question, answer) {
  return { type: ActionTypes.SET_ANSWER, payload: { question, answer } };
}
