import { createSelector } from "reselect";

export const selectQuestions = createSelector(
  [
    state => state.appStatus.currentQuestion,
    state => state.appStatus.isShowByMeaning,
    state => state.word.questions,
    state => state.word.dict
  ],
  (currentQuestion, isShowByMeaning, questions, wordDict) => {
    let question = questions[currentQuestion];
    if (question) {
      question = { ...question };
      if (isShowByMeaning) {
        question.choices = question.choices.map(choice => wordDict[choice]);
      } else {
        question.question = wordDict[question.question];
      }
    }

    return question;
  }
);
