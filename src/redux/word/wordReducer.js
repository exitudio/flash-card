import {
  ADD_WORDS,
  SET_QUESTIONS,
  GOTO_QUESTION,
  SET_ANSWER,
  POST_STAR,
  CLEAR_WORDS
} from "../actionTypes";
import initialState from "../initialState";
import { addWords } from "./wordHelpers";
import { set } from "dot-prop-immutable";

const wordReducer = (state = initialState.word, action) => {
  switch (action.type) {
    case ADD_WORDS:
      return addWords(state, action.payload);
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case GOTO_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload
      };
    case SET_ANSWER:
      return set(
        state,
        `questions.${action.payload.question}.answer`,
        action.payload.answer
      );
    case POST_STAR:
      return set(
        state,
        `dict.${action.payload.word}.star`,
        action.payload.star
      );
    case CLEAR_WORDS:
      return state;
    default:
      return state;
  }
};

export default wordReducer;
