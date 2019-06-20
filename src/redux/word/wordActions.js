import * as ActionTypes from "../actionTypes";

export function addWords(words) {
  return { type: ActionTypes.ADD_WORDS, payload: words };
}

export function setQuestions(questions) {
  return { type: ActionTypes.SET_QUESTIONS, payload: questions };
}

export function gotoQuestion(questionNum) {
  return { type: ActionTypes.GOTO_QUESTION, payload: questionNum };
}

export function setAnswer(question, answer) {
  return { type: ActionTypes.SET_ANSWER, payload: { question, answer } };
}

export function postStar(star, word) {
  return { type: ActionTypes.POST_STAR, payload: { star, word } };
}

export function clearWords() {
  return { type: ActionTypes.CLEAR_WORDS };
}
