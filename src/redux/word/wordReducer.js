import { ADD_WORDS, SET_QUESTIONS, SET_ANSWER } from "../actionTypes";
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
    case SET_ANSWER:
      return set(
        state,
        `questions.${action.payload.question}.answer`,
        action.payload.answer
      );
    default:
      return state;
  }
};

export default wordReducer;
