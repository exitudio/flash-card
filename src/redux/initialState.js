const initialState = {
  appStatus: {
    isShowByMeaning: true,
    isFlashCard: true,
    star: [-1],
    currentQuestion: 0
  },
  word: {
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
