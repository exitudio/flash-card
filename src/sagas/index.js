import { all, call, takeEvery, put, select } from "redux-saga/effects";
import * as ActionTypes from "../redux/actionTypes";
import axios from "axios";
import { addWords, setQuestions, clearWords } from "../redux/word/wordActions";
import sampleSize from "lodash/sampleSize";
import { gotoQuestion } from "../redux/word/wordActions";
import { shuffleArray } from "./helpers";

const num_answer = 5;

function* startQuize() {
  const starCategories = yield select(state => state.appStatus.stars);
  const starDict = yield select(state => state.word.star);
  const allWords = yield select(state => state.word.words);

  const questionWords = Object.keys(starCategories).reduce((words, star) => {
    if (!!starCategories[star]) {
      return words.concat(starDict[star]);
    }
    return words;
  }, []);
  const questionObjects = questionWords.map(word => {
    const obj = {
      question: word,
      choices: sampleSize(allWords, num_answer - 1),
      correctAnswer: Math.floor(Math.random() * num_answer),
      answer: -1,
    };
    while (obj.choices.includes(obj.question)) {
      obj.choices = sampleSize(allWords, num_answer - 1);
    }
    obj.choices.splice(obj.correctAnswer, 0, word);
    return obj;
  });
  shuffleArray(questionObjects);
  yield put(setQuestions(questionObjects));
  yield put(gotoQuestion(0));
}

function* loadWords() {
  yield put(clearWords());
  const data = yield axios.get("/api/getwords");
  const words = data.data.data;
  yield put(addWords(words));
  yield call(startQuize);
}

function* postStarApi({ payload: { word, star } }) {
  yield axios.post("/api/poststar", { word, star });
}

function* appStatus() {
  yield takeEvery(ActionTypes.INIT_APP, loadWords);
  yield takeEvery(ActionTypes.POST_STAR, postStarApi);
  yield takeEvery(ActionTypes.TOGGLE_STAR, loadWords);
}
export default function*() {
  yield all([call(appStatus)]);
}
