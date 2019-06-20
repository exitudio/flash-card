import { createSelector } from "reselect";

export const selectQuestions = createSelector(
  [
    state => state.appStatus.isShowByMeaning,
    state => state.word.currentQuestion,
    state => state.word.questions,
    state => state.word.dict
  ],
  (isShowByMeaning, currentQuestion, questions, wordDict) => {
    let question = questions[currentQuestion];
    if (question) {
      question = { ...question };
      question.star = wordDict[question.question].star
      question.key = question.question;
      if (isShowByMeaning) {
        question.choices = question.choices.map(
          choice => wordDict[choice].meaning
        );
      } else {
        question.question = wordDict[question.question].meaning;
      }
    }
    return question;
  }
);

export const selectWords = createSelector(
  [state => state.word.questions, state => state.word.dict],
  (questions, dict) => {
    const allWords = questions.map(question => ({
      word: question.question,
      ...dict[question.question]
    }));
    return allWords;
  }
);
