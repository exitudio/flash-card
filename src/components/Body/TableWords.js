import React, { useState } from "react";
import { useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Table } from "antd";
import { selectWords } from "../../selectors/questionSelectors";
import { postStar } from "../../redux/word/wordActions";
import StarsComponent from "../reuseable/StarsComponent";

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
    filters: [{ text: "Hide", value: "hide" }]
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
  const [isHidingMeaning, hideMeaning] = useState(false);
  const handleChange = (_, dropDown) => {
    hideMeaning(dropDown.meaning.length > 0);
  };
  const dataSource = allWords.map((word, i) => {
    return {
      key: i,
      word: word.word,
      meaning: isHidingMeaning ? "" : word.meaning,
      star: word.star
    };
  });
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      onChange={handleChange}
      bordered
    />
  );
}
