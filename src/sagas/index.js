import { all, call, takeEvery, put, select } from "redux-saga/effects";
import * as ActionTypes from "../redux/actionTypes";
import axios from "axios";
import { addWords, setQuestions } from "../redux/word/wordActions";
import sampleSize from "lodash/sampleSize";
import { gotoQuestion } from "../redux/appStatus/appStatusActions";
import { shuffleArray } from "./helpers";

const num_answer = 5;

function* startQuize() {
  const starCategories = yield select(state => state.appStatus.star);
  const starDict = yield select(state => state.word.star);
  const allWords = yield select(state => state.word.words);

  const questionWords = starCategories.reduce((words, star) => {
    return words.concat(starDict[star]);
  }, []);
  const questionObjects = questionWords.map(word => {
    const obj = {
      question: word,
      choices: sampleSize(allWords, num_answer - 1),
      correctAnswer: -1,
      answer: -1
    };
    obj.correctAnswer = Math.floor(Math.random() * num_answer);
    obj.choices.splice(obj.correctAnswer, 0, word);
    return obj;
  });
  shuffleArray(questionObjects);
  yield put(setQuestions(questionObjects));
  yield put(gotoQuestion(0));
}

function* loadWords() {
  const data = yield axios.get("/api/getwords");
  const words = data.data.data;
  yield put(addWords(words));
  yield call(startQuize);

  // yield axios.post("/api/poststar", {
  //   word: "advocate",
  //   star: 4
  // });
}
function* appStatus() {
  yield takeEvery(ActionTypes.INIT_APP, loadWords);
}
export default function*() {
  yield all([call(appStatus)]);
}
