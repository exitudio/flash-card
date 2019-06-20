import React from "react";
import Question from "./Question";
import { useSelector } from "react-redux";

export default function Body() {
  const isFlashCard = useSelector(state => state.appStatus.isFlashCard);
  if (isFlashCard) {
    return <Question />;
  } else {
    return null;
  }
}
