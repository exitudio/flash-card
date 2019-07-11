import React, { useState } from "react";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Table } from "antd";
import { selectWords } from "../../selectors/questionSelectors";
import { postStar } from "../../redux/word/wordActions";
import StarsComponent from "../reuseable/StarsComponent";

const ToggleMeaning = ({ data, isShowingMeaningFilter }) => {
  const [isShowingMouse, showMouse] = useState(isShowingMeaningFilter);
  return (
    <div
      style={{ opacity: isShowingMouse || isShowingMeaningFilter ? 100 : 0 }}
      onMouseOver={() => showMouse(true)}
      onMouseOut={() => showMouse(false)}
    >
      {data}
    </div>
  );
};
const columns = [
  {
    title: "Words",
    dataIndex: "word",
    key: "word"
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    key: "meaning",
    filters: [{ text: "Show", value: "show" }],
    render: (data, record) => {
      return (
        <ToggleMeaning
          data={data}
          isShowingMeaningFilter={record.isShowingMeaningFilter}
        />
      );
    }
  },
  {
    title: "Stars",
    dataIndex: "star",
    key: "star",
    render: (data, record) => {
      return (
        <StarsComponent stars={data} word={record.word} action={postStar} />
      );
    }
  }
];
export default function TableWords() {
  const allWords = useSelector(selectWords);
  const vocabType = useSelector(state => state.appStatus.vocabType);
  const stars = useSelector(state => state.appStatus.stars);
  const starStr = Object.keys(stars).reduce((str, starIndex) => {
    if (stars[starIndex]) {
      return `${str}-${starIndex}`;
    }
    return str;
  }, "");

  const [isShowingMeaningFilter, showMeaning] = useState(false);
  const handleChange = (_, { meaning }) => {
    if (meaning) showMeaning(meaning.length > 0);
  };
  const dataSource = allWords.map((word, i) => {
    return {
      key: i,
      word: word.word,
      meaning: word.meaning,
      isShowingMeaningFilter,
      star: word.star
    };
  });
  return (
    <Table
      key={`${vocabType}-${starStr}`}
      dataSource={dataSource}
      columns={columns}
      onChange={handleChange}
      size="small"
    />
  );
}
