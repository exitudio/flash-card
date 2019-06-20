import cloneDeep from "lodash/cloneDeep";
export function addWords(wordState, words) {
  const _wordState = cloneDeep(wordState);
  words.forEach(word => {
    const wordObject = _wordState.dict[word.word];
    _wordState.dict[word.word] = {
      meaning: word.meaning,
      star: word.star
    };
    if (!wordObject) {
      _wordState.words.push(word.word);
      _wordState.star[word.star].push(word.word);
    }
  });
  return _wordState;
}
