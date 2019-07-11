const initialState = {
  appStatus: {
    isShowByMeaning: true,
    isFlashCard: false,
    stars: {
      [-1]: false,
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: true
    },
    currentStar:5,
    vocabType:"gre1"
  },
  word: {
    currentQuestion: 0,
    words: [],
    dict: {},
    star: {
      [-1]: [],
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    },
    questions: []
  }
};
export default initialState;
