import React, { useState } from "react";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Table } from "antd";
import { selectWords } from "../../selectors/questionSelectors";
import { postStar } from "../../redux/word/wordActions";
import StarsComponent from "../reuseable/StarsComponent";

const ToggleMeaning = ({ data, isHidingMeaning }) => {
  const [isHideMouse, hideMouse] = useState(true);
  return (
    <div
      style={{ opacity: isHidingMeaning && isHideMouse ? 0 : 100 }}
      onMouseOver={() => hideMouse(false)}
      onMouseOut={() => hideMouse(true)}
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
    filters: [{ text: "Hide", value: "hide" }],
    render: (data, record) => {
      return (
        <ToggleMeaning data={data} isHidingMeaning={record.isHidingMeaning} />
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
  const [isHidingMeaning, hideMeaning] = useState(true);
  const handleChange = (_, { meaning }) => {
    if (meaning) hideMeaning(meaning.length > 0);
  };
  const dataSource = allWords.map((word, i) => {
    return {
      key: i,
      word: word.word,
      meaning: word.meaning,
      isHidingMeaning,
      star: word.star
    };
  });
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={handleChange}
      size="small"
    />
  );
}
